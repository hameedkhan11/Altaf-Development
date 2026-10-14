# Website quality and stability updates — October 2026

## Virtual tour
- Added gently sharpened, 2x Lanczos-upscaled variants for corridor, living room, executive bedroom, master bedroom, and balcony, using the originally supplied panoramas as sources.
- Preserved all original full-resolution files under `public/virtual-tour/` (including the original 7K washroom panorama). The new variants are `*-hq.webp`.
- Improved WebGL panorama clarity: retina-aware rendering, geometry tessellation, antialiasing, up to 16x anisotropic texture filtering, and direct native texture loading (not Next/Image resampling).
- Added a fallback downsample only for GPU hardware that cannot handle a texture's original dimensions.
- Added wheel zoom and improved cleanup/error handling for changes between scenes.
- Reduced room headings to approximately twice the nearby body text. Removed background, border, and frosted-glass effect from room dimensions.

**Image fidelity note:** Scaling a 2048px panorama to 4096px cannot recover genuinely absent photographic detail. A higher-resolution original capture is required to achieve native 8K-equivalent sharpness. These improvements improve appearance but cannot guarantee no blur at every zoom level.

## Navigation / intro
- The opening logo animation restarts with each client-side pathname navigation.
- Fixed its center alignment in mobile view via viewport-centered positioning.

## Careers
- Removed 'Apply via Email' from the two website-managed openings.
- Kept WhatsApp applications pointed to `+92 333 0777775` with job-specific messages.
- Existing Sanity-managed jobs retain their own Apply Now destination.

## Images, event galleries, and site stability
- Raised Next.js image optimization quality to 90 for the pages/components examined and local hero quality to 95; Cloudinary hero quality now uses `auto:best`.
- Preserved responsive sizing to avoid loading excessively large resources on small screens.
- Corrected two pre-existing missing local event images using the images supplied for Quetta and Faisalabad.
- Checked 53 packaged image files: none corrupted. None outside virtual-tour exceeds 6 MiB.
- Checked 46 explicit local image paths, all exist.
- Parsed all 224 TypeScript/TSX source files, with zero syntax errors.
- ZIP integrity was verified.

## Unverified
- Full Next.js production build and deployed browser interactions were **not** verified because dependency installation could not finish in the available environment.
- Remote Cloudinary, Sanity, and ImageKit images cannot be audited for pixel-level sharpness using only this source archive.
- Mobile and desktop visual regression tests should be completed after deployment; the code has not been visually inspected in live browsers.
