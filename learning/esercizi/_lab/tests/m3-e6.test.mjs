import { getFirestore, __lab } from '../firestore-mock.mjs';
import { getCart, addItemToCart, removeItemFromCart, clearItemFromCart, getCartTotal } from '../../m3/e6-boss-carrello.mjs';

const HAT = { id: 1, name: 'Brown Brim', price: 25 };
const BOOT = { id: 3, name: 'Brown Cowboy', price: 35 };
const sortById = (a) => [...(a || [])].sort((x, y) => (x.id > y.id ? 1 : -1));

export default (test, t) => {
  test('carrello mai creato → []', async () => {
    t.eq(await getCart(getFirestore(), 'u1'), [], 'getCart di un utente senza carrello');
  });

  test('aggiungere un prodotto nuovo → quantity 1', async () => {
    const db = getFirestore();
    const cart = await addItemToCart(db, 'u1', HAT);
    t.eq(cart, [{ ...HAT, quantity: 1 }], 'carrello restituito');
    t.eq(await getCart(db, 'u1'), [{ ...HAT, quantity: 1 }], 'carrello riletto dal database');
  }, 'Il valore restituito e quello salvato devono coincidere: se differiscono, la UI mente.');

  test('stesso prodotto due volte → una riga, quantity 2', async () => {
    const db = getFirestore();
    await addItemToCart(db, 'u1', HAT);
    await addItemToCart(db, 'u1', HAT);
    t.eq(await getCart(db, 'u1'), [{ ...HAT, quantity: 2 }], 'carrello');
  });

  test('prodotti diversi → righe diverse', async () => {
    const db = getFirestore();
    await addItemToCart(db, 'u1', HAT);
    await addItemToCart(db, 'u1', BOOT);
    t.eq(sortById(await getCart(db, 'u1')), [{ ...HAT, quantity: 1 }, { ...BOOT, quantity: 1 }], 'carrello (ordinato per id)');
  });

  test('prodotti non validi rifiutati', async () => {
    const db = getFirestore();
    await t.throws(() => addItemToCart(db, 'u1', { id: 9, name: 'X' }), /prodotto non valido/, 'senza price');
    await t.throws(() => addItemToCart(db, 'u1', { id: 9, name: 'X', price: -5 }), /prodotto non valido/, 'price negativo');
    await t.throws(() => addItemToCart(db, 'u1', { name: 'X', price: 5 }), /prodotto non valido/, 'senza id');
    await t.throws(() => addItemToCart(db, 'u1', null), /prodotto non valido/, 'null');
  });

  test('remove: decrementa, poi elimina a quantity 1', async () => {
    const db = getFirestore();
    await addItemToCart(db, 'u1', HAT);
    await addItemToCart(db, 'u1', HAT);
    t.eq(await removeItemFromCart(db, 'u1', HAT.id), [{ ...HAT, quantity: 1 }], 'dopo il primo remove');
    t.eq(await removeItemFromCart(db, 'u1', HAT.id), [], 'dopo il secondo remove');
    t.eq(await getCart(db, 'u1'), [], 'carrello riletto');
  }, 'Una riga con quantity 0 è un bug visivo garantito: "0 × cappello" nel carrello.');

  test('remove di un prodotto assente: nessun errore, nulla cambia', async () => {
    const db = getFirestore();
    await addItemToCart(db, 'u1', HAT);
    t.eq(await removeItemFromCart(db, 'u1', 999), [{ ...HAT, quantity: 1 }], 'carrello');
    t.eq(await removeItemFromCart(db, 'nuovo', 1), [], 'remove su carrello mai creato');
  });

  test('clear elimina la riga intera', async () => {
    const db = getFirestore();
    for (let i = 0; i < 3; i++) await addItemToCart(db, 'u1', BOOT);
    await addItemToCart(db, 'u1', HAT);
    t.eq(await clearItemFromCart(db, 'u1', BOOT.id), [{ ...HAT, quantity: 1 }], 'dopo clear');
  });

  test('totale', async () => {
    const db = getFirestore();
    t.eq(await getCartTotal(db, 'u1'), 0, 'carrello vuoto');
    await addItemToCart(db, 'u1', HAT);
    await addItemToCart(db, 'u1', HAT);
    await addItemToCart(db, 'u1', BOOT);
    t.eq(await getCartTotal(db, 'u1'), 85, '2×25 + 1×35');
  });

  test('i carrelli di utenti diversi sono separati', async () => {
    const db = getFirestore();
    await addItemToCart(db, 'u1', HAT);
    await addItemToCart(db, 'u2', BOOT);
    t.eq(await getCart(db, 'u1'), [{ ...HAT, quantity: 1 }], 'carrello di u1');
    t.eq(await getCart(db, 'u2'), [{ ...BOOT, quantity: 1 }], 'carrello di u2');
  }, 'Se fallisce, il percorso non dipende dall\'uid: tutti gli utenti condividerebbero lo stesso carrello.');

  test('non distrugge il profilo utente', async () => {
    const db = getFirestore();
    __lab.seed(db, 'users/u1', { displayName: 'Leo', email: 'leo@mail.it', createdAt: new Date('2026-01-01') });
    await addItemToCart(db, 'u1', HAT);
    const raw = __lab.raw(db, 'users/u1');
    t.ok(raw && raw.email === 'leo@mail.it' && raw.displayName === 'Leo' && raw.createdAt, 'il documento users/u1 deve conservare i suoi campi', raw);
  }, 'Se hai messo il carrello dentro users/{uid} con setDoc senza merge, hai appena cancellato il profilo dell\'utente.');
};
