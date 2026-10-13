# Website events update — v13

The existing v12 website design, new articles, review background, and all other pages are preserved.

## Events added

- **Quetta Open House** at Serena Hotel, Quetta (9 August; year assumed 2026 for chronological placement because the supplied description does not specify a year). Three photos.
- **The Residences Faisalabad Expo 2026** at Serena Hotel, Faisalabad (20 September 2026). Five photos.
- **Peshawar Open House** at Serena Hotel, Peshawar (1 February 2026). Four photos.

Each event is listed in `src/data/events.ts`. The supplied photo collection is optimized into WEBP images in `public/events/` for fast loading; all 12 usable source images are represented. Description copy was polished and made consistent in length without inventing new attendees or facts. The unknown start times were deliberately left blank.

The three new event URLs are also included in the sitemap for discoverability.

## Existing events

The original website's events are fetched from the existing Sanity dataset as before, and the new local events are merged with them in the listing and detail routes. **No Sanity records were deleted or changed.** Sanity content continues to depend on the website's original environment settings. If the CMS is not configured, the three new local event pages still render, provided the original project can start.

## Run the project

Install dependencies from the project folder with `npm ci --legacy-peer-deps`, then `npm run dev`. Visit `/media/events` and the corresponding event URLs to verify imagery and descriptions.

## Date clarification

Quetta event description does not mention a year; **2026 was inferred** from the supplied event collection, and it can be updated in `src/data/events.ts` if necessary. The page does not invent an event start time.
