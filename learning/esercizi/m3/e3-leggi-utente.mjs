/* ==========================================================================
   M3 · E3 ★★ · Leggere un utente
   AIUTI APERTI: 0      ← aggiorna con onestà

   Nel progetto vero importeresti da 'firebase/firestore'.
   Qui usiamo il simulatore, che ha la STESSA API ma vive in memoria.
   Test:  node learning/esercizi/verifica.mjs m3-e3
   ========================================================================== */
import { doc, getDoc } from '../_lab/firestore-mock.mjs';

/**
 * Legge il documento users/{uid}.
 *
 * - Se uid è vuoto/assente → restituisce null SENZA fare nessuna lettura
 *   (ogni lettura su Firestore si paga: non sprecarle).
 * - Se il documento non esiste → restituisce null.
 * - Se esiste → restituisce un oggetto con TUTTI i campi del documento
 *   più il campo `id` (l'id del documento).
 *   es. { id: 'abc123', displayName: 'Leo', email: 'leo@mail.it', createdAt: Timestamp }
 *
 * @param db  l'istanza Firestore
 * @param uid l'id dell'utente
 */
export const getUserDocument = async (db, uid) => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOMANDA: perché l'id non è dentro snapshot.data()? Dove "vive" l'id di un
   documento? (Pensa alla metafora cartella/etichetta.)

   RISPOSTA:

--------------------------------------------------------------------------- */
