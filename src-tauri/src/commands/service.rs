/// 服务管理命令 (macOS launchd)
/// 只扫描 OpenClaw 核心服务 (ai.openclaw.* / com.openclaw.guardian.* / com.openclaw.watchdog)
/// 使用新版 launchctl bootstrap/bootout/kickstart API
use std::collections::HashMap;
use std::fs;
use std::process::Command;

use crate::models::types::ServiceStatus;

/// 获取当前用户 UID
fn current_uid() -> Result<u32, String> {
    let output = Command::new("id")
        .arg("-u")
        .output()
        .map_err(|e| format!("获取 UID 失败: {e}"))?;
    let uid_str = String::from_utf8_lossy(&output.stdout).trim().to_string();
    uid_str.parse::<u32>().map_err(|e| format!("解析 UID 失败: {e}"))
}

/// OpenClaw 官方服务的友好名称映射
fn description_map() -> HashMap<&'static str, &'static str> {
    HashMap::from([
        ("ai.openclaw.gateway", "OpenClaw Gateway"),
        ("ai.openclaw.node", "OpenClaw Node Host"),
    ])
}

/// OpenClaw 官方服务前缀（ai.openclaw.gateway / ai.openclaw.node 等）
const OPENCLAW_PREFIXES: &[&str] = &[
    "ai.openclaw.",
];

/// 动态扫描 LaunchAgents 目录，只返回 OpenClaw 核心服务
fn scan_plist_labels() -> Vec<String> {
    let home = dirs::home_dir().unwrap_or_default();
    let agents_dir = home.join("Library/LaunchAgents");
    let mut labels = Vec::new();

    if let Ok(entries) = fs::read_dir(&agents_dir) {
        for entry in entries.flatten() {
            let name = entry.file_name().to_string_lossy().to_string();
            if !name.ends_with(".plist") {
                continue;
            }
            let label = name.trim_end_matches(".plist");
            if OPENCLAW_PREFIXES.iter().any(|p| label.starts_with(p)) {
                labels.push(label.to_string());
            }
        }
    }
    labels.sort();
    labels
}

fn plist_path(label: &str) -> String {
    let home = dirs::home_dir().unwrap_or_default();
    format!(
        "{}/Library/LaunchAgents/{}.plist",
        home.display(),
        label
    )
}

/// 用 `launchctl print gui/{uid}/{label}` 检测单个服务状态
/// 返回 (running, pid)
fn check_service_status(uid: u32, label: &str) -> (bool, Option<u32>) {
    let target = format!("gui/{}/{}", uid, label);
    let output = Command::new("launchctl")
        .args(["print", &target])
        .output();

    let Ok(out) = output else {
        return (false, None);
    };

    // launchctl print 返回非零 → 服务未注册
    if !out.status.success() {
        return (false, None);
    }

    let stdout = String::from_utf8_lossy(&out.stdout);
    let mut pid: Option<u32> = None;
    let mut running = false;

    for line in stdout.lines() {
        // 只解析顶层字段（单个 tab 缩进），忽略嵌套的 state = active 等
        if !line.starts_with('\t') || line.starts_with("\t\t") {
            continue;
        }
        let trimmed = line.trim();
        if trimmed.starts_with("pid = ") {
            if let Ok(p) = trimmed["pid = ".len()..].trim().parse::<u32>() {
                pid = Some(p);
            }
        }
        if trimmed.starts_with("state = ") {
            let state = trimmed["state = ".len()..].trim();
            running = state == "running";
        }
    }

    (running, pid)
}

#[tauri::command]
pub fn get_services_status() -> Result<Vec<ServiceStatus>, String> {
    let uid = current_uid()?;
    let labels = scan_plist_labels();
    let desc_map = description_map();
    let mut results = Vec::new();

    for label in &labels {
        let (running, pid) = check_service_status(uid, label);
        results.push(ServiceStatus {
            label: label.clone(),
            pid,
            running,
            description: desc_map
                .get(label.as_str())
                .unwrap_or(&"")
                .to_string(),
        });
    }

    Ok(results)
}

