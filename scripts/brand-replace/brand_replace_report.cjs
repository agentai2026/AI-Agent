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
  { from: 'AgentAI2026.com', to: 'github.com/AgentAI2026/AI-Agent' },
  { from: 'QQ: 255258448', to: 'QQ: 255258448' },
  { from: 'AI Agent', to: 'AI Agent' },
  { from: 'AgentAI2026', to: 'AgentAI2026' },
]

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', 'target', '.next', '.cache'])
const TEXT_EXTS = new Set([
  '.md', '.markdown', '.txt',
  '.html', '.htm',
  '.js', '.mjs', '.cjs', '.ts', '.tsx',
  '.css',
  '.json',
  '.yml', '.yaml',
  '.toml',
  '.rs',
  '.sh', '.ps1',
])

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    if (e.name === '.git') continue
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walk(full, out)
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase()
      if (TEXT_EXTS.has(ext)) out.push(full)
    }
  }
  return out
}

function readText(filePath) {
  const buf = fs.readFileSync(filePath)
  // Simple binary guard
  for (let i = 0; i < Math.min(buf.length, 4096); i++) {
    if (buf[i] === 0) return null
  }
  try {
    return buf.toString('utf8')
  } catch {
    try { return buf.toString('latin1') } catch { return null }
  }
}

function classifyLine({ ext, line, matchFrom }) {
  const lower = line.toLowerCase()
  const fromLower = matchFrom.toLowerCase()

  // JSON key heuristic: "KEY": ...
  if (ext === '.json') {
    const keyMatch = line.match(/^\s*"([^"]+)"\s*:/)
    if (keyMatch && keyMatch[1] && keyMatch[1].toLowerCase().includes(fromLower)) {
      return 'SKIP_JSON_KEY'
    }
    return 'LIKELY_UI_TEXT'
  }

  // Markdown / docs: treat all as display text
  if (ext === '.md' || ext === '.markdown' || ext === '.txt') return 'DOC_TEXT'
  if (ext === '.html' || ext === '.htm') return 'DOC_HTML'

  // Code: try to detect string/comment occurrences; otherwise manual review.
  const hasLineComment = ext === '.rs' ? lower.includes('//') : lower.includes('//')
  const hasBlockComment = lower.includes('/*') || lower.includes('*/') || (ext === '.rs' && (lower.includes('/*') || lower.includes('*/')))
  const hasQuote = line.includes('"') || line.includes("'") || line.includes('`')

  if (hasLineComment || hasBlockComment) return 'LIKELY_COMMENT'
  if (hasQuote) return 'LIKELY_STRING'
  return 'MANUAL_REVIEW'
}

function buildReport() {
  const files = walk(ROOT)
  const report = []
  const index = {
    replacements: REPLACEMENTS,
    generatedAt: new Date().toISOString(),
    root: ROOT,
    files: {},
  }

  for (const file of files) {
    const rel = path.relative(ROOT, file).replaceAll('\\', '/')
    const ext = path.extname(file).toLowerCase()
    const text = readText(file)
    if (text == null) continue

    const lines = text.split(/\r?\n/)
    for (const r of REPLACEMENTS) {
      const re = new RegExp(r.from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'ig')
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i]
        if (!re.test(line)) continue
        // reset lastIndex because we reuse re
        re.lastIndex = 0
        const kind = classifyLine({ ext, line, matchFrom: r.from })

        index.files[rel] ||= []
        index.files[rel].push({
          ruleFrom: r.from,
          ruleTo: r.to,
          line: i + 1,
          kind,
          excerpt: line.length > 260 ? line.slice(0, 260) + '…' : line,
        })
      }
    }
  }

  report.push('# Brand replace plan')
  report.push('')
  report.push('This file is generated. It lists candidate display-text replacements with line numbers.')
  report.push('')
  report.push('## Rules')
  for (const r of REPLACEMENTS) report.push(`- \`${r.from}\` → \`${r.to}\` (case-insensitive)`)
  report.push('')
  report.push('## Candidates by file')

  const filesSorted = Object.keys(index.files).sort((a, b) => a.localeCompare(b))
  for (const f of filesSorted) {
    const items = index.files[f].sort((a, b) => a.line - b.line || a.ruleFrom.localeCompare(b.ruleFrom))
    report.push('')
    report.push(`### ${f}`)
    const byKind = items.reduce((acc, it) => ((acc[it.kind] = (acc[it.kind] || 0) + 1), acc), {})
    report.push(`- total: ${items.length}`)
    report.push(`- kinds: ${Object.entries(byKind).map(([k, v]) => `${k}=${v}`).join(', ')}`)
    for (const it of items) {
      report.push(`- L${it.line} [${it.kind}] ${it.ruleFrom} → ${it.ruleTo}`)
      report.push(`  - ${it.excerpt}`)
    }
  }

  return { md: report.join('\n'), index }
}

const { md, index } = buildReport()
fs.mkdirSync(path.join(ROOT, 'scripts', 'brand-replace'), { recursive: true })
fs.writeFileSync(path.join(ROOT, 'brand-replace-plan.md'), md, 'utf8')
fs.writeFileSync(path.join(ROOT, 'brand-replace-plan.json'), JSON.stringify(index, null, 2), 'utf8')
console.log('Wrote brand-replace-plan.md and brand-replace-plan.json')

