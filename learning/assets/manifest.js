/* ==========================================================================
   Manifest del Learning Lab: moduli, esercizi, livelli, badge.
   Per aggiungere un modulo: una voce in LAB_MODULES + la pagina in /moduli
   + (opzionale) i suoi esercizi in LAB_EXERCISES.
   ========================================================================== */

window.LAB_MODULES = [
  { id: 'm0', num: 'M0', title: 'Basi utili', sub: 'Render, Promise, destructuring', file: 'moduli/m0-basi.html' },
  { id: 'm1', num: 'M1', title: 'Firebase: architettura', sub: 'BaaS, SDK, initializeApp', file: 'moduli/m1-firebase.html' },
  { id: 'm2', num: 'M2', title: 'Firebase Authentication', sub: 'Provider, popup, email/password', file: 'moduli/m2-auth.html' },
  { id: 'm3', num: 'M3', title: 'Firestore', sub: 'Collection, documenti, ref vs snapshot', file: 'moduli/m3-firestore.html' },
  { id: 'm4', num: 'M4', title: 'Form controllati', sub: 'State a oggetto, onChange, submit', file: 'moduli/m4-form.html' },
  { id: 'm5', num: 'M5', title: 'Context API', sub: 'Provider, useContext, re-render', file: 'moduli/m5-context.html' },
  { id: 'm6', num: 'M6', title: 'End-to-end', sub: 'Il viaggio completo di un utente', file: 'moduli/m6-end-to-end.html' },
  { id: 't1', num: 'T1', group: 'toolkit', title: 'Leggere la documentazione', sub: 'Guide, API reference, MDN', file: 'moduli/t1-documentazione.html' },
];

/* Difficoltà:
   ★      riconoscere / prevedere
   ★★     completare codice guidato
   ★★★    scrivere da zero
   ★★★★   debug: trovare e spiegare i bug
   ★★★★★  boss: progettare una soluzione   */
window.LAB_EXERCISES = {
  m3: [
    {
      id: 'm3-e1', stars: 1, title: 'Leggi e prevedi',
      goal: 'Prevedere cosa fa createUserDocumentFromAuth in scenari diversi, senza eseguirlo.',
      file: 'esercizi/m3/feedback/', runnable: false, quiz: true,
      hints: [
        'Ripercorri la funzione riga per riga e per ogni riga chiediti: "che cosa c\'è in questa variabile adesso?"',
        'Uno snapshot è una fotografia: se il documento non esiste, la foto è comunque una foto, solo che è vuota.',
        'Nell\'oggetto letterale {...a, ...b} le proprietà scritte DOPO vincono su quelle scritte prima.',
      ],
    },
    {
      id: 'm3-e2', stars: 2, title: 'Il navigatore dei percorsi',
      goal: 'Scrivere funzioni pure che costruiscono e validano percorsi Firestore (pari = documento, dispari = collection).',
      file: 'esercizi/m3/e2-percorsi.mjs', runnable: true,
      hints: [
        'Un percorso è solo una stringa: "users/abc123". Spezzala con split("/") e conta i pezzi.',
        'Attenzione agli slash doppi o finali: "users//abc" produce un pezzo vuoto. Un pezzo vuoto è valido?',
        'parentCollection di "users/abc/orders/o1" è "users/abc/orders": togli l\'ultimo pezzo.',
      ],
    },
    {
      id: 'm3-e3', stars: 2, title: 'Leggere un utente',
      goal: 'Completare getUserDocument(uid): restituire i dati del documento con il suo id, oppure null.',
      file: 'esercizi/m3/e3-leggi-utente.mjs', runnable: true,
      hints: [
        'Servono tre ingredienti: un riferimento (doc), una lettura (getDoc) e un controllo (exists()).',
        'getDoc restituisce una Promise: senza await hai in mano la "ricevuta", non il pacco.',
        'data() restituisce solo i campi: l\'id del documento non è dentro data(), è snapshot.id.',
      ],
    },
    {
      id: 'm3-e4', stars: 3, title: 'Aggiornare il profilo',
      goal: 'Scrivere da zero updateUserProfile(uid, changes) con regole di sicurezza: campi ammessi, niente sovrascritture.',
      file: 'esercizi/m3/e4-aggiorna-profilo.mjs', runnable: true,
      hints: [
        'Prima di scrivere, decidi l\'ordine dei controlli: input valido? utente esiste? campi ammessi?',
        'setDoc senza merge SOSTITUISCE tutto il documento. updateDoc modifica solo i campi che passi.',
        'Un "filtro" di campi ammessi si fa bene con Object.keys(changes) e un array di nomi permessi.',
      ],
    },
    {
      id: 'm3-e7', stars: 3, title: 'Traccia il dato nei componenti',
      goal: 'Seguire, con valori concreti, un sign-up dal click fino a Firestore e ritorno: ogni passaggio, ogni variabile, ogni attesa.',
      file: 'esercizi/m3/e7-traccia.md', runnable: false,
      hints: [
        'Prima di scrivere, rileggi il flusso animato nella sezione ⑦ con la variante "Sign-up email".',
        'Per ogni riga chiediti: in quale FILE sono? In quale FUNZIONE? Quali variabili esistono qui e quanto valgono?',
        'Un await è un punto in cui la funzione si ferma e il controllo torna al browser. Segnali tutti: sono i punti dove "il tempo passa".',
      ],
    },
    {
      id: 'm3-e5', stars: 4, title: 'Caccia ai bug',
      goal: 'Una versione di createUserDocumentFromAuth contiene 4 bug. Trovali, correggili e spiega ognuno.',
      file: 'esercizi/m3/e5-caccia-bug.mjs', runnable: true,
      hints: [
        'Esegui i test prima di toccare il codice: ogni test fallito è un indizio su DOVE guardare.',
        'Un bug è una differenza tra cosa il codice FA e cosa DOVREBBE fare. Scrivi le due cose, poi confrontale.',
        'Controlla: await, condizione dell\'if, ordine dello spread, valore restituito.',
      ],
    },
    {
      id: 'm3-e6', stars: 5, title: 'BOSS · Il carrello persistente',
      goal: 'Progettare come salvare il carrello in Firestore e implementare add/remove/total, giustificando le scelte.',
      file: 'esercizi/m3/e6-boss-carrello.mjs', runnable: true,
      hints: [
        'Prima la struttura, poi il codice: disegna su carta dove vive il carrello (percorso) e com\'è fatto (forma).',
        'Aggiungere lo stesso prodotto due volte non deve creare due righe: deve aumentare quantity.',
        'Il totale si calcola sempre a partire dai dati: non salvarlo come campo, rischi che diventi falso.',
      ],
    },
  ],
};

