/* ==========================================================================
   M0 · E1 ★ · Prevedi l'output — tentativo 3

   COSA FAI
   Per ogni blocco leggi `codice` (NON eseguirlo) e sostituisci ogni ___ con un valore.

   COME SCRIVI LA PREVISIONE  (solo valori JavaScript: niente formato da rispettare)
   • stampe: un array con UNA RIGA per ogni console.log eseguito, nell'ordine in cui escono.
             Ogni riga è un array con i valori passati a quel console.log.
               console.log('ciao', 3, true)      →  ['ciao', 3, true]
               console.log({ a: 1 })             →  [{ a: 1 }]
               due console.log, uno dopo l'altro →  [ ['ciao'], [42] ]
               nessun console.log                →  []
             Negli oggetti conta anche l'ORDINE delle chiavi.
   • errore: se alla fine resta un errore che nessuno gestisce, il suo messaggio
             (es. 'qualcosa è andato storto'); altrimenti null.
   • perche: 1–3 frasi, scritte come vuoi. Devono spiegare ogni valore delle stampe.
   • ideaSbagliata: lascialo vuoto ORA. Lo compili DOPO la verifica, solo per i blocchi con ✘.

   COME VERIFICHI (solo quando hai compilato TUTTO)
     node learning/esercizi/prevedi.mjs m0-e1
   La prima esecuzione congela le tue previsioni: cambiarle dopo non serve, si vede.

   CONSEGNA:  correggi m0-e1
   ========================================================================== */
import { ___ } from '../_lab/prevedi-kit.mjs';

export const tentativo = 3;
export const aiuti = 0; // ← aiuti del Lab aperti, con onestà

// ── B1 · riferimenti e spread ─────────────────────────────────────────────
export const B1 = {
  codice: () => {
    const cart = { total: 10, items: ['hat'] };
    const next = { ...cart, total: 20 };
    next.items.push('shoes');
    console.log(cart.total, cart.items.length, next.items === cart.items);
  },
  stampe: [10, 2, true],
  errore: ___,
  perche: `Perchè il valore di cart non cambia essendo stata creata una copia con lo spread. items invece viene modificato sia in cart che in next poichè la referenza resta la stessa motivo per cui next.items === cart.items è true`,
  ideaSbagliata: ``,
};

// ── B2 · spread e ordine delle chiavi ─────────────────────────────────────
export const B2 = {
  codice: () => {
    const base = { size: 'M', color: 'red' };
    const extra = { color: 'blue', price: 5 };
    const merged = { ...base, ...extra, size: 'L' };
    console.log(merged);
  },
  stampe: { color: 'blue', price: 5, size: 'L' },
  errore: ___,
  perche: `Perché color di base viene sovrascritto da extra che viene dopo e size di base viene modificato da merged che appare infatti come ultimo valore`,
  ideaSbagliata: ``,
};

// ── B3 · destructuring con rest e default ─────────────────────────────────
export const B3 = {
  codice: () => {
    const { type, ...others } = {
      type: 'password',
      name: 'pwd',
      required: true,
    };
    const { name = 'anon', missing = 'default' } = others;
    console.log(type, others, name, missing);
  },
  stampe: ['password', ['pwd', true], 'pwd', 'default'],
  errore: ___,
  perche: `perchè type rimane invarito, i primi valori di others in ordine di apparazione sono pwd e true poi viene fatta l'assegnazione tramite destrutturazione e name rimane pwd perchè sovrascritto da name presente nella funzione e default viene aggiunto ai parametri`,
  ideaSbagliata: ``,
};

// ── B4 · event loop ───────────────────────────────────────────────────────
export const B4 = {
  codice: () => {
    console.log(1);
    setTimeout(() => console.log(2), 0);
    Promise.resolve().then(() => console.log(3));
    (async () => {
      console.log(4);
      await null;
      console.log(5);
      setTimeout(() => console.log(6), 0);
    })();
    console.log(7);
  },
  stampe: [[1], [4], [5], [3], [2], [6]],
  errore: ___,
  perche: `perchè prima vengono eseguiti i codici sincroni, poi i microtasks e poi il resto`,
  ideaSbagliata: ``,
};

// ── B5 · parametri di default ─────────────────────────────────────────────
export const B5 = {
  codice: () => {
    const greet = (name = 'ospite', greeting = `Ciao ${name}`) => greeting;
    console.log(greet(), greet(null), greet(undefined, 'Hey'), greet(''));
  },
  stampe: ['Ciao ospite', 'Ciao null', 'Hey', 'Ciao '],
  errore: ___,
  perche: `perchè il primo parametro è il valore di default e se non viene passato niente appunto stampa Ciao ospite, passando null stampa Ciao null perchè null viene converito in stringa. Con undefined, Hey viene sovrascritto tutto infatti esce Hey. greet('') restuisce un carattere vuoto quindi Ciao `,
  ideaSbagliata: ``,
};

// ── B6 · async, await e try/catch ─────────────────────────────────────────
export const B6 = {
  codice: () => {
    const save = async (ok) => {
      if (!ok) throw new Error('salvataggio fallito');
      return 'salvato';
    };
    const run = async () => {
      try {
        const r = save(true);
        console.log(r instanceof Promise);
        await save(false);
        console.log('dopo');
      } catch (e) {
        console.log('preso:', e.message);
      }
      save(false);
      console.log('fine');
    };
    run();
  },
  stampe: [
    true,
    'preso: salvataggio fallito',
    'fine',
    'Error: salvataggio fallito',
  ],
  errore: ___,
  perche: `true perchè in una funziona async anche senza await r fa parte della promise, dopodichè passiamo false a save che passa l'errore al catch e quindi salvataggio fallito, dopodichè parte il consol.log di 'fine' e alla fine si ha un Uncaught error poichè save(false) è eseguito al di fuori del blocco try cath e quindi non viene intercettato`,
  ideaSbagliata: ``,
};
