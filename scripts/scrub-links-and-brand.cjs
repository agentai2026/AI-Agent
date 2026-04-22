/**
 * Scrub legacy brand + external links in user-facing text assets.
 *
 * Rules:
 * - Replace "AIAgent" -> "AIAgent"
 * - Replace legacy repo url "https://github.com/agentai2026/AI-Agent" -> TARGET_URL
 * - Replace other external http/https links (except localhost/127.0.0.1) -> TARGET_URL
 *
 * Scope: docs/, README*.md, *.md, docs/index.html, src/locales/*.json, src/locales/modules/*.js
 *
 * NOTE: This is opinionated and may remove useful reference links.
 */
const fs = require('fs')
const path = require('path')

const ROOT = path.join(__dirname, '..')
const TARGET_URL = 'https://github.com/agentai2026/AI-Agent'

const TEXT_EXT = new Set(['.md', '.html', '.json', '.js', '.cjs', '.yml', '.yaml', '.rs', '.ps1', '.sh', '.toml'])
const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist'])

function isLocalUrl(u) {
  return /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(?::\d+)?(\/|$)/i.test(u)
}

function walk(dirAbs, out = []) {
  for (const ent of fs.readdirSync(dirAbs, { withFileTypes: true })) {
    const p = path.join(dirAbs, ent.name)
    if (ent.isDirectory()) {
      if (SKIP_DIRS.has(ent.name)) continue
      walk(p, out)
      continue
    }
    out.push(p)
  }
  return out
}

function scrubContent(content, ext) {
  let s = content
  // brand
  s = s.replace(/AIAgent/g, 'AIAgent')
  // legacy repo url
  s = s.replace(/https:\/\/github\.com\/qingchencloud\/clawpanel/gi, TARGET_URL)
  // Only scrub "other external links" in docs-like assets.
  // Never rewrite arbitrary API endpoints in runnable code.
  const allowExternalScrub = ['.md', '.html', '.json', '.yml', '.yaml', '.toml'].includes(ext)
  if (allowExternalScrub) {
    s = s.replace(/https?:\/\/[^\s"'<>)]*/gi, (m) => {
      if (isLocalUrl(m)) return m
      return TARGET_URL
    })
  }
  return s
}

const files = walk(ROOT)
let changed = 0
for (const abs of files) {
  const rel = path.relative(ROOT, abs)
  const ext = path.extname(abs).toLowerCase()
  if (!TEXT_EXT.has(ext) && !/^README(\..+)?\.md$/i.test(path.basename(rel))) continue
  let raw
  try {
    raw = fs.readFileSync(abs, 'utf8')
  } catch {
    continue
  }
  const next = scrubContent(raw, ext)
  if (next !== raw) {
    fs.writeFileSync(abs, next, 'utf8')
    changed++
  }
}

console.log(`[scrub] Updated ${changed} files. Target URL=${TARGET_URL}`)

