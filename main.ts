// Copy the entry image unchanged into the make.fun output directory.
import { access, copyFile, mkdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

// Output must be strictly smaller than 1 MiB.
const MAX_OUTPUT_BYTES = 1024 * 1024;
const source = new URL('./entry.jpg', import.meta.url);
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const destination = join(outputDir, 'entry.png');

try {
  await access(source);
} catch (cause) {
  throw new Error('Source image entry.jpg is not accessible beside main.ts.', { cause });
}
await mkdir(outputDir, { recursive: true });
await copyFile(source, destination);

let output;
try {
  output = await readFile(destination);
} catch (cause) {
  throw new Error(`Output image is missing or unreadable: ${destination}`, { cause });
}
if (output.length >= MAX_OUTPUT_BYTES) {
  throw new Error(`Output image must be smaller than 1 MiB: ${destination}`);
}
