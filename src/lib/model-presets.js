/**
 * 共享模型预设配置
 * models.js 和 assistant.js 共用，只需维护一套数据
 */

// API 接口类型选项
export const API_TYPES = [
  { value: 'openai-completions', label: 'OpenAI Chat Completions (最常用)' },
  { value: 'anthropic-messages', label: 'Anthropic Messages' },
  { value: 'openai-responses', label: 'OpenAI Responses' },
  { value: 'openai-codex-responses', label: 'OpenAI Codex Responses' },
  { value: 'google-generative-ai', label: 'Google Gemini' },
  { value: 'github-copilot', label: 'GitHub Copilot' },
  { value: 'bedrock-converse-stream', label: 'AWS Bedrock' },
  { value: 'ollama', label: 'Ollama 本地模型' },
]

// 服务商快捷预设
export const PROVIDER_PRESETS = [
  { key: 'shengsuanyun', label: '胜算云', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '国内知名 AI 模型聚合平台，支持多种主流模型' },
  { key: 'siliconflow', label: '硅基流动', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '高性价比推理平台，支持 DeepSeek、Qwen 等开源模型' },
  { key: 'volcengine', label: '火山引擎', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '字节跳动旗下云平台，支持豆包等模型' },
  { key: 'aliyun', label: '阿里云百炼', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '阿里云 AI 大模型平台，支持通义千问全系列' },
  { key: 'zhipu', label: '智谱 AI', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '国产大模型领军企业，支持 GLM-4 全系列' },
  { key: 'minimax', label: 'MiniMax', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'anthropic-messages', site: 'https://github.com/agentai2026/AI-Agent', desc: '国产多模态大模型，支持 MiniMax-M2.7 / M2.5 系列' },
  { key: 'moonshot', label: 'Moonshot / Kimi', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: 'Kimi 大模型平台，支持超长上下文' },
  { key: 'openai', label: 'OpenAI 官方', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent' },
  { key: 'anthropic', label: 'Anthropic 官方', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'anthropic-messages', site: 'https://github.com/agentai2026/AI-Agent' },
  { key: 'deepseek', label: 'DeepSeek', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent' },
  { key: 'google', label: 'Google Gemini', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'google-generative-ai', site: 'https://github.com/agentai2026/AI-Agent' },
  { key: 'xai', label: 'xAI (Grok)', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: 'Elon Musk 旗下 AI，支持 Grok 系列模型' },
  { key: 'groq', label: 'Groq', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '超快推理平台，支持 Llama、Mixtral 等开源模型' },
  { key: 'openrouter', label: 'OpenRouter', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '模型聚合路由，一个 Key 访问所有主流模型' },
  { key: 'nvidia', label: 'NVIDIA NIM', baseUrl: 'https://github.com/agentai2026/AI-Agent', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent', desc: '英伟达推理平台，支持 Llama、Mistral 等模型' },
  { key: 'ollama', label: 'Ollama (本地)', baseUrl: 'http://127.0.0.1:11434/v1', api: 'openai-completions', site: 'https://github.com/agentai2026/AI-Agent' },
]

// 胜算云推广配置
export const SHENGSUANYUN = {
  baseUrl: 'https://github.com/agentai2026/AI-Agent',
  site: 'https://github.com/agentai2026/AI-Agent',
  providerKey: 'shengsuanyun',
  brandName: '胜算云',
  api: 'openai-completions',
}

// 常用模型预设（按服务商分组）
export const MODEL_PRESETS = {
  openai: [
    { id: 'gpt-4o', name: 'GPT-4o', contextWindow: 128000 },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini', contextWindow: 128000 },
    { id: 'o3-mini', name: 'o3 Mini', contextWindow: 200000, reasoning: true },
  ],
  anthropic: [
    { id: 'claude-sonnet-4-5-20250514', name: 'Claude Sonnet 4.5', contextWindow: 200000 },
    { id: 'claude-haiku-3-5-20241022', name: 'Claude Haiku 3.5', contextWindow: 200000 },
  ],
  deepseek: [
    { id: 'deepseek-chat', name: 'DeepSeek V3', contextWindow: 64000 },
    { id: 'deepseek-reasoner', name: 'DeepSeek R1', contextWindow: 64000, reasoning: true },
  ],
  google: [
    { id: 'gemini-2.5-pro', name: 'Gemini 2.5 Pro', contextWindow: 1000000, reasoning: true },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash', contextWindow: 1000000 },
  ],
  minimax: [
    { id: 'MiniMax-M2.5', name: 'MiniMax M2.5', contextWindow: 204000 },
  ],
  moonshot: [
    { id: 'kimi-k2.5', name: 'Kimi K2.5', contextWindow: 131072 },
    { id: 'kimi-k2', name: 'Kimi K2', contextWindow: 131072 },
    { id: 'kimi-latest', name: 'Kimi Latest', contextWindow: 131072 },
  ],
  xai: [
    { id: 'grok-4', name: 'Grok 4', contextWindow: 131072 },
    { id: 'grok-4-fast', name: 'Grok 4 Fast', contextWindow: 131072 },
  ],
  groq: [
    { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B', contextWindow: 32768 },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', contextWindow: 32768 },
  ],
  ollama: [
    { id: 'qwen3:32b', name: 'Qwen 3 32B', contextWindow: 32768 },
    { id: 'llama3.3:70b', name: 'Llama 3.3 70B', contextWindow: 8192 },
    { id: 'deepseek-r1:32b', name: 'DeepSeek R1 32B', contextWindow: 32768, reasoning: true },
  ],
}
