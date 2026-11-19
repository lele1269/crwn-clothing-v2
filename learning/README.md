# CRWN Learning Lab

Materiale di studio visuale e interattivo per il corso. Funziona offline e non ha bisogno di build.

- **Apri:** `learning/index.html` nel browser (doppio click, oppure `open learning/index.html`)
- **Verifica un esercizio:** `node learning/esercizi/verifica.mjs m3-e2`
- **Consegna:** in Claude Code, `correggi m3-e2`
- **Nuovo modulo:** in Claude Code, "aggiungi il modulo su …"

```
learning/
├── index.html            dashboard: livello, XP, diagnosi, badge
├── come-funziona.html    rubrica e regole di valutazione
├── glossario.html
├── PROFESSORE.md         protocollo di correzione (per Claude)
├── moduli/               M0 basi · M1 Firebase · M2 Auth · M3 Firestore · M4 Form · M5 Context · M6 End-to-end · T1 Documentazione
├── assets/
│   ├── app.js            motore: stepper, quiz, ispettore, nav
│   ├── manifest.js       moduli, esercizi, livelli, badge
│   ├── registro.js       voti ufficiali (lo aggiorna solo il professore)
│   └── glossario.js
└── esercizi/
    ├── verifica.mjs      autoverifica
    ├── _lab/             simulatori Firebase, ambiente React per i test, test
    └── m0…m6, t1/        esercizi dei moduli (+ feedback/ dopo le correzioni)
```

I quiz salvano i risultati nel browser (localStorage). Il voto ufficiale vive solo in `registro.js`.
