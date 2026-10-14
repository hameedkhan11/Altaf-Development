/**
 * Locally supplied images for particular Sanity blog posts.
 * This keeps the original Sanity article content intact while ensuring the
 * website shows the updated editorial photographs in listings and previews.
 */
export interface BlogCoverOverride {
  src: string;
  alt: string;
}

export function getBlogCoverOverride(title: string): BlogCoverOverride | null {
  // Normalize punctuation, including typographic apostrophes, before matching.
  const normalized = title.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

  if (
    normalized.includes("discover faisal hills") ||
    normalized.includes("buyer s choice")
  ) {
    return {
      src: "/blogs/faisal-hills-buyers-choice.webp",
      alt: "Faisal Hills entrance and surrounding development at sunset",
    };
  }

  if (
    normalized.includes("islamabad s best area") ||
    (normalized.includes("families") && normalized.includes("overseas buyers"))
  ) {
    return {
      src: "/blogs/islamabad-best-area-overseas.webp",
      alt: "Faisal Hills landmark arch and surrounding city at sunset",
    };
  }

  if (/high rise (?:vs|versus) plot/.test(normalized)) {
    return {
      src: "/blogs/high-rise-vs-plot-new-photo.webp",
      alt: "High-resolution property photograph by Altaf Developments",
    };
  }

  if (
    normalized.includes("modern real estate") ||
    normalized.includes("choose altaf developments")
  ) {
    return {
      src: "/blogs/modern-real-estate-residences.jpg",
      alt: "The Residences by Altaf Developments architectural elevation",
    };
  }

  return null;
}
