// main.ts — news-image-20261122 v2 (DRAFT 1)
// Ditulis dari nol di sesi ini. Program penyalin deterministik: menyalin
// entry.png (di samping file ini) ke folder output, byte-identik.
// Node 22, standard library saja, tanpa network, tanpa waktu acak.
// Output: $MAKEFUN_OUTPUT_DIR/entry.png (default /output/entry.png).
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1024 * 1024;
const MAX_SIDE = 1024;

const here = dirname(fileURLToPath(import.meta.url));
const src = join(here, "entry.png");
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const dst = join(outDir, "entry.png");

// REVISI 2: pesan jelas bila entry.png hilang + verifikasi ukuran akhir.
if (!existsSync(src)) {
  throw new Error(`missing entry.png next to main.ts (${src})`);
}

const buf = readFileSync(src);
if (buf.length > MAX_BYTES) {
  throw new Error(`entry.png too large: ${buf.length} bytes (max ${MAX_BYTES})`);
}

// REVISI 1: validasi format + dimensi dari header, tanpa decode piksel.
function probe(b: Buffer): { format: string; width: number; height: number } {
  const pngSig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  if (b.length >= 24 && b.subarray(0, 8).equals(pngSig)) {
    return { format: "PNG", width: b.readUInt32BE(16), height: b.readUInt32BE(20) };
  }
  if (b.length >= 4 && b[0] === 0xff && b[1] === 0xd8) {
    let i = 2;
    while (i + 9 < b.length) {
      if (b[i] !== 0xff) { i += 1; continue; }
      const marker = b[i + 1];
      if (marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc) {
        return { format: "JPEG", width: b.readUInt16BE(i + 7), height: b.readUInt16BE(i + 5) };
      }
      const len = b.readUInt16BE(i + 2);
      if (len < 2) break;
      i += 2 + len;
    }
  }
  throw new Error("entry.png is not a PNG or JPEG image");
}

const info = probe(buf);
if (info.width > MAX_SIDE || info.height > MAX_SIDE) {
  throw new Error(`image too large: ${info.width}x${info.height} (max ${MAX_SIDE}x${MAX_SIDE})`);
}

mkdirSync(outDir, { recursive: true });
writeFileSync(dst, buf);

const back = readFileSync(dst);
if (back.length !== buf.length || !back.equals(buf)) {
  throw new Error("output bytes differ from entry.png");
}
console.log(`entry.png -> ${dst} (${info.format} ${info.width}x${info.height}, ${buf.length} bytes)`);
