/* ==========================================================================
   M2 · E4 ★★★★ · Caccia ai bug negli handler di login
   AIUTI APERTI: 0      ← aggiorna con onestà

   Questi handler restituiscono un risultato invece di mostrare alert:
     { ok: true, user? }  oppure  { ok: false, message }   (message null = non mostrare niente)
   Contengono 4 bug. Test PRIMA di toccare:
       node learning/esercizi/verifica.mjs m2-e4
   ========================================================================== */
import {
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword,
  signOutUser,
} from '../_lab/firebase-utils-mock.mjs';

export const handleGoogleSignIn = async () => {
  const { user } = await signInWithGooglePopup();
  return { ok: true, user };
};

export const handleEmailSignIn = async (email, password) => {
  try {
    signInAuthUserWithEmailAndPassword(email, password);
    return { ok: true };
  } catch (error) {
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/user-not-found':
        return { ok: false, message: 'Email o password non corretti' };
      default:
        return { ok: false, message: 'Qualcosa è andato storto, riprova' };
    }
  }
};

export const handleSignOut = async () => {
  await signOutUser;
  return { ok: true };
};

/* SCHEDA BUG (4): riga · cosa faceva · cosa doveva fare · modello mentale sbagliato · come l'ho scoperto
   BUG 1:
   BUG 2:
   BUG 3:
   BUG 4:
   DOMANDA: uno dei bug fa passare il test "password sbagliata" PER CASO in un certo ordine di
   correzione. Quale, e perché è pericoloso correggere i bug "a caso" finché i test passano?
*/
