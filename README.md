# Vels Industries

Минималистичный двуязычный (RU/EN) сайт технологической компании с упором на 3D-анимацию.
Полная спецификация — в [claude.md](claude.md).

## Стек
- **Next.js 15** (App Router) · **React 19** · **TypeScript**
- **Tailwind CSS v4** (дизайн-токены в `app/globals.css`)
- **three.js** + **@react-three/fiber** — морфирующий «AI-агент», реагирует на курсор и скролл
- **GSAP** / **Framer Motion** — анимации
- **react-hook-form** + **zod** — форма обратной связи
- **Resend** — доставка заявок на email

## Требования
- **Node.js 20 или 22 LTS** рекомендуется.
  > На **Node 24 + Windows** есть баг: `fs.readlink` на обычных файлах возвращает `EISDIR`,
  > из-за чего падает трассировщик зависимостей Next. В проект добавлен шим
  > [`patch-readlink.cjs`](patch-readlink.cjs), подключённый в `next.config.mjs`, — он чинит
  > сборку на Node 24 автоматически и безвреден на других версиях/ОС и на Vercel.

## Запуск
```bash
npm install
npm run dev        # http://localhost:3000
```

## Сборка
```bash
npm run build
npm run start
```

> Подсказка: исключите папку проекта из антивируса (Windows Defender) — Next предупреждает
> о «slow filesystem», это ускорит сборку.

## Форма обратной связи (email)
Форма работает сразу: без ключей заявка валидируется и логируется в консоль сервера
(ответ `delivered:false`). Для реальной отправки на почту создайте `.env.local`
(шаблон — [`.env.example`](.env.example)):

```
RESEND_API_KEY=...            # ключ из https://resend.com
CONTACT_TO_EMAIL=...          # куда приходят заявки
CONTACT_FROM_EMAIL=...        # верифицированный отправитель (для теста: onboarding@resend.dev)
```

## Структура
```
app/
  layout.tsx              шрифты, метаданные, провайдеры, фон-3D, шапка/подвал
  page.tsx                сборка 7 секций
  globals.css             токены, базовые стили, утилиты
  api/contact/route.ts    приём заявок → Resend
  icon.svg                favicon
  opengraph-image.tsx     OG-картинка для соцсетей
components/
  three/                  SceneBackground (фон), Scene (Canvas), AgentParticle, шейдер
  sections/               Hero, About, Services, Solutions, Cases, Clients, Contact, ContactForm
  layout/                 Header, Footer
  ui/                      Container, Button, Badge, SectionHeading, Reveal, LanguageToggle
  Logo.tsx
lib/
  i18n/                   словари RU/EN + провайдер языка
  validation.ts           zod-схема формы
  utils.ts
```

## Деплой
Готов к деплою на **Vercel** (Next.js из коробки). Не забудьте задать переменные окружения
для формы в настройках проекта.
```
