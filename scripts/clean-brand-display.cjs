/**
 * One-off: replace legacy brand display strings in locales/docs/kb (not code identifiers).
 * Run: node scripts/clean-brand-display.cjs
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const MODIFIED = []

function read(p) {
  return fs.readFileSync(p, 'utf8')
}
function write(p, s) {
  fs.writeFileSync(p, s, 'utf8')
}

function processFile(rel) {
  const p = path.join(ROOT, rel)
  if (!fs.existsSync(p)) return
  let s = read(p)
  const orig = s

  const seq = [
    [/武汉晴辰天下网络科技有限公司/g, 'AI Agent面板'],
    [/武漢晴辰天下網路科技有限公司/g, 'AI Agent面板'],
    [/Wuhan Qingchen Tianxia Network Technology Co\., Ltd\./g, 'AI Agent Panel'],
    [/晴辰云/g, '项目'],
    [/晴辰雲/g, '專案'],
    [/晴辰助手/g, 'AI 助手'],
    [/qingchencloud/gi, 'agentai2026'],
    [/ClawPanel/g, 'AI Agent面板'],
    [/OpenClaw/g, 'AI Agent'],
  ]
  for (const [re, rep] of seq) {
    s = s.replace(re, rep)
  }

  // Restore technical / upstream identifiers broken by OpenClaw -> AI Agent
  s = s.replace(/AI Agent-weixin/g, 'openclaw-weixin')
  s = s.replace(/qqbot\/AI Agent\//g, 'qqbot/openclaw/')
  s = s.replace(/AI Agent\.json/g, 'openclaw.json')
  s = s.replace(/~\/\.AI Agent/g, '~/.openclaw')
  s = s.replace(/\\.AI Agent/g, '.openclaw')
  s = s.replace(/\/\.AI Agent\//g, '/.openclaw/')
  s = s.replace(/openclaw\.cmd/gi, m => m) // no-op keep
  // npm global command name in docs
  s = s.replace(/\bAI Agent doctor\b/g, 'openclaw doctor')
  s = s.replace(/\bAI Agent pairing\b/g, 'openclaw pairing')
  s = s.replace(/执行 AI Agent doctor/g, '执行 openclaw doctor')
  s = s.replace(/執行 AI Agent doctor/g, '執行 openclaw doctor')
  s = s.replace(/ghcr\.io\/agentai2026\/openclaw/gi, 'ghcr.io/openclaw/openclaw')
  s = s.replace(/github\.com\/agentai2026\/clawpanel/gi, 'github.com/agentai2026/AI-Agent')
  s = s.replace(/raw\.githubusercontent\.com\/agentai2026\/clawpanel/gi, 'raw.githubusercontent.com/agentai2026/AI-Agent')

  if (s !== orig) {
    write(p, s)
    MODIFIED.push(rel)
  }
}

function walkDir(dirRel, exts) {
  const full = path.join(ROOT, dirRel)
  if (!fs.existsSync(full)) return
  for (const name of fs.readdirSync(full)) {
    const rel = path.join(dirRel, name)
    const fp = path.join(ROOT, rel)
    const st = fs.statSync(fp)
    if (st.isDirectory()) {
      if (name === 'node_modules' || name === 'dist' || name === '.git') continue
      walkDir(rel, exts)
    } else if (exts.some((e) => name.endsWith(e))) {
      processFile(rel.replace(/\\/g, '/'))
    }
  }
}

const singleFiles = [
  'src/lib/openclaw-kb.js',
  'src/main.js',
  'src/pages/setup.js',
  'src/pages/about.js',
  'src/pages/website.js',
  'src/components/engagement.js',
  'src/engines/hermes/pages/dashboard.js',
  'index.html',
]

walkDir('src/locales/modules', ['.js'])
for (const f of fs.readdirSync(path.join(ROOT, 'src/locales'))) {
  if (f.endsWith('.json')) processFile(`src/locales/${f}`)
}
walkDir('docs', ['.md', '.html', '.json'])
for (const f of singleFiles) processFile(f)

console.log('Modified', MODIFIED.length, 'files')
for (const m of MODIFIED.sort()) console.log(m)
