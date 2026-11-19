/* ==========================================================================
   T1 · E2 ★★★ · Dalla documentazione all'astrazione
   AIUTI APERTI: 0      ← aggiorna con onestà

   Hai davanti gli snippet UFFICIALI (Firebase docs, scheda Web modulare).
   Il tuo lavoro: trasformarli in funzioni nello stile di firebase.utils.js.
   Per ogni funzione compila la riga "FONTE" e la TABELLA DI TRADUZIONE.

   Test:  node learning/esercizi/verifica.mjs t1-e2
   ========================================================================== */
// Nel progetto vero: import { ... } from 'firebase/firestore';
// import { ... } from '../_lab/firestore-mock.mjs';

/* ---------------------------------------------------------------------------
   SNIPPET UFFICIALE A — Add data › Increment a numeric value
     import { doc, updateDoc, increment } from "firebase/firestore";
     const washingtonRef = doc(db, "cities", "DC");
     await updateDoc(washingtonRef, {
         population: increment(50)
     });

   SNIPPET UFFICIALE B — Delete data › Delete documents
     import { doc, deleteDoc } from "firebase/firestore";
     await deleteDoc(doc(db, "cities", "DC"));

   SNIPPET UFFICIALE C — Add data › Set a document (merge)
     const cityRef = doc(db, 'cities', 'BJ');
     await setDoc(cityRef, { capital: true }, { merge: true });
--------------------------------------------------------------------------- */

/**
 * recordLogin(db, uid)
 * Registra un login dell'utente users/{uid}:
 *  - loginCount aumenta di 1 (se non esiste ancora, diventa 1)
 *  - lastLoginAt = data attuale
 *  - gli altri campi restano intatti
 *  - se uid è vuoto/assente → Error con "uid mancante", senza chiamate a Firestore
 *  - se l'utente non esiste → la funzione deve FALLIRE (Promise rifiutata)
 *    e NON deve creare il documento.
 *
 * FONTE (snippet + sezione della reference che hai controllato):
 * TRADUZIONE: "cities" → ...   "DC" → ...   population → ...   50 → ...
 */
export const recordLogin = async (db, uid) => {
  // TODO
};

/**
 * deleteUserDocument(db, uid)
 *  - uid vuoto/assente → Error con "uid mancante", nessuna chiamata a Firestore
 *  - cancella users/{uid}
 *  - cancellare un documento che non esiste NON è un errore
 *
 * FONTE:
 * TRADUZIONE:
 */
export const deleteUserDocument = async (db, uid) => {
  // TODO
};

/**
 * setUserPreferences(db, uid, preferences)
 * Salva le preferenze in un campo `preferences` (una mappa) di users/{uid}.
 *  - preferences deve essere un oggetto non null (non array) → altrimenti Error "preferenze non valide"
 *  - NON deve cancellare gli altri campi dell'utente
 *  - le preferenze già salvate e non presenti nella nuova chiamata RESTANO
 *    es. salvato { theme: 'dark' }, poi setUserPreferences(..., { lang: 'it' })
 *        → preferences = { theme: 'dark', lang: 'it' }
 *
 * FONTE:
 * TRADUZIONE:
 */
export const setUserPreferences = async (db, uid, preferences) => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOMANDE

   1. Per recordLogin hai scelto updateDoc o setDoc con merge? Quale frase della
      reference ha deciso la scelta, visto il requisito "se l'utente non esiste → fallire"?

   2. Per setUserPreferences: setDoc con { merge: true } fonde anche le mappe annidate
      (preferences) o le sostituisce? Come lo hai verificato? (Documentazione? Test?
      Cita la fonte: "ho provato" è una fonte valida se dici COSA hai provato.)

   3. Il componente che chiama queste funzioni dovrebbe conoscere il percorso "users/..."?
      Perché?

   RISPOSTE:
--------------------------------------------------------------------------- */
