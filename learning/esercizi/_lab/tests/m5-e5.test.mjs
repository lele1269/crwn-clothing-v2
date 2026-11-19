import { render, screen, fireEvent, act, cleanup, reactWarnings } from '../react-env.mjs';
import { createElement as h } from 'react';
import { __lab } from '../firebase-utils-mock.mjs';
import { UserProvider } from '../user-context-ref.jsx';
const M = await import('../../m5/e5-boss-cart.jsx');

const HAT = { id: 1, name: 'Hat', price: 25 };
const BOOT = { id: 3, name: 'Boot', price: 35 };
const wait = (ms = 20) => act(() => new Promise((r) => setTimeout(r, ms)));
let snapshots = [];
const Probe = () => {
  const c = M.useCart();
  snapshots.push({ items: c.cartItems.reduce((s, i) => s + i.quantity, 0), count: c.cartCount });
  return h('div', null,
    h('span', { 'data-testid': 'state' }, JSON.stringify({ open: c.isCartOpen, items: c.cartItems.map((i) => [i.id, i.quantity]), count: c.cartCount, total: c.cartTotal })),
    h('span', { 'data-testid': 'keys' }, Object.keys(c).sort().join(',')),
    h('button', { onClick: () => c.toggleCart() }, 'toggle'),
    h('button', { onClick: () => c.addItemToCart(HAT) }, 'addHat'),
    h('button', { onClick: () => c.addItemToCart(BOOT) }, 'addBoot'),
    h('button', { onClick: () => c.removeItemFromCart({ ...HAT }) }, 'removeHat'),
    h('button', { onClick: () => c.clearItemFromCart({ ...BOOT }) }, 'clearBoot'));
};
const mount = () => render(h(UserProvider, null, h(M.CartProvider, null, h(Probe))));
const state = () => JSON.parse(screen.getByTestId('state').textContent);
const click = (n) => fireEvent.click(screen.getByText(n));

export const beforeEach = () => { __lab.reset(); snapshots = []; };
export const afterEach = cleanup;

export default (test, t) => {
  test('chiavi esatte del value', async () => {
    mount(); await wait();
    t.eq(screen.getByTestId('keys').textContent, 'addItemToCart,cartCount,cartItems,cartTotal,clearItemFromCart,isCartOpen,removeItemFromCart,toggleCart', 'Object.keys(useCart())');
  }, 'Il contratto del context è il value, chiave per chiave (errore tipico ❺).');

  test('azioni e totali', async () => {
    mount(); await wait();
    click('addHat'); click('addHat'); click('addBoot');
    t.eq(state(), { open: false, items: [[1, 2], [3, 1]], count: 3, total: 85 }, 'dopo 2 hat + 1 boot');
    click('removeHat'); click('clearBoot');
    t.eq(state(), { open: false, items: [[1, 1]], count: 1, total: 25 }, 'dopo remove hat + clear boot');
    click('toggle');
    t.eq(state().open, true, 'isCartOpen dopo toggle');
  });

  test('cartCount è sempre coerente con cartItems in OGNI render', async () => {
    mount(); await wait();
    snapshots = [];
    click('addHat'); click('addBoot');
    const bad = snapshots.filter((s) => s.items !== s.count);
    t.eq(bad, [], 'render in cui cartCount ≠ somma delle quantity');
  }, 'Con useEffect + state c\'è sempre un render "intermedio" incoerente. Con un valore derivato, mai.');

  test('useCart fuori da CartProvider → errore chiaro', async () => {
    let err = null;
    const Bad = () => { M.useCart(); return null; };
    try { render(h(Bad)); } catch (e) { err = e; }
    t.ok(err && /CartProvider/.test(err.message), 'deve lanciare un Error che nomina CartProvider', err && err.message);
  }, 'Un errore esplicito subito è meglio di un fallimento silenzioso dopo.');

  test('logout → carrello svuotato e chiuso', async () => {
    mount(); await wait();
    await act(async () => { __lab.emit({ uid: 'u1', email: 'a@b.it' }); });
    click('addHat'); click('toggle');
    await act(async () => { __lab.emit(null); });
    t.eq(state(), { open: false, items: [], count: 0, total: 0 }, 'stato dopo il logout');
  });

  test('il carrello resta se l\'utente non cambia', async () => {
    mount(); await wait();
    await act(async () => { __lab.emit({ uid: 'u1', email: 'a@b.it' }); });
    click('addHat');
    t.eq(state().items, [[1, 1]], 'carrello di un utente loggato');
  });
};
