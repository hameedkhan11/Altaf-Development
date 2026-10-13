# v14 — Bug fixes and speed improvements

This version is based on v13. It **preserves all existing pages, the supplied customer-review background, the latest article, and all three added event galleries and descriptions**.

## Verified fixes

- **Homepage article cards:** Replaced five hidden tablet/desktop copies of the same articles with one responsive grid. Mobile horizontal scrolling and existing article card styling remain.
- **Homepage article slider:** Suspends automatic movement while hidden and on desktop, respects reduced-motion preferences, and cleans up scheduled resume timers.
- **Header:** Replaced scroll-dependent repeated listener registration with a stable, passive listener and removed the empty resize listener.
- **Page intro:** Preserves the original initial animation but no longer restarts the 1.5-second overlay on every in-app route change.
- **Lazy loading:** Removed eager image priority from below-the-fold testimonials, amenities, gallery and home property cards. The supplied testimonial background remains unchanged.
- **Virtual tours:** Compressed/resized full-screen panorama textures without removing scenes. `public/virtual-tour/` dropped from ~22 MiB to ~6 MiB. Lowered maximum device pixel ratio in the viewer to reduce GPU work. Added one-day caching for panorama textures (with stale-while-revalidate).
- **Dead links:** Corrected the photos breadcrumb and broken 404/back-to-articles links. Added redirects from `/media` to `/media/blogs` and from `/properties/apartments` to `/properties` so existing breadcrumbs do not lead to 404 pages.
- **Nonfunctional controls:** Press Kit links to Contact so visitors can request it; Register for Event links to Contact so upcoming-event visitors can inquire. No press-kit download or event registration backend is invented.
- **Favicon:** Uses the existing `src/app/favicon.ico` instead of a nonexistent `/favicon.png`.
- **Analytics and SEO:** Google Analytics initial pageview isn't repeated by the route-change hook; script and hook use the same optional GA environment ID. Removed the redundant global FAQ schema (the homepage retains its schema).
- **Contact API:** No longer reports a successful contact delivery if the administrative notification actually failed. Validates types/lengths, escapes HTML in notification messages, and prunes expired entries from its simple per-process rate-limit store. These serverless rate limits are **not** a replacement for a shared production rate-limiter.
- **Newsletter API:** Prunes old per-process rate-limit entries and bounds input length.
- **Cloudinary resources endpoint:** This administrative endpoint (unused by the website components) now requires `Authorization: Bearer <token>` with a server-side `CLOUDINARY_RESOURCES_API_TOKEN`; its query parameters are bounded and validated. The website itself doesn't use this endpoint.
- **Tooling:** Fixed the lint command to invoke ESLint instead of the outdated `next lint` entry point, and removed obsolete `swcMinify` configuration.
- **Import path:** Corrected a missing SVG module import in an older auxiliary footer component, without altering the live footer.

## Verification performed

- Parsed/transpiled all 217 project TS/TSX/JS files with the TypeScript compiler: no syntax diagnostics.
- Checked locally bundled article and event slugs and verified all their referenced images exist.
- Verified all 38 raster image files decode correctly.
- Verified Next configuration JavaScript syntax.
- Verified local import/module paths and archive integrity.

**Not verified:** A complete `next build`, browser navigation/screenshot comparison, live Sanity integration, contact email delivery, third-party services, or Lighthouse lab scores. The package-install step timed out in the audit environment. Please run these commands in your usual project environment with the required environment variables:

```bash
npm ci --legacy-peer-deps
npm run lint
npm run build
npm run dev
```

The code uses the existing configuration for third-party services. Set `CLOUDINARY_RESOURCES_API_TOKEN` only if you intentionally use that administrative API from a separate authorized system.

## Unchanged

All customer-review copy/background, article content, previously added events, homepage section ordering, color palette, project information and existing photos are retained. The panorama photos are recompressed, so their pixels are not identical even though scenes/controls remain the same.
