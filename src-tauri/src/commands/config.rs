/// 配置读写命令
use serde_json::Value;
use std::fs;
use std::path::PathBuf;
use std::process::Command;

use crate::models::types::VersionInfo;

fn backups_dir() -> PathBuf {
    super::openclaw_dir().join("backups")
}

#[tauri::command]
pub fn read_openclaw_config() -> Result<Value, String> {
    let path = super::openclaw_dir().join("openclaw.json");
    let content = fs::read_to_string(&path)
        .map_err(|e| format!("读取配置失败: {e}"))?;
    serde_json::from_str(&content)
        .map_err(|e| format!("解析 JSON 失败: {e}"))
}

#[tauri::command]
pub fn write_openclaw_config(config: Value) -> Result<(), String> {
    let path = super::openclaw_dir().join("openclaw.json");
    // 备份
    let bak = super::openclaw_dir().join("openclaw.json.bak");
    let _ = fs::copy(&path, &bak);
    // 写入
    let json = serde_json::to_string_pretty(&config)
        .map_err(|e| format!("序列化失败: {e}"))?;
    fs::write(&path, json)
        .map_err(|e| format!("写入失败: {e}"))
}

#[tauri::command]
pub fn read_mcp_config() -> Result<Value, String> {
    let path = super::openclaw_dir().join("mcp.json");
    if !path.exists() {
        return Ok(Value::Object(Default::default()));
    }
    let content = fs::read_to_string(&path)
        .map_err(|e| format!("读取 MCP 配置失败: {e}"))?;
    serde_json::from_str(&content)
        .map_err(|e| format!("解析 JSON 失败: {e}"))
}

#[tauri::command]
pub fn write_mcp_config(config: Value) -> Result<(), String> {
    let path = super::openclaw_dir().join("mcp.json");
    let json = serde_json::to_string_pretty(&config)
        .map_err(|e| format!("序列化失败: {e}"))?;
    fs::write(&path, json)
        .map_err(|e| format!("写入失败: {e}"))
}

/// 获取本地安装的 openclaw 版本号
fn get_local_version() -> Option<String> {
    let output = Command::new("openclaw")
        .arg("--version")
        .output()
        .ok()?;
    let raw = String::from_utf8_lossy(&output.stdout).trim().to_string();
    // 格式可能是 "openclaw 2026.2.23" 或纯版本号
    let version = raw
        .split_whitespace()
        .last()
        .filter(|s| !s.is_empty())
        .map(String::from)?;
    Some(version)
}

/// 从 npm registry 获取最新版本号，超时 5 秒
async fn get_latest_version() -> Option<String> {
    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(5))
        .build()
        .ok()?;
    let resp = client
        .get("https://registry.npmjs.org/@qingchencloud%2Fopenclaw-zh/latest")
        .send()
        .await
        .ok()?;
    let json: Value = resp.json().await.ok()?;
    json.get("version")
        .and_then(|v| v.as_str())
        .map(String::from)
}

#[tauri::command]
pub async fn get_version_info() -> Result<VersionInfo, String> {
    let current = get_local_version();
    let latest = get_latest_version().await;
    let update_available = match (&current, &latest) {
        (Some(c), Some(l)) => l != c,
        _ => false,
    };
    Ok(VersionInfo {
        current,
        latest,
        update_available,
    })
}

/// 执行 npm 全局升级 openclaw
#[tauri::command]
pub async fn upgrade_openclaw() -> Result<String, String> {
    let output = Command::new("npm")
        .args(["install", "-g", "@qingchencloud/openclaw-zh@latest"])
        .output()
        .map_err(|e| format!("执行升级命令失败: {e}"))?;

    let stderr = String::from_utf8_lossy(&output.stderr).to_string();

    if !output.status.success() {
        return Err(format!("升级失败: {stderr}"));
    }

    // 获取升级后的版本号
    let new_ver = get_local_version().unwrap_or_else(|| "未知".into());
    Ok(format!("升级成功，当前版本: {new_ver}"))
}

#[tauri::command]
pub fn check_installation() -> Result<Value, String> {
    let dir = super::openclaw_dir();
    let installed = dir.join("openclaw.json").exists();
    let mut result = serde_json::Map::new();
    result.insert("installed".into(), Value::Bool(installed));
    result.insert("path".into(), Value::String(dir.to_string_lossy().to_string()));
    Ok(Value::Object(result))
}

#[tauri::command]
pub fn write_env_file(path: String, config: String) -> Result<(), String> {
    let expanded = if path.starts_with("~/") {
        dirs::home_dir()
            .unwrap_or_default()
            .join(&path[2..])
    } else {
        PathBuf::from(&path)
    };

    // 安全限制：只允许写入 ~/.openclaw/ 目录下的文件
    let openclaw_base = super::openclaw_dir();
    if !expanded.starts_with(&openclaw_base) {
        return Err("只允许写入 ~/.openclaw/ 目录下的文件".to_string());
    }

    if let Some(parent) = expanded.parent() {
        let _ = fs::create_dir_all(parent);
    }
    fs::write(&expanded, &config)
        .map_err(|e| format!("写入 .env 失败: {e}"))
}

