// Copy the entry image unchanged into the make.fun output directory as entry.png.
import { access, copyFile, mkdir } from 'node:fs/promises';
import { join } from 'node:path';

const source = new URL('./entry.jpg', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await access(source).catch((cause) => {
  throw new Error('Cannot access entry.jpg beside main.ts; ensure the entry image exists.', { cause });
});
await mkdir(outputDir, { recursive: true });
await copyFile(source, join(outputDir, 'entry.png'));
