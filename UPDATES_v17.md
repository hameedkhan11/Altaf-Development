# Version 17 — Separate Blogs and Articles

- Homepage now shows **Featured Article** and **Featured Blogs** independently, each with its own **VIEW ARTICLE** / **VIEW BLOG** button.
- `/media/articles` lists only the supplied local article, *Altaf Developments, Designing the Future of Living*.
- `/media/articles/altaf-developments-designing-the-future-of-living` is its detail page.
- `/media/blogs` and `/media/blogs/[slug]` show only previous published Sanity blog entries; the local article is no longer mixed in.
- Older bookmarks linking to that article via `/media/blogs/...` permanently redirect to `/media/articles/...`.
- Articles added to Media Center and footer navigation; article-specific links, sharing URLs, canonical metadata, RSS and shipped sitemap corrected.
- All three new events, customer review imagery, homepage visuals and full-resolution 360° tour images from v15/v16 are untouched.

**Sanity note:** Historical blog posts are in your original Sanity dataset, not embedded in the source ZIP. For them to appear, the deployed project must use the original `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET`, and the posts must remain published. When Sanity is unavailable, the website does not falsely display the new article as a blog.

## Testing after deployment
1. Homepage: verify two separate sections/buttons and article and blog card destinations.
2. `/media/articles`: verify exactly one supplied article and view it.
3. `/media/blogs`: verify only historical Sanity posts are displayed.
4. Test old article bookmark `/media/blogs/altaf-developments-designing-the-future-of-living` (should redirect).
5. Verify existing pages, events and virtual tours visually on desktop/mobile.