// ===== 备份管理 =====

#[tauri::command]
pub fn list_backups() -> Result<Value, String> {
    let dir = backups_dir();
    if !dir.exists() {
        return Ok(Value::Array(vec![]));
    }
    let mut backups: Vec<Value> = vec![];
    let entries = fs::read_dir(&dir)
        .map_err(|e| format!("读取备份目录失败: {e}"))?;

    for entry in entries.flatten() {
        let path = entry.path();
        if path.extension().and_then(|e| e.to_str()) != Some("json") {
            continue;
        }
        let name = path.file_name().unwrap_or_default().to_string_lossy().to_string();
        let meta = fs::metadata(&path).ok();
        let size = meta.as_ref().map(|m| m.len()).unwrap_or(0);
        // macOS 支持 created()，fallback 到 modified()
        let created = meta
            .and_then(|m| {
                m.created().ok().or_else(|| m.modified().ok())
            })
            .and_then(|t| t.duration_since(std::time::UNIX_EPOCH).ok())
            .map(|d| d.as_secs())
            .unwrap_or(0);

        let mut obj = serde_json::Map::new();
        obj.insert("name".into(), Value::String(name));
        obj.insert("size".into(), Value::Number(size.into()));
        obj.insert("created_at".into(), Value::Number(created.into()));
        backups.push(Value::Object(obj));
    }
    // 按时间倒序
    backups.sort_by(|a, b| {
        let ta = a.get("created_at").and_then(|v| v.as_u64()).unwrap_or(0);
        let tb = b.get("created_at").and_then(|v| v.as_u64()).unwrap_or(0);
        tb.cmp(&ta)
    });
    Ok(Value::Array(backups))
}

#[tauri::command]
pub fn create_backup() -> Result<Value, String> {
    let dir = backups_dir();
    fs::create_dir_all(&dir)
        .map_err(|e| format!("创建备份目录失败: {e}"))?;

    let src = super::openclaw_dir().join("openclaw.json");
    if !src.exists() {
        return Err("openclaw.json 不存在".into());
    }

    let now = chrono::Local::now();
    let name = format!("openclaw-{}.json", now.format("%Y%m%d-%H%M%S"));
    let dest = dir.join(&name);
    fs::copy(&src, &dest)
        .map_err(|e| format!("备份失败: {e}"))?;

    let size = fs::metadata(&dest).map(|m| m.len()).unwrap_or(0);
    let mut obj = serde_json::Map::new();
    obj.insert("name".into(), Value::String(name));
    obj.insert("size".into(), Value::Number(size.into()));
    Ok(Value::Object(obj))
}

#[tauri::command]
pub fn restore_backup(name: String) -> Result<(), String> {
    // 安全检查
    if name.contains("..") || name.contains('/') {
        return Err("非法文件名".into());
    }
    let backup_path = backups_dir().join(&name);
    if !backup_path.exists() {
        return Err(format!("备份文件不存在: {name}"));
    }
    let target = super::openclaw_dir().join("openclaw.json");

    // 恢复前先自动备份当前配置
    if target.exists() {
        let _ = create_backup();
    }

    fs::copy(&backup_path, &target)
        .map_err(|e| format!("恢复失败: {e}"))?;
    Ok(())
}

#[tauri::command]
pub fn delete_backup(name: String) -> Result<(), String> {
    if name.contains("..") || name.contains('/') {
        return Err("非法文件名".into());
    }
    let path = backups_dir().join(&name);
    if !path.exists() {
        return Err(format!("备份文件不存在: {name}"));
    }
    fs::remove_file(&path)
        .map_err(|e| format!("删除失败: {e}"))
}

/// 获取当前用户 UID
fn get_uid() -> Result<u32, String> {
    let output = Command::new("id")
        .arg("-u")
        .output()
        .map_err(|e| format!("获取 UID 失败: {e}"))?;
    String::from_utf8_lossy(&output.stdout)
        .trim()
        .parse::<u32>()
        .map_err(|e| format!("解析 UID 失败: {e}"))
}

/// 重载 Gateway 服务（使用 kickstart -k 强制重启）
#[tauri::command]
pub fn reload_gateway() -> Result<String, String> {
    let uid = get_uid()?;
    let target = format!("gui/{uid}/ai.openclaw.gateway");
    let output = Command::new("launchctl")
        .args(["kickstart", "-k", &target])
        .output()
        .map_err(|e| format!("重载失败: {e}"))?;
    if output.status.success() {
        Ok("Gateway 已重载".to_string())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(format!("重载失败: {stderr}"))
    }
}

