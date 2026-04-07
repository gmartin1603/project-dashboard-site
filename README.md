# Software Landing Template

Reusable Next.js template for project release websites that:

- explains the project
- highlights that the software is open source
- links to the public GitHub repository
- offers a paid Stripe checkout on the website
- still points people to the free public GitHub release

## What is included

- Next.js App Router site
- config-driven landing page content in `lib/site-config.ts`
- Stripe Checkout session route in `app/api/checkout/route.ts`
- success and cancel pages
- Stripe webhook fulfillment route in `app/api/stripe/webhook/route.ts`
- optional download email delivery through Resend

## Template behavior

This template is intentionally built around an open-source-first model:

- users can pay on the website for a smoother support-and-download flow
- users can also get the same release for free from GitHub
- the success page sends paid users to the public GitHub release URL

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy the example env file:

```bash
cp .env.example .env.local
```

3. Add your Stripe keys to `.env.local`.

4. Update `lib/site-config.ts` with:

- project name
- tagline and description
- public repo URL
- GitHub release URL
- license
- optional content sections

5. Start the site:

```bash
npm run dev
```

## Pricing

The default paid download price is `$3 USD`.

Change it with:

```env
NEXT_PUBLIC_DOWNLOAD_PRICE_USD=3
```

## Stripe notes

- `STRIPE_SECRET_KEY` is required for website checkout.
- `STRIPE_WEBHOOK_SECRET` is required for webhook verification.
- `RESEND_API_KEY` and `DOWNLOAD_EMAIL_FROM` are optional, but together they enable a follow-up email that sends the public download link after successful payment.
- Without the optional email provider, users still get the immediate success-page download link.

## Files to customize first

- `lib/site-config.ts`
- `.env.local`
- `app/page.tsx` if you want to reshape the layout or sections

## Routes

- `/` landing page
- `/success` post-checkout success page
- `/cancel` post-checkout cancel page
- `/api/checkout` Stripe Checkout session creator
- `/api/stripe/webhook` Stripe webhook endpoint
