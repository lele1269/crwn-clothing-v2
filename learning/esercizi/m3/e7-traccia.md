# M3 · E7 ★★★ · Traccia il dato nei componenti

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

**Perché questo esercizio:** saper dire *dove si trova un dato e che forma ha* in ogni istante
è la competenza n° 1 per fare debug. Quando qualcosa non funziona, un dev non tira a indovinare:
segue il dato finché non trova il punto in cui diventa diverso da come se lo aspettava.

**Regola:** usa **valori concreti** e scrivi i valori esatti, non descrizioni generiche.
"Contiene l'utente" non basta: scrivi l'oggetto. Non eseguire il codice.

## Scenario

Il database è vuoto. Nel form di sign-up l'utente scrive:

| Campo | Valore |
|---|---|
| Display Name | `Sara` |
| Email | `sara@mail.it` |
| Password | `abc12345` |
| Confirm Password | `abc12345` |

Poi preme **Sign Up**. Auth assegna all'account l'uid `"sR4x9"`.
Le Security Rules permettono la scrittura.

## Parte A · La tabella del viaggio

Compila una riga per ogni passaggio, dal click fino al form svuotato. Ti servono almeno 10 righe.

| # | File | Funzione | Cosa succede (1 frase) | Valore che passa / che esce (esatto) | C'è un await? Chi aspetta? |
|---|---|---|---|---|---|
| 1 | sign-up-form.component.jsx | handleSubmit | | | |
| 2 | | | | | |
| … | | | | | |

## Parte B · Domande

**B1.** Al passo in cui `createUserDocumentFromAuth` riceve i suoi argomenti, scrivi il valore
esatto di `userAuth.displayName` e di `additionalInformation`. Da quale **livello** (componente,
astrazione, SDK, server) arriva ciascuno dei due?

**Risposta:**


**B2.** Quante **funzioni diverse** sono sospese contemporaneamente nel momento in cui la richiesta
è in viaggio verso il server di Auth? Elencale dalla più esterna alla più interna.

**Risposta:**


**B3.** Scrivi l'oggetto esatto salvato in `users/sR4x9`, con il tipo di ogni valore così come lo
vedresti **rileggendolo** da Firestore.

**Risposta:**


**B4.** Ora cambia lo scenario: l'utente ha scritto `abc12345` e `abc1234` nelle due password.
Elenca i passaggi che avvengono, da quelli della tabella. Quante chiamate di rete partono?

**Risposta:**


**B5 (da dev).** Nella tabella, individua il passaggio in cui si mescolano dati che arrivano da
**due livelli diversi**. Perché il codice è scritto così e non si poteva fare in un solo passaggio?

**Risposta:**
