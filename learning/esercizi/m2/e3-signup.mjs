/* ==========================================================================
   M2 · E3 ★★★ · Orchestrare il sign-up
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m2-e3

   Scrivi la logica del sign-up FUORI dal componente, così che il componente debba
   solo chiamare signUpUser e mostrare il risultato.
   ========================================================================== */
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from '../_lab/firebase-utils-mock.mjs';   // nel progetto: '../../utils/firebase/firebase.utils'
// import { validateSignUp } from './e2-errori.mjs';

/**
 * signUpUser(fields) → Promise<User>
 *  1. valida (puoi riusare validateSignUp di E2). Se ci sono errori:
 *       lancia un Error con message 'dati non validi' e proprietà fieldErrors
 *       (l'oggetto degli errori). NESSUNA chiamata ad Auth.
 *  2. crea l'account Auth
 *  3. crea il documento con il displayName (senza spazi iniziali/finali)
 *  4. restituisce user
 *  Gli errori di Auth devono arrivare a chi chiama INVARIATI (stesso code).
 */
export const signUpUser = async (fields) => {
  // TODO
};

/* DOMANDE
   1. Perché conviene che signUpUser LANCI gli errori invece di restituire null
      o mostrare un alert?
   2. Se il punto 3 fallisce, l'account Auth esiste già ma il profilo no. Cosa faresti?
      (Non serve implementarlo: ragionaci. Esiste user.delete() in Firebase Auth…)
   RISPOSTE:
*/
