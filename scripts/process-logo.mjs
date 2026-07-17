import sharp from "sharp";

const SRC = process.argv[2];
const OUT_LIGHT = "public/images/logo.png";
const OUT_DARK = "public/images/logo-dark.png";

// The source logo is drawn on a black background. Convert darkness to
// transparency (alpha = brightness, unpremultiplied color) so edges stay clean.
const img = sharp(SRC).ensureAlpha();
const { data, info } = await img
  .raw()
  .toBuffer({ resolveWithObject: true });

const light = Buffer.from(data);
const dark = Buffer.from(data);

for (let i = 0; i < data.length; i += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  const max = Math.max(r, g, b);

  // Solid glyph pixels keep their original color at full opacity; only
  // near-black pixels fade out, so edges anti-alias without washing out.
  const a = max <= 14 ? 0 : max >= 70 ? 255 : Math.round(((max - 14) / (70 - 14)) * 255);

  for (const buf of [light, dark]) {
    buf[i + 3] = a;
  }

  // Light-background version: darken the pale gold (crown + "AUTO SALES")
  // so it stays readable on the white header.
  const lr = light[i];
  const lg = light[i + 1];
  const lb = light[i + 2];
  const isGold = lr > 140 && lg > 110 && lr - lb > 40 && lg > lb;
  if (light[i + 3] > 0 && isGold) {
    light[i] = Math.round(lr * 0.58);
    light[i + 1] = Math.round(lg * 0.55);
    light[i + 2] = Math.round(lb * 0.5);
  }
}

const opts = { raw: { width: info.width, height: info.height, channels: 4 } };

await sharp(light, opts).trim().resize({ width: 640 }).png().toFile(OUT_LIGHT);
await sharp(dark, opts).trim().resize({ width: 640 }).png().toFile(OUT_DARK);

console.log("done");
