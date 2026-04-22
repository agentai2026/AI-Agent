/**
 * Fix broken i18n keys from a bad OpenClaw→AI Agent replace (keys like "projectAI Agent").
 * Syncs src/locales/*.json with src/locales/modules/about.js + ext.js naming.
 */
const fs = require('fs')
const path = require('path')

const localesDir = path.join(__dirname, '..', 'src', 'locales')

const LINK_MOBILE_APP = {
  'zh-CN': '移动客户端',
  'zh-TW': '移動用戶端',
  en: 'Mobile client',
  ja: 'モバイルクライアント',
  ko: '모바일 클라이언트',
  vi: 'Ứng dụng di động',
  es: 'Cliente móvil',
  pt: 'Cliente móvel',
  ru: 'Мобильный клиент',
  fr: 'Client mobile',
  de: 'Mobiler Client',
}

const LINK_WEBSITE = {
  'zh-CN': 'AI Agent 项目主页',
  'zh-TW': 'AI Agent 項目主頁',
  en: 'AI Agent project home',
  ja: 'AI Agent プロジェクトホーム',
  ko: 'AI Agent 프로젝트 홈',
  vi: 'Trang chủ dự án AI Agent',
  es: 'Inicio del proyecto AI Agent',
  pt: 'Página inicial do projeto AI Agent',
  ru: 'Главная страница проекта AI Agent',
  fr: 'Accueil du projet AI Agent',
  de: 'AI-Agent-Projektstartseite',
}

const LINK_RUNTIME_ZH = {
  'zh-CN': 'AI Agent 中文资料',
  'zh-TW': 'AI Agent 中文資料',
  en: 'AI Agent Chinese resources',
  ja: 'AI Agent 中国語リソース',
  ko: 'AI Agent 중국어 자료',
  vi: 'Tài liệu AI Agent (tiếng Trung)',
  es: 'Recursos en chino de AI Agent',
  pt: 'Recursos em chinês do AI Agent',
  ru: 'Китайские материалы AI Agent',
  fr: 'Ressources chinoises AI Agent',
  de: 'Chinesische AI-Agent-Ressourcen',
}

function migrateAbout(a, langKey) {
  if (!a || typeof a !== 'object') return
  const renames = [
    ['projectAI Agent', 'projectRuntime'],
    ['projectAI AgentZh', '__delete__'],
    ['projectAI Agent面板', 'projectDesktopPanel'],
    ['projectClawApp', 'projectMobileClient'],
    ['linkAI AgentZh', 'linkRuntimeZh'],
    ['linkClawApp', 'linkMobileApp'],
  ]
  for (const [oldK, newK] of renames) {
    if (!(oldK in a)) continue
    if (newK === '__delete__') {
      delete a[oldK]
      continue
    }
    if (oldK !== newK) {
      a[newK] = a[oldK]
      delete a[oldK]
    }
  }
  a.linkWebsite = LINK_WEBSITE[langKey] || LINK_WEBSITE.en
  a.linkMobileApp = LINK_MOBILE_APP[langKey] || LINK_MOBILE_APP.en
  a.linkRuntimeZh = LINK_RUNTIME_ZH[langKey] || LINK_RUNTIME_ZH.en
  const hint = {
    'zh-CN':
      '主仓库：<a href="https://github.com/agentai2026/AI-Agent" target="_blank" rel="noopener" style="color:var(--accent)">GitHub</a>（建议优先使用官方仓库获取更新）',
    'zh-TW':
      '主倉庫：<a href="https://github.com/agentai2026/AI-Agent" target="_blank" rel="noopener" style="color:var(--accent)">GitHub</a>（建議優先使用官方倉庫取得更新）',
    en:
      'Primary repo: <a href="https://github.com/agentai2026/AI-Agent" target="_blank" rel="noopener" style="color:var(--accent)">GitHub</a> (recommended for updates)',
  }
  a.domesticMirrorHint = hint[langKey] || hint.en
}

