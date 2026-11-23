#!/usr/bin/env node
/* ==========================================================================
   Quiz nel terminale per gli esercizi "prevedi".
   Uso:  node learning/esercizi/quiz.mjs m0-e1

   Una domanda alla volta. Quattro tipi, nessuna sintassi da rispettare:
     output  → scrivi cosa stampa (contano valori e ordine, non apici/virgole/parentesi)
     scelta  → scrivi una lettera
     ordina  → scrivi i numeri nell'ordine giusto, es: 3 1 2
     aperta  → scrivi liberamente; poi vedi i punti chiave e dici cosa ti mancava
   La risposta è registrata PRIMA di vedere la soluzione. Si salva da solo e,
   se chiudi, riparte da dove eri.
   ========================================================================== */
import { inspect } from 'node:util';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, join, relative } from 'node:path';
import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import * as readline from 'node:readline';

const here = dirname(fileURLToPath(import.meta.url));
const out = (s = '') => process.stdout.write(s + '\n');
const C = { g: (s) => `\x1b[32m${s}\x1b[0m`, r: (s) => `\x1b[31m${s}\x1b[0m`, y: (s) => `\x1b[33m${s}\x1b[0m`, d: (s) => `\x1b[2m${s}\x1b[0m`, b: (s) => `\x1b[1m${s}\x1b[0m`, c: (s) => `\x1b[36m${s}\x1b[0m` };

/* ---------- carica le domande ---------- */
const id = process.argv[2];
const m = /^(m\d+|t\d+)-(e\d+)$/.exec(id || '');
if (!m) { out('Uso: node learning/esercizi/quiz.mjs <id>   es. m0-e1'); process.exit(1); }
const [, mod, ex] = m;
const dataFile = join(here, '_lab', 'quiz', `${id}.mjs`);
if (!existsSync(dataFile)) { out(C.r(`Non c'è ancora un quiz per ${id}.`)); process.exit(1); }
const realLog = console.log;
const Q = await import(pathToFileURL(dataFile).href);
const { tentativo, titolo, blocchi } = Q;
const tipo = (b) => b.tipo || 'output';

/* ---------- salvataggio ---------- */
const fbDir = process.env.QUIZ_OUT || join(here, mod, 'feedback'); // QUIZ_OUT: solo per i collaudi
mkdirSync(fbDir, { recursive: true });
const jsonPath = join(fbDir, `${ex}-t${tentativo}-risposte.json`);
const mdPath = join(fbDir, `${ex}-t${tentativo}-risposte.md`);
const stato = existsSync(jsonPath) ? JSON.parse(readFileSync(jsonPath, 'utf8')) : { id, tentativo, iniziato: new Date().toISOString(), aiuti: null, blocchi: {} };
const salva = () => { writeFileSync(jsonPath, JSON.stringify(stato, null, 2)); writeFileSync(mdPath, report()); };

/* ---------- input riga per riga (funziona anche con testo incollato) ---------- */
const rl = readline.createInterface({ input: process.stdin, terminal: false });
const coda = [];
let attesa = null;
let chiuso = false;
rl.on('line', (l) => { if (attesa) { const r = attesa; attesa = null; r(l); } else coda.push(l); });
rl.on('close', () => { chiuso = true; if (attesa) { const r = attesa; attesa = null; r(null); } });
const leggi = () => {
  process.stdout.write(C.c('> '));
  if (coda.length) return Promise.resolve(coda.shift());
  if (chiuso) return Promise.resolve(null);
  return new Promise((r) => { attesa = r; });
};
const esci = () => { out(C.d('\n\nQuiz interrotto: le risposte date finora sono salvate. Rilancia lo stesso comando per riprendere.')); process.exit(0); };

