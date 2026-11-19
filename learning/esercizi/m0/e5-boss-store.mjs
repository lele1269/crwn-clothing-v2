/* ==========================================================================
   M0 · E5 ★★★★★ · BOSS · Costruisci il motore che c'è sotto
   AIUTI APERTI: 0      ← aggiorna con onestà

   Context + useState, onAuthStateChanged, Redux (che vedrai più avanti nel corso):
   sotto c'è sempre la stessa idea. Uno STATO, un modo per CAMBIARLO e degli
   ASCOLTATORI da avvisare. Costruiscila tu, in JavaScript puro.

   createStore(initialState) restituisce:
     getState()          → lo stato attuale
     setState(update)    → update è un oggetto parziale (si fonde con spread)
                           OPPURE una funzione (stato) => oggetto parziale.
                           Lo stato nuovo è SEMPRE un oggetto nuovo.
                           Se nessun valore cambia davvero (Object.is su ogni chiave
                           aggiornata) → nessuna notifica, lo stato resta lo stesso riferimento.
     subscribe(listener) → registra listener(statoNuovo, statoVecchio),
                           restituisce unsubscribe(). Lo stesso listener registrato
                           due volte riceve due notifiche? Decidi e giustifica.
   Regole extra:
     - un listener che si disiscrive DURANTE una notifica non deve rompere il ciclo
       né far saltare gli altri listener
     - un listener che lancia un errore non deve impedire agli altri di essere avvisati

   Test:  node learning/esercizi/verifica.mjs m0-e5
   ========================================================================== */
export const createStore = (initialState) => {
  // TODO
};

/* DOCUMENTO DI PROGETTO (obbligatorio — senza, voto massimo 6)
   1. Mappa i tuoi concetti su UserProvider: chi è getState, chi è setState, chi è
      subscribe, chi è unsubscribe?
   2. Perché "nessun cambiamento → nessuna notifica" è importante? (Pensa a React e
      a Object.is.)
   3. Come hai gestito la disiscrizione durante la notifica? Che struttura dati hai
      usato e perché?
   4. Doppia registrazione dello stesso listener: cosa hai deciso e perché?
*/
