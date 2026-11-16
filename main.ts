// Copy the entry image unchanged into the make.fun output directory as entry.png.
import { access, copyFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

const source = new URL('./entry.jpg', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
await access(source).catch((cause) => {
  throw new Error('Cannot access entry.jpg beside main.ts; ensure the entry image exists.', { cause });
});
await mkdir(outputDir, { recursive: true });
await copyFile(source, join(outputDir, 'entry.png'));
const output = await readFile(join(outputDir, 'entry.png')).catch((cause) => {
  throw new Error('Cannot read output entry.png; ensure the copied image exists.', { cause });
});
if (output.length >= 1024 * 1024) {
  throw new Error('Output entry.png must be smaller than 1 MiB.');
}
