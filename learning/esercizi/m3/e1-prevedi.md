# M3 · E1 ★ · Leggi e prevedi

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

**Regola:** non eseguire niente. Rispondi solo leggendo il codice. Lo scopo è allenare la
*simulazione mentale*: la capacità di "far girare" il codice nella testa, che è la base di
tutto il debug.

Per ogni risposta scrivi **cosa succede** e **perché** (una o due frasi). Una risposta
giusta senza il perché vale metà.

```js
 1  export const createUserDocumentFromAuth = async (
 2    userAuth,
 3    additionalInformation = {}
    //si dichiarano i parametri accettati dalla funzione.
 4  ) => {
 5    if (!userAuth) return; setta una condizione per verificare se l'utente è autenticato.
 6
 7    const userDocRef = doc(db, 'users', userAuth.uid); //crea il riferimento uid al documento.
 8
 9    const userSnapshot = await getDoc(userDocRef); //chiama il documento a partire dal uid ricevuto con doc().
10
11    if (!userSnapshot.exists()) { // verifica se il documento esite perchè con la risposta di getDoc() riceviamo anche il metodo exists()
12      const { displayName, email } = userAuth;
        //destrutturazione della risposta sarebbe come scrivere
        //const displayName = userAuth.displayName;
        //const email = userAuth.email;
23

13      const createdAt = new Date(); //aggiunge il parametro date
14
//blocco try - cath asincrono
25
15      try {
    //setDoc va a scrivere i dati nel documento sostituendo (in questo modo) tutti i dati precedenti ed aggiunge displayName, email, createdat, mentre ...additionalInformation è lo spread operator per aggiugnere altri parametri che possono provenire da auth diverse come signInWithEmailAndPassword.
16        await setDoc(userDocRef, {
17          displayName,
18          email,
19          createdAt,
20          ...additionalInformation,
21        });
22      } catch (error) {
23        console.log('error creating the user', error.message); //legge il messaggio di errore se qualcosa andasse storto
24      }
25    }
26
27    return userDocRef; //restituisce il riferimento al documento creato
28  };
```

---

### D1. Primo accesso con Google
Un utente nuovo fa login con Google. `userAuth.uid` vale `"g7Hk2"`, `displayName` vale
`"Leandro L."`, `email` vale `"leo@mail.it"`. Il database è vuoto.

a) Che valore ha `userDocRef.path` alla riga 7? user/ghk2
b) Alla riga 11, `userSnapshot.exists()` restituisce `true` o `false`? restituisce true
c) Scrivi l'oggetto esatto che viene salvato alla riga 16.
users{
    user: {
        ghk2: {
            email: "leo@mail.it",
            createdAt: "2021-01-01T12:00:00Z",
            displayName: "Leandro L.",
            additionalInformation: {
                age: 30,
                gender: "male",
            },
        },
    },
}

**Risposta:**


### D2. Secondo accesso
Lo stesso utente fa logout e poi di nuovo login con Google. Quante scritture (`setDoc`)
avvengono questa volta? Cosa restituisce la funzione?

**Risposta:**
La scrittura di setDoc avviene solo una volta. La seconda volta exists() restitusce true e quindi la funzione restituisce direttamente l'oggetto user.


### D3. Lo sign-up con email e password
`createAuthUserWithEmailAndPassword` restituisce un `user` con `displayName: null`
(con email e password Firebase Auth non conosce il nome). Il form chiama
`createUserDocumentFromAuth(user, { displayName: 'Leo' })`.

Quale `displayName` finisce nel documento: `null` o `'Leo'`? Indica la riga che lo decide
e spiega la regola di JavaScript che lo determina.

**Risposta:**
Ci finisce Leo in quandto è deciso dalla riga 20 ...additionalInformation. passando la stessa chiave l'ultimo valore vince sul prima


### D4. E se togliessi `await`?
Alla riga 9 qualcuno scrive `const userSnapshot = getDoc(userDocRef);` (senza `await`).
Cosa contiene `userSnapshot`? Cosa succede esattamente alla riga 11?

**Risposta:**
Una Promise


### D5. Riferimento o fotografia?
Alla riga 7 il documento `users/g7Hk2` ancora non esiste. Perché `doc()` non dà errore?
Cosa c'è di diverso tra quello che hai in mano dopo la riga 7 e quello che hai dopo la riga 9?

**Risposta:**
Perchè si chiede l'indirizzo anche se il documento ancora non esiste infatti data() non contiene l'uid ma solo le info dello user


### D6. Il dettaglio che sfugge
Dopo il salvataggio, rileggi il documento e fai `snapshot.data().createdAt.getFullYear()`.
Funziona? Se no, cosa dovresti scrivere invece e perché?

**Risposta:**
Non so rispondere
