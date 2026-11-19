/* ==========================================================================
   M3 · E2 ★★ · Il navigatore dei percorsi
   AIUTI APERTI: 0      ← aggiorna con onestà

   In Firestore ogni dato ha un INDIRIZZO fatto di segmenti alternati:
       collection / documento / collection / documento / ...
       users      / abc123    / orders     / o1
   Numero di segmenti PARI  → è un documento
   Numero di segmenti DISPARI → è una collection

   Qui non serve Firestore: sono funzioni PURE (stesso input → stesso output,
   nessun effetto collaterale). Si testano con:
       node learning/esercizi/verifica.mjs m3-e2
   ========================================================================== */

/**
 * Unisce i segmenti in un percorso con "/".
 * Deve lanciare un Error se un segmento:
 *   - non è una stringa, oppure
 *   - è vuoto (""), oppure
 *   - contiene già uno "/" al suo interno.
 * es. buildPath('users', 'abc') → 'users/abc'
 */
export function buildPath(...segments) {
  // TODO
}

/**
 * true se path è un percorso valido che indica un DOCUMENTO.
 * Valido = stringa non vuota, nessun segmento vuoto (niente "//", niente "/" iniziale o finale).
 * es. 'users/abc' → true · 'users' → false · 'users//abc' → false
 */
export function isDocumentPath(path) {
  // TODO
}

/**
 * true se path è un percorso valido che indica una COLLECTION.
 * es. 'users' → true · 'users/abc/orders' → true · 'users/abc' → false
 */
export function isCollectionPath(path) {
  // TODO
}

/**
 * Restituisce il percorso della collection che contiene il documento.
 * Se docPath non è un percorso di documento valido, lancia un Error.
 * es. parentCollection('users/abc/orders/o1') → 'users/abc/orders'
 */
export function parentCollection(docPath) {
  // TODO
}

/**
 * Costruisce il percorso dell'ordine di un utente usando buildPath.
 * es. userOrderPath('abc', 'o1') → 'users/abc/orders/o1'
 */
export function userOrderPath(uid, orderId) {
  // TODO
}

/* ---------------------------------------------------------------------------
   DOMANDA DI RAGIONAMENTO (rispondi qui sotto in un commento):
   Hai scritto isDocumentPath e isCollectionPath. Hanno logica quasi identica.
   Come hai evitato di duplicare il codice? Se non l'hai fatto, come lo faresti?

   RISPOSTA:

--------------------------------------------------------------------------- */
