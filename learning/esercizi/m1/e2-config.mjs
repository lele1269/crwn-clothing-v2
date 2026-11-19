/* ==========================================================================
   M1 · E2 ★★ · Validare una firebaseConfig
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m1-e2

   validateFirebaseConfig(config) → { errors: string[], warnings: string[] }

   ERRORS (la config non può funzionare):
     - config non è un oggetto (o è null / array)  → ['config non valida']  (e basta)
     - manca una chiave obbligatoria o non è una stringa non vuota:
         apiKey, authDomain, projectId, appId     → 'manca <chiave>'
     - apiKey non inizia con 'AIza'                → 'apiKey non valida'
     - projectId non rispetta: solo minuscole, cifre e trattini, 6-30 caratteri,
       inizia con una lettera                      → 'projectId non valido'
   WARNINGS (funziona, ma è sospetto):
     - chiavi sconosciute (ammesse: apiKey, authDomain, projectId, storageBucket,
       messagingSenderId, appId, measurementId)    → 'chiave sconosciuta: <chiave>'
     - authDomain non contiene il projectId        → 'authDomain e projectId non coincidono'

   Gli errori nell'ORDINE delle chiavi obbligatorie elencate sopra.
   ========================================================================== */
export const validateFirebaseConfig = (config) => {
  // TODO
};

/* DOMANDA: perché "authDomain e projectId non coincidono" è un warning e non un errore?
   (Suggerimento: domini personalizzati.)
   RISPOSTA:
*/