/// 测试模型连通性：向 provider 发送一个简单的 chat completion 请求
#[tauri::command]
pub async fn test_model(
    base_url: String,
    api_key: String,
    model_id: String,
) -> Result<String, String> {
    let url = format!("{}/chat/completions", base_url.trim_end_matches('/'));

    let body = serde_json::json!({
        "model": model_id,
        "messages": [{"role": "user", "content": "Hi"}],
        "max_tokens": 16,
        "stream": false
    });

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(30))
        .build()
        .map_err(|e| format!("创建 HTTP 客户端失败: {e}"))?;

    let mut req = client.post(&url).json(&body);
    if !api_key.is_empty() {
        req = req.header("Authorization", format!("Bearer {api_key}"));
    }

    let resp = req.send().await.map_err(|e| {
        if e.is_timeout() {
            "请求超时 (30s)".to_string()
        } else if e.is_connect() {
            format!("连接失败: {e}")
        } else {
            format!("请求失败: {e}")
        }
    })?;

    let status = resp.status();
    let text = resp.text().await.unwrap_or_default();

    if !status.is_success() {
        // 尝试提取错误信息
        let msg = serde_json::from_str::<serde_json::Value>(&text)
            .ok()
            .and_then(|v| {
                v.get("error")
                    .and_then(|e| e.get("message"))
                    .and_then(|m| m.as_str())
                    .map(String::from)
            })
            .unwrap_or_else(|| format!("HTTP {status}"));
        return Err(msg);
    }

    // 提取回复内容（兼容 reasoning 模型的 reasoning_content 字段）
    let reply = serde_json::from_str::<serde_json::Value>(&text)
        .ok()
        .and_then(|v| {
            let msg = v.get("choices")?.get(0)?.get("message")?;
            // 优先取 content，为空则取 reasoning_content
            let content = msg.get("content").and_then(|c| c.as_str()).unwrap_or("");
            if !content.is_empty() {
                return Some(content.to_string());
            }
            msg.get("reasoning_content")
                .and_then(|c| c.as_str())
                .filter(|s| !s.is_empty())
                .map(|s| format!("[reasoning] {s}"))
        })
        .unwrap_or_else(|| "（无回复内容）".into());

    Ok(reply)
}

/// 获取服务商的远程模型列表（调用 /models 接口）
#[tauri::command]
pub async fn list_remote_models(
    base_url: String,
    api_key: String,
) -> Result<Vec<String>, String> {
    let url = format!("{}/models", base_url.trim_end_matches('/'));

    let client = reqwest::Client::builder()
        .timeout(std::time::Duration::from_secs(15))
        .build()
        .map_err(|e| format!("创建 HTTP 客户端失败: {e}"))?;

    let mut req = client.get(&url);
    if !api_key.is_empty() {
        req = req.header("Authorization", format!("Bearer {api_key}"));
    }

    let resp = req.send().await.map_err(|e| {
        if e.is_timeout() {
            "请求超时 (15s)，该服务商可能不支持模型列表接口".to_string()
        } else if e.is_connect() {
            format!("连接失败，请检查接口地址是否正确: {e}")
        } else {
            format!("请求失败: {e}")
        }
    })?;

    let status = resp.status();
    let text = resp.text().await.unwrap_or_default();

    if !status.is_success() {
        let msg = serde_json::from_str::<serde_json::Value>(&text)
            .ok()
            .and_then(|v| {
                v.get("error")
                    .and_then(|e| e.get("message"))
                    .and_then(|m| m.as_str())
                    .map(String::from)
            })
            .unwrap_or_else(|| format!("HTTP {status}"));
        return Err(format!("获取模型列表失败: {msg}"));
    }

    // 解析 OpenAI 格式的 /models 响应
    let ids = serde_json::from_str::<serde_json::Value>(&text)
        .ok()
        .and_then(|v| {
            let data = v.get("data")?.as_array()?;
            let mut ids: Vec<String> = data
                .iter()
                .filter_map(|m| m.get("id").and_then(|id| id.as_str()).map(String::from))
                .collect();
            ids.sort();
            Some(ids)
        })
        .unwrap_or_default();

    if ids.is_empty() {
        return Err("该服务商返回了空的模型列表，可能不支持 /models 接口".to_string());
    }

    Ok(ids)
}

/// 安装 Gateway 服务（执行 openclaw gateway install）
#[tauri::command]
pub fn install_gateway() -> Result<String, String> {
    let output = Command::new("openclaw")
        .args(["gateway", "install"])
        .output()
        .map_err(|e| format!("安装失败: {e}"))?;

    if output.status.success() {
        Ok("Gateway 服务已安装".to_string())
    } else {
        let stderr = String::from_utf8_lossy(&output.stderr);
        Err(format!("安装失败: {stderr}"))
    }
}

/// 卸载 Gateway 服务（先 bootout 再删除 plist）
#[tauri::command]
pub fn uninstall_gateway() -> Result<String, String> {
    let uid = get_uid()?;
    let target = format!("gui/{uid}/ai.openclaw.gateway");

    // 先停止服务
    let _ = Command::new("launchctl")
        .args(["bootout", &target])
        .output();

    // 删除 plist 文件
    let home = dirs::home_dir().unwrap_or_default();
    let plist = home.join("Library/LaunchAgents/ai.openclaw.gateway.plist");
    if plist.exists() {
        fs::remove_file(&plist)
            .map_err(|e| format!("删除 plist 失败: {e}"))?;
    }

    Ok("Gateway 服务已卸载".to_string())
}
