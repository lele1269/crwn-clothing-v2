/* ==========================================================================
   T1 · E3 ★★★ · Detective su MDN
   AIUTI APERTI: 0      ← aggiorna con onestà

   Ogni funzione va risolta con il metodo JavaScript indicato. Prima di scrivere
   il codice apri la sua pagina su MDN (developer.mozilla.org) e compila:
     FIRMA (dalla sezione Syntax) · RETURN VALUE · EXCEPTIONS (se ci sono)
   Il voto di "logica" dipende da questa scheda: è l'allenamento alla lettura.

   Test:  node learning/esercizi/verifica.mjs t1-e3
   ========================================================================== */

/**
 * findProduct(products, id) → il prodotto con quell'id, oppure null se non c'è.
 * METODO OBBLIGATORIO: Array.prototype.find()
 *   FIRMA:
 *   RETURN VALUE:
 *   Perché restituisco null e non quello che restituisce find?
 */
export const findProduct = (products, id) => {
  // TODO
};

/**
 * hasProductOver(products, maxPrice) → true se ALMENO un prodotto costa più di maxPrice.
 * METODO OBBLIGATORIO: Array.prototype.some()
 *   FIRMA:
 *   RETURN VALUE:
 *   Cosa restituisce su un array vuoto? (trovalo su MDN, non provarlo)
 */
export const hasProductOver = (products, maxPrice) => {
  // TODO
};

/**
 * cartTotal(cartItems) → somma di price × quantity. Carrello vuoto → 0.
 * METODO OBBLIGATORIO: Array.prototype.reduce()
 *   FIRMA:
 *   RETURN VALUE:
 *   EXCEPTIONS:
 */
export const cartTotal = (cartItems) => {
  // TODO
};

/**
 * pickFields(obj, allowed) → nuovo oggetto con SOLO le chiavi presenti in allowed.
 *   pickFields({ a: 1, b: 2, c: 3 }, ['a', 'c']) → { a: 1, c: 3 }
 *   Non deve modificare obj.
 * METODI OBBLIGATORI: Object.entries(), Array.prototype.filter(), Object.fromEntries()
 *   Per ognuno: FIRMA · RETURN VALUE · è statico o d'istanza?
 */
export const pickFields = (obj, allowed) => {
  // TODO
};

/**
 * cleanName(name) → toglie gli spazi iniziali/finali e riduce gli spazi multipli
 * interni a uno solo.   '   Leo    Rossi  ' → 'Leo Rossi'
 * METODI: String.prototype.trim() + uno a tua scelta (cita quale e perché).
 *   FIRMA di trim:
 *   trim modifica la stringa originale? (cerca su MDN la parola che lo dice)
 */
export const cleanName = (name) => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOMANDA FINALE: quale delle schede MDN che hai compilato conteneva
   un'informazione che, se l'avessi ignorata, avrebbe fatto fallire un test?
   Scrivi quale informazione e quale test.

   RISPOSTA:
--------------------------------------------------------------------------- */
