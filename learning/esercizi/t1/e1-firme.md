# T1 · E1 ★★ · Decodifica la firma

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

Queste firme sono copiate dalla **API reference ufficiale** di Firestore
(https://firebase.google.com/docs/reference/js/firestore_.md). Per ognuna rispondi **solo
leggendo la firma e le note riportate**, senza cercare esempi.

---

## Firma 1 · updateDoc

```ts
export declare function updateDoc<
  AppModelType,
  DbModelType extends DocumentData
>(
  reference: DocumentReference<AppModelType, DbModelType>,
  data: UpdateData<DbModelType>
): Promise<void>;
```
Nota della reference: *"The update will fail if applied to a document that does not exist."*
Descrizione del parametro `data`: *"Fields can contain dots to reference nested fields within the document."*

**1a.** Traduci la firma in una frase: "updateDoc riceve … e restituisce …".

**1b.** Scrivi la chiamata che imposta `displayName` a `'Sara'` nel documento dell'utente con uid
`sR4x9`. Includi la riga che crea il riferimento.

**1c.** `const risultato = await updateDoc(...)`: quanto vale `risultato` se tutto va bene? Da quale
parte della firma lo deduci?

**1d.** Cosa succede se il documento non esiste? Dove arriva l'errore se la chiamata è dentro un
`try { await updateDoc(...) } catch (e) {}`? E se togli `await`?

**1e.** Il documento ha un campo `address: { city: 'Roma', zip: '00100' }`. Scrivi la chiamata che
cambia **solo** `zip`, usando l'informazione sui "dots" della descrizione di `data`.

**Risposte:**


---

## Firma 2 · deleteDoc

```ts
export declare function deleteDoc<
  AppModelType,
  DbModelType extends DocumentData
>(reference: DocumentReference<AppModelType, DbModelType>): Promise<void>;
```
Nota della guida "Delete data": *"Deleting a document does not delete its subcollections!"*

**2a.** Frase: "deleteDoc riceve … e restituisce …".

**2b.** Confronta i parametri di `deleteDoc` e `getDoc`. Cosa hanno in comune, e cosa ti dice
questo sul ruolo di `doc()` in tutta l'API?

**2c.** Cancelli `users/sR4x9`. L'utente aveva `users/sR4x9/orders/o1`. Dopo il `deleteDoc`, il
documento `o1` esiste ancora? Che problema crea?

**Risposte:**


---

## Firma 3 · getFirestore (due overload)

```ts
export declare function getFirestore(): Firestore;
export declare function getFirestore(app: FirebaseApp): Firestore;
```
Descrizioni ufficiali:
- `getFirestore()`: *"Returns the existing default Firestore instance that is associated with the default FirebaseApp."*
- `getFirestore(app)`: *"Returns the existing default Firestore instance that is associated with the provided FirebaseApp."*

**3a.** La documentazione scrive `getFirestore(app)`, il corso `getFirestore()`. Sono equivalenti
**nel tuo progetto**? Quale riga di `firebase.utils.js` lo rende vero?

**3b.** Restituisce una Promise? Cosa ti dice sul fatto che `db` si possa creare in cima al file,
fuori da qualsiasi funzione async?

**3c (da dev).** Se un giorno il progetto inizializzasse **due** app Firebase (due `initializeApp`
con config diverse), quale delle due forme dovresti usare e perché?

**Risposte:**