#[tauri::command]
pub fn start_service(label: String) -> Result<(), String> {
    let uid = current_uid()?;
    let path = plist_path(&label);
    let domain_target = format!("gui/{}", uid);
    let service_target = format!("gui/{}/{}", uid, label);

    // bootstrap 加载 plist
    let bootstrap_out = Command::new("launchctl")
        .args(["bootstrap", &domain_target, &path])
        .output()
        .map_err(|e| format!("bootstrap 失败: {e}"))?;

    if !bootstrap_out.status.success() {
        let stderr = String::from_utf8_lossy(&bootstrap_out.stderr);
        // 如果已经加载过，忽略该错误，继续 kickstart
        if !stderr.contains("already bootstrapped") && !stderr.trim().is_empty() {
            return Err(format!("启动 {label} 失败: {stderr}"));
        }
    }

    // kickstart 触发服务运行
    let kickstart_out = Command::new("launchctl")
        .args(["kickstart", &service_target])
        .output()
        .map_err(|e| format!("kickstart 失败: {e}"))?;

    if !kickstart_out.status.success() {
        let stderr = String::from_utf8_lossy(&kickstart_out.stderr);
        if !stderr.trim().is_empty() {
            return Err(format!("kickstart {label} 失败: {stderr}"));
        }
    }

    Ok(())
}

#[tauri::command]
pub fn stop_service(label: String) -> Result<(), String> {
    let uid = current_uid()?;
    let service_target = format!("gui/{}/{}", uid, label);

    let output = Command::new("launchctl")
        .args(["bootout", &service_target])
        .output()
        .map_err(|e| format!("停止失败: {e}"))?;

    if !output.status.success() {
        let stderr = String::from_utf8_lossy(&output.stderr);
        // 忽略"未加载"类错误
        if !stderr.contains("No such process")
            && !stderr.contains("Could not find specified service")
            && !stderr.trim().is_empty()
        {
            return Err(format!("停止 {label} 失败: {stderr}"));
        }
    }

    Ok(())
}

#[tauri::command]
pub fn restart_service(label: String) -> Result<(), String> {
    let uid = current_uid()?;
    let path = plist_path(&label);
    let domain_target = format!("gui/{}", uid);
    let service_target = format!("gui/{}/{}", uid, label);

    // 第一步：bootout 停止服务（忽略未加载错误）
    let _ = Command::new("launchctl")
        .args(["bootout", &service_target])
        .output();

    // 第二步：轮询等待旧进程退出，最多等 3 秒
    let deadline = std::time::Instant::now() + std::time::Duration::from_secs(3);
    loop {
        let (running, _) = check_service_status(uid, &label);
        if !running {
            break;
        }
        if std::time::Instant::now() >= deadline {
            break; // 超时后继续尝试
        }
        std::thread::sleep(std::time::Duration::from_millis(200));
    }

    // 第三步：bootstrap 重新加载 plist
    let bootstrap_out = Command::new("launchctl")
        .args(["bootstrap", &domain_target, &path])
        .output()
        .map_err(|e| format!("重启 bootstrap 失败: {e}"))?;

    if !bootstrap_out.status.success() {
        let stderr = String::from_utf8_lossy(&bootstrap_out.stderr);
        if !stderr.contains("already bootstrapped") && !stderr.trim().is_empty() {
            return Err(format!("重启 {label} 失败 (bootstrap): {stderr}"));
        }
    }

    // 第四步：kickstart -k 强制重启
    let kickstart_out = Command::new("launchctl")
        .args(["kickstart", "-k", &service_target])
        .output()
        .map_err(|e| format!("重启 kickstart 失败: {e}"))?;

    if !kickstart_out.status.success() {
        let stderr = String::from_utf8_lossy(&kickstart_out.stderr);
        if !stderr.trim().is_empty() {
            return Err(format!("重启 {label} 失败 (kickstart): {stderr}"));
        }
    }

    Ok(())
}
