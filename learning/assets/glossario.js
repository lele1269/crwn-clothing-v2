/* Glossario globale. Chiave = data-term usato nelle pagine (<dfn data-term="...">). */
window.LAB_GLOSSARY = {
  baas: { t: 'BaaS (Backend as a Service)', m: 'm1', d: 'Un backend già pronto che noleggi invece di scriverlo: database, login, file. Firebase è un BaaS: tu scrivi solo il frontend e parli con i suoi server tramite l\'SDK.' },
  sdk: { t: 'SDK', m: 'm1', d: 'Software Development Kit: la libreria JavaScript (il pacchetto "firebase") che traduce le tue chiamate di funzione in richieste di rete verso i server Firebase.' },
  uid: { t: 'uid', m: 'm2', d: 'User ID: stringa unica e permanente che Firebase Auth assegna a ogni utente. È il "codice fiscale" dell\'utente ed è il ponte tra Auth e Firestore.' },
  promise: { t: 'Promise', m: 'm0', d: 'Un oggetto che rappresenta un valore che arriverà in futuro. È una ricevuta: con await aspetti che la ricevuta diventi il pacco vero.' },
  await: { t: 'await', m: 'm0', d: 'Mette in pausa la funzione async finché la Promise non è risolta, e ti dà il valore finale. Senza await ottieni la Promise, non il valore.' },
  nosql: { t: 'Database NoSQL documentale', m: 'm3', d: 'Database che salva i dati come documenti (oggetti simili al JSON) raggruppati in collection, invece che come righe in tabelle con colonne fisse.' },
  collection: { t: 'Collection', m: 'm3', d: 'Un contenitore di documenti, come un cassetto pieno di cartelle. Non contiene dati direttamente: contiene solo documenti. Esempio: "users".' },
  document: { t: 'Documento', m: 'm3', d: 'Un insieme di campi chiave→valore con un ID, dentro una collection. Come una cartella con dei fogli. Esempio: users/abc123 → { displayName, email, createdAt }.' },
  field: { t: 'Campo (field)', m: 'm3', d: 'Una coppia chiave→valore dentro un documento: displayName: "Leandro". I valori possono essere stringhe, numeri, booleani, Timestamp, array, mappe (oggetti annidati).' },
  subcollection: { t: 'Sotto-collection', m: 'm3', d: 'Una collection che vive dentro un documento. Esempio: users/abc123/orders. Il documento padre non "contiene" i dati della sotto-collection: li indica solo come percorso.' },
  path: { t: 'Percorso (path)', m: 'm3', d: 'L\'indirizzo di un dato: si alterna sempre collection/documento/collection/documento. Numero pari di segmenti = documento, dispari = collection.' },
  docref: { t: 'DocumentReference', m: 'm3', d: 'L\'INDIRIZZO di un documento (creato con doc()). Non contiene dati e non fa chiamate di rete: puoi crearlo anche per un documento che non esiste.' },
  snapshot: { t: 'DocumentSnapshot', m: 'm3', d: 'La FOTOGRAFIA di un documento in un certo istante (ottenuta con getDoc()). Contiene exists(), data() e id. Se il documento non esiste, la foto c\'è lo stesso ma è vuota.' },
  getdoc: { t: 'getDoc()', m: 'm3', d: 'Legge un documento dal server. Riceve un DocumentReference, restituisce una Promise di DocumentSnapshot. È asincrona: serve await.' },
  setdoc: { t: 'setDoc()', m: 'm3', d: 'Scrive un documento intero all\'indirizzo dato. Se esiste lo SOSTITUISCE (a meno di { merge: true }). Se non esiste lo crea.' },
  updatedoc: { t: 'updateDoc()', m: 'm3', d: 'Modifica solo i campi indicati di un documento ESISTENTE. Se il documento non esiste, fallisce con errore not-found.' },
  timestamp: { t: 'Timestamp', m: 'm3', d: 'Il tipo data di Firestore. Se salvi un new Date(), quando lo rileggi ottieni un Timestamp: per tornare a Date usi .toDate().' },
  idempotente: { t: 'Idempotente', m: 'm3', d: 'Un\'operazione che puoi ripetere N volte ottenendo lo stesso risultato della prima. createUserDocumentFromAuth lo è: al secondo login non riscrive nulla.' },
  rules: { t: 'Security Rules', m: 'm3', d: 'Regole scritte nella console Firebase che decidono, sul server, chi può leggere e scrivere cosa. Sono la vera protezione: il codice del frontend lo può modificare chiunque.' },
  db: { t: 'db (istanza Firestore)', m: 'm3', d: 'L\'oggetto restituito da getFirestore(): rappresenta la connessione al TUO database. Va passato a doc() e collection() perché sappiano in quale database cercare.' },
};
Object.assign(window.LAB_GLOSSARY, {
  propdrilling: { t: 'Prop drilling', m: 'm5', d: 'Passare una prop attraverso componenti intermedi che non la usano, solo per farla arrivare a un discendente lontano.' },
  context: { t: 'Context', m: 'm5', d: 'Meccanismo di React per rendere un valore disponibile a tutto un sottoalbero senza passarlo come prop. Si crea con createContext, si fornisce con il Provider e si legge con useContext.' },
  provider: { t: 'Provider', m: 'm5', d: 'Il componente <Ctx.Provider value={…}> che fornisce un valore a tutti i discendenti. Nel corso è avvolto da un componente (UserProvider) che possiede lo state.' },
  consumer: { t: 'Consumer', m: 'm5', d: 'Un componente che legge un context con useContext. Fa re-render ogni volta che il value del Provider più vicino cambia (confronto per riferimento).' },
  observer: { t: 'Observer (listener)', m: 'm5', d: 'Pattern in cui ti iscrivi a una fonte che ti avvisa a ogni cambiamento. onAuthStateChanged è un observer: restituisce una funzione per disiscriversi.' },
  cleanup: { t: 'Cleanup (useEffect)', m: 'm5', d: 'La funzione restituita da un effect. React la chiama prima di rieseguire l\'effect o allo smontaggio. Serve a chiudere iscrizioni, timer, listener.' },
  derived: { t: 'Stato derivato', m: 'm5', d: 'Un valore che si può calcolare da altro state (es. cartCount da cartItems). Va calcolato durante il render, non salvato in un altro useState.' },
  immutabilita: { t: 'Immutabilità', m: 'm5', d: 'Non modificare mai oggetti e array dello state: crearne di nuovi. React capisce che qualcosa è cambiato confrontando i riferimenti.' },
});
Object.assign(window.LAB_GLOSSARY, {
  closure: { t: 'Closure', m: 'm0', d: 'Una funzione "ricorda" le variabili dell\'ambito in cui è nata. Un handler creato in un render vede lo state di quel render (la fotografia).' },
  eventloop: { t: 'Event loop', m: 'm0', d: 'Il ciclo che decide cosa eseguire: prima tutto il codice sincrono, poi tutte le microtask (Promise/await), poi una task (setTimeout, eventi), e ricomincia.' },
  riferimento: { t: 'Riferimento', m: 'm0', d: 'Per oggetti, array e funzioni la variabile contiene un indirizzo, non il contenuto. === confronta gli indirizzi.' },
  spread: { t: 'Spread (...)', m: 'm0', d: 'Copia chiavi o elementi in un oggetto o array nuovo. Copia un solo livello (shallow). Le chiavi scritte dopo vincono.' },
});
Object.assign(window.LAB_GLOSSARY, {
  controlled: { t: 'Componente controllato', m: 'm4', d: 'Un input il cui valore è deciso dallo state React (value + onChange). Il DOM mostra solo ciò che c\'è nello state.' },
  customhook: { t: 'Custom hook', m: 'm4', d: 'Una funzione il cui nome inizia con "use" e che usa altri hook, per riutilizzare logica con state tra componenti. Ogni componente che la chiama ha il SUO state.' },
  oauth: { t: 'OAuth', m: 'm2', d: 'Protocollo con cui un provider (es. Google) conferma l\'identità di un utente a un\'altra app, senza condividere la password.' },
  idtoken: { t: 'ID token', m: 'm2', d: 'Un "pass" firmato da Google con scadenza breve, che l\'SDK allega alle richieste. Le Security Rules lo leggono come request.auth.' },
  persistenza: { t: 'Persistenza della sessione', m: 'm2', d: 'Sul web Firebase salva la sessione nel browser (IndexedDB, firebaseLocalStorageDb): al refresh l\'utente resta loggato. Il ripristino è asincrono.' },
});