/* Livelli: basati SOLO sugli XP ufficiali (esercizi valutati dal professore). */
window.LAB_EXERCISES.m0 = [
  { id: 'm0-e1', stars: 1, title: 'Prevedi l\'output', goal: 'Prevedere l\'output di 6 blocchi (riferimenti, spread, rest, event loop, default) e verificarlo DOPO.', file: 'esercizi/m0/feedback/', runnable: false, quiz: true,
    hints: ['Per i riferimenti: disegna etichette e scatole come nella sezione ③.', 'Per l\'event loop: tre colonne su un foglio, cioè sincrono, microtask, task.', 'Default: scatta solo con undefined.'] },
  { id: 'm0-e2', stars: 2, title: 'Destructuring, spread, rest', goal: 'Cinque funzioni pure su oggetti e array, senza mai modificare l\'input.', file: 'esercizi/m0/e2-oggetti.mjs', runnable: true,
    hints: ['updateField è letteralmente il tuo handleChange.', 'withDefaults: prima togli dalle opzioni le chiavi con valore undefined (Object.entries + filter + Object.fromEntries).', 'omitKey: const { [key]: _, ...rest } = obj.'] },
  { id: 'm0-e3', stars: 3, title: 'Lavorare con le Promise', goal: 'delay, sequenza, parallelo, timeout e retry.', file: 'esercizi/m0/e3-async.mjs', runnable: true,
    hints: ['delay: new Promise((resolve) => setTimeout(resolve, ms)).', 'Parallelo: Promise.all(tasks.map(…)). Sequenza: for…of con await.', 'withTimeout: Promise.race tra la promise e una che rifiuta dopo ms.'] },
  { id: 'm0-e4', stars: 4, title: 'Caccia ai bug asincroni', goal: 'Quattro funzioni, quattro bug classici di async/await: trovali e spiega il modello sbagliato.', file: 'esercizi/m0/e4-bug-async.mjs', runnable: true,
    hints: ['Rileggi gli errori tipici ❷ e ❹ e la domanda da dev 7.', 'Promise.all vuole Promise: le funzioni vanno chiamate.', 'Una funzione senza return restituisce undefined, anche se è async.'] },
  { id: 'm0-e5', stars: 5, title: 'BOSS · Il motore sotto Context', goal: 'Costruire uno store con getState, setState e subscribe/unsubscribe, robusto ai casi limite.', file: 'esercizi/m0/e5-boss-store.mjs', runnable: true,
    hints: ['Lo stato vive in una variabile dentro la closure di createStore.', 'Per scorrere i listener in sicurezza, copia la lista prima del ciclo.', 'Un try/catch attorno a ogni listener.'] },
];

