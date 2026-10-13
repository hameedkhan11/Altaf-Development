# Version 16 — Restore blogs

- Restored pre-existing published blog posts from the original Sanity CMS (requires working NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET and published posts still available in Sanity).
- Preserved the new Altaf Developments local editorial post alongside the old ones.
- Replaced user-facing Articles labels with Blogs.
- Preserved a single blogs list without page-2 pagination.
- Existing blog URLs remain /media/blogs/[slug] and original Sanity detail content is rendered using original components.
- Preserved v15 high-resolution virtual tour files and optimizations.
- Sanity errors degrade gracefully to local blog only.

Note: The original posts were not embedded in the supplied v11 source archive. They must still exist in the configured Sanity dataset.
