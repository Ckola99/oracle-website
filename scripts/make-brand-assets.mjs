// One-off brand asset generator. Run with: npm run brand
// Reads public/images/logo.jpeg and writes derived assets:
//   src/assets/brand/logo-mark.png       globe only, transparent corners (header, favicon source)
//   src/assets/brand/logo-wordmark.png   "ORACLE SERVICES" wordmark, white removed
//   src/assets/brand/logo-full.png       full logo, white removed (hero)
//   public/favicon-32.png, public/apple-touch-icon.png, public/icon-512.png, public/og-image.jpg
// and prints the colours sampled from the logo.
import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';

const SRC = 'public/images/logo.jpeg';
const BRAND = 'src/assets/brand';
await mkdir(BRAND, { recursive: true });

// Regions measured on the 1024×1024 source.
const GLOBE = { left: 282, top: 122, width: 474, height: 474 };
const WORDMARK = { left: 120, top: 600, width: 790, height: 200 };
const FULL = { left: 120, top: 115, width: 790, height: 735 };

/** Turn near-white pixels transparent, with a soft ramp to keep edges smooth. */
async function whiteToAlpha(input) {
  const { data, info } = await sharp(input).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const min = Math.min(data[i], data[i + 1], data[i + 2]);
    if (min > 245) data[i + 3] = 0;
    else if (min > 215) data[i + 3] = Math.round(((245 - min) / 30) * 255);
  }
  return sharp(data, { raw: info }).png();
}

/** Clip a square image to a circle. */
async function circleMask(input, size) {
  const mask = Buffer.from(
    `<svg width="${size}" height="${size}"><circle cx="${size / 2}" cy="${size / 2}" r="${size / 2 - 1}" fill="#fff"/></svg>`,
  );
  return sharp(input).resize(size, size).composite([{ input: mask, blend: 'dest-in' }]).png();
}

const src = sharp(SRC);
const globe = await src.clone().extract(GLOBE).toBuffer();
const mark = await (await circleMask(globe, 474)).toBuffer();
await sharp(mark).toFile(`${BRAND}/logo-mark.png`);

await (await whiteToAlpha(await src.clone().extract(WORDMARK).toBuffer())).toFile(`${BRAND}/logo-wordmark.png`);
await (await whiteToAlpha(await src.clone().extract(FULL).toBuffer())).toFile(`${BRAND}/logo-full.png`);

// Favicons
await sharp(mark).resize(32, 32).toFile('public/favicon-32.png');
await sharp(mark).resize(512, 512).toFile('public/icon-512.png');
await sharp({ create: { width: 180, height: 180, channels: 4, background: '#ffffff' } })
  .composite([{ input: await sharp(mark).resize(156, 156).toBuffer(), top: 12, left: 12 }])
  .png()
  .toFile('public/apple-touch-icon.png');

// Open Graph image: full logo centred on white, 1200×630
const ogLogo = await sharp(await src.clone().extract(FULL).toBuffer()).resize({ height: 560 }).toBuffer();
const ogMeta = await sharp(ogLogo).metadata();
await sharp({ create: { width: 1200, height: 630, channels: 3, background: '#ffffff' } })
  .composite([{ input: ogLogo, top: 35, left: Math.round((1200 - ogMeta.width) / 2) }])
  .jpeg({ quality: 85 })
  .toFile('public/og-image.jpg');

// Colour sampling: average pixels matching a predicate inside a region.
const { data, info } = await src.clone().raw().toBuffer({ resolveWithObject: true });
function sample(region, pred) {
  let r = 0, g = 0, b = 0, n = 0;
  for (let y = region.top; y < region.top + region.height; y++) {
    for (let x = region.left; x < region.left + region.width; x++) {
      const i = (y * info.width + x) * info.channels;
      const px = [data[i], data[i + 1], data[i + 2]];
      if (pred(px)) { r += px[0]; g += px[1]; b += px[2]; n++; }
    }
  }
  const hex = (v) => Math.round(v / n).toString(16).padStart(2, '0');
  return `#${hex(r)}${hex(g)}${hex(b)} (${n}px)`;
}
const isNavy = ([r, g, b]) => b > r + 40 && r < 60 && b < 140;
const isGold = ([r, g, b]) => r > 140 && r - b > 60 && g > 100;
const isBlue = ([r, g, b]) => b > 140 && b - r > 90 && r < 80;

console.log('navy  (wordmark)     ', sample({ left: 130, top: 610, width: 770, height: 100 }, isNavy));
console.log('gold  (SERVICES)     ', sample({ left: 290, top: 730, width: 450, height: 60 }, isGold));
console.log('gold  (circuit/Africa)', sample({ left: 360, top: 180, width: 300, height: 320 }, isGold));
console.log('blue  (globe)        ', sample(GLOBE, isBlue));
console.log('Brand assets written.');