window.LAB_EXERCISES.m1 = [
  { id: 'm1-e1', stars: 1, title: 'Il progetto e la config', goal: 'Distinguere progetto, app registrata e istanza; capire cosa è segreto e cosa no; leggere le tue Rules reali.', file: 'esercizi/m1/e1-concetti.md', runnable: false,
    hints: ['Rileggi la tabella dei campi della config e il box rosso della teoria.', 'D3: ordine degli import, poi ordine delle righe.', 'D5: pensa a due app, oppure a un file valutato prima di initializeApp.'] },
  { id: 'm1-e2', stars: 2, title: 'Validare una firebaseConfig', goal: 'Funzione pura che segnala errori e warning in una config.', file: 'esercizi/m1/e2-config.mjs', runnable: true,
    hints: ['Prima il caso "non è un oggetto", e lì esci subito.', 'Una regex per projectId: inizio, una lettera, poi 5-29 tra [a-z0-9-], fine.', 'Le chiavi sconosciute: Object.keys + filter con un array di ammesse.'] },
  { id: 'm1-e3', stars: 3, title: 'Il registro delle app', goal: 'Ricostruire initializeApp/getApp/getApps/deleteApp con gli stessi errori dell\'SDK.', file: 'esercizi/m1/e3-registro-app.mjs', runnable: true,
    hints: ['Una Map nome → app, dentro la closure.', 'Confronto per contenuto: stesse chiavi, e per ogni chiave valori uguali.', 'Un Error con proprietà code: Object.assign(new Error(msg), { code }).'] },
  { id: 'm1-e4', stars: 4, title: 'Laboratorio Security Rules', goal: 'Valutare 10 richieste contro regole reali e scrivere nuove regole.', file: 'esercizi/m1/e4-rules.md', runnable: false,
    hints: ['Per ogni richiesta: quale match si applica al percorso? Poi: quale operazione (read/create/update/delete)?', 'resource.data = documento attuale; request.resource.data = come sarebbe dopo la scrittura.', 'I match non si estendono automaticamente alle sotto-collection.'] },
  { id: 'm1-e5', stars: 5, title: 'BOSS · Architettura di firebase.utils', goal: 'Progettare la suddivisione in moduli con dipendenze esplicite, ambienti e contratto pubblico.', file: 'esercizi/m1/e5-boss-architettura.md', runnable: false,
    hints: ['Parti da un file app.js che esporta solo firebaseApp.', 'Ogni servizio riceve l\'app esplicitamente: getAuth(firebaseApp).', 'In CRA le variabili d\'ambiente devono iniziare con REACT_APP_.'] },
];

