<p align="center">
  <img src="public/images/logo-brand.png" width="360" alt="AI Agent">
</p>

<p align="center">
  内置 AI 助手的 OpenClaw & Hermes Agent 管理面板 — 多引擎 AI 框架管理
</p>

<p align="center">
  <strong>🇨🇳 中文</strong> | <a href="README.en.md">🇺🇸 English</a> | <a href="README.zh-TW.md">🇹🇼 繁體中文</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.vi.md">🇻🇳 Tiếng Việt</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.pt.md">🇧🇷 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.de.md">🇩🇪 Deutsch</a>
</p>

<p align="center">
  <a href="https://github.com/your-org/ai-agent/releases/latest">
    <img src="https://img.shields.io/github/v/release/your-org/ai-agent?style=flat-square&color=6366f1" alt="Release">
  </a>
  <a href="https://github.com/your-org/ai-agent/releases/latest">
    <img src="https://img.shields.io/github/downloads/your-org/ai-agent/total?style=flat-square&color=8b5cf6" alt="Downloads">
  </a>
  <a href="https://github.com/your-org/ai-agent/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-AGPL--3.0-blue.svg?style=flat-square" alt="License">
  </a>
  <a href="https://github.com/your-org/ai-agent/actions/workflows/ci.yml">
    <img src="https://img.shields.io/github/actions/workflow/status/your-org/ai-agent/ci.yml?style=flat-square&label=CI" alt="CI">
  </a>
</p>

---

<p align="center">
  <img src="docs/feature-showcase.gif" width="800" alt="AI Agent 功能全景">
</p>

<p align="center">
    <img src="https://img.shields.io/badge/%E2%96%B6%20%E6%BC%94%E7%A4%BA%E8%A7%86%E9%A2%91-50%E7%A7%92%E5%BF%AB%E9%80%9F%E4%BA%86%E8%A7%A3-6366f1?style=for-the-badge" alt="演示视频">
  </a>
</p>

