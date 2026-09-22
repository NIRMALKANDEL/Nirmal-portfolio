# Nirmal Kandel — Portfolio

Personal portfolio for **Nirmal Kandel**, Full Stack / MERN Stack Developer. Built with Next.js App Router, TypeScript and Tailwind CSS.

**Live site:** [nirmal-portfolio-eta.vercel.app](https://nirmal-portfolio-eta.vercel.app)

## Tech Stack

- **Framework:** Next.js 16 (App Router, Server + Client Components, `next/image`, `next/og`)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Animation:** subtle CSS transitions + Framer Motion available
- **Icons:** lucide-react + custom inline brand icons (GitHub/LinkedIn/WhatsApp)
- **Email:** Resend (contact form, server-side only)

## Features

- Dark mode by default with a deliberately designed light mode (not an inversion)
- English / Hindi language switch backed by centralized translation files
- Tech / Beyond Code mode switch (`/` vs `/non-tech`) — non-tech experience never competes visually with the core developer identity
- Curated, data-driven project content (`src/data/projects.ts`) verified against the real GitHub repositories — no invented features, metrics or URLs
- Dynamic project case-study pages (`/projects/[slug]`)
- Skills section with a skills timeline (`src/data/timeline.ts`) built from GitHub repo dates and work history
- Server-side contact form (`/api/contact`) with validation, loading/success/error states
- SEO: metadata per route, sitemap, robots.txt, generated favicon + OG image
- Mobile-first responsive layout, accessible navigation, `prefers-reduced-motion` respected

## Project Structure

```
src/
  app/                # routes (App Router)
    about/ projects/ projects/[slug]/ experience/ education/ non-tech/ contact/
    api/contact/route.ts
    layout.tsx  page.tsx  sitemap.ts  robots.ts  icon.tsx  opengraph-image.tsx
  components/         # UI, organized by feature (navbar, hero, projects, ...)
  context/            # theme + language context (useSyncExternalStore based)
  data/               # content: site.ts, projects.ts, experience.ts, education.ts,
                       # skills.ts, non-tech.ts, about.ts, translations/{en,hi}.ts
  lib/                # utils
public/
  projects/           # project preview images (SVG placeholders — swap for real screenshots)
  resume.pdf          # downloadable resume
```

## Local Setup

```bash
npm install
npm run dev
```

Visit http://localhost:3000.

## Environment Variables

Copy `.env.example` to `.env.local` and fill in:

| Variable | Purpose |
| --- | --- |
| `RESEND_API_KEY` | API key from [resend.com](https://resend.com) (free tier) used to send contact form emails. Without it, the form returns a friendly "not configured yet" error instead of failing silently. |
| `CONTACT_TO_EMAIL` | Inbox that receives contact form messages. Defaults to the email in `src/data/site.ts`. |
| `CONTACT_FROM_EMAIL` | Sender address — must be a verified domain/sender in Resend. |

## Resume

The resume lives at `public/resume.pdf`. The "Download Resume" buttons in the Hero and Contact areas link to `/resume.pdf`.

## Available Routes

| Route | Description |
| --- | --- |
| `/` | Home — hero, skills, featured projects, experience/education preview, Beyond Code teaser, contact CTA |
| `/about` | Full bio |
| `/projects` | All projects |
| `/projects/[slug]` | Case study (`netflix-gpt`, `devtinder`, `nibblr`, `brightway-solar`, `nextjs-video-app`, `mern-todo`) |
| `/experience` | Full work history |
| `/education` | Full education history |
| `/non-tech` | Beyond Code — events, operations & community experience |
| `/contact` | Contact form + direct links |

## Deployment (Vercel)

Deployed on Vercel at **https://nirmal-portfolio-eta.vercel.app**. The Vercel project is connected to this GitHub repo, so every push to `master` triggers a new production deployment.

To set up your own copy:

1. Import the repo in [Vercel](https://vercel.com/new).
2. Add the environment variables from `.env.example` in the Vercel project settings.
3. Deploy — no additional build configuration required.
