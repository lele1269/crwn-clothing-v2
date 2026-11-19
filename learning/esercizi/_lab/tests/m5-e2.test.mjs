import { addCartItem, removeCartItem, clearCartItem, getCartCount, getCartTotal } from '../../m5/e2-cart-helpers.mjs';

const HAT = { id: 1, name: 'Brown Brim', price: 25 };
const BOOT = { id: 3, name: 'Brown Cowboy', price: 35 };
const freeze = (a) => Object.freeze(a.map((x) => Object.freeze({ ...x })));

export default (test, t) => {
  test('add: prodotto nuovo in fondo con quantity 1', () => {
    const before = freeze([{ ...HAT, quantity: 1 }]);
    t.eq(addCartItem(before, BOOT), [{ ...HAT, quantity: 1 }, { ...BOOT, quantity: 1 }], 'risultato');
  }, 'I dati di partenza sono "congelati" (Object.freeze): se provi a modificarli, il test se ne accorge.');

  test('add: prodotto esistente → quantity + 1', () => {
    const before = freeze([{ ...HAT, quantity: 1 }, { ...BOOT, quantity: 2 }]);
    t.eq(addCartItem(before, BOOT), [{ ...HAT, quantity: 1 }, { ...BOOT, quantity: 3 }], 'risultato');
  });

  test('add: non modifica l\'originale e restituisce un array nuovo', () => {
    const before = [{ ...HAT, quantity: 1 }];
    const snapshot = JSON.stringify(before);
    const after = addCartItem(before, HAT);
    t.ok(after !== before, 'deve essere un array NUOVO (riferimento diverso)');
    t.eq(JSON.stringify(before), snapshot, 'l\'array originale non deve cambiare');
  }, 'Se restituisci lo stesso array, React fa Object.is(vecchio, nuovo) → true → nessun re-render.');

  test('add: condivisione strutturale (gli elementi non toccati sono gli stessi oggetti)', () => {
    const hat = { ...HAT, quantity: 1 };
    const boot = { ...BOOT, quantity: 1 };
    const after = addCartItem([hat, boot], BOOT);
    t.ok(after[0] === hat, 'l\'elemento NON modificato deve essere lo stesso oggetto (===)');
    t.ok(after[1] !== boot, 'l\'elemento modificato deve essere un oggetto NUOVO');
  }, 'Copiare tutto è sprecato; copiare niente è un bug. Si copia solo ciò che cambia.');

  test('remove: decrementa / elimina a 1', () => {
    const before = freeze([{ ...HAT, quantity: 2 }, { ...BOOT, quantity: 1 }]);
    t.eq(removeCartItem(before, HAT), [{ ...HAT, quantity: 1 }, { ...BOOT, quantity: 1 }], 'remove HAT (2→1)');
    t.eq(removeCartItem(before, BOOT), [{ ...HAT, quantity: 2 }], 'remove BOOT (1→eliminato)');
  });

  test('remove: prodotto assente → stesso array', () => {
    const before = freeze([{ ...HAT, quantity: 2 }]);
    t.ok(removeCartItem(before, { id: 99 }) === before, 'nessun cambiamento = stesso riferimento (così React non fa re-render inutili)');
  }, 'Il codice del corso qui andrebbe in crash: existingCartItem è undefined e .quantity esplode.');

  test('clear', () => {
    const before = freeze([{ ...HAT, quantity: 5 }, { ...BOOT, quantity: 1 }]);
    t.eq(clearCartItem(before, HAT), [{ ...BOOT, quantity: 1 }], 'clear HAT');
  });

  test('count e total', () => {
    const items = freeze([{ ...HAT, quantity: 2 }, { ...BOOT, quantity: 1 }]);
    t.eq(getCartCount(items), 3, 'count');
    t.eq(getCartTotal(items), 85, 'total');
    t.eq(getCartCount([]), 0, 'count vuoto');
    t.eq(getCartTotal([]), 0, 'total vuoto');
  }, 'reduce su array vuoto senza valore iniziale → TypeError (MDN, Exceptions).');
};
