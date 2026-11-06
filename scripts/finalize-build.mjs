import { copyFileSync, existsSync, unlinkSync } from 'node:fs';
import { resolve } from 'node:path';

const generatedHtml = resolve('dist/app.html');
const deploymentHtml = resolve('dist/index.html');

if (!existsSync(generatedHtml)) {
  throw new Error('O Vite não gerou dist/app.html.');
}

copyFileSync(generatedHtml, deploymentHtml);
unlinkSync(generatedHtml);

