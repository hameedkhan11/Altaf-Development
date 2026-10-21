# Altaf Developments — Website Audit (15 October 2026)

This project is based on `Altaf-Developments-Two-Blog-Photos-Updated.zip` and retains all pre-existing media assets byte-for-byte. The audit checks are code/static integrity checks; they are **not** an assertion that every remote service, browser, or deployment works without error.

## Confirmed fixes in this delivery

1. **Virtual tour too dark:** Removed the full-screen `.tour-shade` overlay. Its previous top gradient reached 55% darkness and bottom gradient reached 82% darkness. The new tour displays the image without that full-frame darkening overlay.
2. **Panorama color fidelity:** Set Three.js to `NoToneMapping` and made the unlit panorama material explicitly `toneMapped: false`. SRGB output/textures are retained. Lighting, tone mapping and page-wide overlays do not darken the image. The tour source files and upscaled panorama variants are unchanged.
3. **Blog READ MORE button markup:** Removed nested button-inside-link elements, which are invalid interactive nesting and can trigger hydration/accessibility issues.
4. **Mobile amenity swipe:** Replaced a falsey-coordinate check with an explicit null check, so touch gestures starting at pixel coordinate zero are not ignored.
5. **Contact submissions recipient:** Contact form notification email now targets the confirmed company inbox, `info@altafdevelopments.com`, rather than depending on an optional/stale `ADMIN_EMAIL` deployment variable. Valid Resend credentials and a verified sender address remain required.
6. Added `npm run verify:static`, a self-contained reusable validation script.

## Prior user-requested changes verified in the source

- Featured Blogs and Other Blogs are separate views; former Articles paths redirect to Blogs.
- In the featured editorial article, **The Vision of Altaf Khan** precedes **A Vision Beyond Construction**.
- New Blogs/Events/Photo Gallery hero image files are present and referenced.
- The requested local blog cover overrides and event gallery images are present.
- The Faisal Hills project details include **Plot Size: 12.5 Kanal**.
- The Faisal Hills carousel contains the additional images.
- Virtual-tour dimensions cover seven rooms and the dimension labels have no background.
- The virtual-tour section contains five updated panoramas and the retained washroom panorama.
- Careers includes Sales Executive and Influencer / Content Creator; website-managed applications lead to WhatsApp **+92 330 2007522**, not an application email button.
- Website contact email references use **info@altafdevelopments.com**.
- The page-intro logo component re-mounts on client-side pathname changes and uses viewport-relative centering.

## Verification performed

| Test | Result |
| --- | --- |
| TypeScript / TSX parsing | 225 files, 0 parse errors |
| Relative source imports | 322 checked, 0 missing |
| Explicit static image/video paths | 84 checked, 0 missing after accounting for Next.js app favicon and remote ImageKit assets |
| Local packaged photos/images | 55 checked/decoded, 0 corrupt |
| Non-virtual-tour local images above 6 MiB | 0 |
| Virtual tour full-frame shading | Removed |
| Tour source asset content | All existing `public/` bytes unchanged |
| Repeatable static check | `npm run verify:static` passed |
| Final ZIP | Integrity checked after packaging |

The `src/components/property-detail/PropertyDetailAmenities.tsx` amenity icons are served by **ImageKit** rather than from `public/icons/`; a configured `NEXT_PUBLIC_URL_ENDPOINT` and available remote assets are required for them. The built-in Next.js `src/app/favicon.ico` is correctly handled by the App Router.

## Remaining validation before you deploy

The production Next.js build **could not be run in this environment**. The npm registry DNS lookup failed (`Could not resolve host: registry.npmjs.org`), and a dependency installation attempt exited with an npm internal error. No functional WebGL/mobile browser simulation, real WhatsApp conversation, real email delivery, or live CMS/API test has therefore been claimed.

A future dependency audit should also review `react-day-picker@8.10.1`, which declares peer compatibility through React 18, whereas the project currently uses React 19. It is not imported by a current page, but the library remains in `package.json` and might affect strict dependency installs. Do not upgrade it without reviewing its `calendar.tsx` adapter and running the full build.

For deployment, confirm the actual hosting environment provides the appropriate Sanity, Cloudinary, ImageKit, Resend, MailerLite and other site-specific variables. **No secrets are included** in the ZIP. Old Sanity-managed blog content can only be verified with access to the live Sanity project.

Recommended verification after uploading to GitHub/deployment:

```bash
npm ci --legacy-peer-deps
npm run verify:static
npm run build
npm start
```

Then visually check the virtual tour on desktop and at least one physical mobile device, all Blogs and Events pages, carousel interactions, Careers WhatsApp application links, the contact form with a real controlled submission, and all server-side routes. A complete production build and real-browser checks are the remaining steps to assessing production readiness.
