export type Lang = "ru" | "en";

const ru = {
  nav: {
    about: "О нас",
    services: "Что мы делаем",
    solutions: "Решения",
    cases: "Кейсы",
    clients: "Клиенты",
    contact: "Контакты",
  },
  actions: {
    contact: "Связаться",
    langName: "RU",
  },
  hero: {
    badge: "AI · AUTOMATION",
    title: "AI-агенты, которые работают за вас",
    subtitle:
      "Vels Industries проектирует, обучает и интегрирует автономных AI-агентов, которые автоматизируют рутину и масштабируют процессы вашего бизнеса.",
    primaryCta: "Обсудить проект",
    secondaryCta: "Смотреть кейсы",
    scroll: "Листайте вниз",
  },
  about: {
    label: "01 — О нас",
    title: "Команда, которая превращает AI в рабочий инструмент бизнеса",
    text: "Vels Industries — это инженеры и ML-специалисты, которые проектируют AI-агентов под конкретные задачи. Мы ведём проект от аудита и прототипа до промышленного внедрения и развития — без громких слов, с измеримым результатом.",
    metrics: [
      { value: "50+", label: "внедрённых агентов" },
      { value: "12", label: "отраслей" },
      { value: "98%", label: "удержание клиентов" },
      { value: "×3", label: "рост эффективности процессов" },
    ],
  },
  services: {
    label: "02 — Что мы делаем",
    title: "Полный цикл создания AI-агентов",
    items: [
      {
        title: "Разработка агентов",
        text: "Проектируем и обучаем автономных AI-агентов под вашу задачу — от логики до интерфейса.",
      },
      {
        title: "Интеграция в процессы",
        text: "Встраиваем агентов в существующие системы, CRM и каналы коммуникации без остановки бизнеса.",
      },
      {
        title: "Обучение на ваших данных",
        text: "Дообучаем модели на ваших знаниях и регламентах, чтобы агент говорил на языке компании.",
      },
      {
        title: "Поддержка и развитие",
        text: "Мониторим качество, дорабатываем сценарии и масштабируем агентов вместе с ростом задач.",
      },
    ],
    process: {
      title: "Как мы работаем",
      steps: [
        { no: "01", title: "Аудит", text: "Изучаем процессы и находим точки для автоматизации." },
        { no: "02", title: "Прототип", text: "Собираем работающего агента и проверяем гипотезу." },
        { no: "03", title: "Внедрение", text: "Интегрируем в системы и выводим в продакшн." },
        { no: "04", title: "Развитие", text: "Сопровождаем, улучшаем метрики и масштабируем." },
      ],
    },
  },
  solutions: {
    label: "03 — Решения",
    title: "Где AI-агенты приносят результат",
    subtitle: "Готовые сценарии, которые адаптируем под вашу отрасль и стек.",
    items: [
      { title: "Поддержка клиентов 24/7", text: "Агент отвечает на обращения, решает типовые запросы и эскалирует сложное." },
      { title: "Автоматизация продаж", text: "Квалификация лидов, ответы на вопросы и сопровождение сделки в реальном времени." },
      { title: "Обработка документов", text: "Извлечение данных, проверка и маршрутизация документов без ручного труда." },
      { title: "Внутренние копилоты", text: "Ассистенты для сотрудников: поиск по базе знаний и помощь в задачах." },
      { title: "Аналитика и отчётность", text: "Агент собирает данные, формирует отчёты и подсвечивает аномалии." },
    ],
  },
  cases: {
    label: "04 — Кейсы",
    title: "Результаты в цифрах",
    note: "Демонстрационные данные — заменим вашими кейсами.",
    items: [
      { tag: "Финтех", title: "AI-агент поддержки", result: "−40%", text: "снижение нагрузки на службу поддержки за счёт автоматизации обращений." },
      { tag: "E-commerce", title: "Агент-продавец", result: "+25%", text: "рост конверсии благодаря персональным консультациям в реальном времени." },
      { tag: "Логистика", title: "Документ-агент", result: "×5", text: "ускорение обработки документов и сокращение ошибок ввода." },
    ],
  },
  clients: {
    label: "05 — Клиенты",
    title: "Нам доверяют",
    note: "Логотипы — плейсхолдеры, заменим вашими.",
    logos: ["Northwind", "Quantica", "Verdex", "Aurora Labs", "Meridian", "Helix"],
  },
  contact: {
    label: "06 — Контакты",
    title: "Готовы внедрить AI-агента?",
    subtitle: "Оставьте заявку — обсудим задачу и предложим решение в течение рабочего дня.",
    form: {
      name: "Имя",
      namePh: "Как к вам обращаться",
      email: "Email",
      emailPh: "you@company.com",
      company: "Компания",
      companyPh: "Название компании (необязательно)",
      message: "Задача",
      messagePh: "Коротко опишите, что хотите автоматизировать",
      submit: "Отправить заявку",
      sending: "Отправляем…",
      successTitle: "Заявка отправлена",
      successText: "Спасибо! Мы свяжемся с вами в ближайшее время.",
      error: "Не удалось отправить. Попробуйте ещё раз или напишите нам на почту.",
      errName: "Введите имя",
      errEmail: "Введите корректный email",
      errMessage: "Опишите задачу (минимум 10 символов)",
    },
    directLabel: "Или напишите напрямую",
    email: "hello@vels.industries",
  },
  footer: {
    tagline: "Автономные AI-агенты для бизнеса.",
    rights: "© 2026 Vels Industries. Все права защищены.",
    backTop: "Наверх",
  },
};

