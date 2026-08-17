# Wincy Software Solutions


## Tech Stack

- **React 19** + **TypeScript**
- **Vite 6** — build tooling
- **React Router 7** — client-side routing
- **Tailwind CSS 3** — utility-first styling, custom White/Orange theme
- **Framer Motion** — scroll reveals, hover/tap animations, counters
- **Lucide React** — icon set

## Getting Started

```bash
npm install
npm run dev
```

The dev server starts at `http://localhost:5173`.

## Available Scripts

| Command           | Description                                  |
| ----------------- | --------------------------------------------- |
| `npm run dev`      | Start the Vite dev server with HMR            |
| `npm run build`    | Type-check and build a production bundle to `dist/` |
| `npm run preview`  | Preview the production build locally          |
| `npm run lint`     | Run ESLint                                     |
| `npm run typecheck`| Run the TypeScript compiler with no emit       |

## Project Structure

```
src/
  components/     Navbar, Mainframe, Services, About, Stats, Projects,
                   Testimonials, WhyChooseUs, CTA, Contact, Footer,
                   Logo, ScrollProgress, BackToTop, SEO
  pages/          Home, NotFound
  hooks/          useCountUp, useSEO
  utils/          siteContent.ts — all site content (services, projects,
                   testimonials, stats, nav links, contact info)
  assets/         logo-light-bg.png, logo-dark-bg.png — brand logo,
                   one variant per background it's shown on
  styles/         index.css — Tailwind layers + design tokens
  App.tsx         Router + layout shell
  main.tsx        App entry point
public/
  favicon-16x16.png, favicon-32x32.png   Browser tab icon
  apple-touch-icon.png                    iOS home screen icon
  android-chrome-192x192.png, -512x512.png  Android/PWA icons
  site.webmanifest                        PWA manifest referencing the above
  robots.txt
  sitemap.xml
```

Content (copy, service list, project cards, testimonials, contact
details) lives entirely in `src/utils/siteContent.ts` — edit that file
to update site content without touching component code.

## Theme

Defined in `tailwind.config.js` and available as Tailwind utilities:

| Token             | Value              | Usage                        |
| ----------------- | ------------------ | ----------------------------- |
| `primary`          | `#FF7A00`          | Buttons, links, accents       |
| `secondary`        | `#FFA940`          | Gradient end color            |
| `surface`          | `#FFFFFF`          | Page background                |
| `surface-light`    | `#FFF8F2`          | Section alternate background   |
| `ink`              | `#1A1A1A`          | Headings/body text             |
| `ink-gray`         | `#666666`          | Secondary text                 |
| `accent`           | `#FFE5CC`          | Soft highlight backgrounds     |
| `rounded-card`     | `16px`             | Card corner radius             |

## SEO

- Meta tags, Open Graph and Twitter Card tags in `index.html`
- Per-page overrides via the `<SEO />` component (`src/components/SEO.tsx`)
- `Organization` JSON-LD (Schema.org) in `index.html`
- `public/robots.txt` and `public/sitemap.xml` included

Before going live, update the placeholder domain
(`www.wincysoftwaresolutions.com`) in `index.html`,
`src/components/SEO.tsx`, `public/robots.txt` and `public/sitemap.xml`
to your real domain, and swap in a real `og-cover.png` social preview
image.

## Contact Form

The contact form (`src/components/Contact.tsx`) sends submissions to
[Formspree](https://formspree.io) — no backend server or SMTP
credentials are needed, so nothing secret ever ships in the bundle.

**Why Formspree:** the alternative for a static site is putting SMTP
credentials (or an API key for a mail provider) directly in frontend
code, which means anyone can read them out of the built JS and use
your mail account to send spam. Formspree instead gives you a public
form endpoint ID — safe to expose client-side by design — and keeps
your real inbox address, spam filtering, and rate limiting on their
server.

Setup:

1. Create a free form at [formspree.io](https://formspree.io) and
   point it at the inbox that should receive submissions.
2. Copy `.env.example` to `.env.local` and set
   `VITE_FORMSPREE_ID` to the form ID Formspree gives you.
3. Restart the dev server (env vars are read at build/start time).
4. Set the same `VITE_FORMSPREE_ID` env var in your host's dashboard
   (Netlify/Vercel project settings) before deploying, or the form
   will show an error state instead of sending.

Additional protections already built in:

- A hidden honeypot field (`_gotcha`) silently discards bot
  submissions without bothering Formspree's spam filter.
- The submit button disables and shows a loading state while the
  request is in flight, preventing duplicate submissions.
- On failure, the form shows an error message with a `mailto:` link
  to `contactInfo.email` as a fallback so a visitor can always reach
  you even if the form backend is down or misconfigured.

## Deployment

The app builds to static files in `dist/` and can be hosted anywhere
that serves static assets.

### Netlify

1. Push the repository to GitHub/GitLab/Bitbucket.
2. In Netlify: **New site from Git** → select the repo.
3. Build command: `npm run build`
4. Publish directory: `dist`

Or via CLI:

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

### Vercel

1. Import the repository in Vercel.
2. Framework preset: **Vite**
3. Build command: `npm run build`
4. Output directory: `dist`

Or via CLI:

```bash
npm run build
npx vercel --prod
```

### GitHub Pages

1. Set `base` in `vite.config.ts` if deploying to a project page
   (e.g. `base: '/your-repo-name/'`) — the default `base: '/'` already
   works for a GitHub Pages user/org site served from the domain root.
2. Build and deploy the `dist/` folder:

```bash
npm run build
npx gh-pages -d dist
```

(Requires `npm install -D gh-pages` first.)

### Client-side routing on refresh/deep links

The app uses React Router's `BrowserRouter`, so any static host must be
told to fall back to `index.html` for unknown paths instead of
returning its own 404:

- **Netlify** — `public/_redirects` (`/* /index.html 200`) is already
  included and copied into `dist/` on build.
- **Vercel** — `vercel.json` at the project root already rewrites all
  paths to `/index.html`.
- **GitHub Pages** — has no server-side rewrites, so the `postbuild`
  script copies `dist/index.html` to `dist/404.html`, which GitHub
  Pages serves for unmatched paths and lets the router take over.

## Browser Support

Targets all evergreen browsers (Chrome, Firefox, Safari, Edge) on
desktop and mobile. Layout is fully responsive from 360px mobile
widths through large desktop breakpoints.

## License

Proprietary — © Wincy Software Solutions. All rights reserved.
