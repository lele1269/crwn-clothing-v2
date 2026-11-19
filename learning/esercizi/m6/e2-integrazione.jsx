/* ==========================================================================
   M6 · E2 ★★★★ · Integrazione: Navigation + ProfileBadge
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m6-e2

   Usano lo UserContext di riferimento (lezione 11) e il finto firebase.utils.
   ========================================================================== */
import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../_lab/user-context-ref.jsx';
import { signOutUser, db } from '../_lab/firebase-utils-mock.mjs';
import { doc, getDoc } from '../_lab/firestore-mock.mjs';
// ATTENZIONE: db è un "live binding" che i test sostituiscono tra un test e l'altro:
// leggilo dentro la funzione, non copiarlo in una costante a livello di modulo.

/**
 * Navigation
 *  - nessun utente → testo "SIGN IN" (un <span> va bene)
 *  - utente → un <button> "SIGN OUT" che chiama signOutUser
 *  - sempre: <ProfileBadge />
 */
export const Navigation = () => {
  // TODO
};

/**
 * ProfileBadge
 *  - nessun utente → non mostra niente (return null)
 *  - utente → legge il documento users/{uid} da Firestore e mostra
 *      "Ciao, <displayName del DOCUMENTO>"   (non quello di Auth!)
 *    finché il documento non è arrivato mostra "…"
 *  - se l'utente cambia mentre una lettura è in corso, la risposta VECCHIA
 *    non deve mai essere mostrata (race condition)
 */
export const ProfileBadge = () => {
  // TODO
};

/* DOMANDE
   1. Perché il displayName va letto dal documento Firestore e non da currentUser?
      (Pensa a chi si è registrato con email e password.)
   2. Descrivi passo per passo la race condition che il test "utente cambiato" provoca,
      e come la tua soluzione la evita. (Cerca su react.dev "Fetching data" negli esempi
      di useEffect: c'è un pattern con una variabile "ignore".)
   3. Dove andrebbe questa lettura in un'app più grande: nel componente, in un context,
      in utils? Perché?
   RISPOSTE:
*/
