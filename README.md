# Toqa Fathey — Portfolio

Editorial, luxury-style portfolio for **Toqa Fathey, Social Media Specialist & Content Creator**.

Stack: React 18 · TypeScript · Tailwind CSS 3 · Three.js (plain Three.js, no React Three Fiber) · Vite · lucide-react.

> **Build status:** the code was written in a workspace where the npm registry was blocked, so `npm install`, the
> TypeScript check, `npm run build` and a browser check have **not been run yet**. Run them first and report any errors.

## Run it

```bash
npm install
npm run dev      # local preview
npm run build    # type-check + production build into dist/
npm run preview  # serve the production build locally
```

Requires Node 18+.

## Publish

`dist/` is a static site. Upload it to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
Build command `npm run build`, output directory `dist`. No environment variables or backend are needed.
After deploying, set the canonical URL and Open Graph image in `index.html` (both are commented placeholders).

## Where to edit things

| What | File |
| --- | --- |
| Name, headline, intro, About copy, contact details, CV path, social links | `src/data/siteConfig.ts` |
| Experience (feeds the 3D timeline and the 2D fallback; no dates are shown) | `src/data/experienceData.ts` |
| Featured projects, case studies, image lists, filters | `src/data/projects.ts` |
| Skills, tools, brand logos, approach, education | `src/data/content.ts` |
| Colors (original palette: charcoal `#171717`, rich black `#101010`, ivory, cream, champagne gold) and fonts | `tailwind.config.js`, `index.html` |

## Real content currently on the site

- Hero photo: `public/images/profile/toqa-fathey-profile.webp`.
- CV: `public/documents/Toqa-Fathey-CV.pdf` (copied unchanged from the supplied file).
- Contact details come from the CV: email, LinkedIn (tracking parameters removed), two phone numbers, Cairo.
- Brand logos: `public/images/brands/`.
- Featured projects: Vet Home (6 designs), Al Mohamadia Medical Complex (6 designs and 4 website article screenshots), C.la.v57 (6 designs). Najm Digital Marketing (2 design ideas for its client LA Marketing).
- Images were converted to WebP with English file names. To add or swap a sample, put the file in `public/images/portfolio/` and list it under `groups` in `projects.ts`.

## Open points to confirm

1. The Najm card shows only 2 design ideas for LA Marketing. Add more samples in `projects.ts` if you have them.
2. Remove a phone number or the location in `siteConfig.ts` if you prefer not to show it.
3. The Content Calendars screenshots are not used.

## Publish

`dist/` is a static site. Upload it to any static host (Netlify, Vercel, Cloudflare Pages, GitHub Pages).
Build command `npm run build`, output directory `dist`. No environment variables or backend are needed.
After deploying, set the canonical URL and Open Graph image in `index.html` (both are commented placeholders).

## Where to edit things

| What | File |
| --- | --- |
| Name, headline, intro, About copy, contact details, CV path, social links | `src/data/siteConfig.ts` |
| Experience (feeds the 3D timeline and the 2D fallback; no dates are shown) | `src/data/experienceData.ts` |
| Featured projects, case studies, image lists, filters | `src/data/projects.ts` |
| Skills, tools, brand logos, approach, education | `src/data/content.ts` |
| Colors (original palette: charcoal `#171717`, rich black `#101010`, ivory, cream, champagne gold) and fonts | `tailwind.config.js`, `index.html` |

## Real content currently on the site

- Hero photo: `public/images/profile/toqa-fathey-profile.webp`.
- CV: `public/documents/Toqa-Fathey-CV.pdf` (copied unchanged from the supplied file).
- Contact details come from the CV: email, LinkedIn (tracking parameters removed), two phone numbers, Cairo.
- Brand logos: `public/images/brands/`.
- Featured projects: Vet Home (6 designs), Al Mohamadia Medical Complex (6 designs and 4 website article screenshots), C.la.v57 (6 designs). Najm Digital Marketing (2 design ideas for its client LA Marketing).
- Images were converted to WebP with English file names. To add or swap a sample, put the file in `public/images/portfolio/` and list it under `groups` in `projects.ts`.

## Open points to confirm

1. "Nusuk" vs "Nusk": the supplied logo reads "nusuk", so the site uses Nusuk.
2. The `LA` folder (two designs with a red LA logo) is not used because the client is not identified.
3. Tools Notion, Trello, Veo 3 and Grok were added from an earlier message; Flow is not listed until confirmed.
4. The CV email (`toqafathey98@gmail.com`) is used on the site.
5. Remove a phone number or the location in `siteConfig.ts` if you prefer not to show it.
6. The Content Calendars screenshots are not used.

## Publish

`dist/` is a static site. Upload it to any static host. No environment variables or backend are needed. After deploying, set the canonical URL in `index.html` (commented placeholder).

There is deliberately no contact form: no delivery service is configured. To add one later, use a service such as Formspree or Web3Forms and show success only after the service confirms delivery.

## How the Three.js timeline works

- `experienceData.ts` defines the entries. `ExperienceTimeline` takes every entry that is not hidden and passes the employer names to the scene.
- `SceneController` builds the scene: perspective camera, ambient/key/rim lights, a moving focus light, a curved
  path (`TimelinePath`), one faceted marker per entry (`TimelineMilestone`, sharing geometry), and a few particles.
- Hover or click on a marker highlights it and selects its entry; the HTML milestone buttons below the scene do the
  same, support arrow keys, Home/End, and mirror hover into the scene. The detail panel is plain HTML with
  previous/next/deselect controls.
- Scrolling reveals the gold path and selects the matching milestone until you choose one yourself
  ("Follow scroll again" resumes). Scrolling is never intercepted.
- The scene mounts only near the viewport, loads lazily, pauses rendering when offscreen, renders on demand with
  `prefers-reduced-motion` (no camera movement, no particles), and disposes geometries, materials, listeners, the
  renderer and the WebGL context on unmount.
- Phones (under 768px) and devices without WebGL get a 2D timeline with the same content.
- Adding or editing a role means editing `experienceData.ts` only. The scene adapts to the number of entries.
