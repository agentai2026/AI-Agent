<p align="center">
  <img src="public/images/logo-brand.png" width="360" alt="AIAgent">
</p>

<p align="center">
  Панель управления OpenClaw & Hermes Agent со встроенным ИИ-ассистентом — Управление мульти-движковыми AI фреймворками
</p>

<p align="center">
  <a href="README.md">🇨🇳 中文</a> | <a href="README.en.md">🇺🇸 English</a> | <a href="README.zh-TW.md">🇹🇼 繁體中文</a> | <a href="README.ja.md">🇯🇵 日本語</a> | <a href="README.ko.md">🇰🇷 한국어</a> | <a href="README.vi.md">🇻🇳 Tiếng Việt</a> | <a href="README.es.md">🇪🇸 Español</a> | <a href="README.pt.md">🇧🇷 Português</a> | <strong>🇷🇺 Русский</strong> | <a href="README.fr.md">🇫🇷 Français</a> | <a href="README.de.md">🇩🇪 Deutsch</a>
</p>

<p align="center">
  <a href="https://github.com/agentai2026/AI-Agent">
    <img src="https://github.com/agentai2026/AI-Agent" alt="Release">
  </a>
  <a href="https://github.com/agentai2026/AI-Agent">
    <img src="https://github.com/agentai2026/AI-Agent" alt="Downloads">
  </a>
  <a href="https://github.com/agentai2026/AI-Agent">
    <img src="https://github.com/agentai2026/AI-Agent" alt="License">
  </a>
</p>

---

<p align="center">
  <img src="docs/feature-showcase.gif" width="800" alt="AIAgent Showcase">
</p>

