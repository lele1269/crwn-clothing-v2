# M0 · E1 ★ · Prevedi l'output

**Tentativo:** 2
**Aiuti aperti:** 0  ← aggiorna questo numero con onestà (solo gli aiuti del Lab, la chat su B1 la conto io)

Regola: niente esecuzione finché non hai compilato **Previsione** per tutti e 6 i blocchi.
Poi esegui con `node -e "..."` o nella console del browser e compila **Verifica**.

---

## Come rispondere (leggi prima di iniziare)

Compila **solo** gli spazi segnati con `___`, senza spostare né cancellare i titoli.

**Output:** scrivi esattamente quello che compare nel terminale, dentro il blocco `text`.
- Un `console.log(a, b, c)` stampa **una riga**, con i valori separati da uno spazio.
  Esempio: `console.log('ciao', 3, true)` → `ciao 3 true`
- Le stringhe "sciolte" si scrivono **senza** virgolette. Esempio: `ciao`, non `'ciao'`.
- Gli oggetti e gli array si scrivono come li stampa Node, **con** le virgolette sulle stringhe interne.
  Esempi: `{ a: 1, b: 'x' }` e `[ 'uno', 'due' ]`
- Più `console.log` danno **più righe**, una per log, nell'ordine in cui appaiono.
- Se il codice va in errore, scrivi la riga dell'errore, per esempio `Uncaught Error: messaggio`,
  ed eventuali righe stampate prima.
- **Non** scrivere assegnamenti come `user.name = 'Sara'`: quella non è una stampa.

**Perché:** da 1 a 3 frasi. Devono spiegare **ogni** valore dell'output e non contraddirlo.
Prima di passare al blocco successivo, rileggi il perché contro l'output.

**Verifica:** l'output reale, copiato dal terminale, poi `sì` / `no` / `in parte`.
Se non è `sì`, scrivi quale idea era sbagliata e qual è quella giusta.

---

### B1
```js
const user = { name: 'Leo', address: { city: 'Milano' } };
const copy = { ...user };
copy.name = 'Sara';
copy.address.city = 'Roma';
console.log(user.name, user.address.city, user === copy, user.address === copy.address);
```

#### Previsione
**Output:**
Leo, Roma, false, true
___
```
**Perché:** ___
Lo spread in copy effettua una sua copia solo degli oggetti in superficie mentre per gli oggetti annidati crea solo una referenza
all'oggetto da cui è stato copiato, per questo motivo user.address === copy.address perchè copy.address punta sempre alla referenza di user.address
#### Verifica
**Output reale:**
Leo Roma false true
___
```
**Avevo ragione?** ___
**Idea sbagliata → idea giusta:** ___

---

### B2
```js
const fields = { email: 'a', password: 'b' };
const name = 'password';
const next = { [name]: 'X', ...fields };
console.log(next);
```
#### Previsione
**Output:**
```text
{ email: 'a', password: 'b' }
___
```
**Perché:** ___
Perchè il valore [name]: 'X' è dichiarato prima dello spread; nei valori passati dallo spread esiste la stessa chiave che viene sovrascritta.
#### Verifica
**Output reale:**
```text
{password: 'b', email: 'a'}
```
**Avevo ragione?** Si
**Idea sbagliata → idea giusta:** Idea giusta

---

### B3
```js
const f = ({ label, ...rest }) => console.log(label, Object.keys(rest));
f({ label: 'Email', type: 'email', value: '', required: true });
```

#### Previsione
**Output:**
```text
Email, [type, value, required]
___
```
**Perché:**
Perchè lable stampa il valore mentre Object.keys stampa le key dell'oggetto.

#### Verifica
**Output reale:**
```text
Email, [type, value, required]
```
**Avevo ragione?** Si
**Idea sbagliata → idea giusta:** Idea Giusta

---

### B4
```js
console.log('A');
setTimeout(() => console.log('B'), 0);
(async () => {
  console.log('C');
  await Promise.resolve();
  console.log('D');
})();
Promise.resolve().then(() => console.log('E'));
console.log('F');
```

#### Previsione
**Output** (una lettera per riga):
```text
A
B
C
D
E
F
```
**Perché:**
Viene eseguito prima il codice sincrono, poi i microTask poi il resto.

#### Verifica
**Output reale:**
A
C
F
D
E
undefined
B
___
```
**Avevo ragione?** Forse, in output c'è un undefined che non capisco da dove provenga.
**Idea sbagliata → idea giusta:** dovrebbe essere giusta

---

### B5
```js
const g = (x = 10) => x;
console.log(g(), g(undefined), g(null), g(0));
```

#### Previsione
**Output:**
```text
10, undefined, null, 0
```
**Perché:** ___
Perchè g() esegue la funzione e ritorna 10, un assegnazione undefined è sempre undefined, stesso discorso per null. Mentre 0 è un numero, quindi non è undefined.
#### Verifica
**Output reale:**
```text
___
```
**Avevo ragione?** si
**Idea sbagliata → idea giusta:** direi di si

---

### B6
```js
const load = async () => { throw new Error('boom'); };
try {
  load();
  console.log('ok');
} catch (e) {
  console.log('preso', e.message);
}
```

#### Previsione
**Output:**
```text
qui mi devi spiegare cosa succede perchè non riesco ad immaginare cosa succede
```
**Perché:** ___
non riesco a capire l'output
#### Verifica
**Output reale:**
```text
ok
undefined
Uncaught (in promise) Error: boom
    at load (<anonymous>:1:34)
    at <anonymous>:3:3
```
**Avevo ragione?** No
**Idea sbagliata → idea giusta:** No
