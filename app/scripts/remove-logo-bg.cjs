/**
 * Remove light grey background from logo.png.
 * Run from app folder: npm run remove-logo-bg
 */
const fs = require("fs");
const path = require("path");
const { PNG } = require("pngjs");

const logoPath = path.join(__dirname, "..", "public", "images", "logo.png");

function rgbDistance(data, i, r, g, b) {
  const dr = data[i] - r, dg = data[i + 1] - g, db = data[i + 2] - b;
  return Math.sqrt(dr * dr + dg * dg + db * db);
}

const buffer = fs.readFileSync(logoPath);
const png = PNG.sync.read(buffer);
const { data, width, height } = png;

// Sample background from corners (first pixel and a few corners)
const idx0 = 0;
const bgR = data[idx0], bgG = data[idx0 + 1], bgB = data[idx0 + 2];

// Make pixels within tolerance of background grey transparent
const tolerance = 48;
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const i = (width * y + x) << 2;
    const dist = rgbDistance(data, i, bgR, bgG, bgB);
    if (dist <= tolerance) {
      data[i + 3] = 0; // set alpha to 0
    }
  }
}

fs.writeFileSync(logoPath, PNG.sync.write(png));
console.log("Logo background removed:", logoPath);
