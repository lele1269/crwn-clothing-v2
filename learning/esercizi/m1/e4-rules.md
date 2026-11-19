# M1 · E4 ★★★★ · Laboratorio Security Rules

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

Queste regole proteggono Firestore. Ricorda: `request.auth` è `null` se l'utente non ha fatto
login. `request.auth.uid` è il suo uid. `{userId}` cattura il segmento del percorso.

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read: if request.auth != null && request.auth.uid == userId;
      allow create: if request.auth != null && request.auth.uid == userId;
      allow update: if request.auth != null && request.auth.uid == userId
                    && request.resource.data.email == resource.data.email;
      allow delete: if false;
    }
    match /categories/{categoryId} {
      allow read: if true;
      allow write: if false;
    }
  }
}
```

## Parte A · Allow o deny?

Per ogni richiesta scrivi **ALLOW** o **DENY** e **quale riga** lo decide.

| # | Chi | Operazione |
|---|---|---|
| 1 | non loggato | `getDoc(doc(db, 'categories', 'hats'))` |
| 2 | non loggato | `getDoc(doc(db, 'users', 'g7Hk2'))` |
| 3 | uid `g7Hk2` | `getDoc(doc(db, 'users', 'g7Hk2'))` |
| 4 | uid `g7Hk2` | `getDoc(doc(db, 'users', 'e9Pq1'))` |
| 5 | uid `g7Hk2` | `setDoc(doc(db, 'users', 'g7Hk2'), {...})` — il documento NON esiste |
| 6 | uid `g7Hk2` | `updateDoc(doc(db, 'users', 'g7Hk2'), { displayName: 'X' })` |
| 7 | uid `g7Hk2` | `updateDoc(doc(db, 'users', 'g7Hk2'), { email: 'nuova@x.it' })` |
| 8 | uid `g7Hk2` | `deleteDoc(doc(db, 'users', 'g7Hk2'))` |
| 9 | uid `g7Hk2` | `getDoc(doc(db, 'users', 'g7Hk2', 'orders', 'o1'))` |
| 10 | admin del corso | `setDoc(doc(db, 'categories', 'hats'), {...})` dal frontend |

**Attenzione al #9**: le regole di `/users/{userId}` si applicano anche alle sotto-collection?
Cerca nella documentazione delle Security Rules come funzionano i match annidati e
`{document=**}`.

## Parte B · Scrivi le regole

1. Aggiungi le regole per il carrello del tuo boss di M3 (il percorso che hai scelto tu): ognuno
   legge e scrive solo il proprio carrello.
2. Aggiungi la regola che impedisce di creare un utente con un campo `isAdmin`.
3. Il #10: come carica davvero i prodotti in `categories` il corso (lezioni successive)? Le regole
   lo permetterebbero? Cosa proporresti?

## Parte C · Da dev

Le regole validano i dati sul server. Il codice della tua app li valida già nel form. Perché
servono **entrambi** i controlli? Fai un esempio di attacco che il solo controllo nel form non
fermerebbe.

**Risposte:**
