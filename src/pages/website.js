/**
 * 本地官网页（用于替代打开旧版外站官网链接）
 */
export async function render() {
  const page = document.createElement('div')
  page.className = 'page'

  page.innerHTML = `
    <div class="card" style="margin-top:8px">
      <div class="card-body" style="padding:18px 18px">
        <div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap">
          <img src="/favicon.ico" alt="AI Agent面板" style="height:44px;width:auto;border-radius:10px">
          <div style="min-width:240px">
            <div style="font-size:12px;color:var(--text-tertiary);letter-spacing:.6px;text-transform:uppercase">AI Agent Panel</div>
            <div style="font-size:22px;font-weight:800;line-height:1.2;margin-top:4px">AI Agent面板</div>
            <div style="color:var(--text-secondary);margin-top:6px;line-height:1.6">AI 助手驱动的多引擎 AI 管理面板</div>
            <div style="color:var(--text-tertiary);font-size:12px;margin-top:6px">AI Agent可视化面板系统</div>
          </div>
          <div style="margin-left:auto;display:flex;gap:8px;flex-wrap:wrap">
            <a class="btn btn-primary btn-sm" href="https://github.com/agentai2026/AI-Agent" target="_blank" rel="noopener">GitHub</a>
            <a class="btn btn-secondary btn-sm" href="https://github.com/agentai2026/AI-Agent/releases" target="_blank" rel="noopener">下载 / Releases</a>
            <a class="btn btn-secondary btn-sm" href="#/about">关于</a>
          </div>
        </div>

        <div style="margin-top:14px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px">
          ${[
            { k: '功能模块', v: '多页面', s: '覆盖安装 / 诊断 / 监控 / 配置 / 聊天等' },
            { k: '桌面框架', v: 'Tauri v2', s: '跨平台打包、原生性能' },
            { k: '跨平台', v: 'Windows / macOS / Linux', s: '同一套体验与配置体系' },
            { k: '开源协议', v: 'AGPL-3.0', s: '开源可审计，可二次开发' },
          ].map(x => `
            <div style="padding:12px 12px;border-radius:12px;border:1px solid var(--border-primary);background:var(--bg-secondary)">
              <div style="font-size:11px;color:var(--text-tertiary)">${x.k}</div>
              <div style="font-size:16px;font-weight:800;margin-top:4px">${x.v}</div>
              <div style="font-size:12px;color:var(--text-tertiary);margin-top:6px;line-height:1.5">${x.s}</div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>

    <div class="config-section" style="margin-top:16px">
      <div class="config-section-title">强大的功能矩阵</div>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:12px">
        ${[
          { title: '仪表盘', desc: '运行状态一目了然：服务状态、版本信息、Agent 数量与关键指标。' },
          { title: '实时聊天', desc: '多模型流式对话，支持 Markdown 渲染与常用快捷能力。' },
          { title: '服务管理', desc: '启停控制、版本检测与升级、配置备份与恢复。' },
          { title: '模型与配置中心', desc: '多服务商统一管理，批量测试连通性、配置主备切换。' },
          { title: '记忆与数据', desc: '查看与管理记忆文件/核心配置，支持导出与隔离。' },
          { title: '安全防护', desc: '访问控制、认证策略与工具权限管控，兼顾安全与效率。' },
        ].map(x => `
          <div class="card">
            <div class="card-body" style="padding:14px 16px">
              <div style="font-weight:800;margin-bottom:6px">${x.title}</div>
              <div style="color:var(--text-secondary);font-size:13px;line-height:1.7">${x.desc}</div>
            </div>
          </div>
        `).join('')}
      </div>
    </div>

    <div class="config-section" style="margin-top:16px">
      <div class="config-section-title">快速开始</div>
      <div class="card">
        <div class="card-body" style="padding:14px 16px">
          <div style="font-size:13px;color:var(--text-secondary);line-height:1.8">
            访问开源仓库获取安装与部署说明，或直接前往 Releases 下载。
          </div>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-top:12px">
            <a class="btn btn-primary btn-sm" href="https://github.com/agentai2026/AI-Agent" target="_blank" rel="noopener">项目主页</a>
            <a class="btn btn-secondary btn-sm" href="https://github.com/agentai2026/AI-Agent/releases" target="_blank" rel="noopener">下载</a>
            <a class="btn btn-secondary btn-sm" href="https://github.com/agentai2026/AI-Agent/issues" target="_blank" rel="noopener">反馈问题</a>
          </div>
        </div>
      </div>
    </div>

    <div class="config-section" style="margin-top:16px">
      <div class="config-section-title">社区交流</div>
      <div class="card">
        <div class="card-body" style="padding:14px 16px;font-size:13px;line-height:1.8">
          <div><strong>QQ</strong>：255258448</div>
          <div style="margin-top:6px;color:var(--text-tertiary);font-size:12px">如需更多交流入口，可在「关于」页面查看。</div>
        </div>
      </div>
      <div style="margin-top:10px;color:var(--text-tertiary);font-size:11px">
        © 2026 AI Agent面板. All rights reserved. <span style="margin-left:6px">基于开源项目二次开发</span>
      </div>
    </div>
  `

  return page
}

