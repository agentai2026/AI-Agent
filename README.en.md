<p align="center">
  <img src="public/images/logo-brand.png" width="360" alt="AIAgent">
</p>

<p align="center">
  OpenClaw & Hermes Agent Management Panel with Built-in AI Assistant — Multi-Engine AI Framework Management
</p>

<p align="center">
  <a href="README.md">🇨🇳 中文</a> | <strong>🇺🇸 English</strong> | <a href="README.zh-TW.md">🇹🇼 繁體中文</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.vi.md">🇻🇳 Tiếng Việt</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.pt.md">🇧🇷 Português</a> | <a href="README.ru.md">🇷🇺 Русский</a> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.de.md">🇩🇪 Deutsch</a>
</p>

<p align="center">
  <a href="https://github.com/agentai2026/AI-Agent">
    <img src="https://github.com/agentai2026/AI-Agent" alt="Release">
  </a>
  <a href="https://github.com/agentai2026/AI-Agent">
    <img src="https://github.com/agentai2026/AI-Agent" alt="Downloads">
  </a>
  <a href="https://github.com/agentai2026/AI-Agent">
    <img src="https://github.com/agentai2026/AI-Agent" alt="License">
  </a>
  <a href="https://github.com/agentai2026/AI-Agent">
    <img src="https://github.com/agentai2026/AI-Agent" alt="CI">
  </a>
</p>

---

<p align="center">
  <img src="docs/feature-showcase.gif" width="800" alt="AIAgent Feature Showcase">
</p>

