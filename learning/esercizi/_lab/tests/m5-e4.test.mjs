import { render, screen, fireEvent, cleanup } from '../react-env.mjs';
import { createElement as h, useContext } from 'react';
const M = await import('../../m5/e4-cart-bug.jsx');

const HAT = { id: 1, name: 'Hat', price: 25 };
const Probe = () => {
  const c = useContext(M.CartContext);
  return h('div', null,
    h('span', { 'data-testid': 'open' }, String(c.isCartOpen)),
    h('span', { 'data-testid': 'count' }, String(c.cartCount)),
    h('span', { 'data-testid': 'items' }, JSON.stringify(c.cartItems.map((i) => [i.id, i.quantity]))),
    h('button', { onClick: () => c.toggleCart() }, 'toggle'),
    h('button', { onClick: () => c.addItemToCart(HAT) }, 'add'),
    h('button', { onClick: () => c.removeItemFromCart(HAT) }, 'remove'));
};
const mount = () => render(h(M.CartProvider, null, h(Probe)));
const txt = (id) => screen.getByTestId(id).textContent;
const click = (name) => fireEvent.click(screen.getByText(name));

export const afterEach = cleanup;

export default (test, t) => {
  test('toggleCart apre e richiude', () => {
    mount();
    click('toggle'); t.eq(txt('open'), 'true', 'dopo 1 toggle');
    click('toggle'); t.eq(txt('open'), 'false', 'dopo 2 toggle');
  });
  test('aggiungere un prodotto nuovo aggiorna la UI', () => {
    mount();
    click('add');
    t.eq(txt('items'), '[[1,1]]', 'cartItems mostrati');
  }, 'Se lo state è stato modificato ma la UI no, React non sa che è cambiato. Chiediti: che riferimento gli hai passato?');
  test('aggiungere due volte → quantity 2', () => {
    mount();
    click('add'); click('add');
    t.eq(txt('items'), '[[1,2]]', 'cartItems');
  });
  test('cartCount segue cartItems', () => {
    mount();
    click('add'); click('add');
    t.eq(txt('count'), '2', 'cartCount dopo due add');
  });
  test('removeItemFromCart è disponibile e funziona', () => {
    mount();
    click('add'); click('add');
    click('remove');
    t.eq(txt('items'), '[[1,1]]', 'dopo un remove');
    click('remove');
    t.eq(txt('items'), '[]', 'dopo due remove');
  }, 'Se qui c\'è un TypeError, confronta le chiavi del default con quelle del value.');
};
