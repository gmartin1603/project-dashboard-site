# Project Dashboard Site

Marketing and release website for [Project Dashboard](https://github.com/gmartin1603/project-dashboard).

This site is built from the `software-landing` template and keeps the same open-source-first model:

- visitors can support the project with a paid Stripe checkout
- visitors can still download the public release for free from GitHub
- the public repository is linked directly from the landing page

## Local development

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Environment variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_DOWNLOAD_PRICE_USD`
- `SITE_THEME`
- `SHOW_THEME_SWITCHER`
- `STRIPE_SECRET_KEY`
- `STRIPE_WEBHOOK_SECRET`
- Optional:
  - `RESEND_API_KEY`
  - `DOWNLOAD_EMAIL_FROM`

Without the Stripe keys, the site still runs and the free GitHub download path remains available.

## Themes

- `SITE_THEME` sets the default landing-page theme. Available values: `classic`, `neon-editorial`, `paper-atelier`, `industrial-terminal`, `cyberpunk`, `minimal-zen`, `comic-book`
- `SHOW_THEME_SWITCHER` controls whether the in-page theme selector is visible

## Key files

- `lib/site-config.ts` project-specific content and release links
- `app/page.tsx` landing page layout
- `app/api/checkout/route.ts` Stripe checkout session creation
- `app/api/stripe/webhook/route.ts` optional post-purchase email fulfillment
