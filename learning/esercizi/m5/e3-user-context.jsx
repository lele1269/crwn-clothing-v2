/* ==========================================================================
   M5 · E3 ★★★ · Il tuo UserContext (versione migliorata)
   AIUTI APERTI: 0      ← aggiorna con onestà

   Scrivi UserContext e UserProvider come nel corso (lezione 11), più un
   miglioramento: lo stato isAuthLoading, che risolve il "lampo di SIGN IN"
   all'avvio (M5, domanda da dev 6).

   Test:  node learning/esercizi/verifica.mjs m5-e3
   ========================================================================== */
import { createContext, useState, useEffect } from 'react';
import {
  onAuthStateChangedListener,
  createUserDocumentFromAuth,
} from '../_lab/firebase-utils-mock.mjs';   // nel progetto: '../utils/firebase/firebase.utils'

/**
 * UserContext
 * Default: { currentUser: null, setCurrentUser: () => null, isAuthLoading: true }
 */
export const UserContext = null; // TODO

/**
 * UserProvider
 *  - state currentUser (iniziale null) e isAuthLoading (iniziale true)
 *  - al montaggio si iscrive con onAuthStateChangedListener
 *  - nella callback:
 *      · se c'è un utente → createUserDocumentFromAuth(user)
 *      · currentUser = user
 *      · isAuthLoading = false (da qui in poi sappiamo la verità)
 *  - allo smontaggio si disiscrive
 *  - value = { currentUser, setCurrentUser, isAuthLoading }
 */
export const UserProvider = ({ children }) => {
  // TODO
};

/**
 * AuthStatus: un piccolo consumer da usare in Navigation.
 *  - isAuthLoading → mostra "…"
 *  - utente loggato → mostra "SIGN OUT"
 *  - nessun utente → mostra "SIGN IN"
 */
export const AuthStatus = () => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOMANDE

   1. Quante volte viene chiamato il corpo di UserProvider (render) dall'avvio fino
      a "SIGN IN" visibile per un utente NON loggato? Elenca i render e cosa vale
      lo state in ciascuno.

   2. Nella callback chiami due setter (setCurrentUser e setIsAuthLoading).
      Quanti re-render produce? (Suggerimento: cerca "batching" nella doc di React,
      e verifica quale versione di React fa batching FUORI dagli event handler.
      Tu hai React 17.)

   3. Perché isAuthLoading non si può calcolare da currentUser (come cartCount
      da cartItems)?

   RISPOSTE:
--------------------------------------------------------------------------- */