window.LAB_EXERCISES.m2 = [
  { id: 'm2-e1', stars: 1, title: 'Prevedi il comportamento di Auth', goal: 'Sequenza del sign-up, persistenza, codici di errore reali e loro significato.', file: 'esercizi/m2/feedback/', runnable: false, quiz: true,
    hints: ['La reference di createUserWithEmailAndPassword dice cosa succede dopo la creazione.', 'Persistenza: IndexedDB, ripristino asincrono.', 'Email enumeration protection: dal 15/09/2023.'] },
  { id: 'm2-e2', stars: 2, title: 'Classificare gli errori', goal: 'Mappare i codici Auth in show/ignore/generic e validare un sign-up completo.', file: 'esercizi/m2/e2-errori.mjs', runnable: true,
    hints: ['Prima di leggere error.code, controlla che error sia un oggetto.', 'Una mappa codice → messaggio (oggetto) è più leggibile di uno switch lungo.', 'validateSignUp: un oggetto vuoto, e un if per campo.'] },
  { id: 'm2-e3', stars: 3, title: 'Orchestrare il sign-up', goal: 'Una funzione signUpUser che valida, crea l\'account e il profilo, e propaga gli errori.', file: 'esercizi/m2/e3-signup.mjs', runnable: true,
    hints: ['Object.assign(new Error(msg), { fieldErrors }) crea un errore con una proprietà in più.', 'Non serve try/catch: se non sai cosa fare di un errore, lascialo salire.', 'trim() sul displayName prima di salvarlo.'] },
  { id: 'm2-e4', stars: 4, title: 'Caccia ai bug negli handler', goal: 'Quattro bug: try/catch mancante, codici superati, await mancante, funzione non chiamata.', file: 'esercizi/m2/e4-bug-handlers.mjs', runnable: true,
    hints: ['Rileggi la sezione ⑧ (il bug che si trova solo nella doc).', 'Un try senza await dentro non intercetta niente.', 'await signOutUser (senza parentesi) aspetta... una funzione.'] },
  { id: 'm2-e5', stars: 5, title: 'BOSS · SignInForm da produzione', goal: 'Form React senza alert: errori inline, stato di caricamento, popup chiuso silenzioso, documento di progetto.', file: 'esercizi/m2/e5-boss-signin.jsx', runnable: true,
    hints: ['Tre state: i campi, il messaggio d\'errore, isSubmitting.', 'try / catch / finally: il finally rimette isSubmitting a false in ogni caso.', 'Una funzione helper "run(azione, onSuccesso)" evita di duplicare la logica tra email e Google.'] },
];

window.LAB_EXERCISES.m4 = [
  { id: 'm4-e1', stars: 1, title: 'Prevedi il form', goal: 'Simulare tasti, name sbagliati, bottoni senza type e lo state "fotografia".', file: 'esercizi/m4/feedback/', runnable: false, quiz: true,
    hints: ['Segui la catena della domanda 7: dove si rompe?', 'Un button senza type, dentro un form, è un submit.', 'Rileggi M0, ciclo di render, punto 4.'] },
  { id: 'm4-e2', stars: 2, title: 'La logica dei campi', goal: 'applyChange con checkbox e number, isComplete e freshDefaults: funzioni pure e difensive.', file: 'esercizi/m4/e2-campi.mjs', runnable: true,
    hints: ['"name in fields" dice se la chiave esiste.', 'Per la checkbox il dato è checked, non value.', 'structuredClone (MDN) fa una copia profonda.'] },
  { id: 'm4-e3', stars: 3, title: 'useForm e un FormInput robusto', goal: 'Il primo custom hook e un FormInput che non può andare in crash né diventare uncontrolled.', file: 'esercizi/m4/e3-use-form.jsx', runnable: true,
    hints: ['Un custom hook è una funzione che usa altri hook e restituisce ciò che serve.', 'setFields((prev) => ({ ...prev, [name]: value })).', 'value ?? \'\' e htmlFor sulla label.'] },
  { id: 'm4-e4', stars: 4, title: 'Caccia ai bug nel form', goal: 'Mutazione, name sbagliato, preventDefault mancante, bottone che invia il form.', file: 'esercizi/m4/e4-bug-form.jsx', runnable: true,
    hints: ['Ogni test fallito corrisponde a un errore tipico della sezione ⑨.', 'confirmPassword: controlla il name.', 'Il bottone Google: rileggi l\'errore tipico ❺.'] },
  { id: 'm4-e5', stars: 5, title: 'BOSS · SmartForm a configurazione', goal: 'Un form generico: validazione per campo e tra campi, errori inline, invio asincrono, documento di progetto.', file: 'esercizi/m4/e5-boss-smart-form.jsx', runnable: true,
    hints: ['Quattro state: values, errors, isSubmitting, formError.', 'I valori iniziali: Object.fromEntries(fields.map(f => [f.name, \'\'])).', 'Per cancellare un solo errore: destructuring con rest (M0 E2, omitKey).'] },
];

