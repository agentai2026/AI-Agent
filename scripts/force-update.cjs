/**
 * Force update working tree from GitHub remote.
 *
 * This is intentionally destructive when run with --yes:
 * - discards ALL local changes (tracked + untracked)
 * - resets to origin/<branch>
 *
 * Usage:
 *   node scripts/force-update.cjs           (prints warning, exits)
 *   node scripts/force-update.cjs --yes     (performs the reset)
 *   node scripts/force-update.cjs --yes --branch main
 */
const { execSync } = require('child_process')

function sh(cmd) {
  return execSync(cmd, { stdio: 'pipe', encoding: 'utf8' }).trim()
}

const args = new Set(process.argv.slice(2))
const yes = args.has('--yes')
const branchArgIdx = process.argv.indexOf('--branch')
const branch = branchArgIdx !== -1 ? process.argv[branchArgIdx + 1] : 'main'

const remote = 'origin'
const target = `${remote}/${branch}`

if (!yes) {
  console.log('[force-update] This will DISCARD local changes and untracked files.')
  console.log(`[force-update] Target: ${target}`)
  console.log('')
  console.log('Run with --yes to continue:')
  console.log(`  node scripts/force-update.cjs --yes --branch ${branch}`)
  process.exit(1)
}

try {
  // Ensure we're in a git repo
  sh('git rev-parse --is-inside-work-tree')
} catch {
  console.error('[force-update] Not a git repository.')
  process.exit(2)
}

console.log(`[force-update] Fetching ${remote}...`)
execSync(`git fetch ${remote} --prune`, { stdio: 'inherit' })

console.log(`[force-update] Resetting to ${target}...`)
execSync(`git reset --hard ${target}`, { stdio: 'inherit' })

console.log('[force-update] Removing untracked files...')
execSync('git clean -fd', { stdio: 'inherit' })

console.log('[force-update] Done.')

