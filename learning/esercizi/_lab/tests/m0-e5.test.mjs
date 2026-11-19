import { createStore } from '../../m0/e5-boss-store.mjs';
export default (test, t) => {
  test('getState e setState con oggetto parziale', () => {
    const s = createStore({ user: null, loading: true });
    const before = s.getState();
    s.setState({ loading: false });
    t.eq(s.getState(), { user: null, loading: false }, 'stato fuso');
    t.ok(s.getState() !== before, 'oggetto nuovo');
    t.eq(before, { user: null, loading: true }, 'lo stato vecchio non deve essere modificato');
  });
  test('setState con funzione', () => {
    const s = createStore({ count: 1 });
    s.setState((st) => ({ count: st.count + 1 }));
    s.setState((st) => ({ count: st.count + 1 }));
    t.eq(s.getState().count, 3, 'count');
  });
  test('subscribe riceve nuovo e vecchio stato', () => {
    const s = createStore({ n: 0 }); const got = [];
    s.subscribe((nu, old) => got.push([old.n, nu.n]));
    s.setState({ n: 1 }); s.setState({ n: 2 });
    t.eq(got, [[0, 1], [1, 2]], 'notifiche');
  });
  test('nessun cambiamento → nessuna notifica, stesso riferimento', () => {
    const s = createStore({ n: 0, u: null }); let calls = 0;
    s.subscribe(() => calls++);
    const before = s.getState();
    s.setState({ n: 0, u: null });
    t.eq(calls, 0, 'notifiche');
    t.ok(s.getState() === before, 'lo stato deve restare lo stesso oggetto');
  }, 'È il bail-out di React: Object.is uguale → niente render.');
  test('unsubscribe', () => {
    const s = createStore({ n: 0 }); let calls = 0;
    const un = s.subscribe(() => calls++);
    s.setState({ n: 1 }); un(); s.setState({ n: 2 });
    t.eq(calls, 1, 'notifiche dopo unsubscribe');
  });
  test('disiscrizione durante la notifica', () => {
    const s = createStore({ n: 0 }); const got = [];
    let unA = null;
    unA = s.subscribe(() => { got.push('A'); unA(); });
    s.subscribe(() => got.push('B'));
    s.setState({ n: 1 }); s.setState({ n: 2 });
    t.eq(got, ['A', 'B', 'B'], 'ordine notifiche');
  }, 'Modificare una lista mentre la stai scorrendo è una classica fonte di bug: B verrebbe saltato.');
  test('un listener che lancia non blocca gli altri', () => {
    const s = createStore({ n: 0 }); const got = [];
    s.subscribe(() => { throw new Error('rotto'); });
    s.subscribe(() => got.push('ok'));
    s.setState({ n: 1 });
    t.eq(got, ['ok'], 'il secondo listener deve essere avvisato');
  });
};
