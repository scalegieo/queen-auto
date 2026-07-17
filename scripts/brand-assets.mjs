import sharp from "sharp";

const CROWN_SRC = process.argv[2];

// Remove the baked-in black background from the crown artwork.
async function transparentize(src) {
  // Inset-crop first to drop screenshot border artifacts along the edges.
  const meta = await sharp(src).metadata();
  const inset = Math.round(Math.min(meta.width, meta.height) * 0.03);
  const { data, info } = await sharp(src)
    .extract({
      left: inset,
      top: inset,
      width: meta.width - inset * 2,
      height: meta.height - inset * 2,
    })
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  for (let i = 0; i < data.length; i += 4) {
    const max = Math.max(data[i], data[i + 1], data[i + 2]);
    data[i + 3] = max <= 14 ? 0 : max >= 70 ? 255 : Math.round(((max - 14) / 56) * 255);
  }
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } })
    .trim()
    .png()
    .toBuffer();
}

const crown = await transparentize(CROWN_SRC);

// Favicon: transparent crown, padded 512px square.
const crownFav = await sharp(crown).resize(448, 448, { fit: "inside" }).toBuffer();
await sharp({ create: { width: 512, height: 512, channels: 4, background: { r: 0, g: 0, b: 0, alpha: 0 } } })
  .composite([{ input: crownFav, gravity: "center" }])
  .png()
  .toFile("src/app/icon.png");

// Apple touch icon: crown centered on solid black (iOS requires opaque).
const crownSmall = await sharp(crown).resize(130, 130, { fit: "inside" }).toBuffer();
await sharp({ create: { width: 180, height: 180, channels: 4, background: "#0a0a0a" } })
  .composite([{ input: crownSmall, gravity: "center" }])
  .png()
  .toFile("src/app/apple-icon.png");

// Open Graph share card: full logo centered on black, 1200x630.
const logo = await sharp("public/images/logo-dark.png")
  .resize(880, 440, { fit: "inside" })
  .toBuffer();
await sharp({ create: { width: 1200, height: 630, channels: 4, background: "#050505" } })
  .composite([{ input: logo, gravity: "center" }])
  .png()
  .toFile("public/images/og-card.png");

console.log("brand assets done");
