/* Hook di caricamento: permette a node di importare file .jsx (li traduce con Babel). */
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
let babel = null;

export async function resolve(specifier, context, next) {
  // React 17 non ha la mappa "exports": in ESM serve l'estensione esplicita
  if (specifier === 'react/jsx-runtime' || specifier === 'react/jsx-dev-runtime') {
    return next(specifier + '.js', context);
  }
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.endsWith('.jsx')) {
    babel = babel || require('@babel/core');
    const filename = fileURLToPath(url);
    const src = await readFile(filename, 'utf8');
    const out = babel.transformSync(src, {
      filename,
      babelrc: false,
      configFile: false,
      presets: [[require.resolve('@babel/preset-react'), { runtime: 'automatic' }]],
      sourceMaps: 'inline',
    });
    return { format: 'module', source: out.code, shortCircuit: true };
  }
  return next(url, context);
}
