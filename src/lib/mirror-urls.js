/**
 * GitHub / Gitee 镜像 URL 管理
 * 国内用户自动使用 Gitee 镜像，解决 GitHub 访问慢/不可达的问题
 */

const GITHUB_ORG = 'https://github.com/agentai2026/AI-Agent'
const GITEE_ORG = 'https://github.com/agentai2026/AI-Agent'
const GITHUB_RAW = 'https://github.com/agentai2026/AI-Agent'
const GITEE_RAW = 'https://github.com/agentai2026/AI-Agent'

// 逻辑仓库 key → GitHub 仓库目录名（与 Gitee 可能不同）
const GITHUB_REPO_SLUG = {
  clawpanel: 'AI-Agent',
  clawapp: 'clawapp',
  cftunnel: 'cftunnel',
  'openclaw-zh': 'openclaw-zh',
}
// 逻辑仓库 key → Gitee 仓库目录名（国内镜像仍可能沿用旧仓库名）
const GITEE_REPO_SLUG = {
  clawpanel: 'clawpanel',
  clawapp: 'clawapp',
  cftunnel: 'cftunnel',
  'openclaw-zh': 'openclaw-zh',
}

function slugForGitHub(repo) {
  return GITHUB_REPO_SLUG[repo] || repo
}
function slugForGitee(repo) {
  return GITEE_REPO_SLUG[repo] || repo
}

/**
 * 探测 GitHub 是否可达（3s 超时）
 * 结果缓存 5 分钟
 */
let _githubReachable = null
let _lastCheck = 0
const CHECK_TTL = 300000 // 5min

async function isGithubReachable() {
  const now = Date.now()
  if (_githubReachable !== null && now - _lastCheck < CHECK_TTL) return _githubReachable
  try {
    const ctrl = new AbortController()
    const timer = setTimeout(() => ctrl.abort(), 3000)
    await fetch('https://github.com/agentai2026/AI-Agent', { method: 'HEAD', mode: 'no-cors', signal: ctrl.signal })
    clearTimeout(timer)
    _githubReachable = true
  } catch {
    _githubReachable = false
  }
  _lastCheck = now
  return _githubReachable
}

/**
 * 获取仓库 URL（优先 GitHub，不可达时用 Gitee）
 * @param {string} repo - 仓库名，如 'clawpanel'
 * @param {string} [path] - 可选路径，如 '/releases'、'/issues/new'
 */
export async function repoUrl(repo, path = '') {
  if (await isGithubReachable()) {
    return `${GITHUB_ORG}/${slugForGitHub(repo)}${path}`
  }
  return `${GITEE_ORG}/${slugForGitee(repo)}${path}`
}

/**
 * 同步版本：同时返回 GitHub 和 Gitee URL，让 UI 可以展示两个链接
 * @param {string} repo
 * @param {string} [path]
 */
export function repoBothUrls(repo, path = '') {
  return {
    github: `${GITHUB_ORG}/${slugForGitHub(repo)}${path}`,
    gitee: `${GITEE_ORG}/${slugForGitee(repo)}${path}`,
  }
}

/**
 * 获取 raw 文件 URL（用于 deploy.sh 等脚本下载）
 * GitHub: raw.githubusercontent.com/org/repo/branch/file
 * Gitee: gitee.com/org/repo/raw/branch/file
 * @param {string} repo
 * @param {string} branch
 * @param {string} filePath
 */
export async function rawFileUrl(repo, branch, filePath) {
  if (await isGithubReachable()) {
    return `${GITHUB_RAW}/${slugForGitHub(repo)}/${branch}/${filePath}`
  }
  return `${GITEE_RAW}/${slugForGitee(repo)}/raw/${branch}/${filePath}`
}

/**
 * deploy.sh 下载命令（国内用户自动切换为 Gitee 源）
 */
export function deployCommand() {
  return {
    github: `curl -fsSL ${GITHUB_RAW}/AI-Agent/main/deploy.sh | bash`,
    gitee: `curl -fsSL ${GITEE_RAW}/clawpanel/raw/main/deploy.sh | bash`,
  }
}

/** 强制标记 GitHub 不可达（用户手动切换时调用） */
export function forceGiteeMirror() {
  _githubReachable = false
  _lastCheck = Date.now()
}

/** 强制标记 GitHub 可达 */
export function forceGithubDirect() {
  _githubReachable = true
  _lastCheck = Date.now()
}

/** 当前是否使用 Gitee 镜像 */
export function isUsingGitee() {
  return _githubReachable === false
}

/** 手动触发一次 GitHub 可达性检测 */
export { isGithubReachable as checkGithubReachable }
