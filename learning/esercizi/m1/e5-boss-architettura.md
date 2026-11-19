# M1 · E5 ★★★★★ · BOSS · Architettura di firebase.utils

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

`firebase.utils.js` crescerà: auth, utenti, categorie, ordini… Diventerà un file da 300 righe.
Progetta la sua divisione.

## Consegna (documento di progetto, nessun test automatico)

1. **Struttura dei file**: proponi una cartella `src/utils/firebase/` con più file. Per ognuno:
   nome, responsabilità (una frase), cosa esporta.
2. **Grafo delle dipendenze**: disegnalo in ASCII. Nessun file deve dipendere dall'**ordine di
   valutazione** dei moduli (domanda da dev 4 di M1): mostra come le dipendenze sono esplicite.
3. **Configurazione per ambienti**: come gestiresti un progetto Firebase di *sviluppo* e uno di
   *produzione* in Create React App? (Cerca nella doc di CRA "Adding Custom Environment
   Variables" e cita la regola sul prefisso delle variabili.) Cosa NON risolve questa soluzione
   in termini di sicurezza?
4. **Contratto pubblico**: scrivi le firme (solo le firme, con JSDoc) delle funzioni che i
   componenti potranno usare. Nessun componente deve importare `auth` o `db`: perché?
5. **Rischi**: elenca 3 cose che potrebbero andare storte durante la migrazione da un file a più
   file, e come te ne accorgeresti (test? errori in console? quale messaggio?).

Criteri di valutazione: coerenza tra le parti, dipendenze esplicite, giustificazioni. Una scelta
diversa da quella che farei io, se è ben giustificata, vale il voto pieno.

**Documento:**
