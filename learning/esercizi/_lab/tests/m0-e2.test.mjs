import { updateField, withDefaults, splitName, omitKey, setCity } from '../../m0/e2-oggetti.mjs';
const deepFreeze = (o) => { Object.values(o).forEach((v) => v && typeof v === 'object' && deepFreeze(v)); return Object.freeze(o); };
export default (test, t) => {
  test('updateField', () => {
    const f = deepFreeze({ email: 'a', password: 'b' });
    const r = updateField(f, 'email', 'leo@x.it');
    t.eq(r, { email: 'leo@x.it', password: 'b' }, 'risultato');
    t.ok(r !== f, 'deve essere un oggetto nuovo');
  }, 'Gli oggetti ricevuti sono congelati: se li modifichi, il test va in crash.');
  test('withDefaults', () => {
    t.eq(withDefaults({ a: undefined, b: 2 }, deepFreeze({ a: 1, b: 0, c: 3 })), { a: 1, b: 2, c: 3 }, 'undefined non cancella il default');
    t.eq(withDefaults({ b: null }, { b: 5 }), { b: null }, 'null È un valore: vince');
    t.eq(withDefaults({}, { x: 1 }), { x: 1 }, 'nessuna opzione');
  }, 'Uno spread semplice fa vincere anche undefined. Serve filtrare prima.');
  test('splitName', () => {
    t.eq(splitName('Leo  Rossi Bianchi'), { first: 'Leo', rest: ['Rossi', 'Bianchi'] }, 'tre parole');
    t.eq(splitName('  Sara '), { first: 'Sara', rest: [] }, 'una parola con spazi');
  });
  test('omitKey', () => {
    const o = deepFreeze({ a: 1, b: 2, c: 3 });
    t.eq(omitKey(o, 'b'), { a: 1, c: 3 }, 'omitKey(o, "b")');
    t.eq(omitKey(o, 'z'), { a: 1, b: 2, c: 3 }, 'chiave assente');
  });
  test('setCity: copia ogni livello toccato', () => {
    const orders = [1, 2];
    const u = deepFreeze({ name: 'Leo', address: { city: 'Milano', zip: '20100' }, orders });
    const r = setCity(u, 'Roma');
    t.eq(r, { name: 'Leo', address: { city: 'Roma', zip: '20100' }, orders: [1, 2] }, 'risultato');
    t.ok(r !== u && r.address !== u.address, 'oggetto e address devono essere nuovi');
    t.ok(r.orders === u.orders, 'orders (non toccato) deve restare lo stesso riferimento');
    t.eq(u.address.city, 'Milano', 'originale intatto');
  }, 'Shallow copy: ogni livello che cambia va copiato, quelli che non cambiano si riusano.');
};
