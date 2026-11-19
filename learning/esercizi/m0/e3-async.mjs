/* ==========================================================================
   M0 · E3 ★★★ · Lavorare con le Promise
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m0-e3
   ========================================================================== */

/** Promise che si risolve dopo ms millisecondi (con undefined). */
export const delay = (ms) => {
  // TODO
};

/** Esegue le funzioni (che restituiscono Promise) UNA DOPO L'ALTRA.
 *  Restituisce l'array dei risultati nello stesso ordine. */
export const runInSequence = async (tasks) => {
  // TODO
};

/** Esegue le funzioni TUTTE INSIEME. Risultati nello stesso ordine delle task. */
export const runInParallel = async (tasks) => {
  // TODO
};

/** Se promise non si risolve entro ms → rifiuta con Error('timeout').
 *  Altrimenti si comporta esattamente come promise (valore o errore). */
export const withTimeout = (promise, ms) => {
  // TODO (cerca Promise.race su MDN)
};

/** Chiama fn() fino a `times` volte finché non va a buon fine.
 *  Se tutti i tentativi falliscono, rifiuta con l'ULTIMO errore. */
export const retry = async (fn, times) => {
  // TODO
};

/* DOMANDE
   1. runInSequence con un for...of e un await: perché non funzionerebbe con forEach?
   2. Se una delle task di runInParallel fallisce, cosa succede alle altre? Si fermano?
      (Leggi la sezione Description di Promise.all su MDN.)
   RISPOSTE:
*/
