// Copy the entry image unchanged to the make.fun output directory as entry.png.
import { constants } from 'node:fs';
import { access, copyFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Maximum output size in bytes (1 MiB); output must be smaller than this limit.
const MAX_OUTPUT_BYTES = 1024 * 1024;

const source = new URL('./entry.jpg', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destination = join(outputDir, 'entry.png');

await access(source, constants.R_OK).catch((cause) => {
  throw new Error('Cannot read entry.jpg beside main.ts; ensure the image exists and is accessible.', { cause });
});
await mkdir(outputDir, { recursive: true });
await copyFile(source, destination);
const output = await readFile(destination).catch((cause) => {
  throw new Error('Cannot read output entry.png; the copied image is missing or inaccessible.', { cause });
});
if (output.length >= MAX_OUTPUT_BYTES) {
  throw new Error('Output entry.png must be smaller than 1 MiB.');
}
