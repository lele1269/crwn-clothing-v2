# M6 · E1 ★★★ · La mappa degli stati

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

Scenario: Luca usa **Google**. Primo accesso in assoluto. Poi chiude la scheda, la riapre il
giorno dopo, aggiunge un prodotto al carrello (CartContext del corso, senza persistenza) e infine
fa logout.

Per **ogni** passaggio compila una riga della tabella. Nelle colonne scrivi il valore **esatto**
(o `—` se vuoto). Sono almeno 12 righe.

| # | Evento | Auth server | IndexedDB | Firestore `users/{uid}` | React `currentUser` | React `cartItems` | Navigation |
|---|---|---|---|---|---|---|---|
| 1 | apertura del sito (primo accesso) | | | | | | |
| … | | | | | | | |

## Domande

**D1.** In quale riga i posti sono **disallineati** per più tempo? È un problema per l'utente?

**D2.** Dopo la riapertura, il carrello è vuoto. Indica nella tabella la riga esatta in cui il
contenuto del carrello è andato perso, e spiega perché proprio lì.

**D3.** Proponi dove salvare il carrello perché sopravviva (collega la risposta al boss di M3)
e in quale riga della tabella andrebbe **letto**.

**D4 (da dev).** Il listener chiama `createUserDocumentFromAuth` a ogni avvio. Quante letture
Firestore fa Luca in un mese, se apre il sito 2 volte al giorno? È un problema? Come lo ridurresti?

**Risposte:**