async function chiediRighe(suggerimento) {
  const righe = [];
  for (;;) {
    const l = await leggi();
    if (l === null) esci();
    if (l.trim() === '') { if (righe.length) return righe; out(C.d(`  (${suggerimento})`)); continue; }
    righe.push(l.trim());
  }
}
async function chiediTesto(cosa) {
  for (;;) {
    const l = await leggi();
    if (l === null) esci();
    if (l.trim()) return l.trim();
    out(C.d(`  (${cosa} non può essere vuoto)`));
  }
}
async function chiedi(valida, aiuto) {
  for (;;) {
    const l = await leggi();
    if (l === null) esci();
    const v = valida(l.trim());
    if (v !== null) return v;
    out(C.d(`  (${aiuto})`));
  }
}

/* ---------- esecuzione dei blocchi "output" ---------- */
let errori = [];
process.on('uncaughtException', (e) => errori.push(e));
process.on('unhandledRejection', (e) => errori.push(e));
const testoArg = (a) => (typeof a === 'string' ? a : inspect(a, { depth: 6, breakLength: Infinity }));

async function esegui(fn) {
  const righe = [];
  errori = [];
  console.log = (...args) => righe.push(args.map(testoArg).join(' '));
  try { await fn(); } catch (e) { errori.push(e); }
  await new Promise((r) => setTimeout(r, 80));
  console.log = realLog;
  for (const e of errori) righe.push(`Errore: ${e instanceof Error ? e.message : String(e)}`);
  return righe;
}

