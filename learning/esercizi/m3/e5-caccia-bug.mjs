/* ==========================================================================
   M3 · E5 ★★★★ · Caccia ai bug
   AIUTI APERTI: 0      ← aggiorna con onestà

   Questa è una versione di createUserDocumentFromAuth con 4 BUG.
   Ognuno corrisponde a un errore di ragionamento molto comune.

   Il tuo lavoro:
     1. Esegui i test PRIMA di toccare qualsiasi cosa:
          node learning/esercizi/verifica.mjs m3-e5
     2. Correggi i bug UNO ALLA VOLTA, rieseguendo i test ogni volta.
     3. Per ogni bug compila la scheda in fondo. La scheda vale quanto il codice:
        trovare un bug per tentativi senza capirlo significa che lo rifarai.

   Non riscrivere la funzione da zero: modifica il minimo indispensabile.
   ========================================================================== */
import { doc, getDoc, setDoc } from '../_lab/firestore-mock.mjs';

export const createUserDocumentFromAuth = async (
  db,
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);

  const userSnapshot = getDoc(userDocRef);

  if (userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        ...additionalInformation,
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userSnapshot;
};

/* ---------------------------------------------------------------------------
   SCHEDA BUG (una per bug)

   BUG 1
     Riga:
     Cosa faceva il codice:
     Cosa avrebbe dovuto fare:
     Quale idea sbagliata porta a scriverlo così:
     Come l'ho scoperto (test, messaggio di errore, ragionamento):

   BUG 2
     Riga:
     Cosa faceva il codice:
     Cosa avrebbe dovuto fare:
     Quale idea sbagliata porta a scriverlo così:
     Come l'ho scoperto:

   BUG 3
     Riga:
     Cosa faceva il codice:
     Cosa avrebbe dovuto fare:
     Quale idea sbagliata porta a scriverlo così:
     Come l'ho scoperto:

   BUG 4
     Riga:
     Cosa faceva il codice:
     Cosa avrebbe dovuto fare:
     Quale idea sbagliata porta a scriverlo così:
     Come l'ho scoperto:

   DOMANDA FINALE: quale dei 4 bug è il più pericoloso in produzione, cioè con
   utenti veri? Perché? (Suggerimento: pensa a quale passa inosservato più a lungo.)

   RISPOSTA:
--------------------------------------------------------------------------- */
