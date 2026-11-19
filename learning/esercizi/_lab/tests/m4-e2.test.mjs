import { applyChange, isComplete, freshDefaults } from '../../m4/e2-campi.mjs';
const ev = (target) => ({ target });
export default (test, t) => {
  test('applyChange testo, immutabile', () => {
    const f = Object.freeze({ email: '', remember: false, age: '' });
    const r = applyChange(f, ev({ name: 'email', value: 'leo', type: 'email' }));
    t.eq(r, { email: 'leo', remember: false, age: '' }, 'risultato'); t.ok(r !== f, 'oggetto nuovo');
  });
  test('checkbox e number', () => {
    const f = { email: '', remember: false, age: '' };
    t.eq(applyChange(f, ev({ name: 'remember', value: 'on', type: 'checkbox', checked: true })).remember, true, 'checkbox');
    t.eq(applyChange(f, ev({ name: 'age', value: '42', type: 'number' })).age, 42, 'number');
    t.eq(applyChange(f, ev({ name: 'age', value: '', type: 'number' })).age, '', 'number vuoto');
  }, 'Per una checkbox, value vale "on" sia selezionata sia no: il dato vero è checked.');
  test('campo sconosciuto', async () => {
    await t.throws(() => applyChange({ email: '' }, ev({ name: 'mail', value: 'x', type: 'text' })), /campo sconosciuto: mail/, 'name sbagliato');
  });
  test('isComplete', () => {
    t.eq(isComplete({ a: ' x ', b: true, c: 0 }, ['a', 'b', 'c']), true, 'tutti pieni (0 conta)');
    t.eq(isComplete({ a: '   ', b: true }, ['a', 'b']), false, 'solo spazi');
    t.eq(isComplete({ a: 'x', b: false }, ['a', 'b']), false, 'booleano false');
    t.eq(isComplete({ a: 'x' }, ['a', 'z']), false, 'chiave mancante');
  });
  test('freshDefaults: copia profonda', () => {
    const d = { email: '', address: { city: '' }, tags: [] };
    const a = freshDefaults(d), b = freshDefaults(d);
    t.eq(a, d, 'contenuto');
    t.ok(a !== d && a.address !== d.address && a.tags !== d.tags && a.address !== b.address, 'nessun riferimento condiviso');
  }, 'structuredClone esiste (MDN) — ma sapresti scriverla anche a mano?');
};