AI Agent 是支持多 AI Agent 框架的可视化管理面板，目前支持 [OpenClaw](https://github.com/1186258278/OpenClawChineseTranslation) 和 [Hermes Agent](https://github.com/nousresearch/hermes-agent) 双引擎。**内置智能 AI 助手**，帮你一键安装、自动诊断配置、排查问题、修复错误。8 大工具 + 4 种模式 + 交互式问答，从新手到老手都能轻松管理。

### 🔥 开发板 / 嵌入式设备支持

AI Agent 提供**纯 Web 版部署模式**（零 GUI 依赖），天然兼容 ARM64 开发板和嵌入式设备：

- **Orange Pi / 树莓派 / RK3588** 等 ARM64 板子 — `npm run serve` 即可运行
- **Docker ARM64 镜像** — `docker run ghcr.io/your-org/openclaw:latest` 开箱即用
- **Armbian / Debian / Ubuntu Server** — 一键部署脚本自动检测架构
- 无需 Rust / Tauri / 图形界面，**只要有 Node.js 18+ 就能跑**

> 📖 详见 [Armbian 部署指南](docs/armbian-deploy.md) | [Web 版开发说明](#web-开发版无需-rusttauri)

## 社区交流

一群对 AI Agent 充满热情的开发者和玩家，欢迎加入交流。

- **QQ群**: [点击加入](https://qt.cool/c/OpenClaw)

---

## 下载安装

前往 [Releases](https://github.com/your-org/ai-agent/releases/latest) 页面下载最新版本，根据你的系统选择对应安装包：

### macOS

| 芯片 | 安装包 | 说明 |
|------|--------|------|
| Apple Silicon (M1/M2/M3/M4) | `AI Agent_x.x.x_aarch64.dmg` | 2020 年末及之后的 Mac |
| Intel | `AI Agent_x.x.x_x64.dmg` | 2020 年及之前的 Mac |

> 不确定芯片类型？点击左上角  → 关于本机，查看「芯片」一栏。

安装方式：打开 `.dmg` 文件，**先将 AI Agent 拖入「应用程序」文件夹**，再双击打开。

> **⚠️ 首次打开提示"已损坏"或"无法验证开发者"？** 由于应用未签名，macOS 会拦截。请在终端执行以下命令解除限制：
>
> ```bash
> sudo xattr -rd com.apple.quarantine /Applications/AI Agent.app
> ```
>
> 或者前往「系统设置 → 隐私与安全性」，找到 AI Agent 点击「仍要打开」。
>
> 提示 `No such file`？说明没有拖入应用程序文件夹。请先拖入，或改用：
> ```bash
> sudo xattr -rd com.apple.quarantine ~/Downloads/AI Agent.app
> ```

### Windows

| 格式 | 安装包 | 说明 |
|------|--------|------|
| EXE 安装器 | `AI Agent_x.x.x_x64-setup.exe` | 推荐，双击安装 |
| MSI 安装器 | `AI Agent_x.x.x_x64_en-US.msi` | 企业部署 / 静默安装 |

### Linux

| 格式 | 安装包 | 说明 |
|------|--------|------|
| AppImage | `AI Agent_x.x.x_amd64.AppImage` | 免安装，`chmod +x` 后直接运行 |
| DEB | `AI Agent_x.x.x_amd64.deb` | Debian / Ubuntu：`sudo dpkg -i *.deb` |
| RPM | `AI Agent-x.x.x-1.x86_64.rpm` | Fedora / RHEL：`sudo rpm -i *.rpm` |

### Linux 服务器（Web 版）

没有桌面环境？一键部署 AI Agent Web 版，通过浏览器远程管理 OpenClaw：

```bash
curl -fsSL https://raw.githubusercontent.com/your-org/ai-agent/main/scripts/linux-deploy.sh | bash
```

部署完成后访问 `http://服务器IP:1420`，功能与桌面版一致。

📖 详细教程见 [Linux 部署指南](docs/linux-deploy.md)

### Docker 部署

```bash
docker run -d --name ai-agent --restart unless-stopped \
  -p 1420:1420 -v ai-agent-data:/root/.openclaw \
  node:22-slim \
  sh -c "apt-get update && apt-get install -y git && \
    npm install -g @your-org/openclaw-zh --registry https://registry.npmmirror.com && \
    git clone https://github.com/your-org/ai-agent.git /app && \
    cd /app && npm install && npm run build && npm run serve"
```

📖 详细教程见 [Docker 部署指南](docs/docker-deploy.md)（含 Compose、自定义镜像、Nginx 反向代理等）

## 升级面板

AI Agent 提供多种升级方式，根据你的安装方式选择对应方案。

### macOS / Windows 桌面版升级

桌面版内置**自动更新机制**，新版本发布后会自动提示升级：

1. 打开 AI Agent，如有新版本会弹出升级提示
2. 点击「立即升级」，等待下载完成后自动安装重启
3. 也可前往「关于」页面手动检查更新

> **手动升级**：如果自动更新失败，可前往 [Releases](https://github.com/your-org/ai-agent/releases/latest) 下载最新安装包，覆盖安装即可。数据不会丢失。

### Linux 桌面版升级

| 格式 | 升级命令 |
|------|----------|
| AppImage | 下载最新 `.AppImage` 文件，替换旧文件，`chmod +x` 后运行 |
| DEB | `sudo dpkg -i AI Agent_最新版本_amd64.deb` |
| RPM | `sudo rpm -U AI Agent-最新版本-1.x86_64.rpm` |

### Linux Web 版升级

**方式一：一键升级脚本（推荐）**

```bash
curl -fsSL https://raw.githubusercontent.com/your-org/ai-agent/main/scripts/linux-deploy.sh | bash
```

脚本会自动检测已有安装，拉取最新代码并重新构建。

**方式二：手动升级**

```bash
cd /opt/ai-agent  # 替换为实际安装目录
git pull origin main
npm install
npm run build
sudo systemctl restart ai-agent
```

> **升级 OpenClaw**：面板和 OpenClaw 版本需要匹配。可在「服务管理」页面一键升级，或手动执行：
> ```bash
> sudo npm install -g @your-org/openclaw-zh@latest --registry https://registry.npmmirror.com
> ```

### Docker 升级

**Docker Compose 方式（推荐）**

```bash
cd /path/to/ai-agent  # 包含 docker-compose.yml 的目录
docker compose build --no-cache ai-agent
docker compose up -d ai-agent
```

**docker run 方式**

```bash
# 停止并删除旧容器（数据保存在 Volume 中不会丢失）
docker stop ai-agent
docker rm ai-agent

# 重新启动新容器
docker run -d --name ai-agent --restart unless-stopped \
  -p 1420:1420 -v ai-agent-data:/root/.openclaw \
  node:22-slim \
  sh -c "apt-get update && apt-get install -y git && \
    npm install -g @your-org/openclaw-zh --registry https://registry.npmmirror.com && \
    git clone https://github.com/your-org/ai-agent.git /app && \
    cd /app && npm install && npm run build && npm run serve"
```

**仅升级容器内的 OpenClaw**

```bash
docker exec -it ai-agent npm install -g @your-org/openclaw-zh@latest --registry https://registry.npmmirror.com
```

### macOS / Windows Web 版升级

如果你使用源码部署了 Web 版（非桌面客户端），升级方式与 Linux Web 版一致：

```bash
cd ai-agent  # 替换为实际安装目录
git pull origin main
npm install
npm run build
npm run serve  # 重新启动
```

---

## 卸载面板

### macOS 桌面版卸载

```bash
# 1. 删除应用
sudo rm -rf /Applications/AI Agent.app

# 2. 清理应用数据（可选，删除后配置将丢失）
rm -rf ~/Library/Application\ Support/com.ai-agent.app
rm -rf ~/Library/Caches/com.ai-agent.app
rm -rf ~/Library/Preferences/com.ai-agent.app.plist
```

### Windows 桌面版卸载

**方式一：通过系统设置**
1. 打开「设置」→「应用」→「已安装的应用」
2. 搜索 **AI Agent**，点击「卸载」

**方式二：通过控制面板**
1. 打开「控制面板」→「程序」→「卸载程序」
2. 找到 **AI Agent**，右键「卸载」

**清理残留数据（可选）**：
```powershell
# 删除应用数据
Remove-Item -Recurse -Force "$env:APPDATA\com.ai-agent.app"
Remove-Item -Recurse -Force "$env:LOCALAPPDATA\com.ai-agent.app"
```

### Linux 桌面版卸载

| 格式 | 卸载命令 |
|------|----------|
| AppImage | 直接删除 `.AppImage` 文件即可 |
| DEB | `sudo dpkg -r ai-agent` |
| RPM | `sudo rpm -e AI Agent` |

清理应用数据（可选）：
```bash
rm -rf ~/.local/share/com.ai-agent.app
rm -rf ~/.config/com.ai-agent.app
```

### Linux Web 版卸载

```bash
# 1. 停止并禁用服务
sudo systemctl stop ai-agent
sudo systemctl disable ai-agent

# 2. 删除 systemd 服务文件
sudo rm -f /etc/systemd/system/ai-agent.service
sudo systemctl daemon-reload

# 3. 删除面板代码
sudo rm -rf /opt/ai-agent

# 4. 卸载 OpenClaw（可选）
sudo npm uninstall -g @your-org/openclaw-zh

# 5. 删除 OpenClaw 数据（可选，删除后所有配置和记忆将丢失）
rm -rf ~/.openclaw
```

> ⚠️ 第 5 步会删除所有 OpenClaw 配置（API Key、模型设置、Agent 记忆等），请确认不再需要后再执行。

### Docker 卸载

```bash
# 1. 停止并删除容器
docker stop ai-agent
docker rm ai-agent

# 2. 删除镜像（可选）
docker rmi $(docker images --filter "reference=*ai-agent*" -q) 2>/dev/null

# 3. 删除数据卷（可选，删除后所有配置将丢失）
docker volume rm ai-agent-data
```

如果使用 Docker Compose：

```bash
cd /path/to/ai-agent
docker compose down          # 停止并删除容器
docker compose down -v       # 同时删除数据卷（谨慎！）
docker rmi $(docker images --filter "reference=*ai-agent*" -q) 2>/dev/null
```

---

## 功能特性

<p align="center">
  <img src="docs/feature-showcase.gif" width="800" alt="功能矩阵">
</p>

- **🤖 AI 助手（全新·重磅）** — 内置独立 AI 助手，4 种操作模式 + 8 大工具 + 交互式问答，详见下方 [AI 助手亮点](#-ai-助手亮点)
- **🧩 多引擎架构** — 同时支持 OpenClaw 和 Hermes Agent 双引擎，自由切换，各自独立管理
- **🤖 Hermes Agent 对话** — 内置 Hermes Agent 聊天界面，支持工具调用可视化、文件系统访问开关、SSE 流式输出
- **🖼️ 图片识别** — 粘贴截图或拖拽图片，AI 自动识别分析，支持多模态图文混排对话
- **仪表盘** — 系统概览，服务状态实时监控，快捷操作
- **服务管理** — OpenClaw / Hermes Gateway 启停控制、版本检测与一键升级、配置备份与还原
- **模型配置** — 多服务商管理、模型增删改查、批量连通性测试、延迟检测、拖拽排序、自动保存+撤销
- **网关配置** — 端口、访问权限（本机/局域网）、认证 Token、Tailscale 组网
- **通信与自动化** — 消息设置、广播策略、斜杠命令、Webhook、执行审批转发等高级配置
- **使用情况** — Token 用量、API 费用、热门模型/服务商/工具排行、每日用量图表
- **Agent 管理** — Agent 增删改查、身份编辑、模型配置、工作区管理
- **聊天** — 流式响应、Markdown 渲染、会话管理、/fast /think /verbose /reasoning 命令、Compaction 状态指示
- **定时任务** — Cron 定时执行，支持多渠道投递
- **日志查看** — 多日志源实时查看与关键词搜索
- **记忆管理** — 记忆文件查看/编辑、分类管理、ZIP 导出、Agent 切换
- **扩展工具** — cftunnel 内网穿透管理、ClawApp 状态监控
- **关于** — 版本信息、社群入口、相关项目链接、一键升级

## 功能截图

<p align="center">
  <img src="docs/quick-stats.gif" width="800" alt="AI Agent 数据概览">
</p>

<p align="center">
  <img src="docs/01.png" width="800" alt="AI 助手">
</p>
<p align="center"><em>🤖 AI 助手 — 8 大技能卡片，一键触发配置检查、Gateway 诊断、环境检测、一键排障等常用操作</em></p>

<p align="center">
  <img src="docs/00.png" width="800" alt="仪表盘">
</p>
<p align="center"><em>仪表盘 — Gateway / 隧道 / 服务实时状态，版本信息、Agent 数量、模型池一屏掌握</em></p>

<p align="center">
  <img src="docs/02.png" width="800" alt="AI 助手设置 — 公益 AI 接口">
</p>
<p align="center"><em>⚙️ AI 设置 — 独立模型配置 + 公益 AI 接口一键接入，GPT-5 全系列免费可用</em></p>

<p align="center">
  <img src="docs/05.png" width="800" alt="AI 助手人设 — Agent 灵魂">
</p>
<p align="center"><em>� 借尸还魂 — 从 OpenClaw Agent 加载灵魂（SOUL / IDENTITY / USER / AGENTS / TOOLS），继承人格与记忆</em></p>

<p align="center">
  <img src="docs/07.png" width="800" alt="实时聊天">
</p>
<p align="center"><em>实时聊天 — WebSocket 流式对话，多 Provider 模型自动聚合，支持多模态</em></p>

<p align="center">
  <img src="docs/09.png" width="800" alt="模型配置">
</p>
<p align="center"><em>模型配置 — 多服务商统一管理，公益接口一键添加全部模型，主模型+备选自动切换</em></p>

<p align="center">
  <img src="docs/13.png" width="800" alt="记忆文件">
</p>
<p align="center"><em>记忆文件 — 工作记忆、记忆归档、核心文件在线编辑，多 Agent 记忆隔离</em></p>

<details>
<summary><strong>查看更多截图</strong></summary>

<p align="center">
  <img src="docs/10.png" width="800" alt="Agent 管理">
</p>
<p align="center"><em>Agent 管理 — 多 Agent 创建、身份配置与独立工作区管理</em></p>

<p align="center">
  <img src="docs/11.png" width="800" alt="Gateway 安全认证">
</p>
<p align="center"><em>Gateway — Token / 密码双认证，Agent 工具权限三档管控，会话可见性控制</em></p>

<p align="center">
  <img src="docs/03.png" width="800" alt="服务管理">
</p>
<p align="center"><em>服务管理 — 启停控制、版本检测、一键升级、npm 源切换、配置备份</em></p>

<p align="center">
  <img src="docs/12.png" width="800" alt="安全设置">
</p>
<p align="center"><em>安全设置 — 访问密码保护与无视风险模式</em></p>

<p align="center">
  <img src="docs/14.png" width="800" alt="扩展工具">
</p>
<p align="center"><em>扩展工具 — cftunnel 内网穿透、ClawApp 移动客户端一键安装</em></p>

<p align="center">
  <img src="docs/15.png" width="800" alt="系统诊断">
</p>
<p align="center"><em>系统诊断 — 全面健康检测、WebSocket 测试、一键修复配对</em></p>

<p align="center">
  <img src="docs/16.png" width="800" alt="关于">
</p>
<p align="center"><em>关于 — 版本信息、社群入口（QQ /  / ）、相关项目链接</em></p>

</details>

## 🤖 AI 助手亮点

AI Agent 内置的 AI 助手不只是聊天机器人——它能**直接操作你的系统**，帮你诊断、修复、甚至提交 PR。

### 四种操作模式

一键切换，界面颜色随模式变化，清晰感知当前权限状态：

| 模式 | 图标 | 工具 | 写文件 | 确认 | 适用场景 |
|------|------|------|--------|------|---------|
| **聊天** | 💬 | ❌ | ❌ | — | 纯问答，不触碰系统 |
| **规划** | 📋 | ✅ | ❌ | ✅ | 读配置/查日志，输出方案不动文件 |
| **执行** | ⚡ | ✅ | ✅ | ✅ | 正常干活，危险操作弹确认 |
| **无限** | ∞ | ✅ | ✅ | ❌ | 全自动，工具调用不弹窗 |

设置中还有**工具开关**（终端/文件），优先级高于模式——关掉终端，即使无限模式也调不了命令。

### 八大工具

| 工具 | 功能 | 示例 |
|------|------|------|
| `ask_user` | 向用户提问（单选/多选/文本） | "选择要提交到哪个仓库？" |
| `get_system_info` | 获取 OS、架构、主目录 | 自动判断该用 PowerShell 还是 Bash |
| `run_command` | 执行 Shell 命令 | 重启 Gateway、查看日志 |
| `read_file` | 读取文件 | 读取 openclaw.json 分析配置 |
| `write_file` | 写入文件 | 修复配置错误、生成脚本 |
| `list_directory` | 浏览目录 | 列出 .openclaw/ 结构 |
| `list_processes` | 查看进程 | 检查 Gateway 是否在运行 |
| `check_port` | 检测端口占用 | 18789 端口被谁占了？ |

### 交互式问答（ask_user）

AI 可以通过 `ask_user` 工具向你提问，支持三种交互方式：

- **单选** — 从多个方案中选一个，还能输入自定义答案
- **多选** — 勾选多项，比如"选择要检查的组件"
- **文本** — 自由输入，比如"描述你遇到的问题"

AI 等你回答后才会继续操作，实现真正的**人机协作**。

### PR 助手 & Bug 报告

发现 Bug？AI 不只是告诉你怎么修——它**直接帮你修**：

1. 🐛 **提交 Bug 报告** — AI 自动收集系统环境、读取错误日志，按标准模板整理成 GitHub Issue，你复制粘贴就能提交
2. 🔀 **PR 助手** — AI 分析 Bug 根因 → 定位代码 → 生成修复方案 → 通过 `run_command` 执行 git 命令完成 Fork/Branch/Commit/Push，**用户只需点确认**

### 内置技能卡片

欢迎页提供一键触发的常用技能：

| 技能 | 功能 |
|------|------|
| 🔧 检查配置 | 读取并分析 openclaw.json |
| 🏥 诊断 Gateway | 检查进程、端口、日志 |
| 📂 浏览目录 | 查看 .openclaw 目录结构 |
| 💻 检查环境 | Node.js、npm 版本检测 |
| 📋 分析日志 | 搜索 ERROR/WARN 关键词 |
| 🔨 一键排障 | 自动检测并修复常见问题 |
| 🐛 提交 Bug | 整理 Issue 提交到 GitHub |
| 🔀 PR 助手 | 定位 Bug 并生成修复 PR |

## 技术架构

| 层级 | 技术 | 说明 |
|------|------|------|
| 前端 | Vanilla JS + Vite | 零框架依赖，轻量快速 |
| 后端 | Rust + Tauri v2 | 原生性能，跨平台打包 |
| 通信 | Tauri IPC + Shell Plugin | 前后端桥接，本地命令执行 |
| 样式 | 纯 CSS（CSS Variables） | 暗色/亮色主题，玻璃拟态风格 |

```
ai-agent/
├── src/                    # 前端源码
│   ├── pages/              # 10 个页面模块
│   ├── components/         # 通用组件（侧边栏、弹窗、Toast）
│   ├── lib/                # 工具库（Tauri API 封装、主题）
│   ├── style/              # 样式文件
│   ├── router.js           # 路由
│   └── main.js             # 入口
├── src-tauri/              # Rust 后端
│   ├── src/                # Tauri 命令与业务逻辑
│   ├── Cargo.toml          # Rust 依赖
│   └── tauri.conf.json     # Tauri 配置
├── public/                 # 静态资源
├── scripts/                # 开发与构建脚本
│   ├── dev.sh              # 开发模式启动
│   └── build.sh            # 编译与打包
├── .github/workflows/      # CI/CD
│   ├── ci.yml              # 持续集成（push/PR 自动检查）
│   └── release.yml         # 发布构建（全平台打包）
├── index.html              # HTML 入口
├── vite.config.js          # Vite 配置
└── package.json            # 前端依赖
```

## 从源码构建

### 前置条件

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) (stable)
- Tauri v2 系统依赖（参考 [Tauri 官方文档](https://v2.tauri.app/start/prerequisites/)）

### 安装与开发

```bash
git clone https://github.com/your-org/ai-agent.git
cd ai-agent
npm install
```

#### macOS / Linux

```bash
# 启动完整 Tauri 桌面应用
./scripts/dev.sh

# 仅启动 Vite 前端（浏览器调试，使用 mock 数据）
./scripts/dev.sh web
```

#### Windows

```powershell
# 启动完整 Tauri 桌面应用
npm run tauri dev

# 仅启动 Vite 前端（浏览器调试，使用 mock 数据）
npm run dev
```

### 构建

#### macOS / Linux

```bash
# 编译 debug 版本
./scripts/build.sh

# 仅检查 Rust 编译（最快，不生成产物）
./scripts/build.sh check

# 编译正式发布版本（含打包）
./scripts/build.sh release
```

#### Windows

```powershell
# 检查 Rust 编译
cd src-tauri && cargo check

# 编译正式发布版本
npm run tauri build

# 指定打包格式（NSIS 安装器）
npm run tauri build -- --bundles nsis
```

产物位于 `src-tauri/target/release/` 目录。

### Web 开发版（无需 Rust/Tauri）

如果你只想开发前端或部署 Web 版，**不需要安装 Rust**：

```bash
# 克隆并安装
git clone https://github.com/your-org/ai-agent.git
cd ai-agent
npm install

# 开发模式（热更新，自带 API mock 后端）
npm run dev
# 浏览器打开 http://localhost:1420

# 构建生产版本
npm run build

# 启动 Web 服务器（Headless，适用于 Linux/ARM/Docker）
npm run serve
# 默认监听 0.0.0.0:1420，支持 --port 和 --host 参数
```

Web 版功能与桌面版一致，后端通过 `scripts/dev-api.js` 调用本机 OpenClaw CLI 实现。

> **ARM/Armbian 用户**：Web 模式天然兼容 ARM64 设备，详见 [Armbian 部署指南](docs/armbian-deploy.md)。

## 快速上手

安装完成后，按以下步骤即可开始使用：

### 1. 初始设置

首次启动 AI Agent 会自动进入**初始设置**页面，引导你完成环境检测：

- ✅ **Node.js** — 自动检测，未安装时提供一键安装
- ✅ **Git** — 自动检测并配置 HTTPS 模式（解决 SSH 不通问题）
- ✅ **OpenClaw** — 一键安装，可选汉化版或原版

> 所有步骤均有绿色勾标记，全部通过后点击「前往模型配置」。

### 2. 配置 AI 模型

进入**模型配置**页面，添加至少一个 AI 服务商：

| 服务商 | 获取 API Key |
|--------|-------------|
| DeepSeek | [platform.deepseek.com](https://platform.deepseek.com/) |
| MiniMax | [platform.minimaxi.com](https://platform.minimaxi.com/) |
| OpenAI | [platform.openai.com](https://platform.openai.com/) |
| 阿里通义 | [dashscope.console.aliyun.com](https://dashscope.console.aliyun.com/) |
| Ollama（本地） | 免费，无需 Key，安装后自动检测 |

填入 `Base URL` 和 `API Key`，点击「测试连接」确认可用，然后保存。

### 3. 启动 Gateway

前往**服务管理**页面，点击「启动」按钮启动 Gateway。状态变为绿色即可。

> Gateway 是 OpenClaw 的核心服务，负责处理 AI 对话请求。

### 4. 开始聊天

前往**实时聊天**页面，选择模型后即可开始对话。支持流式输出、Markdown 渲染、多模态图片识别。

---

## Web 版部署指南

Web 版适用于 Linux 服务器（无桌面环境），通过浏览器远程管理 OpenClaw。

### 环境要求

- **Node.js** >= 18（推荐 22 LTS）
- **Git**（用于 OpenClaw 依赖安装）
- **端口** 1420（AI Agent）+ 18789（Gateway）

### 一键部署

```bash
curl -fsSL https://raw.githubusercontent.com/your-org/ai-agent/main/scripts/linux-deploy.sh | bash
```

部署完成后访问 `http://服务器IP:1420`。

### 安全注意事项

> ⚠️ **公网暴露风险**：Web 版默认监听所有网卡。请务必：

1. **设置访问密码** — 首次登录会提示修改默认密码，或在「安全设置」页面配置
2. **防火墙限制** — 仅开放 1420 端口给可信 IP
3. **Nginx 反向代理 + HTTPS** — 生产环境强烈建议使用 HTTPS

<details>
<summary><strong>Nginx 反向代理配置示例</strong></summary>

```nginx
server {
    listen 443 ssl;
    server_name openclaw.example.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    location / {
        proxy_pass http://127.0.0.1:1420;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # WebSocket 支持（实时聊天需要）
    location /ws {
        proxy_pass http://127.0.0.1:18789;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header Host $host;
    }
}
```

</details>

### API Key 安全

- API Key 存储在服务器的 `~/.openclaw/openclaw.json` 中，**不会**传输到外部
- 建议为 `~/.openclaw/` 目录设置 `chmod 700` 权限
- 多人共用时，每人应使用独立的 OpenClaw 实例

---

## 消息渠道配置

AI Agent 支持将 AI 接入多种即时通讯平台，在「消息渠道」页面统一管理。

### 支持的平台

| 平台 | 类型 | 配置难度 | 说明 |
|------|------|---------|------|
|  / Lark | 企业内部应用 | ⭐⭐ | 支持内置插件和官方插件两种模式 |
|  | 企业内部应用 | ⭐⭐ | Stream 模式，需创建机器人应用 |
| Telegram | Bot | ⭐ | 通过 @BotFather 创建 Bot |
| QQ 机器人 | 官方 Bot | ⭐⭐⭐ | 需在 QQ 开放平台注册 |

### 配置步骤（以为例）

1. 在开放平台创建**企业自建应用**，开启**机器人**能力
2. 获取 `App ID` 和 `App Secret`
3. 在 AI Agent「消息渠道」页面选择，填入凭证
4. 点击「校验」确认连接，然后「保存」
5. Gateway 会自动重载，机器人即刻可用

> 📖 详细教程：[接入指南](docs/dingtalk-integration.md) | [接入指南](docs/dingtalk-integration.md)

### 注意事项

- 消息渠道需要 **Gateway 正在运行**才能接收消息
- 每个平台需要**配对审批**才能连接（在渠道设置中完成）
- /需要在对应平台**发布应用版本**后，机器人才对其他人可见

---

## 常见问题

### macOS 提示"已损坏，无法打开"

没有苹果开发者签名，macOS Gatekeeper 会拦截。终端执行：

```bash
sudo xattr -rd com.apple.quarantine /Applications/AI Agent.app
```

或前往「系统设置 → 隐私与安全性」点击「仍要打开」。

### macOS 检测不到 Node.js

从 Finder/Dock 启动 AI Agent 时，应用的 PATH 环境变量可能不包含 Node.js 安装路径。

**v0.4.1 已修复**：自动补充 `/usr/local/bin`、`/opt/homebrew/bin`、`~/.nvm`、`~/.volta` 等常见路径。

临时解决：从终端启动 AI Agent：

```bash
open /Applications/AI Agent.app
```

### Windows 安装 OpenClaw 报 ENOENT (-4058)

通常是文件权限或 npm 缓存问题：

1. 以管理员身份运行 AI Agent
2. 或打开 PowerShell（管理员）手动安装：
   ```powershell
   npm install -g @your-org/openclaw-zh --registry https://registry.npmmirror.com
   ```
3. 如果仍报错，清理 npm 缓存：`npm cache clean --force`

### Windows 安装报 exit 128 (access rights)

npm 依赖需要 Git。如果已装 Git 但仍报 128，是因为依赖用了 SSH 协议拉代码但你没配 GitHub SSH Key。运行以下命令改用 HTTPS：

```powershell
git config --global url."https://github.com/".insteadOf ssh://git@github.com/
git config --global url."https://github.com/".insteadOf git@github.com:
```

没装 Git 的请先安装 [Git for Windows](https://git-scm.com/download/win)。**v0.4.2+ 已自动配置 HTTPS 模式。**

### Windows 安装报 EPERM (operation not permitted)

文件被其他进程锁定。先关闭 AI Agent 和所有 Node.js 进程，以管理员身份打开 PowerShell 重装：

```powershell
npm cache clean --force
npm install -g @your-org/openclaw-zh --registry https://registry.npmmirror.com
```

### 安装后 Node.js 检测不到（Windows）

安装 Node.js 后需要**重启 AI Agent**，新的 PATH 环境变量才能生效。

如果安装在非默认路径（如 `D:\nodejs`、`F:\AI\Node`），请确认该目录已加入系统 PATH 环境变量。**v0.4.2+ 已自动扫描常见安装路径。**

### Gateway 启动失败

常见原因和解决方案：

| 症状 | 原因 | 解决 |
|------|------|------|
| 端口 18789 被占用 | 另一个 Gateway 进程残留 | 终端执行 `pkill -f openclaw` 后重启 |
| 配置文件损坏 | openclaw.json 格式错误 | 前往「服务管理」→「从备份恢复」 |
| 反复崩溃 | API Key 或模型配置异常 | 用 AI 助手「🔨 一键排障」自动诊断 |
| 提示 "auth mode" 错误 | 认证配置不兼容 | 在「安全设置」重置 Gateway 认证 |

如果仍无法解决，查看「日志查看」页面的 Gateway 日志获取详细错误信息。

### 模型连接超时 / 测试失败

1. **检查 API Key** — 确认 Key 未过期、余额充足
2. **检查 Base URL** — 不同服务商 URL 格式不同，注意结尾不要多 `/v1`（AI Agent 会自动处理）
3. **网络问题** — 国内访问 OpenAI 需要代理；DeepSeek / 阿里通义 / Ollama 国内直连
4. **Ollama 特殊处理** — URL 填 `http://127.0.0.1:11434`（不加 `/v1`，AI Agent 自动补全）

### WebSocket 断连 / 聊天无响应

1. 确认 Gateway 正在运行（顶部状态栏显示绿色）
2. 反向代理需要配置 WebSocket 支持（参见上方 Nginx 配置）
3. 如果使用 HTTPS，WebSocket 需要 `wss://` 协议（v0.7.3+ 已自动适配）
4. 清除浏览器缓存后刷新页面

### Web 版报"未实现的命令"

升级到 **v0.8.5+**。旧版本的 Web 后端缺少部分命令实现，v0.8.5 已补全所有 handler。

```bash
cd /opt/ai-agent  # 替换为实际安装目录
git pull origin main
npm install
npm run build
sudo systemctl restart ai-agent  # 或 pm2 restart ai-agent
```

### 消息渠道保存后不生效

1. 确认 Gateway 正在运行
2. /：需要在对应开放平台**发布应用版本**
3. ：私聊测试需在「工作台」搜索机器人名称；群聊需通过「群设置 → 智能群助手」添加
4. ：消息接收模式必须选择 **Stream 模式**

---