AIAgent — это визуальная панель управления, поддерживающая несколько фреймворков AI-агентов, сейчас с двойной поддержкой [OpenClaw](https://github.com/agentai2026/AI-Agent) и [Hermes Agent](https://github.com/agentai2026/AI-Agent). Со **встроенным интеллектуальным ИИ-ассистентом**, который помогает установить, автоматически диагностировать конфигурации, устранять неполадки и исправлять ошибки. 8 инструментов + 4 режима + интерактивный Q&A — удобное управление для новичков и экспертов.

> 🌐 **Сайт**: [claw.qt.cool](https://github.com/agentai2026/AI-Agent) | 📦 **Скачать**: [GitHub Releases](https://github.com/agentai2026/AI-Agent)

### 🎁 QingchenCloud AI API

> Внутренняя платформа технического тестирования, доступна для отдельных пользователей. Ежедневный вход для получения кредитов.

<p align="center">
  <a href="https://github.com/agentai2026/AI-Agent"><img src="https://github.com/agentai2026/AI-Agent QingchenCloud AI-gpt.qt.cool-6366f1?style=for-the-badge" alt="QingchenCloud AI"></a>
</p>

- **Ежедневные кредиты** — Ежедневный вход + приглашение друзей для получения тестовых кредитов
- **API, совместимый с OpenAI** — Бесшовная интеграция с OpenClaw
- **Политика ресурсов** — Ограничение скорости + лимит запросов, возможна очередь в пиковые часы
- **Доступность моделей** — Модели/API зависят от актуального отображения на странице, возможна ротация версий

> ⚠️ **Соответствие**: Только для технического тестирования. Незаконное использование или обход механизмов безопасности запрещены. Храните API Key в безопасности. Правила регулируются актуальной политикой платформы.

### 🔥 Поддержка плат разработки / Встраиваемых устройств

- **Orange Pi / Raspberry Pi / RK3588** — `npm run serve` для запуска
- **Docker ARM64** — `docker run ghcr.io/qingchencloud/openclaw:latest`
- **Armbian / Debian / Ubuntu Server** — Автоопределение архитектуры
- Без Rust / Tauri / GUI — **только Node.js 18+**

## Сообщество

Сообщество увлечённых разработчиков и пользователей AI-агентов — присоединяйтесь!

<p align="center">
  <a href="https://github.com/agentai2026/AI-Agent"><strong>Discord</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/agentai2026/AI-Agent"><strong>Discussions</strong></a>
  &nbsp;·&nbsp;
  <a href="https://github.com/agentai2026/AI-Agent"><strong>Сообщить об Issue</strong></a>
</p>

## Возможности

- **🤖 ИИ-ассистент (Новый)** — Встроенный ИИ-ассистент, 4 режима + 8 инструментов + интерактивный Q&A
- **🧩 Мульти-движковая архитектура** — Поддержка OpenClaw и Hermes Agent, свободное переключение, независимое управление
- **🤖 Чат Hermes Agent** — Встроенный интерфейс чата Hermes Agent, визуализация вызовов инструментов, доступ к файлам, SSE стриминг
- **🖼️ Распознавание изображений** — Вставьте скриншот или перетащите изображение, ИИ автоматически анализирует
- **Панель мониторинга** — Обзор системы, мониторинг сервисов в реальном времени
- **Управление сервисами** — Запуск/остановка OpenClaw / Hermes Gateway, обнаружение версии и обновление
- **Настройка моделей** — Управление несколькими провайдерами, пакетное тестирование подключения, сортировка перетаскиванием
- **Настройка Gateway** — Порт, область доступа, токен аутентификации, Tailscale
- **Каналы сообщений** — Единое управление Telegram, Discord, Feishu, DingTalk, QQ
- **Коммуникация и автоматизация** — Настройки сообщений, рассылка, Webhooks, утверждение выполнения
- **Аналитика использования** — Использование токенов, расходы API, рейтинги моделей/провайдеров
- **Управление агентами** — CRUD агентов, редактирование идентичности, управление workspace
- **Чат** — Потоковая передача, рендеринг Markdown, управление сессиями
- **Запланированные задачи** — Выполнение по расписанию Cron, многоканальная доставка
- **Просмотр логов** — Логи в реальном времени из нескольких источников и поиск
- **Управление памятью** — Просмотр/редактирование файлов памяти, экспорт ZIP, переключение агентов
- **QingchenCloud AI API** — Внутренняя тестовая платформа, совместимая с OpenAI
- **Расширения** — Управление туннелями cftunnel, мониторинг ClawApp
- **О программе** — Информация о версии, ссылки сообщества, связанные проекты

## Скачать и установить

Перейдите на [Releases](https://github.com/agentai2026/AI-Agent) для последней версии:

| Платформа | Установщик |
|----------|-----------|
| **Windows** | `.exe` (рекомендуется) или `.msi` |
| **macOS Apple Silicon** | `.dmg` (aarch64) |
| **macOS Intel** | `.dmg` (x64) |
| **Linux** | `.AppImage` / `.deb` / `.rpm` |

### Linux сервер (Web-версия)

```bash
curl -fsSL https://github.com/agentai2026/AI-Agent | bash
```

### Docker

```bash
docker run -d --name clawpanel --restart unless-stopped \
  -p 1420:1420 -v clawpanel-data:/root/.openclaw \
  node:22-slim \
  sh -c "apt-get update && apt-get install -y git && \
    npm install -g @qingchencloud/openclaw-zh --registry https://github.com/agentai2026/AI-Agent && \
    git clone https://github.com/agentai2026/AI-Agent /app && \
    cd /app && npm install && npm run build && npm run serve"
```

## Быстрый старт

1. **Начальная настройка** — При первом запуске автоопределение Node.js, Git, OpenClaw. Установка одним кликом при необходимости
2. **Настройка моделей** — Добавить провайдеров ИИ (DeepSeek, OpenAI, Ollama и др.) и протестировать подключение
3. **Запуск Gateway** — Перейти в Управление сервисами, нажать «Запустить». Зелёный статус = готово
4. **Начать чат** — Перейти в Чат, выбрать модель и начать разговор

## Техническая архитектура

| Уровень | Технология | Описание |
|---------|-----------|----------|
| Frontend | Vanilla JS + Vite | Без фреймворков, лёгкий |
| Backend | Rust + Tauri v2 | Нативная производительность, кроссплатформенность |
| Коммуникация | Tauri IPC + Shell Plugin | Мост frontend-backend |
| Стили | Pure CSS (CSS Variables) | Тёмная/светлая темы |

## Сборка из исходного кода

```bash
git clone https://github.com/agentai2026/AI-Agent
cd clawpanel && npm install

# Десктоп (требуется Rust + Tauri v2)
npm run tauri dev        # Разработка
npm run tauri build      # Продакшн

# Только Web (без Rust)
npm run dev              # Hot reload
npm run build && npm run serve  # Продакшн
```

## Связанные проекты

| Проект | Описание |
|--------|----------|
| [OpenClaw](https://github.com/agentai2026/AI-Agent) | Фреймворк AI-агентов |
| [ClawApp](https://github.com/agentai2026/AI-Agent) | Кроссплатформенный мобильный чат |
| [cftunnel](https://github.com/agentai2026/AI-Agent) | Инструмент Cloudflare Tunnel |

## Вклад

Issues и Pull Requests приветствуются. См. [CONTRIBUTING.md](CONTRIBUTING.md).


## Sponsor

If you find this project useful, consider supporting us via USDT (BNB Smart Chain):

<img src="public/images/bnbqr.jpg" alt="Sponsor QR" width="180">

```
0xbdd7ebdf2b30d873e556799711021c6671ffe88f
```

## Contact

- **Email**: [support@qctx.net](mailto:support@qctx.net)
- **Website**: [qingchencloud.com](https://github.com/agentai2026/AI-Agent)
- **Product**: [claw.qt.cool](https://github.com/agentai2026/AI-Agent)

## Лицензия

[AGPL-3.0](LICENSE). Для коммерческого использования обращайтесь за коммерческой лицензией.

© 2026 QingchenCloud | [claw.qt.cool](https://github.com/agentai2026/AI-Agent)
