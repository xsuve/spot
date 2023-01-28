import * as fs from 'fs';
import { resolve } from 'path';
import { PluginOption } from 'vite';

const root = resolve(__dirname, '..', '..');
const outDir = resolve(root, 'build');


export default function createManifest(): PluginOption {
  return {
    name: 'createManifest',
    buildEnd() {
      if (!fs.existsSync(outDir)) {
        fs.mkdirSync(outDir);
      }

      fs.copyFileSync(
        resolve(root, 'src', 'manifest.json'),
        resolve(outDir, 'manifest.json')
      );
    }
  };
}