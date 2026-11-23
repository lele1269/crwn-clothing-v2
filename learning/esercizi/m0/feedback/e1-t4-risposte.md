# m0-e1 · tentativo 4 · risposte del quiz

Aiuti del Lab aperti: 0

## B1 · riferimenti e spread ✔

```js
const a = { tags: ['x'], meta: { v: 1 } };
const b = { ...a, tags: [...a.tags] };
b.tags.push('y');
b.meta.v = 2;
console.log(a.tags.length, a.meta.v, a.tags === b.tags, a.meta === b.meta);
```

**Previsione:**
```text
1, 2, false, true
```
**Perché:** tags.lenght è un array quindi stampa 1, a.met.v stampa 2 perchè avendo la stessa referenza b.meta.v modifica anche a quindi di conseguenza a.tags === b.tags è falso perchè con lo spread su tags b si crea una copia indipendente ma non per meta che rimane referenziato verso lo stesso "cassetto" e quindi a.meta === b.meta = vero

**Output reale:**
```text
1 2 false true
```

## B2 · spread e ordine delle chiavi ✔

```js
const defaults = { theme: 'light', lang: 'it', size: 12 };
const user = { size: 14, theme: 'dark' };
const settings = { ...defaults, ...user };
console.log(settings);
```

**Previsione:**
```text
theme: 'dark',lang: 'it',size: 14
```
**Perché:** perchè il primo valore di defaults.theme viene sovrascritto da settings.theme, lang rimane al suo posto e defaults.size viene sovrascritto da user.size

**Output reale:**
```text
{ theme: 'dark', lang: 'it', size: 14 }
```

## B3 · destructuring con rest ✘

```js
const props = { label: 'Email', id: 'mail', type: 'email' };
const { label, ...inputProps } = props;
console.log(label, inputProps);
console.log(Object.keys(inputProps).length, inputProps.label);
```

**Previsione:**
```text
Email, {id: 'maill', type: 'email'}
2, undefined
```
**Perché:** perchè label stampa il valore definito di label mentre ...inputProps stampa un oggetto contenente id e type. Object.keys è un array contenetnte le chiavi di inputProps quindi stampa 2 essendo 2 chiavi e inputProps.label non esiste quindi undefined.

**Output reale:**
```text
Email { id: 'mail', type: 'email' }
2 undefined
```
**Idea sbagliata → idea giusta:** ho fatto un errore di battirura non ho inserito la ,

## B4 · event loop ✘

```js
console.log('a');
setTimeout(() => console.log('b'), 0);
const p = new Promise((resolve) => {
  console.log('c');
  resolve();
});
p.then(() => console.log('d'));
(async () => {
  await p;
  console.log('e');
})();
console.log('f');
```

**Previsione:**
```text
a
c
d
e
f
b
```
**Perché:** perchè prima viene eseguito il codice sincrono, poi i microtasks e poi il resto

**Output reale:**
```text
a
c
f
d
e
b
```
**Idea sbagliata → idea giusta:** perchè ho intepretato male il .then che fa console.log su d intepretandolo come codice sincrono ma inverità è asincrono e fa parte promise. Di conseguenza ho sbagliato gli altri

## B5 · parametri di default ✔

```js
const pick = ({ color = 'nero', size } = {}) => `${color}-${size}`;
console.log(pick(), pick({ size: 'M' }), pick({ color: null, size: 'S' }), pick({ color: undefined }));
```

**Previsione:**
```text
nero-undefined, nero-M, null-S, nero-undefined
```
**Perché:** pick() senza passare niente conosce il valore di default per color ma size non viene mai dichiarato quindi undefined. pick({siz: 'M'}) passa il valore di size all'oggetto che viene quindi popolato con nero-M. pick({ color: null, size: 'S' }) null sovrascrive il valore di defult e qjuindi il risultato è null-'S'. pick({ color: undefined })) stampa sempre nero-undefined perchè il valore di default viene stampato sia se vuoto sia se undefined.

**Output reale:**
```text
nero-undefined nero-M null-S nero-undefined
```

## B6 · async, await e try/catch ✔

```js
const fetchUser = async (id) => {
  if (id < 0) throw new Error('id non valido');
  return { id };
};
const main = async () => {
  try {
    const u = await fetchUser(1);
    console.log('utente', u.id);
    fetchUser(-1);
    console.log('continuo');
  } catch (e) {
    console.log('catch', e.message);
  }
};
main();
console.log('sincrono');
```

**Previsione:**
```text
sincrono
utente 1
continuo
Error: id non valido
```
**Perché:** sincrono è il primo valore che viene stampato perchè è codice sincrono. Utente 1 è il secondo valore perchè viene passato e ritornato dalla funzione fetchUser chiamata nel blocco try dopodichè prosegue con 'continuo' perchè fetchUser(-1) viene accodato essendo una promise e va in errore al di fuori del catch e quindi l'ultimo valore è un codice errore Uncaught

**Output reale:**
```text
sincrono
utente 1
continuo
Errore: id non valido
```

