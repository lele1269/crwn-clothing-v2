/* ==========================================================================
   M3 · E6 ★★★★★ · BOSS · Il carrello persistente
   AIUTI APERTI: 0      ← aggiorna con onestà

   Situazione: oggi il carrello di CRWN vivrà nello state di React (lo farai
   più avanti col Context). Se l'utente chiude il browser, il carrello sparisce.
   Il negozio vuole che il carrello di un utente loggato sia SALVATO in Firestore.

   Sei tu l'architetto. Decidi:
     - DOVE vive il carrello (quale percorso?)
     - COM'È FATTO (quale forma hanno i dati?)
   I test usano solo le funzioni qui sotto, quindi la struttura interna è libera,
   ma la giustificazione delle scelte è PARTE DEL VOTO (logica 3/10).

   Test:  node learning/esercizi/verifica.mjs m3-e6

   Un prodotto ha questa forma:  { id: 3, name: 'Brown Cowboy', price: 35 }
   Una riga del carrello:        { id: 3, name: 'Brown Cowboy', price: 35, quantity: 2 }
   ========================================================================== */
// import { ... } from '../_lab/firestore-mock.mjs';

/**
 * Restituisce l'array delle righe del carrello dell'utente.
 * Carrello mai creato → [] (non null, non errore).
 */
export const getCart = async (db, uid) => {
  // TODO
};

/**
 * Aggiunge UN pezzo del prodotto.
 * - Se il prodotto non c'è ancora → nuova riga con quantity 1.
 * - Se c'è già → quantity + 1 (NON una seconda riga).
 * - Se product non ha id, name (stringa) e price (numero ≥ 0) → Error "prodotto non valido".
 * Restituisce il carrello aggiornato (array).
 */
export const addItemToCart = async (db, uid, product) => {
  // TODO
};

/**
 * Toglie UN pezzo del prodotto.
 * - quantity > 1 → quantity - 1
 * - quantity === 1 → la riga sparisce
 * - prodotto non presente → carrello invariato, nessun errore
 * Restituisce il carrello aggiornato.
 */
export const removeItemFromCart = async (db, uid, productId) => {
  // TODO
};

/**
 * Elimina completamente la riga del prodotto, qualunque sia la quantità.
 * Restituisce il carrello aggiornato.
 */
export const clearItemFromCart = async (db, uid, productId) => {
  // TODO
};

/**
 * Totale in euro: somma di price × quantity. Carrello vuoto → 0.
 */
export const getCartTotal = async (db, uid) => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOCUMENTO DI PROGETTO (obbligatorio — senza, il voto massimo è 6)

   1. Percorso scelto per il carrello e perché:

   2. Forma dei dati (scrivi un esempio di documento):

   3. Alternativa che hai scartato e perché.
      (Almeno una tra: campo dentro users/{uid} · documento carts/{uid} ·
       sotto-collection users/{uid}/cartItems/{productId})

   4. Hai salvato il totale nel database? Perché sì / perché no?

   5. Cosa succede se l'utente ha il sito aperto su due schede e aggiunge un
      prodotto da entrambe quasi nello stesso momento? La tua soluzione regge?
      (Non serve risolverlo: serve VEDERE il problema.)
--------------------------------------------------------------------------- */