AIAgent is a visual management panel supporting multiple AI Agent frameworks, currently with [OpenClaw](https://github.com/agentai2026/AI-Agent) and [Hermes Agent](https://github.com/agentai2026/AI-Agent) dual-engine support. It features a **built-in intelligent AI assistant** that helps you install, auto-diagnose configurations, troubleshoot issues, and fix errors. 8 tools + 4 modes + interactive Q&A — easy to manage for beginners and experts alike.

> 🌐 **Website**: [claw.qt.cool](https://github.com/agentai2026/AI-Agent) | 📦 **Download**: [GitHub Releases](https://github.com/agentai2026/AI-Agent)

### 🎁 QingchenCloud AI API

> Internal technical testing platform, open for selected users. Sign in daily to earn credits.

<p align="center">
  <a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent QingchenCloud AI-gpt.qt.cool-6366f1?style=for-the-badge" alt="QingchenCloud AI"></a>
</p>

- **Daily Sign-in Credits** — Sign in daily + invite friends to earn test credits
- **OpenAI-Compatible API** — Seamless integration with OpenClaw, plug and play
- **Resource Policy** — Rate limiting + request caps, may queue during peak hours
- **Model Availability** — Models/APIs subject to actual page display, may rotate versions

> ⚠️ **Compliance**: This platform is for technical testing only. Illegal use or circumventing security mechanisms is prohibited. Keep your API Key secure. Rules subject to latest platform policies.

### 🔥 Dev Board / Embedded Device Support

AIAgent provides a **pure Web deployment mode** (zero GUI dependency), natively compatible with ARM64 boards:

- **Orange Pi / Raspberry Pi / RK3588** — `npm run serve` to run
- **Docker ARM64** — `docker run ghcr.io/qingchencloud/openclaw:latest`
- **Armbian / Debian / Ubuntu Server** — Auto-detect architecture
- No Rust / Tauri / GUI needed — **only Node.js 18+ required**

> 📖 See [Armbian Deployment Guide](docs/armbian-deploy.md) | [Web Dev Mode](#web-version-no-rusttauri-required)

## Community

A community of passionate AI Agent developers and enthusiasts — join us!

<p align="center">
  <a href="https://github.com/agentai2026/AI-Agent"><strong>Discord</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/agentai2026/AI-Agent"><strong>Discussions</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/agentai2026/AI-Agent"><strong>Report Issue</strong></a>
</p>

## Features

- **🤖 AI Assistant (New)** — Built-in AI assistant, 4 modes + 8 tools + interactive Q&A. See [AI Assistant Highlights](#-ai-assistant-highlights)
- **🧩 Multi-Engine Architecture** — Supports both OpenClaw and Hermes Agent dual engines, freely switchable, independently managed
- **🤖 Hermes Agent Chat** — Built-in Hermes Agent chat interface with tool call visualization, file system access toggle, SSE streaming output
- **🖼️ Image Recognition** — Paste screenshots or drag images, AI auto-analyzes, multimodal conversations
- **Dashboard** — System overview, real-time service monitoring, quick actions
- **Service Management** — OpenClaw / Hermes Gateway start/stop, version detection & one-click upgrade, config backup & restore
- **Model Configuration** — Multi-provider management, model CRUD, batch connectivity tests, latency detection, drag-to-reorder, auto-save + undo
- **Gateway Configuration** — Port, access scope (localhost/LAN), auth Token, Tailscale networking
- **Messaging Channels** — Unified Telegram, Discord, Feishu, DingTalk, QQ management, multi-Agent binding per platform
- **Communication & Automation** — Message settings, broadcast strategies, slash commands, Webhooks, execution approval
- **Usage Analytics** — Token usage, API costs, model/provider/tool rankings, daily usage charts
- **Agent Management** — Agent CRUD, identity editing, model config, workspace management
- **Chat** — Streaming, Markdown rendering, session management, /fast /think /verbose /reasoning commands
- **Cron Jobs** — Cron-based scheduled execution, multi-channel delivery
- **Log Viewer** — Multi-source real-time logs with keyword search
- **Memory Management** — Memory file view/edit, categorized management, ZIP export, Agent switching
- **QingchenCloud AI API** — Internal testing platform, OpenAI-compatible, daily sign-in credits
- **Extensions** — cftunnel tunnel management, ClawApp status monitoring
- **About** — Version info, community links, related projects, one-click upgrade

## Download & Install

Go to [Releases](https://github.com/agentai2026/AI-Agent) for the latest version:

### macOS

| Chip | Installer | Notes |
|------|-----------|-------|
| Apple Silicon (M1/M2/M3/M4) | `AIAgent_x.x.x_aarch64.dmg` | Macs from late 2020+ |
| Intel | `AIAgent_x.x.x_x64.dmg` | Macs 2020 and earlier |

> **⚠️ "Damaged" or "unverified developer"?** App is unsigned. Run: `sudo xattr -rd com.apple.quarantine /Applications/AIAgent.app`

### Windows

| Format | Installer | Notes |
|--------|-----------|-------|
| EXE | `AIAgent_x.x.x_x64-setup.exe` | Recommended |
| MSI | `AIAgent_x.x.x_x64_en-US.msi` | Enterprise / silent install |

### Linux

| Format | Installer | Notes |
|--------|-----------|-------|
| AppImage | `AIAgent_x.x.x_amd64.AppImage` | No install, `chmod +x` and run |
| DEB | `AIAgent_x.x.x_amd64.deb` | `sudo dpkg -i *.deb` |
| RPM | `AIAgent-x.x.x-1.x86_64.rpm` | `sudo rpm -i *.rpm` |

### Linux Server (Web Version)

```bash
curl -fsSL https://github.com/agentai2026/AI-Agent | bash
```

Visit `https://github.com/agentai2026/AI-Agent after deployment. 📖 [Linux Deployment Guide](docs/linux-deploy.md)

### Docker

```bash
docker run -d --name clawpanel --restart unless-stopped \
  -p 1420:1420 -v clawpanel-data:/root/.openclaw \
  node:22-slim \
  sh -c "apt-get update && apt-get install -y git && \
    npm install -g @qingchencloud/openclaw-zh --registry https://github.com/agentai2026/AI-Agent && \
    git clone https://github.com/agentai2026/AI-Agent /app && \
    cd /app && npm install && npm run build && npm run serve"
```

📖 [Docker Deployment Guide](docs/docker-deploy.md)

## Quick Start

1. **Initial Setup** — First launch auto-detects Node.js, Git, OpenClaw. One-click install if missing.
2. **Configure Models** — Add AI providers (DeepSeek, MiniMax, OpenAI, Ollama, etc.) with API keys. Test connectivity.
3. **Start Gateway** — Go to Service Management, click Start. Green status = ready.
4. **Start Chatting** — Go to Live Chat, select model, start conversation with streaming & Markdown.

## 🤖 AI Assistant Highlights

Built-in AI assistant that can **directly operate your system** — diagnose, fix, even submit PRs.

### Four Modes

| Mode | Icon | Tools | Write | Confirm | Use Case |
|------|------|-------|-------|---------|----------|
| **Chat** | 💬 | ❌ | ❌ | — | Pure Q&A |
| **Plan** | 📋 | ✅ | ❌ | ✅ | Read configs/logs, output plans |
| **Execute** | ⚡ | ✅ | ✅ | ✅ | Normal work, dangerous ops need confirm |
| **Unlimited** | ∞ | ✅ | ✅ | ❌ | Full auto, no prompts |

### Eight Tools

| Tool | Function |
|------|----------|
| `ask_user` | Ask user questions (single/multi/text) |
| `get_system_info` | Get OS, architecture, home directory |
| `run_command` | Execute shell commands |
| `read_file` / `write_file` | Read/write files |
| `list_directory` | Browse directories |
| `list_processes` | View processes |
| `check_port` | Check port usage |

## Tech Architecture

| Layer | Technology | Description |
|-------|-----------|-------------|
| Frontend | Vanilla JS + Vite | Zero framework, lightweight |
| Backend | Rust + Tauri v2 | Native performance, cross-platform |
| Communication | Tauri IPC + Shell Plugin | Frontend-backend bridge |
| Styling | Pure CSS (CSS Variables) | Dark/Light themes, glassmorphism |

## Build from Source

```bash
git clone https://github.com/agentai2026/AI-Agent
cd clawpanel && npm install

# Desktop (requires Rust + Tauri v2)
npm run tauri dev        # Development
npm run tauri build      # Production

# Web only (no Rust needed)
npm run dev              # Dev with hot reload
npm run build && npm run serve  # Production
```

## Related Projects

| Project | Description |
|---------|-------------|
| [OpenClaw](https://github.com/agentai2026/AI-Agent) | AI Agent Framework |
| [ClawApp](https://github.com/agentai2026/AI-Agent) | Cross-platform mobile chat client |
| [cftunnel](https://github.com/agentai2026/AI-Agent) | Cloudflare Tunnel tool |

## Contributing

Issues and Pull Requests are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## Acknowledgements

AIAgent keeps growing because of every contributor in the community. Thank you for helping make the project better.

### Code Contributors

Thanks to these developers for submitting Pull Requests and contributing directly to the codebase:

<table>
  <tr>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>liucong2013</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#88</a></td>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>axdlee</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#58</a></td>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>ATGCS</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#107</a></td>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>livisun</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#106</a></td>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>kiss-kedaya</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#101</a> <a href="https://github.com/agentai2026/AI-Agent">#94</a></td>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>wzh4869</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#82</a></td>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>0xsline</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#15</a></td>
    <td align="center"><a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="60" height="60"><br><sub><b>jonntd</b></sub></a><br><a href="https://github.com/agentai2026/AI-Agent">#18</a></td>
  </tr>
</table>

### Community Reporters

Thanks to community members who opened issues, reported bugs, and suggested features:

<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="asfork"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="p1ayer222"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="ntescn"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="song860"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="gtgc2005"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="Eternity714"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="flyingnight"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="genan1989"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="alexluoli"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="iethancode"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="glive1991-bit"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="hYRamos"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="htone8"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="evanervx"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="qjman524"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="yahwist00"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="catfishlty"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="ufoleon"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="fengzhao"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="nicoxia"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="friendfish"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="pdsy520"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="CaoJingBiao"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="LwdAmazing"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="joeshen2021"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="Qentin39"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="wzgrx"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="aixinjie"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="wangziqi7"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="kizuzz"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="lizheng31"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="Yafeiml"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="ethanbase"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="BBcactus"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="AGLcaicai"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="zhugeafu"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="sc-yx"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="themeke"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="erlangzhang"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="YamanZzz"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="huanghun5172"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="kongjian19930520"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="XIAzhenglin"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="dacj4n"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="lzzandsx"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="qiangua5210"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="yzswk"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="nasvip"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="yyy22335"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="yuanjie408"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="qingahan"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="mentho7"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="AspirantH"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="skkjkk"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="penghaiqiu1988"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="cfx2020"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="birdxs"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="szuforti"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="baiyucraft"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="arnzh"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="xyiqq"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="tonyzhangbo78"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="try-to"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="irunmyway"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="Oliveelick"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="56025192"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="aliceQWAS"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="qingdeng888"></a>
<a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent" width="32" height="32" title="18574707971"></a>

> If we missed your contribution, please [open an issue](https://github.com/agentai2026/AI-Agent) and we will add it promptly.

## Sponsor

If you find this project useful, consider supporting us via USDT (BNB Smart Chain):

<img src="public/images/bnbqr.jpg" alt="Sponsor QR" width="180">

```
0xbdd7ebdf2b30d873e556799711021c6671ffe88f
```

## Contact

- **Email**: [support@qctx.net](mailto:support@qctx.net)
- **Website**: [qingchencloud.com](https://github.com/agentai2026/AI-Agent)
- **Product**: [claw.qt.cool](https://github.com/agentai2026/AI-Agent)

## License

This project is licensed under [AGPL-3.0](LICENSE). For commercial/proprietary use without open-source requirements, contact us for a commercial license.

© 2026 QingchenCloud (武汉晴辰天下网络科技有限公司) | [claw.qt.cool](https://github.com/agentai2026/AI-Agent)
