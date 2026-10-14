# Two Blogs photo replacements — October 2026

## Where the changes appear

- **Discover Faisal Hills: A Buyer's Choice** — replaces the former low-resolution Faisal Hills entrance image with the provided sunset entrance photo, `public/blogs/faisal-hills-buyers-choice.webp`.
- **Islamabad's Best Area for Families & Overseas Buyers** — replaces the former arch image with the provided new sunset arch photograph, `public/blogs/islamabad-best-area-overseas.webp`.

Both source PNGs were **2048 × 1529**, converted to **lossless WebP** with preserved RGB pixel values. Each is under 6 MiB. No cropping, artificial enhancement, or reduced resolution.

`src/lib/blogCoverOverrides.ts` centralizes title-based image overrides so the new photos appear on the Other Blogs list, homepage previews (when shown), related blog cards, and corresponding detail-page Open Graph metadata. Other image overrides were retained. The Sanity-hosted article bodies and assets are not deleted or modified.

To see changes, deploy the updated Next.js project and allow caches/ISR pages to refresh (the Other Blogs route is configured to revalidate after 300 seconds).
