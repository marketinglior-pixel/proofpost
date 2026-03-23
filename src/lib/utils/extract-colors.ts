/**
 * Extract dominant colors from an image using canvas pixel analysis.
 * Returns [primaryColor, secondaryColor] as hex strings.
 */
export async function extractColorsFromImage(
  imageUrl: string
): Promise<[string, string]> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous";

    img.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) {
          reject(new Error("Could not get canvas context"));
          return;
        }

        // Scale down for performance
        const maxSize = 100;
        const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
        canvas.width = Math.floor(img.width * scale);
        canvas.height = Math.floor(img.height * scale);

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imageData.data;

        // Collect non-white, non-black, non-transparent colors
        const colorMap = new Map<string, { r: number; g: number; b: number; count: number }>();

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const a = pixels[i + 3];

          // Skip transparent pixels
          if (a < 128) continue;

          // Skip near-white (background)
          if (r > 240 && g > 240 && b > 240) continue;

          // Skip near-black (too dark for primary)
          const brightness = (r + g + b) / 3;
          if (brightness < 15) continue;

          // Quantize to reduce similar colors (bucket by ~16 levels)
          const qr = Math.round(r / 16) * 16;
          const qg = Math.round(g / 16) * 16;
          const qb = Math.round(b / 16) * 16;
          const key = `${qr},${qg},${qb}`;

          const existing = colorMap.get(key);
          if (existing) {
            existing.count++;
            // Keep running average for more accurate color
            existing.r = Math.round((existing.r * (existing.count - 1) + r) / existing.count);
            existing.g = Math.round((existing.g * (existing.count - 1) + g) / existing.count);
            existing.b = Math.round((existing.b * (existing.count - 1) + b) / existing.count);
          } else {
            colorMap.set(key, { r, g, b, count: 1 });
          }
        }

        // Sort by frequency
        const sorted = Array.from(colorMap.values())
          .filter((c) => c.count > 2) // Remove noise
          .sort((a, b) => b.count - a.count);

        if (sorted.length === 0) {
          resolve(["#2563EB", "#1E293B"]); // Fallback defaults
          return;
        }

        const primary = sorted[0];
        const primaryHex = rgbToHex(primary.r, primary.g, primary.b);

        // Find secondary: most frequent color that's visually different from primary
        let secondaryHex = "#1E293B"; // Fallback
        for (let i = 1; i < sorted.length; i++) {
          const candidate = sorted[i];
          const distance = colorDistance(primary, candidate);
          if (distance > 80) {
            // Sufficiently different
            secondaryHex = rgbToHex(candidate.r, candidate.g, candidate.b);
            break;
          }
        }

        // If primary is very dark, make secondary lighter (or vice versa)
        const primaryBrightness = (primary.r + primary.g + primary.b) / 3;
        if (primaryBrightness < 60 && secondaryHex === "#1E293B") {
          // Primary is dark, try to find a lighter color
          for (const c of sorted) {
            const br = (c.r + c.g + c.b) / 3;
            if (br > 100) {
              secondaryHex = rgbToHex(c.r, c.g, c.b);
              break;
            }
          }
        }

        resolve([primaryHex, secondaryHex]);
      } catch (err) {
        reject(err);
      }
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = imageUrl;
  });
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = Math.min(255, Math.max(0, x)).toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase()
  );
}

function colorDistance(
  a: { r: number; g: number; b: number },
  b: { r: number; g: number; b: number }
): number {
  return Math.sqrt(
    Math.pow(a.r - b.r, 2) + Math.pow(a.g - b.g, 2) + Math.pow(a.b - b.b, 2)
  );
}