const EXT_PATCH = {
  'zh-CN': {
    desc: '管理 cftunnel 内网穿透和移动客户端扩展',
    clawappTitle: '移动客户端',
    clawappNotInstalled: '移动客户端未安装',
    openClawapp: '打开移动客户端',
  },
  'zh-TW': {
    desc: '管理 cftunnel 內網穿透和移動用戶端擴充',
    clawappTitle: '移動用戶端',
    clawappNotInstalled: '移動用戶端未安裝',
    openClawapp: '開啟移動用戶端',
  },
  en: {
    desc: 'Manage cftunnel tunneling and the mobile client extension',
    clawappTitle: 'Mobile client',
    clawappNotInstalled: 'Mobile client not installed',
    openClawapp: 'Open mobile client',
  },
  ja: {
    desc: 'cftunnel トンネリングとモバイルクライアント拡張の管理',
    clawappTitle: 'モバイルクライアント',
    clawappNotInstalled: 'モバイルクライアント未インストール',
    openClawapp: 'モバイルクライアントを開く',
  },
  ko: {
    desc: 'cftunnel 터널링 및 모바일 클라이언트 확장 관리',
    clawappTitle: '모바일 클라이언트',
    clawappNotInstalled: '모바일 클라이언트 미설치',
    openClawapp: '모바일 클라이언트 열기',
  },
  vi: {
    desc: 'Quản lý cftunnel và phần mở rộng mobile client',
    clawappTitle: 'Ứng dụng di động',
    clawappNotInstalled: 'Chưa cài ứng dụng di động',
    openClawapp: 'Mở ứng dụng di động',
  },
  es: {
    desc: 'Gestionar cftunnel y la extensión del cliente móvil',
    clawappTitle: 'Cliente móvil',
    clawappNotInstalled: 'Cliente móvil no instalado',
    openClawapp: 'Abrir cliente móvil',
  },
  pt: {
    desc: 'Gerenciar cftunnel e a extensão do cliente móvel',
    clawappTitle: 'Cliente móvel',
    clawappNotInstalled: 'Cliente móvel não instalado',
    openClawapp: 'Abrir cliente móvel',
  },
  ru: {
    desc: 'Управление cftunnel и мобильным расширением',
    clawappTitle: 'Мобильный клиент',
    clawappNotInstalled: 'Мобильный клиент не установлен',
    openClawapp: 'Открыть мобильный клиент',
  },
  fr: {
    desc: 'Gérer cftunnel et l’extension client mobile',
    clawappTitle: 'Client mobile',
    clawappNotInstalled: 'Client mobile non installé',
    openClawapp: 'Ouvrir le client mobile',
  },
  de: {
    desc: 'cftunnel und mobile Client-Erweiterung verwalten',
    clawappTitle: 'Mobiler Client',
    clawappNotInstalled: 'Mobiler Client nicht installiert',
    openClawapp: 'Mobilen Client öffnen',
  },
}

const ASSISTANT_PERSONA = {
  'zh-CN': { personaOpenClaw: 'AI Agent', personaOpenClawHint: '从 AI Agent 主程序继承身份与工作区设置' },
  'zh-TW': { personaOpenClaw: 'AI Agent', personaOpenClawHint: '從 AI Agent 主程式繼承身份與工作區設定' },
  en: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'Inherit identity and workspace from AI Agent' },
  ja: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'AI Agent から ID とワークスペース設定を継承' },
  ko: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'AI Agent에서 ID 및 작업 공간 설정 상속' },
  vi: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'Kế thừa danh tính và workspace từ AI Agent' },
  es: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'Heredar identidad y espacio de trabajo desde AI Agent' },
  pt: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'Herdar identidade e workspace do AI Agent' },
  ru: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'Наследовать идентичность и рабочую область от AI Agent' },
  fr: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'Hériter de l’identité et de l’espace de travail depuis AI Agent' },
  de: { personaOpenClaw: 'AI Agent', personaOpenClawHint: 'Identität und Arbeitsbereich von AI Agent übernehmen' },
}

function migrateAssistantKeys(a, langKey) {
  if (!a || typeof a !== 'object') return
  const map = [
    ['personaAI Agent', 'personaOpenClaw'],
    ['personaAI AgentHint', 'personaOpenClawHint'],
  ]
  for (const [oldK, newK] of map) {
    if (oldK in a) {
      a[newK] = a[oldK]
      delete a[oldK]
    }
  }
  const p = ASSISTANT_PERSONA[langKey] || ASSISTANT_PERSONA.en
  a.personaOpenClaw = p.personaOpenClaw
  a.personaOpenClawHint = p.personaOpenClawHint
}

function scrubClawHubStrings(node, hubLabel) {
  if (node === null || typeof node !== 'object') return
  if (Array.isArray(node)) {
    for (const item of node) scrubClawHubStrings(item, hubLabel)
    return
  }
  for (const k of Object.keys(node)) {
    const v = node[k]
    if (typeof v === 'string' && v.includes('ClawHub')) {
      node[k] = v.replace(/ClawHub/g, hubLabel)
    } else if (v && typeof v === 'object') {
      scrubClawHubStrings(v, hubLabel)
    }
  }
}

function migrateExt(x, langKey) {
  if (!x || typeof x !== 'object') return
  const p = EXT_PATCH[langKey] || EXT_PATCH.en
  Object.assign(x, p)
}

for (const f of fs.readdirSync(localesDir)) {
  if (!f.endsWith('.json')) continue
  const p = path.join(localesDir, f)
  const raw = fs.readFileSync(p, 'utf8')
  const data = JSON.parse(raw)
  const langKey = path.basename(f, '.json')
  migrateAbout(data.about, langKey)
  migrateExt(data.ext, langKey)
  migrateAssistantKeys(data.assistant, langKey)
  const hubLabel = langKey === 'zh-CN' || langKey === 'zh-TW' ? '海外技能源' : 'Overseas skill catalog'
  scrubClawHubStrings(data, hubLabel)
  fs.writeFileSync(p, JSON.stringify(data, null, 2) + '\n', 'utf8')
}

console.log('Updated locale JSON files in', localesDir)