export type Dictionary = typeof ru;

const en: Dictionary = {
  nav: {
    about: "About",
    services: "What we do",
    solutions: "Solutions",
    cases: "Cases",
    clients: "Clients",
    contact: "Contact",
  },
  actions: {
    contact: "Contact us",
    langName: "EN",
  },
  hero: {
    badge: "AI · AUTOMATION",
    title: "AI agents that work for you",
    subtitle:
      "Vels Industries designs, trains and integrates autonomous AI agents that automate routine work and scale your business processes.",
    primaryCta: "Start a project",
    secondaryCta: "View cases",
    scroll: "Scroll down",
  },
  about: {
    label: "01 — About",
    title: "A team that turns AI into a working business tool",
    text: "Vels Industries is a group of engineers and ML specialists who design AI agents for specific tasks. We run the project from audit and prototype to production and growth — no buzzwords, just measurable results.",
    metrics: [
      { value: "50+", label: "agents deployed" },
      { value: "12", label: "industries" },
      { value: "98%", label: "client retention" },
      { value: "×3", label: "process efficiency gain" },
    ],
  },
  services: {
    label: "02 — What we do",
    title: "The full cycle of building AI agents",
    items: [
      {
        title: "Agent development",
        text: "We design and train autonomous AI agents for your task — from logic to interface.",
      },
      {
        title: "Process integration",
        text: "We embed agents into existing systems, CRMs and communication channels without downtime.",
      },
      {
        title: "Training on your data",
        text: "We fine-tune models on your knowledge and policies so the agent speaks your company's language.",
      },
      {
        title: "Support & growth",
        text: "We monitor quality, refine scenarios and scale agents as your needs grow.",
      },
    ],
    process: {
      title: "How we work",
      steps: [
        { no: "01", title: "Audit", text: "We study your processes and find automation points." },
        { no: "02", title: "Prototype", text: "We build a working agent and validate the hypothesis." },
        { no: "03", title: "Deployment", text: "We integrate into systems and ship to production." },
        { no: "04", title: "Growth", text: "We support, improve metrics and scale up." },
      ],
    },
  },
  solutions: {
    label: "03 — Solutions",
    title: "Where AI agents deliver results",
    subtitle: "Ready-made scenarios we adapt to your industry and stack.",
    items: [
      { title: "24/7 customer support", text: "The agent answers requests, resolves common cases and escalates the complex ones." },
      { title: "Sales automation", text: "Lead qualification, instant answers and deal support in real time." },
      { title: "Document processing", text: "Data extraction, validation and routing of documents without manual work." },
      { title: "Internal copilots", text: "Assistants for employees: knowledge-base search and task help." },
      { title: "Analytics & reporting", text: "The agent gathers data, builds reports and flags anomalies." },
    ],
  },
  cases: {
    label: "04 — Cases",
    title: "Results in numbers",
    note: "Demo data — to be replaced with your cases.",
    items: [
      { tag: "Fintech", title: "Support AI agent", result: "−40%", text: "reduced support load through automated request handling." },
      { tag: "E-commerce", title: "Sales agent", result: "+25%", text: "conversion growth thanks to real-time personal guidance." },
      { tag: "Logistics", title: "Document agent", result: "×5", text: "faster document processing and fewer data-entry errors." },
    ],
  },
  clients: {
    label: "05 — Clients",
    title: "Trusted by teams",
    note: "Logos are placeholders — to be replaced with yours.",
    logos: ["Northwind", "Quantica", "Verdex", "Aurora Labs", "Meridian", "Helix"],
  },
  contact: {
    label: "06 — Contact",
    title: "Ready to deploy your AI agent?",
    subtitle: "Leave a request — we'll discuss your task and propose a solution within one business day.",
    form: {
      name: "Name",
      namePh: "How should we address you",
      email: "Email",
      emailPh: "you@company.com",
      company: "Company",
      companyPh: "Company name (optional)",
      message: "Task",
      messagePh: "Briefly describe what you want to automate",
      submit: "Send request",
      sending: "Sending…",
      successTitle: "Request sent",
      successText: "Thank you! We'll get back to you shortly.",
      error: "Couldn't send. Please try again or email us directly.",
      errName: "Enter your name",
      errEmail: "Enter a valid email",
      errMessage: "Describe your task (at least 10 characters)",
    },
    directLabel: "Or email us directly",
    email: "hello@vels.industries",
  },
  footer: {
    tagline: "Autonomous AI agents for business.",
    rights: "© 2026 Vels Industries. All rights reserved.",
    backTop: "Back to top",
  },
};

export const content: Record<Lang, Dictionary> = { ru, en };
