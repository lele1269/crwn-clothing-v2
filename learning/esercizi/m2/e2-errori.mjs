/* ==========================================================================
   M2 · E2 ★★ · Classificare gli errori e validare il sign-up
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m2-e2
   ========================================================================== */

/**
 * classifyAuthError(error) → { kind, message }
 *   kind 'ignore'  → message null      (popup-closed-by-user, cancelled-popup-request)
 *   kind 'show'    → messaggio per l'utente, in italiano:
 *       invalid-credential, wrong-password, user-not-found → 'Email o password non corretti'
 *         (lo STESSO messaggio per tutti e tre: perché?)
 *       email-already-in-use → 'Email già registrata'
 *       weak-password        → 'La password deve avere almeno 6 caratteri'
 *       invalid-email        → 'Email non valida'
 *       too-many-requests    → 'Troppi tentativi, riprova tra qualche minuto'
 *   kind 'generic' → 'Qualcosa è andato storto, riprova'  (tutto il resto, anche se
 *                    error non ha un code o non è nemmeno un oggetto)
 *   I code arrivano come 'auth/xxx'.
 */
export const classifyAuthError = (error) => {
  // TODO
};

/**
 * validateSignUp({ displayName, email, password, confirmPassword })
 *   → oggetto con SOLO i campi in errore (vuoto {} se tutto ok):
 *     displayName: 'Inserisci un nome'                  (vuoto o solo spazi)
 *     email: 'Email non valida'                         (deve contenere testo@testo.testo)
 *     password: 'Almeno 6 caratteri'
 *     confirmPassword: 'Le password non coincidono'
 *   Controlla TUTTI i campi (non fermarti al primo errore): perché è meglio per l'utente?
 */
export const validateSignUp = (fields) => {
  // TODO
};
