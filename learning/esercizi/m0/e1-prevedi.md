# M0 · E1 ★ · Prevedi l'output

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

Regola: niente esecuzione. Per ogni blocco scrivi **l'output esatto** e **una frase sul perché**.
Poi (solo dopo!) puoi eseguirlo con `node -e "..."` o nella console del browser, e scrivere
sotto **"Verifica:"** se avevi ragione. Se no, quale idea era sbagliata.

### B1
```js
const user = { name: 'Leo', address: { city: 'Milano' } };
const copy = { ...user };
copy.name = 'Sara';
copy.address.city = 'Roma';
console.log(user.name, user.address.city, user === copy, user.address === copy.address);
```

### B2
```js
const fields = { email: 'a', password: 'b' };
const name = 'password';
const next = { [name]: 'X', ...fields };
console.log(next);
```

### B3
```js
const f = ({ label, ...rest }) => console.log(label, Object.keys(rest));
f({ label: 'Email', type: 'email', value: '', required: true });
```

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

### B5
```js
const g = (x = 10) => x;
console.log(g(), g(undefined), g(null), g(0));
```

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

**Risposte e verifiche:**
