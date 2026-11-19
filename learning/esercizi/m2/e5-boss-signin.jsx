/* ==========================================================================
   M2 · E5 ★★★★★ · BOSS · Un SignInForm da produzione
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m2-e5

   Riscrivi SignInForm senza alert:
     - due input controllati: <input name="email" type="email" aria-label="Email"> e
       <input name="password" type="password" aria-label="Password">
     - bottone submit con testo "Sign In", bottone type="button" con testo "Sign In With Google"
     - un messaggio d'errore in un elemento con role="alert" (solo quando c'è un errore)
     - mentre una richiesta è in corso: ENTRAMBI i bottoni disabled
     - login email riuscito → campi svuotati, nessun messaggio
     - credenziali sbagliate → messaggio 'Email o password non corretti', campi NON svuotati
     - popup Google chiuso → nessun messaggio
     - un nuovo tentativo cancella il messaggio precedente
   Usa le funzioni del finto utils qui sotto (stesse firme del tuo firebase.utils.js).
   Puoi importare classifyAuthError dal tuo E2.
   ========================================================================== */
import { useState } from 'react';
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
} from '../_lab/firebase-utils-mock.mjs';
// import { classifyAuthError } from './e2-errori.mjs';

const SignInForm = () => {
  // TODO
};

export default SignInForm;

/* DOCUMENTO DI PROGETTO (obbligatorio — senza, voto massimo 6)
   1. Quali state hai usato e perché proprio quelli? Qualcuno è derivabile da altri?
   2. Perché i bottoni vanno disabilitati durante la richiesta? Cosa succederebbe con un
      doppio click veloce su "Sign In"?
   3. Dove resetti isSubmitting: in try, in catch, o in finally? Perché?
   4. Perché il messaggio d'errore è uguale per email inesistente e password sbagliata?
   5. Accessibilità: perché role="alert"? Cosa fa uno screen reader con quell'elemento?
*/