/* confronto tollerante: contano valori e ordine, non apici/virgole/parentesi/maiuscole */
const norm = (riga) => {
  let s = String(riga).toLowerCase().replace(/[[\]{}(),:;'"`]/g, ' ').replace(/\s+/g, ' ').trim();
  s = s.replace(/^(uncaught )?(in promise )?(firebaseerror|error|errore)\b/, 'errore');
  return s;
};
const normTutte = (righe) => righe.map(norm).filter((s) => s && s !== 'niente');
const uguali = (a, b) => { const x = normTutte(a), y = normTutte(b); return x.length === y.length && x.every((s, i) => s === y[i]); };

/* ---------- testo del codice ---------- */
function corpo(fn) {
  const src = fn.toString();
  const lines = src.slice(src.indexOf('{') + 1, src.lastIndexOf('}')).split('\n');
  return dedent(lines);
}
function dedent(lines) {
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  const ind = Math.min(...lines.filter((l) => l.trim()).map((l) => l.match(/^ */)[0].length));
  return lines.map((l) => l.slice(ind)).join('\n');
}
const sorgente = (x) => (typeof x === 'function' ? dedent(x.toString().split('\n')) : x);
const indenta = (s, n = 2) => s.split('\n').map((l) => ' '.repeat(n) + l).join('\n');
const lettere = (b) => Object.keys(b.opzioni);

/* ---------- report leggibile ---------- */
function report() {
  let s = `# ${id} · tentativo ${tentativo} · risposte del quiz\n\nAiuti del Lab aperti: ${stato.aiuti ?? '(non ancora dichiarati)'}\n\n`;
  for (const b of blocchi) {
    const r = stato.blocchi[b.id];
    const esito = !r ? '(non ancora fatto)' : r.ok === null ? '◆ da valutare' : r.ok ? '✔' : '✘';
    s += `## ${b.id} · ${b.titolo} ${esito}\n\n`;
    if (b.contesto) s += `**Contesto:**\n\`\`\`js\n${sorgente(b.contesto)}\n\`\`\`\n\n`;
    if (b.domanda) s += `**Domanda:** ${b.domanda}\n\n`;
    if (tipo(b) === 'output') s += `\`\`\`js\n${corpo(b.codice)}\n\`\`\`\n\n`;
    if (tipo(b) === 'scelta') s += lettere(b).map((k) => `- **${k})** ${b.opzioni[k]}`).join('\n') + '\n\n';
    if (tipo(b) === 'ordina') s += b.voci.map((v, i) => `${i + 1}. ${v}`).join('\n') + '\n\n';
    if (!r) continue;
    if (tipo(b) === 'output') s += `**Previsione:**\n\`\`\`text\n${r.risposta.join('\n')}\n\`\`\`\n**Perché:** ${r.perche}\n\n**Output reale:**\n\`\`\`text\n${r.reale.join('\n')}\n\`\`\`\n`;
    if (tipo(b) === 'scelta') s += `**Risposta:** ${r.risposta} · **giusta:** ${b.giusta}\n\n**Perché:** ${r.perche}\n\n`;
    if (tipo(b) === 'ordina') s += `**Ordine dato:** ${r.risposta.join(' ')} · **giusto:** ${b.giusto.join(' ')}\n\n**Perché:** ${r.perche}\n\n`;
    if (tipo(b) === 'aperta') s += `**Risposta:**\n\n${r.risposta.map((l) => '> ' + l).join('\n')}\n\n**Cosa mancava (secondo lo studente):** ${r.ideaSbagliata ?? '(non ancora scritto)'}\n`;
    if (r.ok === false) s += `**Idea sbagliata → idea giusta:** ${r.ideaSbagliata ?? '(non ancora scritta)'}\n`;
    s += '\n';
  }
  return s;
}

/* ---------- le quattro forme di domanda ---------- */
async function rispondi(b) {
  const t = tipo(b);
  if (t === 'output') {
    out('\n' + C.b('Cosa stampa?') + C.d(' (una riga per ogni console.log; riga vuota per finire)'));
    const risposta = await chiediRighe('scrivi almeno una riga; se pensi che non stampi niente, scrivi: niente');
    out(C.b('Perché?') + C.d(' (spiega ogni valore)'));
    const perche = await chiediTesto('il perché');
    const reale = await esegui(b.codice);
    return { tipo: t, risposta, perche, reale, ok: uguali(risposta, reale) };
  }
  if (t === 'scelta') {
    const ks = lettere(b);
    out('\n' + C.b('La tua risposta?') + C.d(` (una lettera: ${ks.join(', ')})`));
    const risposta = await chiedi((l) => (ks.includes(l.toLowerCase()) ? l.toLowerCase() : null), `scrivi solo una lettera tra ${ks.join(', ')}`);
    out(C.b('Perché?'));
    const perche = await chiediTesto('il perché');
    return { tipo: t, risposta, perche, ok: risposta === b.giusta };
  }
  if (t === 'ordina') {
    const n = b.voci.length;
    out('\n' + C.b('In che ordine?') + C.d(` (i numeri separati da spazi, es: ${[...Array(n).keys()].map((i) => i + 1).reverse().join(' ')})`));
    const risposta = await chiedi((l) => {
      const nums = l.split(/[\s,;-]+/).filter(Boolean).map(Number);
      const okPerm = nums.length === n && nums.every((x) => Number.isInteger(x) && x >= 1 && x <= n) && new Set(nums).size === n;
      return okPerm ? nums : null;
    }, `servono tutti i numeri da 1 a ${n}, una volta sola`);
    out(C.b('Perché?') + C.d(' (spiega almeno i passaggi su cui avevi dubbi)'));
    const perche = await chiediTesto('il perché');
    return { tipo: t, risposta, perche, ok: risposta.every((x, i) => x === b.giusto[i]) };
  }
  if (t === 'aperta') {
    out('\n' + C.b('La tua risposta') + C.d(' (scrivi liberamente, anche su più righe; riga vuota per finire)'));
    const risposta = await chiediRighe('scrivi almeno una riga; se non lo sai, scrivi: non lo so');
    return { tipo: t, risposta, ok: null };
  }
  throw new Error(`tipo sconosciuto: ${t}`);
}

function mostraEsito(b, x) {
  const t = tipo(b);
  if (t === 'output') {
    if (x.ok) { out(C.g('\n✔ Giusto!')); out(C.d(indenta(x.reale.join('\n')))); return; }
    out(C.r('\n✘ Non coincide.'));
    const n = Math.max(x.risposta.length, x.reale.length);
    for (let i = 0; i < n; i++) {
      const p = x.risposta[i] ?? '(niente)', q = x.reale[i] ?? '(niente)';
      const same = norm(p) === norm(q);
      out(`  riga ${i + 1}  ${same ? C.g('=') : C.r('≠')}  tu:    ${p}`);
      if (!same) out(`              reale: ${q}`);
    }
    return;
  }
  if (t === 'scelta') {
    out(x.ok ? C.g(`\n✔ Giusto: ${b.giusta}`) : C.r(`\n✘ La risposta giusta è ${b.giusta}) (tu: ${x.risposta})`));
    if (b.spiegazione) out(C.d(indenta(b.spiegazione)));
    return;
  }
  if (t === 'ordina') {
    out(x.ok ? C.g('\n✔ Ordine giusto!') : C.r(`\n✘ Ordine giusto: ${b.giusto.join(' ')}   (tu: ${x.risposta.join(' ')})`));
    b.giusto.forEach((k, i) => out(`  ${i + 1}. ${x.risposta[i] === k ? C.g('=') : C.r('≠')} ${b.voci[k - 1]}`));
    if (b.spiegazione) out(C.d('\n' + indenta(b.spiegazione)));
    return;
  }
  if (t === 'aperta') {
    out(C.y('\n◆ Risposta registrata: la valuta il professore. Intanto confrontala con i punti chiave:'));
    b.puntiChiave.forEach((p) => out('  • ' + p));
  }
}

/* ---------- il quiz ---------- */
out(C.b(`\nQuiz · ${id}${titolo ? ' · ' + titolo : ''} · tentativo ${tentativo}`));
out(C.d('Nessuna sintassi da rispettare: scrivi come ti viene. Riga vuota = "ho finito".'));
out(C.d('Negli output contano valori e ordine; un errore non gestito si scrive così:  errore <messaggio>'));

for (const b of blocchi) {
  const r = stato.blocchi[b.id];
  if (r && (r.ok === true || r.ideaSbagliata)) continue; // già completato

  out('\n' + C.b(`── ${b.id} · ${b.titolo} `.padEnd(64, '─')));
  if (b.contesto) { out(C.d('Contesto:')); out(indenta(sorgente(b.contesto))); out(); }
  if (b.domanda) out(b.domanda);
  if (tipo(b) === 'output') out('\n' + indenta(corpo(b.codice)));
  if (tipo(b) === 'scelta') lettere(b).forEach((k) => out(`  ${C.b(k + ')')} ${b.opzioni[k]}`));
  if (tipo(b) === 'ordina') b.voci.forEach((v, i) => out(`  ${C.b(String(i + 1))}. ${v}`));

  if (!r) { stato.blocchi[b.id] = { ...(await rispondi(b)), quando: new Date().toISOString() }; salva(); }

  const x = stato.blocchi[b.id];
  mostraEsito(b, x);
  if (x.ok === false) {
    out(C.b('\nQuale idea ti ha portato fuori strada, e qual è quella giusta?'));
    x.ideaSbagliata = await chiediTesto('la spiegazione');
    salva();
  } else if (x.ok === null) {
    out(C.b('\nCosa mancava o era diverso nella tua risposta?') + C.d(' (se c\'era tutto, scrivi: tutto)'));
    x.ideaSbagliata = await chiediTesto('la risposta');
    salva();
  }
}

if (stato.aiuti === null) {
  out(C.b('\nUltima domanda: quanti aiuti del Lab hai aperto per questo esercizio?') + C.d(' (un numero)'));
  stato.aiuti = await chiedi((l) => (/^\d+$/.test(l) ? Number(l) : null), 'scrivi solo un numero, per esempio 0');
  stato.finito = new Date().toISOString();
  salva();
}

const auto = blocchi.filter((b) => tipo(b) !== 'aperta');
const giusti = auto.filter((b) => stato.blocchi[b.id]?.ok).length;
out(C.b(`\nFinito: ${giusti}/${auto.length} risposte automatiche giuste`) + (auto.length < blocchi.length ? C.d(` · ${blocchi.length - auto.length} aperte da valutare`) : ''));
out(C.d(`Le tue risposte sono in ${relative(process.cwd(), mdPath)}`));
out(`Consegna scrivendo in Claude Code:  ${C.b(`correggi ${id}`)}\n`);
rl.close();
process.exit(0);
