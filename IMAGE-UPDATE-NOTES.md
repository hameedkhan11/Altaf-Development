# Image update — High-Rise vs Plot

- The High-Rise vs Plot blog card on the homepage and Other Blogs listing now displays `public/blogs/high-rise-vs-plot-new-photo.webp`.
- Extracted the best embedded JPEG from the provided Sony ARW (7008 x 3944 pixels), then saved in high-quality WebP. The original full-resolution RAW sensor data could not be developed in this environment; this is a lossless conversion **of the embedded preview**, not a full-resolution conversion of the RAW.
- All pre-existing website raster assets were already under 6 MB (6,000,000 bytes), so no destructive recompression was applied. Virtual-tour images were left untouched.
- Sanity CMS still holds the previous image for the blog's internal rich-text body; update that image in Sanity if it also appears there.
