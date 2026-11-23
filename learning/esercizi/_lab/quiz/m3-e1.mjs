/* Quiz M3-E1 · Leggi e prevedi (Firestore). File del professore: lo studente non lo modifica.
   createUserDocumentFromAuth è IDENTICA a quella del corso, ma gira sul simulatore di Firestore del Lab.
   Tentativo 2: scenari nuovi rispetto al tentativo 1 (che è stato corretto e ha rivelato le risposte). */
/* eslint-disable no-console */
import * as F from '../firestore-mock.mjs';

const { getFirestore, doc, getDoc, setDoc } = F;
let db;

const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  return userDocRef;
};

export const tentativo = 2;
export const titolo = 'Leggi e prevedi (Firestore)';

export const blocchi = [
  {
    id: 'D1',
    titolo: 'sign-up con email: percorso e dati salvati',
    contesto: createUserDocumentFromAuth,
    domanda: 'Il database è vuoto. Un utente si registra con email e password, quindi Auth non conosce il nome (displayName: null). Il form passa il nome come informazione aggiuntiva.',
    codice: async () => {
      db = getFirestore();
      const userAuth = { uid: 'Zx9', displayName: null, email: 'sara@mail.it' };
      const ref = await createUserDocumentFromAuth(userAuth, { displayName: 'Sara' });
      const snap = await getDoc(ref);
      console.log(ref.path);
      console.log(snap.exists(), snap.data().displayName, snap.data().email);
      console.log(Object.keys(snap.data()));
    },
  },
  {
    id: 'D2',
    titolo: 'il secondo accesso',
    contesto: createUserDocumentFromAuth,
    domanda: 'Il documento di Sara esiste già. Ora lei entra con Google, che conosce il nome completo, e qualcuno passa anche un ruolo. `stats` conta letture e scritture fatte con getDoc/setDoc (il documento iniziale non conta).',
    codice: async () => {
      db = getFirestore();
      F.__lab.seed(db, 'users/Zx9', { displayName: 'Sara', email: 'sara@mail.it' });
      const userAuth = { uid: 'Zx9', displayName: 'Sara Rossi', email: 'sara@mail.it' };
      const ref = await createUserDocumentFromAuth(userAuth, { role: 'admin' });
      const snap = await getDoc(ref);
      console.log(snap.data());
      console.log(F.__lab.stats(db));
    },
  },
  {
    id: 'D3',
    titolo: 'riferimento o fotografia?',
    domanda: 'Il documento users/nuovo non esiste. `stats(db).reads` conta quante letture sono state fatte.',
    codice: async () => {
      db = getFirestore();
      const ref = doc(db, 'users', 'nuovo');
      console.log(ref.path, ref.id);
      console.log(F.__lab.stats(db).reads);
      const snap = await getDoc(ref);
      console.log(snap.exists(), snap.data());
      console.log(F.__lab.stats(db).reads);
    },
  },
  {
    id: 'D4',
    titolo: 'e se manca await?',
    domanda: 'Qualcuno dimentica await davanti a getDoc. (Ricorda: un errore che nessuno gestisce si scrive  errore <messaggio>.)',
    codice: () => {
      db = getFirestore();
      const ref = doc(db, 'users', 'Zx9');
      const snap = getDoc(ref);
      console.log(snap instanceof Promise);
      console.log(snap.exists());
      console.log('fine');
    },
  },
  {
    id: 'D5',
    titolo: 'Date o Timestamp?',
    contesto: createUserDocumentFromAuth,
    domanda: 'Il documento viene creato, poi riletto. Cosa arriva nel campo createdAt?',
    codice: async () => {
      db = getFirestore();
      const ref = await createUserDocumentFromAuth({ uid: 'Zx9', displayName: 'Sara', email: 's@mail.it' });
      const { createdAt } = (await getDoc(ref)).data();
      console.log(createdAt instanceof Date, typeof createdAt.toDate);
      console.log(createdAt.toDate() instanceof Date);
      console.log(typeof createdAt.getFullYear);
    },
  },
  {
    id: 'D6',
    tipo: 'aperta',
    titolo: 'da dev: quando setDoc fallisce',
    contesto: createUserDocumentFromAuth,
    domanda: 'Il sign-up chiama createUserDocumentFromAuth(user, { age: undefined }). Firestore rifiuta i valori undefined, quindi setDoc lancia un errore. Cosa succede dentro la funzione, cosa restituisce, cosa vede il SignUpForm che la chiama, e che stato resta nel database? Proponi una correzione.',
    puntiChiave: [
      'setDoc lancia l\'errore → il catch lo intercetta e fa solo console.log: l\'errore viene "ingoiato".',
      'La funzione prosegue e restituisce comunque userDocRef, come se tutto fosse andato bene.',
      'Il SignUpForm non entra nel suo catch: fa reset, alert di successo e setCurrentUser.',
      'Nel database il documento users/<uid> NON esiste, mentre l\'account in Auth sì: dati incoerenti.',
      'Correzione: nel catch rilanciare l\'errore (throw error) o restituire un segnale di fallimento, così chi chiama può reagire; e non passare mai undefined (usare null o togliere il campo).',
    ],
  },
];
