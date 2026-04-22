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

const SKIP_DIRS = new Set(['.git', 'node_modules', 'dist', 'build', 'target', '.next', '.cache', 'AI Agent面板'])
const ALLOW_EXTS = new Set(['.js', '.mjs', '.cjs', '.ts', '.tsx', '.rs', '.yml', '.yaml'])

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function applyCaseInsensitiveReplace(text, from, to) {
  const re = new RegExp(escapeRegExp(from), 'ig')
  const matches = text.match(re)
  if (!matches) return { text, count: 0 }
  return { text: text.replace(re, to), count: matches.length }
}

function replaceInSegment(seg) {
  let out = seg
  let count = 0
  for (const r of REPLACEMENTS) {
    const res = applyCaseInsensitiveReplace(out, r.from, r.to)
    out = res.text
    count += res.count
  }
  return { out, count }
}

function walk(dir, out = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true })
  for (const e of entries) {
    const full = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (SKIP_DIRS.has(e.name)) continue
      walk(full, out)
    } else if (e.isFile()) {
      const ext = path.extname(e.name).toLowerCase()
      if (ALLOW_EXTS.has(ext)) out.push(full)
    }
  }
  return out
}

// Very conservative lexer:
// - Only rewrites inside comments and string literals.
// - Does NOT attempt to evaluate template expressions; only rewrites raw text parts.
function rewriteJsLike(text) {
  let i = 0
  let out = ''
  let count = 0

  const len = text.length
  const push = (s) => { out += s }

  while (i < len) {
    const ch = text[i]

    // Line comment //
    if (ch === '/' && text[i + 1] === '/') {
      const start = i
      i += 2
      while (i < len && text[i] !== '\n') i++
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    // Block comment /* */
    if (ch === '/' && text[i + 1] === '*') {
      const start = i
      i += 2
      while (i < len && !(text[i] === '*' && text[i + 1] === '/')) i++
      i = Math.min(len, i + 2)
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    // Single-quoted string
    if (ch === "'") {
      const start = i
      i++
      while (i < len) {
        const c = text[i]
        if (c === '\\\\') { i += 2; continue }
        if (c === "'") { i++; break }
        i++
      }
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    // Double-quoted string
    if (ch === '"') {
      const start = i
      i++
      while (i < len) {
        const c = text[i]
        if (c === '\\\\') { i += 2; continue }
        if (c === '"') { i++; break }
        i++
      }
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    // Template string
    if (ch === '`') {
      // We must NOT touch inside ${ ... } expressions (identifiers live there).
      push('`')
      i++
      let rawBuf = ''

      const flushRaw = () => {
        if (!rawBuf) return
        const rep = replaceInSegment(rawBuf)
        push(rep.out)
        count += rep.count
        rawBuf = ''
      }

      while (i < len) {
        const c = text[i]
        if (c === '\\\\') {
          // keep escapes inside raw text
          rawBuf += text.slice(i, i + 2)
          i += 2
          continue
        }
        if (c === '`') {
          flushRaw()
          push('`')
          i++
          break
        }
        if (c === '$' && text[i + 1] === '{') {
          // flush raw text before expression
          flushRaw()
          // copy expression verbatim without replacements
          push('${')
          i += 2
          let depth = 1
          while (i < len && depth > 0) {
            const cc = text[i]
            if (cc === '\\\\') {
              push(text.slice(i, i + 2))
              i += 2
              continue
            }
            if (cc === '{') depth++
            else if (cc === '}') depth--
            push(cc)
            i++
          }
          continue
        }
        rawBuf += c
        i++
      }

      // If unterminated template, still flush what we have.
      flushRaw()
      continue
    }

    push(ch)
    i++
  }

  return { text: out, count }
}

function rewriteRust(text) {
  // Similar strategy: only comments and string literals.
  let i = 0
  let out = ''
  let count = 0
  const len = text.length
  const push = (s) => { out += s }

  while (i < len) {
    const ch = text[i]

    // Line comment //
    if (ch === '/' && text[i + 1] === '/') {
      const start = i
      i += 2
      while (i < len && text[i] !== '\n') i++
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    // Block comment /* */
    if (ch === '/' && text[i + 1] === '*') {
      const start = i
      i += 2
      while (i < len && !(text[i] === '*' && text[i + 1] === '/')) i++
      i = Math.min(len, i + 2)
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    // Raw string literal r#"..."# (supports varying # count)
    if (ch === 'r' && text[i + 1] === '#') {
      const start = i
      i += 1
      let hashes = 0
      while (text[i] === '#') { hashes++; i++ }
      if (text[i] !== '"') { push(text[start]); i = start + 1; continue }
      i++ // opening quote
      const endDelim = '"' + '#'.repeat(hashes)
      const endIdx = text.indexOf(endDelim, i)
      if (endIdx === -1) {
        const seg = text.slice(start)
        const rep = replaceInSegment(seg)
        push(rep.out)
        count += rep.count
        break
      }
      i = endIdx + endDelim.length
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    // Normal string literal "..."
    if (ch === '"') {
      const start = i
      i++
      while (i < len) {
        const c = text[i]
        if (c === '\\\\') { i += 2; continue }
        if (c === '"') { i++; break }
        i++
      }
      const seg = text.slice(start, i)
      const rep = replaceInSegment(seg)
      push(rep.out)
      count += rep.count
      continue
    }

    push(ch)
    i++
  }

  return { text: out, count }
}

function rewriteYaml(text) {
  // Conservative: replace in full file, but avoid touching keys by only
  // rewriting portions after the first ':' on a line (and comments).
  const lines = text.split(/\r?\n/)
  let total = 0
  const outLines = lines.map((line) => {
    const hashIdx = line.indexOf('#')
    const beforeComment = hashIdx >= 0 ? line.slice(0, hashIdx) : line
    const comment = hashIdx >= 0 ? line.slice(hashIdx) : ''

    const colonIdx = beforeComment.indexOf(':')
    if (colonIdx === -1) {
      const repComment = comment ? replaceInSegment(comment) : { out: comment, count: 0 }
      total += repComment.count
      return beforeComment + repComment.out
    }

    const keyPart = beforeComment.slice(0, colonIdx + 1)
    const valuePart = beforeComment.slice(colonIdx + 1)
    const repValue = replaceInSegment(valuePart)
    const repComment = comment ? replaceInSegment(comment) : { out: comment, count: 0 }
    total += repValue.count + repComment.count
    return keyPart + repValue.out + repComment.out
  })

  return { text: outLines.join('\n'), count: total }
}

function processFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  const rel = path.relative(ROOT, filePath).replaceAll('\\', '/')
  const original = fs.readFileSync(filePath, 'utf8')

  let result = { text: original, count: 0 }
  if (ext === '.rs') result = rewriteRust(original)
  else if (ext === '.yml' || ext === '.yaml') result = rewriteYaml(original)
  else result = rewriteJsLike(original)

  if (result.count && result.text !== original) {
    fs.writeFileSync(filePath, result.text, 'utf8')
    return { rel, count: result.count }
  }
  return null
}

function main() {
  const files = walk(ROOT)
  const summary = {}
  let touched = 0

  for (const f of files) {
    const r = processFile(f)
    if (r) {
      summary[r.rel] = r.count
      touched++
    }
  }

  fs.writeFileSync(
    path.join(ROOT, 'brand-replace-safe-code-summary.json'),
    JSON.stringify({ generatedAt: new Date().toISOString(), filesChanged: touched, summary }, null, 2) + '\n',
    'utf8'
  )
  console.log(`Done. Updated ${touched} files. Wrote brand-replace-safe-code-summary.json`)
}

main()

