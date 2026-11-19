/* ==========================================================================
   M3 · E4 ★★★ · Aggiornare il profilo — da zero
   AIUTI APERTI: 0      ← aggiorna con onestà

   Test:  node learning/esercizi/verifica.mjs m3-e4
   Importa dal simulatore quello che ti serve (stessa API di 'firebase/firestore').
   ========================================================================== */
// import { ... } from '../_lab/firestore-mock.mjs';

/**
 * updateUserProfile(db, uid, changes)
 *
 * Aggiorna il profilo dell'utente users/{uid}. Regole (in quest'ordine di importanza):
 *
 *  1. Se uid non è una stringa non vuota, o changes non è un oggetto (o è null),
 *     lancia Error con messaggio che contiene "dati non validi".
 *  2. L'unico campo modificabile è `displayName`. Se changes contiene QUALSIASI
 *     altro campo (es. email, createdAt), lancia Error con messaggio
 *     "campo non modificabile: <nome>" e NON scrivere niente.
 *  3. displayName deve essere una stringa che, tolti gli spazi iniziali/finali,
 *     non è vuota. Altrimenti Error con "displayName non valido".
 *     Va salvata la versione SENZA spazi iniziali/finali.
 *  4. Se l'utente non esiste, lancia Error con "utente inesistente"
 *     (non deve essere creato un documento nuovo!).
 *  5. Gli altri campi (email, createdAt, ...) devono restare intatti.
 *  6. Aggiungi/aggiorna il campo `updatedAt` con la data attuale.
 *  7. Restituisci i dati aggiornati letti dal database, con l'id:
 *     { id, displayName, email, createdAt, updatedAt }
 */
export const updateUserProfile = async (db, uid, changes) => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOMANDE (rispondi qui):

   A) Spiega la differenza tra queste tre chiamate su un documento ESISTENTE
      { displayName: 'Leo', email: 'leo@mail.it' }:
        1. setDoc(ref, { displayName: 'Leandro' })
        2. setDoc(ref, { displayName: 'Leandro' }, { merge: true })
        3. updateDoc(ref, { displayName: 'Leandro' })
      E su un documento che NON esiste, cosa fa ognuna?

   B) Perché i controlli 1-3 vanno fatti PRIMA di qualsiasi chiamata a Firestore?

   C) Questo controllo "solo displayName" nel frontend protegge davvero il
      database da un utente malintenzionato? Se no, cosa lo protegge?

   RISPOSTE:

--------------------------------------------------------------------------- */
