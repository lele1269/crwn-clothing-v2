#!/usr/bin/env node
/* ==========================================================================
   Autoverifica degli esercizi.
   Uso:  node learning/esercizi/verifica.mjs m3-e2
   I test ti dicono se il codice FUNZIONA. Il voto del professore valuta
   anche se hai CAPITO perché funziona (spiegazioni, scelte, qualità).
   ========================================================================== */
import { isDeepStrictEqual, inspect } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join } from 'node:path';
import { existsSync } from 'node:fs';
import { register } from 'node:module';

process.env.BROWSERSLIST_IGNORE_OLD_DATA = '1';
register('./_lab/jsx-loader.mjs', import.meta.url);

/* Una Promise rifiutata e non gestita non deve far crashare l'autoverifica:
   la registriamo e la segnaliamo nel test in corso. */
const unhandled = [];
process.on('unhandledRejection', (e) => unhandled.push(e));

const here = dirname(fileURLToPath(import.meta.url));
const id = process.argv[2];
const C = { g: (s) => `\x1b[32m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`, y: (s) => `\x1b[33m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m` };

if (!id) { console.log('Uso: node learning/esercizi/verifica.mjs <id-esercizio>   es. m3-e2'); process.exit(1); }
const testFile = join(here, '_lab', 'tests', `${id}.test.mjs`);
if (!existsSync(testFile)) { console.log(C.r(`Nessun test automatico per ${id}. (Gli esercizi di sola lettura/scrittura si consegnano direttamente.)`)); process.exit(1); }

const fmt = (v) => inspect(v, { depth: 4, colors: false, breakLength: 100 });
class Fail extends Error { constructor(msg, meta) { super(msg); this.meta = meta; } }

const t = {
  eq(actual, expected, cosa) {
    if (!isDeepStrictEqual(actual, expected)) throw new Fail(cosa, { atteso: expected, ottenuto: actual });
  },
  ok(cond, cosa, ottenuto) { if (!cond) throw new Fail(cosa, ottenuto === undefined ? null : { ottenuto }); },
  async throws(fn, match, cosa) {
    let err = null;
    try { await fn(); } catch (e) { err = e; }
    if (!err) throw new Fail(`${cosa} — mi aspettavo un errore, ma la funzione è terminata senza lanciarne.`);
    if (match && !match.test(String(err.message))) throw new Fail(`${cosa} — è stato lanciato un errore, ma il messaggio non è quello richiesto.`, { atteso: String(match), ottenuto: err.message });
  },
};

const tests = [];
const test = (name, fn, perche) => tests.push({ name, fn, perche });

let mod;
try {
  mod = await import(pathToFileURL(testFile).href);
} catch (e) {
  console.log(C.r('\nIl tuo file non si carica nemmeno: c\'è un errore di sintassi o un import sbagliato.\n'));
  console.log(e.message);
  console.log(C.y('\nLeggi la prima riga dell\'errore: di solito indica file e riga. Parti da lì.'));
  process.exit(1);
}
await mod.default(test, t);

console.log(C.b(`\nAutoverifica ${id}`) + C.d(`  (${tests.length} controlli)\n`));
let pass = 0;
for (const { name, fn, perche } of tests) {
  try {
    if (mod.beforeEach) await mod.beforeEach();
    await Promise.race([fn(), new Promise((_, rej) => setTimeout(() => rej(new Fail('La funzione non ha finito entro 2 secondi: forse aspetta qualcosa che non arriva mai.')), 2000))]);
    if (unhandled.length) {
      const e = unhandled.splice(0);
      throw new Fail(`Una Promise è stata rifiutata e nessuno l'ha gestita (manca un await o un try/catch?): ${e[0] && e[0].message}`);
    }
    pass++;
    console.log(`  ${C.g('✔')} ${name}`);
  } catch (e) {
    console.log(`  ${C.r('✘')} ${name}`);
    if (e instanceof Fail) {
      console.log(`      ${C.r('Cosa non va:')} ${e.message}`);
      if (e.meta && 'atteso' in e.meta) console.log(`      ${C.d('atteso:  ')} ${fmt(e.meta.atteso)}`);
      if (e.meta && 'ottenuto' in e.meta) console.log(`      ${C.d('ottenuto:')} ${fmt(e.meta.ottenuto)}`);
    } else {
      console.log(`      ${C.r('Il codice è andato in crash:')} ${e.name}: ${e.message}`);
    }
    if (perche) console.log(`      ${C.y('Perché conta:')} ${perche}`);
  }
  if (mod.afterEach) { try { await mod.afterEach(); } catch (e) { /* ignora */ } }
}
console.log('\n' + (pass === tests.length
  ? C.g(`Tutti i ${tests.length} controlli passano.`) + ' Ora rileggi il codice e chiediti: saprei spiegare OGNI riga? Poi consegna con "correggi ' + id + '".'
  : C.r(`${pass}/${tests.length} controlli passano.`) + ' Correggi UN problema alla volta, partendo dal primo: spesso gli altri sono conseguenze.') + '\n');
process.exit(pass === tests.length ? 0 : 1);
