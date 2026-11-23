/* Quiz M2-E1 · Prevedi il comportamento di Auth. File del professore: lo studente non lo modifica.
   I blocchi "output" usano il simulatore di Auth del Lab (stessa API e stessi codici di errore
   di firebase/auth, con la email enumeration protection attiva come nei progetti recenti). */
/* eslint-disable no-console */
import * as A from '../auth-mock.mjs';

const { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, __lab } = A;

export const tentativo = 1;
export const titolo = 'Prevedi il comportamento di Auth';

export const blocchi = [
  {
    id: 'D1',
    tipo: 'ordina',
    titolo: 'la sequenza del sign-up',
    domanda: 'Nel tuo SignUpForm l\'utente compila tutto correttamente e preme "Sign Up". Metti in ordine quello che succede.',
    voci: [
      '`resetFormFields()` svuota il form',
      '`event.preventDefault()` blocca il ricaricamento della pagina',
      'Firebase Auth crea l\'account, aggiorna `auth.currentUser` e avvisa i listener di `onAuthStateChanged`',
      'controllo `password !== confirmPassword`',
      '`createUserDocumentFromAuth` scrive il documento `users/<uid>` in Firestore',
      '`alert(\'Sign up successful!\')`',
      '`setCurrentUser(user)` aggiorna il context',
    ],
    giusto: [2, 4, 3, 5, 1, 6, 7],
    spiegazione: 'Segui il tuo handleSubmit dall\'alto: preventDefault, il controllo delle password, poi i due await in fila (prima Auth, poi Firestore).\nI listener di onAuthStateChanged vengono avvisati DENTRO la creazione dell\'account, prima che il tuo await riceva { user }.\nPoi reset, alert e setCurrentUser, nell\'ordine in cui li hai scritti.',
  },
  {
    id: 'D2',
    tipo: 'scelta',
    titolo: 'dove vive la sessione',
    domanda: 'L\'utente chiude il browser e lo riapre il giorno dopo: è ancora loggato. Dove era salvata la sessione?',
    opzioni: {
      a: 'in un cookie inviato dal server di Firebase',
      b: 'nello state di React (`currentUser` del context)',
      c: 'in IndexedDB, nel browser',
      d: 'da nessuna parte: Firebase rifà il login con la password salvata',
    },
    giusta: 'c',
    spiegazione: 'Sul web l\'SDK salva la sessione in IndexedDB (database firebaseLocalStorageDb).\nLo state di React invece sparisce a ogni ricarica: per questo il context va ripopolato con onAuthStateChanged.',
  },
  {
    id: 'D3',
    tipo: 'scelta',
    titolo: 'il primo istante dopo il caricamento',
    domanda: 'Stessa situazione: la pagina è appena stata caricata e la sessione è salvata. Cosa vale `auth.currentUser` nel primissimo istante, e cosa succede poco dopo?',
    opzioni: {
      a: 'vale già l\'utente, perché la sessione è salvata',
      b: 'vale null; poco dopo l\'SDK ripristina la sessione, currentUser diventa l\'utente e onAuthStateChanged viene chiamato',
      c: 'vale undefined finché non fai di nuovo login',
      d: 'vale null e resta null finché l\'utente non fa di nuovo login',
    },
    giusta: 'b',
    spiegazione: 'Leggere la sessione da IndexedDB è asincrono. Per qualche istante currentUser è null anche se l\'utente è loggato.\nPer questo non si legge auth.currentUser all\'avvio: ci si iscrive a onAuthStateChanged e si aspetta la notifica.',
  },
  {
    id: 'D4',
    tipo: 'output',
    titolo: 'i codici di errore reali',
    domanda: 'Un account esiste già: leo@mail.it con password "segreta1". Cosa stampa?',
    codice: async () => {
      const auth = getAuth();
      __lab.seedAccount(auth, { email: 'leo@mail.it', password: 'segreta1' });
      const prova = async (azione) => {
        try { await azione(); } catch (e) { console.log(e.code); }
      };
      await prova(() => createUserWithEmailAndPassword(auth, 'leo@mail.it', 'nuova123'));
      await prova(() => createUserWithEmailAndPassword(auth, 'sara@mail.it', '123'));
      await prova(() => signInWithEmailAndPassword(auth, 'leo@mail.it', 'sbagliata'));
      await prova(() => signInWithEmailAndPassword(auth, 'nessuno@mail.it', 'segreta1'));
      await prova(() => signInWithPopup(auth, new GoogleAuthProvider())); // l'utente chiude il popup
    },
  },
  {
    id: 'D5',
    tipo: 'aperta',
    titolo: 'perché lo stesso codice?',
    domanda: 'Nel blocco D4, la password sbagliata e l\'email mai registrata danno lo stesso codice. Che informazione protegge questa scelta, e da chi?',
    puntiChiave: [
      'Protegge l\'informazione "questa email ha un account oppure no".',
      'La protegge da chi prova tante email per scoprire chi è registrato (email enumeration), ad esempio per phishing o per provare password solo su account esistenti.',
      'Si chiama email enumeration protection ed è attiva di default nei progetti Firebase recenti: per questo auth/wrong-password e auth/user-not-found non arrivano più.',
      'Conseguenza pratica: il tuo SignInForm ha due case (wrong-password, user-not-found) che non scattano mai; serve un case per auth/invalid-credential.',
    ],
  },
  {
    id: 'D6',
    tipo: 'aperta',
    titolo: 'da dev: cosa vede l\'utente',
    domanda: 'Il tuo SignUpForm mostra un alert solo per auth/email-already-in-use; per tutto il resto fa solo console.log. Elenca gli altri errori che un utente reale può provocare dal form e cosa vede oggi in ciascun caso.',
    puntiChiave: [
      'auth/weak-password (password sotto i 6 caratteri): l\'utente non vede niente, il form resta pieno, nessun messaggio.',
      'auth/invalid-email (un\'email che il browser accetta ma Firebase no): di nuovo nessun messaggio.',
      'auth/network-request-failed (connessione assente): nessun messaggio.',
      'Errori di Firestore dopo che l\'account è stato creato: createUserDocumentFromAuth li cattura e fa solo console.log, quindi il sign-up sembra riuscito ma il documento manca.',
      'In tutti questi casi l\'errore finisce solo nella console: l\'utente pensa che il bottone non funzioni. Serve un messaggio per ogni codice (o uno generico nel default).',
    ],
  },
];
