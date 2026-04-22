/**
 * Remove third-party doc links from channel guides (except QQ + Feishu).
 *
 * - Delete <a href="...">...</a> for DingTalk/Telegram/Discord/Slack/Teams/Signal guide entries
 * - Restore QQ + Feishu guide links to official domains
 * - Fix previously-scrubbed broken href strings in locale JSONs
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const LOCALES_DIR = path.join(ROOT, 'src', 'locales')

const TARGETS = {
  // keep links (allowed)
  qqbotGuide1: '前往 <a href="https://q.qq.com" target="_blank" rel="noopener">QQ 开放平台</a> 创建机器人',
  qqbotGuideFooter:
    '<div style="margin-top:8px;font-size:var(--font-size-xs);color:var(--text-tertiary)">遇到问题？参考 <a href="https://q.qq.com/qqbot/openclaw/faq.html" target="_blank" rel="noopener">AI Agent × QQ 常见问题</a></div>',
  feishuGuide1: '前往 <a href="https://open.feishu.cn/app" target="_blank" rel="noopener">飞书开放平台</a> 创建企业自建应用',

  // remove links (disallowed)
  dingtalkGuide1: '前往钉钉开放平台，创建「企业内部应用」',
  telegramGuide1: '在 Telegram 中搜索 @BotFather 并发送 <code>/newbot</code>',
  discordGuide1: '前往 Discord Developer Portal 创建 Application',
  slackGuide1: '前往 Slack API 创建 App（推荐 From a manifest）',
  msteamsGuide1: '在 Azure Portal 注册 Bot Channel Registration',
  signalGuide1: '安装 signal-cli 并注册/链接账号',

  // also appears in diag hints in some locale jsons
  qqDiagHint:
    '检查<strong>已保存到配置文件</strong>的凭证、本机 Gateway 端口、<code>/__api/health</code>、QQ 插件与 chatCompletions。QQ 提示「灵魂不在线」时优先看此处，并参考 <a href="https://q.qq.com/qqbot/openclaw/faq.html" target="_blank" rel="noopener">AI Agent × QQ 常见问题</a>。',
  qqVerifyNote:
    '此项只验证 AppID/Secret 能否向腾讯换 token。<strong>不能</strong>代表 QQ 里机器人已在线；若提示「灵魂不在线」，请使用下方 <strong>完整联通诊断</strong> 并对照 <a href="https://q.qq.com/qqbot/openclaw/faq.html" target="_blank" rel="noopener">QQ AI Agent 常见问题</a>。',
}

function listLocaleFiles() {
  return fs
    .readdirSync(LOCALES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => path.join(LOCALES_DIR, f))
}

function updateLocaleFile(filePath) {
  const raw0 = fs.readFileSync(filePath, 'utf8')
  // Repair previously-scrubbed broken href strings like:
  // href=\"https://github.com/agentai2026/AI-Agent" target=...
  //                                ^ missing escaped quote before the space
  const raw = raw0
    .replaceAll(
      'href=\\"https://github.com/agentai2026/AI-Agent" target=\\\"_blank\\\"',
      'href=\\"https://github.com/agentai2026/AI-Agent\\\" target=\\"_blank\\"'
    )
    .replaceAll(
      'href=\\"https://github.com/agentai2026/AI-Agent" target=\\"_blank\\"',
      'href=\\"https://github.com/agentai2026/AI-Agent\\\" target=\\"_blank\\"'
    )
  if (raw !== raw0) fs.writeFileSync(filePath, raw, 'utf8')

  const json = JSON.parse(raw)
  if (!json.channels) return false

  let changed = false
  for (const [k, v] of Object.entries(TARGETS)) {
    if (k in json.channels) {
      if (json.channels[k] !== v) {
        json.channels[k] = v
        changed = true
      }
    }
  }
  if (changed) fs.writeFileSync(filePath, JSON.stringify(json, null, 2) + '\n', 'utf8')
  return changed
}

let n = 0
for (const f of listLocaleFiles()) {
  if (updateLocaleFile(f)) n++
}
console.log(`[fix-channel-guide-links] updated ${n} locale files`)

