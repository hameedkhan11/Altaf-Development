# Altaf Developments — Property Interest Landing Page

**URL:** `/register` (for example, `https://www.altafdevelopments.com/register` once deployed)

## What's included
- A standalone mobile-responsive branded landing page, using the existing Altaf logo and The Residences imagery.
- Form fields matching the Meta form screenshot: apartment type, preferred payment plan, purchase timing, preferred contact channel, full name, phone, email, and city.
- An opt-in checkbox for follow-up contact.
- A **preview-only** interaction with client-side required-field checks and a confirmation that nothing was sent.
- No navigation link added from the main website, so you can review the new page directly.
- `noindex` metadata during preview and `/register` excluded from the sitemap.

## Not connected (deliberate)
- **Fortify CRM:** no external API call or database storage.
- **Meta `Lead` event:** not fired. The existing site-wide Meta Pixel may still log normal `PageView` events on the new route.
- **Email / WhatsApp:** no notifications are generated.

## Before using the page in actual Meta Ads
1. Obtain Fortify's verified lead-creation API/webhook documentation, authentication method, field mapping, and test account from the client.
2. Create a server-side API endpoint with validation, spam prevention, rate limits, and a reliable Fortify success check. Keep Fortify credentials in Vercel environment variables, never in client-side code.
3. Replace the form's preview submit handler with a secure `POST` to that endpoint. Show success *only* after the CRM has confirmed receipt.
4. Add Meta Pixel `Lead` conversion after a confirmed submission and any required tracking consent. If adding Meta Conversions API, deduplicate browser/server events with matching names and event IDs.
5. Record consent properly, finish the privacy notice, verify the payment and apartment choices with the business, and test on mobile.
6. Remove the preview notices, change the submit button text to 'Submit enquiry', remove `noindex` metadata **and remove `/register` from `next-sitemap.config.js`'s exclusion list** when the page is ready.

## Run locally
```bash
npm install --legacy-peer-deps
npm run dev
```
Visit `http://localhost:3000/register`.

## Modified or added files
- `src/app/register/page.tsx` (new)
- `src/components/lead/RegistrationPreviewForm.tsx` (new)
- `LANDING_PAGE_PREVIEW_NOTES.md` (new)
- `next-sitemap.config.js` (updated: exclude preview URL)

The main homepage, existing forms, careers, media center, virtual tour and existing Meta Pixel files were not modified.