window.LAB_EXERCISES.m5 = [
  { id: 'm5-e1', stars: 1, title: 'Prevedi i re-render', goal: 'Dato l\'albero dei Provider del corso, prevedere chi fa re-render in tre eventi e perché.', file: 'esercizi/m5/e1-prevedi-render.md', runnable: false,
    hints: ['Per ogni componente chiediti: possiede lo state? legge il context cambiato? è disegnato da qualcuno che fa re-render?', 'Ciò che arriva come children o tramite Outlet è stato creato fuori: non fa re-render "a cascata".', 'Il value è UN oggetto: se cambia una sua chiave, per React è cambiato tutto.'] },
  { id: 'm5-e2', stars: 2, title: 'Helper del carrello immutabili', goal: 'Scrivere add/remove/clear/count/total come funzioni pure, con condivisione strutturale.', file: 'esercizi/m5/e2-cart-helpers.mjs', runnable: true,
    hints: ['map restituisce SEMPRE un array nuovo: dentro la callback restituisci l\'elemento originale se non va toccato.', 'Per "nessun cambiamento" restituisci lo stesso array ricevuto, non una copia.', 'reduce con valore iniziale 0.'] },
  { id: 'm5-e3', stars: 3, title: 'Il tuo UserContext', goal: 'Scrivere UserContext + UserProvider (lezione 11) con isAuthLoading e un consumer AuthStatus.', file: 'esercizi/m5/e3-user-context.jsx', runnable: true,
    hints: ['Parti copiando la struttura vista nella sezione ⑥, poi aggiungi il secondo useState.', 'Nella callback ci sono tre cose da fare: documento (solo se user), utente, loading.', 'AuthStatus è un componente come gli altri: useContext, poi un return con tre casi.'] },
  { id: 'm5-e4', stars: 4, title: 'Caccia ai bug nel CartProvider', goal: 'Trovare e spiegare 4 bug di modello mentale in un CartProvider.', file: 'esercizi/m5/e4-cart-bug.jsx', runnable: true,
    hints: ['Esegui i test: ogni test fallito punta a una zona del codice.', 'Cerca: un array dipendenze, un ! mancante, un push, una chiave del value.', 'Per ognuno chiediti "cosa crede chi l\'ha scritto?": è quella la risposta della scheda.'] },
  { id: 'm5-e5', stars: 5, title: 'BOSS · Il CartContext da dev', goal: 'CartContext con valori derivati, custom hook con errore esplicito e reset al logout, con un documento di progetto.', file: 'esercizi/m5/e5-boss-cart.jsx', runnable: true,
    hints: ['useCart: useContext + if: se il valore è quello di default, lancia.', 'Per il logout ti serve leggere UserContext dentro CartProvider e reagire quando currentUser cambia.', 'cartCount = getCartCount(cartItems), direttamente nel corpo del componente.'] },
];

window.LAB_EXERCISES.m6 = [
  { id: 'm6-e1', stars: 3, title: 'La mappa degli stati', goal: 'Tracciare un utente Google dal primo accesso al logout, colonna per colonna, nei quattro posti in cui vive.', file: 'esercizi/m6/e1-traccia.md', runnable: false,
    hints: ['Usa l\'animazione della sezione ④ come modello per le righe.', 'Il carrello vive solo nella memoria di React.', 'Ogni avvio = una chiamata a createUserDocumentFromAuth = una lettura.'] },
  { id: 'm6-e2', stars: 4, title: 'Integrazione: Navigation + ProfileBadge', goal: 'Leggere da Firestore in un effect, legato al context, senza race condition.', file: 'esercizi/m6/e2-integrazione.jsx', runnable: true,
    hints: ['useEffect con dipendenza [currentUser].', 'let ignore = false; … return () => { ignore = true; }.', 'Leggi db dentro l\'effect (live binding), non in cima al file.'] },
  { id: 'm6-e3', stars: 5, title: 'BOSS · Indagine su 4 segnalazioni', goal: 'Applicare il debug playbook a quattro bug reali dell\'app del corso, dalla riproduzione alla prevenzione.', file: 'esercizi/m6/e3-boss-indagine.md', runnable: false,
    hints: ['#1 e #4 li hai già visti come domande da dev: quali?', '#3: cosa può cambiare senza commit?', 'La famiglia comune riguarda "due copie dello stesso dato".'] },
];

