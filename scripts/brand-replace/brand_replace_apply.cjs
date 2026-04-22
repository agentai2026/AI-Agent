/* eslint-disable no-console */
const fs = require('node:fs')
const path = require('node:path')

const ROOT = process.cwd()

const REPLACEMENTS = [
  { from: 'AI Agent面板', to: 'AI Agent面板' },
  { from: 'AI Agent可视化面板系统', to: 'AI Agent可视化面板系统' },
  { from: 'AI Agent面板助手', to: 'AI Agent面板助手' },
  { from: 'AI Agent面板助手', to: 'AI Agent面板助手' },
  { from: 'http://localhost:3456', to: 'http://localhost:3456' },
  { from: 'github.com/AgentAI2026/AI-Agent', to: 'github.com/AgentAI2026/AI-Agent' },
  { from: 'QQ: 255258448', to: 'QQ: 255258448' },
  { from: 'AI Agent', to: 'AI Agent' },
  { from: 'AgentAI2026', to: 'AgentAI2026' },
]

const DOC_EXTS = new Set(['.md', '.markdown', '.txt'])
const HTML_EXTS = new Set(['.html', '.htm'])
const JSON_EXTS = new Set(['.json'])

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', 'target', '.next', '.cache'])

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walk(full, out)
    } else if (e.isFile()) {
      out.push(full)
    }
  }
  return out
}

function isJsonLocaleFile(rel) {
  const r = rel.replaceAll('\\', '/')
  return r.startsWith('src/locales/')
    || r.startsWith('scripts/translations/')
    || r === 'docs/update/latest.json'
}

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function applyCaseInsensitiveReplace(text, from, to) {
  const re = new RegExp(escapeRegExp(from), 'ig')
  const matches = text.match(re)
  if (!matches) return { text, count: 0 }
  return { text: text.replace(re, to), count: matches.length }
}

function deepReplaceJson(value, stats) {
  if (typeof value === 'string') {
    let s = value
    for (const r of REPLACEMENTS) {
      const res = applyCaseInsensitiveReplace(s, r.from, r.to)
      if (res.count) {
        stats.count += res.count
        s = res.text
      }
    }
    return s
  }
  if (Array.isArray(value)) return value.map(v => deepReplaceJson(v, stats))
  if (value && typeof value === 'object') {
    // Do not change keys: only values
    const out = {}
    for (const k of Object.keys(value)) out[k] = deepReplaceJson(value[k], stats)
    return out
  }
  return value
}

function applyToDocLike(filePath, original) {
  let text = original
  let count = 0
  for (const r of REPLACEMENTS) {
    const res = applyCaseInsensitiveReplace(text, r.from, r.to)
    text = res.text
    count += res.count
  }
  return { text, count }
}

function applyToJson(filePath, original) {
  let parsed
  try {
    parsed = JSON.parse(original)
  } catch {
    return { text: original, count: 0, skipped: true }
  }
  const stats = { count: 0 }
  const out = deepReplaceJson(parsed, stats)
  const text = JSON.stringify(out, null, 2) + (original.endsWith('\n') ? '\n' : '')
  return { text, count: stats.count }
}

function main() {
  const summary = {} // rel -> {count, mode}

  const allFiles = walk(ROOT)
  for (const filePath of allFiles) {
    const rel = path.relative(ROOT, filePath).replaceAll('\\', '/')
    const ext = path.extname(filePath).toLowerCase()
    if (!(DOC_EXTS.has(ext) || HTML_EXTS.has(ext) || (JSON_EXTS.has(ext) && isJsonLocaleFile(rel)))) continue
    const original = fs.readFileSync(filePath, 'utf8')

    let result = { text: original, count: 0 }
    let mode = ''

    if (DOC_EXTS.has(ext) || HTML_EXTS.has(ext)) {
      mode = 'DOC_FULL'
      result = applyToDocLike(filePath, original)
    } else if (JSON_EXTS.has(ext) && isJsonLocaleFile(rel)) {
      mode = 'JSON_VALUES'
      result = applyToJson(filePath, original)
      if (result.skipped) continue
    }

    if (result.count && result.text !== original) {
      fs.writeFileSync(filePath, result.text, 'utf8')
      summary[rel] = { count: result.count, mode }
    }
  }

  const outPath = path.join(ROOT, 'brand-replace-summary.json')
  fs.writeFileSync(outPath, JSON.stringify({ generatedAt: new Date().toISOString(), summary }, null, 2) + '\n', 'utf8')
  console.log(`Done. Updated ${Object.keys(summary).length} files. Wrote brand-replace-summary.json`)
}

main()

