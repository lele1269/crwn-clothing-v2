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
  aggiornato: '2026-11-19',
  voti: [
    {
      ex: 'm3-e1', tentativo: 1, data: '2026-11-19', voto: 3,
      rubrica: { correttezza: 1, logica: 0.5, qualita: 0.5, autonomia: 1 },
      aiuti: 0,
      verdetto: 'Solo D3 (precedenza nello spread) è corretta. Riferimento e snapshot sono ancora confusi, e le simulazioni perdono i valori concreti (percorso, exists(), valore restituito, oggetto salvato). Da rifare dopo aver ripassato le sezioni ②, ③ e ⑤.',
      feedback: 'esercizi/m3/feedback/e1-t1.md',
    },
  ],
  badge: [],
  diagnosi: {
    forza: [
      'Precedenza delle proprietà nello spread (l\'ultima chiave vince)',
      'Onestà: dichiara gli aiuti e ammette quando non sa, invece di inventare',
    ],
    daRinforzare: [
      'Riferimento (indirizzo) contro snapshot (fotografia)',
      'Simulazione mentale con valori concreti: copiare i dati dello scenario, non inventarli',
      'Struttura di un percorso Firestore (collection/documento) e contenuto contro indirizzo',
      'Promise senza await e propagazione degli errori fuori dal try',
      'Date contro Timestamp in Firestore',
    ],
    nota: 'Prima consegna. Le risposte si contraddicono tra loro (D1b contro D2, D1c contro D3): i concetti vengono riconosciuti riga per riga ma non ancora tenuti insieme durante l\'esecuzione. La priorità è allenare la simulazione passo passo.',
  },
};