window.LAB_EXERCISES.t1 = [
  {
    id: 't1-e1', stars: 2, title: 'Decodifica la firma',
    goal: 'Leggere tre firme della API reference di Firestore e tradurle in frasi e in codice.',
    file: 'esercizi/t1/e1-firme.md', runnable: false,
    hints: [
      'Leggi una firma da sinistra a destra: nome → cosa riceve (parametri e tipi) → cosa restituisce (dopo i due punti finali).',
      'Promise<X> significa "una ricevuta che diventerà X". Se il tipo di ritorno è una Promise, ti serve await.',
      'I tre puntini ...pathSegments: string[] vogliono dire "quante stringhe vuoi, separate da virgole".',
    ],
  },
  {
    id: 't1-e2', stars: 3, title: 'Dalla documentazione all\'astrazione',
    goal: 'Partire dagli snippet ufficiali (updateDoc, increment, deleteDoc, setDoc merge) e scrivere funzioni nello stile del corso.',
    file: 'esercizi/t1/e2-astrazione.mjs', runnable: true,
    hints: [
      'Lo snippet ufficiale usa nomi d\'esempio (cities, DC). Il primo passo è fare la tabella di traduzione: cosa diventa ogni nome nel tuo dominio?',
      'Quello che nello snippet è fisso (il nome della collection) diventa fisso nella funzione. Quello che cambia ogni volta (l\'id) diventa un parametro.',
      'Rileggi nella reference cosa fa updateDoc se il documento non esiste: ti dice se devi controllarlo tu o no.',
    ],
  },
  {
    id: 't1-e3', stars: 3, title: 'Detective su MDN',
    goal: 'Risolvere problemi di JavaScript cercando su MDN il metodo giusto e citando la sezione che hai usato.',
    file: 'esercizi/t1/e3-mdn.mjs', runnable: true,
    hints: [
      'Cerca "MDN Array find", "MDN Array reduce": i primi risultati sono le pagine giuste. Vai subito alla sezione Syntax.',
      'Su reduce leggi la sezione Exceptions: c\'è un caso che fa crashare il tuo totale con un carrello vuoto.',
      'Object.entries trasforma un oggetto in un array di coppie [chiave, valore]. Object.fromEntries fa l\'inverso.',
    ],
  },
];

window.LAB_LEVELS = [
  { xp: 0, name: 'Apprendista', ic: '🌱' },
  { xp: 500, name: 'Esploratore', ic: '🧭' },
  { xp: 1500, name: 'Costruttore', ic: '🧱' },
  { xp: 3000, name: 'Artigiano', ic: '🛠️' },
  { xp: 5000, name: 'Architetto', ic: '📐' },
  { xp: 7500, name: 'Maestro', ic: '🏛️' },
];

/* Badge: assegnati dal professore nel registro, mai automaticamente "per gentilezza". */
window.LAB_BADGES = [
  { id: 'primo-passo', ic: '👣', name: 'Primo passo', how: 'Primo esercizio consegnato con voto ≥ 6.' },
  { id: 'fenice', ic: '🔥', name: 'Fenice', how: 'Un esercizio insufficiente rifatto e portato a ≥ 7. Imparare dagli errori vale più di non sbagliare.' },
  { id: 'senza-rete', ic: '🎯', name: 'Senza rete', how: 'Voto ≥ 8 su un esercizio ★★★ o superiore senza usare aiuti.' },
  { id: 'cacciatore', ic: '🔍', name: 'Cacciatore di bug', how: 'Tutti i bug di un esercizio ★★★★ trovati E spiegati correttamente.' },
  { id: 'cartografo', ic: '🗺️', name: 'Cartografo di Firestore', how: 'Modulo M3 superato: tutti gli esercizi ≥ 6, media ≥ 7.' },
  { id: 'boss-m3', ic: '👑', name: 'Boss M3', how: 'Boss del modulo M3 con voto ≥ 8.' },
  { id: 'fondamenta', ic: '🧱', name: 'Fondamenta solide', how: 'Modulo M0 superato: riferimenti, async e render non hanno più segreti.' },
  { id: 'centralino', ic: '☎️', name: 'Centralinista', how: 'Modulo M1 superato.' },
  { id: 'portiere', ic: '🔐', name: 'Portiere', how: 'Modulo M2 superato.' },
  { id: 'specchio', ic: '🪞', name: 'Maestro dei form', how: 'Modulo M4 superato.' },
  { id: 'detective', ic: '🕵️', name: 'Detective', how: 'Boss M6 con voto ≥ 8: sai trovare un bug in un sistema intero.' },
  { id: 'antenna', ic: '📡', name: 'Padrone del Context', how: 'Modulo M5 superato: tutti gli esercizi ≥ 6, media ≥ 7.' },
  { id: 'lettore', ic: '📚', name: 'Lettore di documentazione', how: 'Modulo T1 superato: sai andare dalla doc ufficiale al tuo codice da solo.' },
  { id: 'spiega-bene', ic: '🗣️', name: 'Lo spiego a un bambino', how: 'Una spiegazione scritta così chiara che il professore la userebbe come esempio.' },
];
