import { findProduct, hasProductOver, cartTotal, pickFields, cleanName } from '../../t1/e3-mdn.mjs';

const P = [{ id: 1, name: 'Brown Brim', price: 25 }, { id: 3, name: 'Brown Cowboy', price: 35 }, { id: 5, name: 'Blue Beanie', price: 18 }];

export default (test, t) => {
  test('findProduct trova', () => { t.eq(findProduct(P, 3), P[1], 'findProduct(P, 3)'); });
  test('findProduct: assente → null', () => {
    t.eq(findProduct(P, 99), null, 'findProduct(P, 99)');
    t.eq(findProduct([], 1), null, 'findProduct([], 1)');
  }, 'Return value di find: undefined se non trova. Il contratto qui chiede null: devi convertire tu.');

  test('hasProductOver', () => {
    t.eq(hasProductOver(P, 30), true, 'hasProductOver(P, 30)');
    t.eq(hasProductOver(P, 35), false, 'hasProductOver(P, 35) — "più di", non "almeno"');
    t.eq(hasProductOver([], 0), false, 'hasProductOver([], 0)');
  }, 'Il secondo controllo verifica il confine: > e >= non sono la stessa cosa.');

  test('cartTotal', () => {
    t.eq(cartTotal([{ price: 25, quantity: 2 }, { price: 35, quantity: 1 }]), 85, 'carrello di due righe');
    t.eq(cartTotal([{ price: 10, quantity: 3 }]), 30, 'una sola riga');
  });
  test('cartTotal: carrello vuoto → 0', () => { t.eq(cartTotal([]), 0, 'cartTotal([])'); },
    'MDN › reduce › Exceptions: TypeError su array vuoto senza initialValue.');

  test('pickFields', () => {
    t.eq(pickFields({ a: 1, b: 2, c: 3 }, ['a', 'c']), { a: 1, c: 3 }, 'pickFields');
    t.eq(pickFields({ a: 1 }, ['z']), {}, 'nessuna chiave ammessa');
  });
  test('pickFields non modifica l\'originale', () => {
    const o = { a: 1, b: 2 };
    pickFields(o, ['a']);
    t.eq(o, { a: 1, b: 2 }, 'oggetto originale');
  }, 'Immutabilità: React si basa su questo. Modificare l\'oggetto ricevuto è un bug che non vedi subito.');

  test('cleanName', () => {
    t.eq(cleanName('   Leo    Rossi  '), 'Leo Rossi', 'spazi multipli');
    t.eq(cleanName('Sara'), 'Sara', 'già pulito');
    t.eq(cleanName('  '), '', 'solo spazi');
  });
};
