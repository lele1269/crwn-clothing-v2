/* ==========================================================================
   M4 · E2 ★★ · La logica dei campi, senza React
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m4-e2
   ========================================================================== */

/**
 * applyChange(fields, event) → nuovo oggetto fields
 *   event = { target: { name, value, type, checked } }
 *   - checkbox (type 'checkbox') → usa checked (booleano), non value
 *   - type 'number' → converti value in numero (stringa vuota → '')
 *   - altrimenti value così com'è
 *   - un name che NON esiste già in fields → lancia Error('campo sconosciuto: <name>')
 *     (protegge dal bug "name diverso dalla chiave": te ne accorgi subito)
 */
export const applyChange = (fields, event) => {
  // TODO
};

/** true se tutte le chiavi indicate hanno un valore "pieno":
 *  stringa non vuota dopo trim, booleano true, numero (anche 0). */
export const isComplete = (fields, requiredKeys) => {
  // TODO
};

/** Copia NUOVA dei default (anche gli oggetti annidati devono essere nuovi),
 *  così due reset non condividono riferimenti. */
export const freshDefaults = (defaults) => {
  // TODO
};

/* DOMANDA: perché lanciare un errore per un name sconosciuto è meglio che aggiungere
   la chiave in silenzio? Collega la risposta all'errore tipico ❶.
   RISPOSTA:
*/
