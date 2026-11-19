/* ==========================================================================
   M1 · E3 ★★★ · Ricostruisci il registro delle app (come fa l'SDK)
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m1-e3

   createAppRegistry() restituisce un oggetto con:
     initializeApp(options, name = '[DEFAULT]')
        - nessuna app con quel nome → crea { name, options } e la restituisce
        - esiste già con options UGUALI (stesso contenuto, anche se oggetto diverso)
          → restituisce QUELLA esistente (stesso riferimento)
        - esiste con options DIVERSE → lancia un Error con
            error.code = 'app/duplicate-app'
            message che contiene il nome dell'app
     getApp(name = '[DEFAULT]')
        - esiste → la restituisce
        - non esiste → Error con code 'app/no-app' e message
          "No Firebase App '<name>' has been created - call initializeApp() first"
     getApps() → array (nuovo) delle app registrate
     deleteApp(app) → la rimuove dal registro

   L'oggetto options salvato nell'app NON deve poter essere modificato da fuori
   modificando l'oggetto passato a initializeApp (fai una copia).
   ========================================================================== */
export const createAppRegistry = () => {
  // TODO
};

/* DOMANDE
   1. Come confronti "options uguali"? Le chiavi possono essere in ordine diverso.
   2. Perché l'SDK vero lancia un errore per options diverse invece di sovrascrivere?
   RISPOSTE:
*/
