# Website content update — v12

The original website layout, effects, and other sections are preserved.

- The Customer Reviews background now uses the exact JPEG from the supplied background ZIP (`public/customer-review-bg.jpg`).
- The supplied Word document contains **one** new article, “Altaf Developments, Designing the Future of Living.” The full text and seven images are published at `/media/blogs/altaf-developments-designing-the-future-of-living`.
- Article listing (`/media/blogs`), the home Featured Posts area, the article detail route, RSS feed, and sitemap now display only the newly supplied article. Old Sanity articles will no longer appear on this website.
- Pagination / Page 2 was removed; all new articles appear on the listing without pagination.
- New articles are managed in `src/data/articles.ts`, with photographs in `public/articles/`. No external CMS changes were made; old posts still exist in Sanity until separately deleted there.

## Run locally

From the project directory install dependencies with `npm ci --legacy-peer-deps`, then run `npm run dev`. The site may still require its original Cloudinary/Sanity and other environment settings for **unrelated existing sections**.

## Verification

Verified that all Word paragraphs and all seven images were transferred, links point to the replacement article, the new customer-review image matches the uploaded file, and the sitemap contains no old article links. All modified TypeScript/TSX files passed syntax parsing. Full Next.js build verification was not possible in this environment because npm dependency installation timed out.
