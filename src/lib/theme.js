/**
 * 主题管理：日间 → 夜间 → 星空 循环 + 强调色皮肤（皮肤仅存档，侧栏已改为三态主题）
 */
const THEME_KEY = 'clawpanel-theme'
const SKIN_KEY = 'clawpanel-skin'

export const THEME_CYCLE = ['light', 'dark', 'starry']

/** 与亮/暗无关的强调色方案；default 不写 data-skin */
export const SKIN_IDS = ['default', 'ocean', 'forest', 'violet', 'rose', 'amber']

export function initTheme() {
  const saved = localStorage.getItem(THEME_KEY)
  let theme = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  if (!THEME_CYCLE.includes(theme)) theme = 'light'
  applyTheme(theme)
  initSkin()
}

export function initSkin() {
  const saved = localStorage.getItem(SKIN_KEY)
  const skin = SKIN_IDS.includes(saved) ? saved : 'default'
  applySkin(skin)
}

export function getSkin() {
  return document.documentElement.dataset.skin || 'default'
}

export function setSkin(skin) {
  if (!SKIN_IDS.includes(skin)) return
  applySkin(skin)
}

function applySkin(skin) {
  const html = document.documentElement
  if (skin === 'default') {
    delete html.dataset.skin
  } else {
    html.dataset.skin = skin
  }
  try {
    localStorage.setItem(SKIN_KEY, skin)
  } catch { /* ignore */ }
}

/** 日间 → 夜间 → 星空 → 日间 */
export function cycleTheme(onApply) {
  const html = document.documentElement
  const current = html.dataset.theme || 'light'
  const i = THEME_CYCLE.indexOf(current)
  const idx = i < 0 ? 0 : i
  const next = THEME_CYCLE[(idx + 1) % THEME_CYCLE.length]

  // 扩散起点：切到暗系偏左下，切到亮系偏右上，星空从上方中央
  if (next === 'dark') {
    html.style.setProperty('--theme-reveal-x', '0%')
    html.style.setProperty('--theme-reveal-y', '100%')
  } else if (next === 'light') {
    html.style.setProperty('--theme-reveal-x', '100%')
    html.style.setProperty('--theme-reveal-y', '0%')
  } else {
    html.style.setProperty('--theme-reveal-x', '50%')
    html.style.setProperty('--theme-reveal-y', '0%')
  }

  const doApply = () => {
    applyTheme(next)
    if (onApply) onApply(next)
  }

  if (document.startViewTransition) {
    document.startViewTransition(doApply)
  } else {
    doApply()
  }
  return next
}

/** @deprecated 使用 cycleTheme（三态循环） */
export function toggleTheme(onApply) {
  return cycleTheme(onApply)
}

export function getTheme() {
  const t = document.documentElement.dataset.theme || 'light'
  return THEME_CYCLE.includes(t) ? t : 'light'
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme
  localStorage.setItem(THEME_KEY, theme)
}
