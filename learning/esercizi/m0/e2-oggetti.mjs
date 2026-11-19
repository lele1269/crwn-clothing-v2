/* ==========================================================================
   M0 · E2 ★★ · Destructuring, spread, rest
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m0-e2
   Regola: nessuna funzione deve MODIFICARE gli oggetti ricevuti.
   ========================================================================== */

/** Come handleChange: nuovo oggetto con fields[name] = value.  */
export const updateField = (fields, name, value) => {
  // TODO
};

/** Unisce le opzioni ai default: le opzioni passate vincono, ma i valori
 *  undefined nelle opzioni NON devono cancellare il default.
 *  withDefaults({ a: undefined, b: 2 }, { a: 1, b: 0, c: 3 }) → { a: 1, b: 2, c: 3 } */
export const withDefaults = (options, defaults) => {
  // TODO
};

/** 'Leo  Rossi Bianchi' → { first: 'Leo', rest: ['Rossi', 'Bianchi'] }
 *  Usa il destructuring di ARRAY con rest. Spazi multipli ignorati. */
export const splitName = (fullName) => {
  // TODO
};

/** Nuovo oggetto senza la chiave key. Usa il destructuring con rest
 *  (suggerimento: guarda "computed property names" nel destructuring). */
export const omitKey = (obj, key) => {
  // TODO
};

/** Aggiorna un campo annidato senza modificare l'originale:
 *  setCity({ name, address: { city, zip } }, 'Roma') → copia con address.city = 'Roma'
 *  Gli oggetti NON toccati devono restare gli stessi riferimenti? Rispondi sotto. */
export const setCity = (user, city) => {
  // TODO
};

/* DOMANDA: in setCity, il nuovo oggetto ha un address nuovo. Il campo name invece è
   lo stesso valore. E se user avesse un campo `orders` (un array): nel risultato sarebbe
   lo stesso array (===) o una copia? Perché va bene così?
   RISPOSTA:
*/
