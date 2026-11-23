/* ==========================================================================
   REGISTRO UFFICIALE — compilato SOLO dal professore (Claude) dopo ogni
   correzione. Non modificarlo a mano: un voto che non hai guadagnato non
   ti insegna niente.

   voti[]: un elemento per OGNI consegna (anche i tentativi falliti restano:
           il progresso si vede proprio dal confronto tra i tentativi).
     { ex, tentativo, data, voto, rubrica: {correttezza, logica, qualita, autonomia},
       aiuti, verdetto, feedback }
   XP di un esercizio = miglior voto ≥ 6 → stelle × 100 × voto / 10. Sotto 6 = 0 XP.
   ========================================================================== */

window.REGISTRO = {
  studente: 'Leandro',
  aggiornato: '2026-11-23',
  voti: [
    {
      ex: 'm3-e1', tentativo: 1, data: '2026-11-19', voto: 3,
      rubrica: { correttezza: 1, logica: 0.5, qualita: 0.5, autonomia: 1 },
      aiuti: 0,
      verdetto: 'Solo D3 (precedenza nello spread) è corretta. Riferimento e snapshot sono ancora confusi, e le simulazioni perdono i valori concreti (percorso, exists(), valore restituito, oggetto salvato). Da rifare dopo aver ripassato le sezioni ②, ③ e ⑤.',
      feedback: 'esercizi/m3/feedback/e1-t1.md',
    },
    {
      ex: 'm0-e1', tentativo: 1, data: '2026-11-22', voto: 1.5,
      rubrica: { correttezza: 0, logica: 0.5, qualita: 0, autonomia: 1 },
      aiuti: 0,
      verdetto: 'Consegna incompleta: solo B1 su 6, con 3 valori sbagliati su 4. Il perché contraddice l\'output e l\'oggetto annidato viene letto come assente invece che condiviso. Dopo la spiegazione, la copia a due livelli scritta in chat è corretta.',
      feedback: 'esercizi/m0/feedback/e1-t1.md',
    },
    {
      ex: 'm0-e1', tentativo: 2, data: '2026-11-23', voto: 3,
      rubrica: { correttezza: 1.5, logica: 1, qualita: 0, autonomia: 0.5 },
      aiuti: 0,
      verdetto: 'Consegna completa e progresso su riferimenti e spread, ma B4 (event loop), B5 (default con undefined) e B6 (Promise fuori dal try) sono sbagliati o vuoti. La Verifica non è stata fatta davvero: in B2 c\'è un "sì" su un output diverso e in B3 la previsione è ricopiata come output reale.',
      feedback: 'esercizi/m0/feedback/e1-t2.md',
    },
    {
      ex: 'm0-e1', tentativo: 3, data: '2026-11-23', voto: 6.5,
      rubrica: { correttezza: 2.5, logica: 1.5, qualita: 1.5, autonomia: 1 },
      aiuti: 0,
      verdetto: 'Superato, con un salto netto: riferimenti, default e Promise fuori dal try sono giusti e ben spiegati. Restano due nodi: l\'ordine delle chiavi nello spread (stesso errore del tentativo 2) e l\'event loop, dove la regola è enunciata bene ma non applicata (manca una riga sincrona, microtask fuori ordine).',
      feedback: 'esercizi/m0/feedback/e1-t3.md',
    },
    {
      ex: 'm0-e1', tentativo: 4, data: '2026-11-23', voto: 8.5,
      rubrica: { correttezza: 3.5, logica: 2.5, qualita: 1.5, autonomia: 1 },
      aiuti: 0,
      verdetto: 'Buono: 5 blocchi su 6 giusti nel contenuto (B3 segnato ✘ solo per un refuso), e risolti i due modelli sbagliati ricorrenti (ordine delle chiavi, forma del rest). Resta l\'event loop: .then letto come sincrono, ma ora l\'autodiagnosi è precisa.',
      feedback: 'esercizi/m0/feedback/e1-t4.md',
    },
  ],
  badge: [],
  diagnosi: {
    forza: [
      'Precedenza delle proprietà nello spread (l\'ultima chiave vince)',
      'Onestà: dichiara gli aiuti e ammette quando non sa, invece di inventare',
      'Chiede spiegazioni prima di andare avanti invece di accumulare errori',
      'Parametri di default: scattano solo con undefined, non con null (M0-E1 t3 B5)',
      'Promise senza await fuori dal try: errore non gestito (M0-E1 t3 B6)',
      'Riferimenti condivisi dopo lo spread (M0-E1 t3 B1, t4 B1)',
      'Ordine delle chiavi nello spread: posizione decisa da chi crea, valore da chi scrive per ultimo (M0-E1 t4 B2)',
      'Forma del rest: oggetto con le graffe (M0-E1 t4 B3)',
    ],
    daRinforzare: [
      'Riferimento (indirizzo) contro snapshot (fotografia) in Firestore',
      'Coerenza tra previsione e spiegazione: rileggere il "perché" contro l\'output scritto',
      'Event loop: .then e await PRENOTANO, non eseguono; il codice async è sincrono fino al primo await (errore in 4 tentativi su 4)',
      'Leggere il diff con attenzione prima di diagnosticare un errore (t4 B3: refuso scambiato per virgola)',
      'Simulazione mentale con valori concreti: copiare i dati dello scenario, non inventarli',
      'Struttura di un percorso Firestore (collection/documento) e contenuto contro indirizzo',
      'Date contro Timestamp in Firestore',
    ],
    nota: 'M0-E1 chiuso a 8.5 (1.5 → 3 → 6.5 → 8.5). Con il quiz, senza ostacoli di formato, il ragionamento su riferimenti, spread, rest, default e Promise è risultato solido. L\'unico nodo stabile è l\'event loop: la regola è enunciata bene ma .then/await vengono letti come esecuzione immediata. Da allenare in M0-E3/E4 con la domanda esegue o prenota?',
  },
};
