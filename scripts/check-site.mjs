/**
 * Run with: npm run verify:static
 * No packages or live credentials are needed for these project integrity checks.
 * A passing result does NOT replace a production build and browser testing.
 */
import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { resolve, relative, dirname, extname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const src = join(root, 'src');
const publicDir = join(root, 'public');
const errors = [];
let checkedImports = 0;
let checkedImages = 0;
let checkedAssets = 0;
const fail = (message) => errors.push(message);
const read = (name) => readFileSync(join(root, name), 'utf8');
const walk = (dir) => readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
  const p = join(dir, entry.name);
  return entry.isDirectory() ? walk(p) : [p];
});
const sourceFiles = walk(src).filter(p => /\.(?:tsx?|jsx?|css|mjs)$/.test(p));
const imageFiles = walk(publicDir).filter(p => /\.(?:png|jpe?g|webp|gif|avif|ico)$/i.test(p));
const maxNonTour = 6 * 1024 * 1024;
for (const file of imageFiles) {
  checkedImages++;
  const bytes = statSync(file).size;
  const rel = relative(root, file);
  if (bytes === 0) fail(`Empty image: ${rel}`);
  if (!rel.includes('virtual-tour') && bytes > maxNonTour) fail(`Oversize non-tour image (>6 MiB): ${rel}`);
}
for (const file of sourceFiles) {
  const content = readFileSync(file, 'utf8');
  const rel = relative(root, file);
  if (file.endsWith('MapPage.tsx')) continue; // Fully commented-out sample code.
  const imports = content.matchAll(/(?:\bfrom\s*|\bimport\s*\(|\brequire\s*\()\s*['"]([^'"]+)['"]/g);
  for (const [, specifier] of imports) {
    if (!specifier.startsWith('.') && !specifier.startsWith('@/')) continue;
    checkedImports++;
    const path = specifier.startsWith('@/') ? join(src, specifier.slice(2)) : resolve(dirname(file), specifier);
    const candidates = [path, ...['.ts','.tsx','.js','.jsx','.json'].map(s => path+s), ...['index.ts','index.tsx','index.js','index.jsx'].map(s => join(path,s))];
    if (!candidates.some(p => existsSync(p) && statSync(p).isFile())) fail(`Missing import in ${rel}: ${specifier}`);
  }
  const staticAssets = content.matchAll(/['"](\/[^'"\\\s<>?]+\.(?:png|jpg|jpeg|webp|gif|avif|svg|ico|mp4|webm))(?:\?[^'"]*)?['"]/gi);
  for (const [, asset] of staticAssets) {
    checkedAssets++;
    if (asset === '/favicon.ico' && existsSync(join(src,'app','favicon.ico'))) continue; // App Router convention.
    if (rel.endsWith('PropertyDetailAmenities.tsx') && asset.startsWith('/icons/icon')) continue; // ImageKit CDN assets.
    if (rel.includes('media/events/[slug]/') && asset.startsWith('/peshawar-open-house-')) continue; // A pathname endsWith test.
    if (!existsSync(join(publicDir,asset.slice(1)))) fail(`Missing public asset in ${rel}: ${asset}`);
  }
}
const panorama = read('src/components/media/PanoramaTour.tsx');
const tourCss = read('src/components/media/panorama-tour.css');
if (panorama.includes('className="tour-shade"') || /\.tour-shade\s*\{/.test(tourCss)) fail('Full-screen tour shading layer is still enabled');
if (!panorama.includes('toneMapped: false') || !panorama.includes('NoToneMapping')) fail('Panorama may be tonemapped or dimmed');
for (const size of ['12 × 15','13 × 16','6 × 9','10 × 12','12 × 22','5 × 17','8 × 6']) {
  if (!panorama.includes(size)) fail(`Missing virtual tour room dimension ${size}`);
}
if (!read('src/components/property-detail/Residences.tsx').includes('12.5 Kanal')) fail('Plot size missing');
if (!read('src/lib/job/careerOpenings.ts').includes('Influencer / Content Creator')) fail('Influencer position missing');
if (!read('src/lib/job/careerOpenings.ts').includes('Sales Executive')) fail('Sales position missing');
if (!read('src/components/cards/JobCard.tsx').includes('https://wa.me/923302007522')) fail('Incorrect Careers WhatsApp');
if (!read('src/app/api/contact/route.ts').includes("const ADMIN_EMAIL = 'info@altafdevelopments.com'")) fail('Contact recipient is not set to confirmed business inbox');
if (sourceFiles.some(file => readFileSync(file,'utf8').includes('info@altafdevelopment.com'))) fail('Old incorrect business email still in site');
if (!existsSync(join(src,'app/(website)/media/blogs/all/page.tsx'))) fail('Other Blogs page missing');
if (!existsSync(join(src,'app/(website)/media/blogs/page.tsx'))) fail('Featured Blogs page missing');
if (/<Link\b[^>]*>[\s\S]{0,250}?<button\b/.test(read('src/components/cards/BlogCard.tsx'))) fail('Nested interactive elements in BlogCard');
console.log(`Checked ${sourceFiles.length} source files, ${checkedImports} local imports, ${checkedAssets} explicit asset paths and ${checkedImages} images.`);
if (errors.length) { for (const e of errors) console.error('ERROR:',e); process.exitCode=1; }
else console.log('PASS: Static checks completed without errors. A deployment build/browser tests remain necessary.');
