import { render, screen, act, cleanup } from '../react-env.mjs';
import { createElement as h, useContext } from 'react';
import { __lab, calls } from '../firebase-utils-mock.mjs';
const M = await import('../../m5/e3-user-context.jsx');

const wait = (ms = 20) => act(() => new Promise((r) => setTimeout(r, ms)));
const Probe = () => {
  const v = useContext(M.UserContext);
  return h('pre', { 'data-testid': 'probe' }, JSON.stringify({ user: v.currentUser ? v.currentUser.uid : null, loading: v.isAuthLoading, hasSetter: typeof v.setCurrentUser === 'function' }));
};
const probe = () => JSON.parse(screen.getByTestId('probe').textContent);
const mount = () => render(h(M.UserProvider, null, h(Probe), h(M.AuthStatus)));

export const beforeEach = () => __lab.reset();
export const afterEach = cleanup;

export default (test, t) => {
  test('UserContext è un context con il default richiesto', () => {
    t.ok(M.UserContext && M.UserContext.Provider, 'UserContext deve essere creato con createContext', M.UserContext);
    render(h(Probe));
    t.eq(probe(), { user: null, loading: true, hasSetter: true }, 'valore letto SENZA Provider (= default)');
  });

  test('al primo render: loading, nessun utente, "…"', () => {
    mount();
    t.eq(probe().loading, true, 'isAuthLoading al primo render');
    t.eq(screen.getByText(/…|SIGN/).textContent, '…', 'AuthStatus al primo render');
  }, 'Questo è il cuore del miglioramento: "non lo so ancora" ≠ "non loggato".');

  test('dopo la prima callback (nessuno loggato): "SIGN IN"', async () => {
    mount();
    await wait();
    t.eq(probe(), { user: null, loading: false, hasSetter: true }, 'value dopo la prima callback');
    t.ok(screen.queryByText('SIGN IN'), 'deve comparire SIGN IN', document.body.textContent);
  });

  test('login → user nel value, "SIGN OUT", documento creato', async () => {
    mount();
    await wait();
    await act(async () => { __lab.emit({ uid: 'g7Hk2', email: 'leo@mail.it', displayName: 'Leo' }); });
    t.eq(probe().user, 'g7Hk2', 'currentUser.uid');
    t.ok(screen.queryByText('SIGN OUT'), 'deve comparire SIGN OUT', document.body.textContent);
    t.eq(calls.createUserDocumentFromAuth.map((c) => c.userAuth && c.userAuth.uid), ['g7Hk2'], 'chiamate a createUserDocumentFromAuth');
  });

  test('logout → null, nessuna chiamata a createUserDocumentFromAuth con null', async () => {
    mount();
    await wait();
    await act(async () => { __lab.emit({ uid: 'g7Hk2', email: 'leo@mail.it' }); });
    await act(async () => { __lab.emit(null); });
    t.eq(probe().user, null, 'currentUser dopo logout');
    t.eq(calls.createUserDocumentFromAuth.length, 1, 'chiamate totali (solo quella del login)');
  }, 'if (user) protegge Firestore dalle chiamate inutili al logout.');

  test('un solo listener, rimosso allo smontaggio', async () => {
    const r = mount();
    await wait();
    t.eq(__lab.listeners(), 1, 'listener attivi dopo il montaggio');
    r.unmount();
    t.eq(__lab.listeners(), 0, 'listener attivi dopo lo smontaggio');
  }, 'Senza return unsubscribe (o con return unsubscribe()) questo test fallisce.');

  test('i children vengono disegnati', () => {
    render(h(M.UserProvider, null, h('p', null, 'figlio')));
    t.ok(screen.queryByText('figlio'), 'il Provider deve disegnare {children}');
  });
};
