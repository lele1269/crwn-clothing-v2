import { render, screen, fireEvent, act, cleanup } from '../react-env.mjs';
import { createElement as h } from 'react';
import { __lab } from '../firebase-utils-mock.mjs';
import { UserProvider } from '../user-context-ref.jsx';
const M = await import('../../m6/e2-integrazione.jsx');
const wait = (ms = 25) => act(() => new Promise((r) => setTimeout(r, ms)));
const login = (u) => act(async () => { __lab.emit(u); });
const ANNA = { uid: 'anna1', email: 'anna@x.it', displayName: null };
const BRUNO = { uid: 'bruno2', email: 'bruno@x.it', displayName: 'Bruno da Google' };
export const beforeEach = () => {
  __lab.reset();
  __lab.fs.seed(__lab.db, 'users/anna1', { displayName: 'Anna', email: 'anna@x.it' });
  __lab.fs.seed(__lab.db, 'users/bruno2', { displayName: 'Bruno', email: 'bruno@x.it' });
};
export const afterEach = cleanup;
const mount = () => render(h(UserProvider, null, h(M.Navigation)));
const body = () => document.body.textContent;
export default (test, t) => {
  test('non loggato: SIGN IN, nessun badge', async () => {
    mount(); await wait();
    t.ok(body().includes('SIGN IN') && !body().includes('Ciao'), 'testo della pagina', body());
  });
  test('loggato: SIGN OUT e nome dal DOCUMENTO', async () => {
    mount(); await wait(); await login(ANNA); await wait();
    t.ok(screen.getByText('SIGN OUT'), 'bottone SIGN OUT');
    t.ok(body().includes('Ciao, Anna'), 'deve mostrare il displayName del documento Firestore', body());
  }, 'Anna si è registrata con email: in Auth displayName è null, il nome vero è in Firestore.');
  test('"…" mentre il documento arriva', async () => {
    __lab.fs.delay(__lab.db, 'users/anna1', 40);
    mount(); await wait(); await login(ANNA);
    t.ok(body().includes('…'), 'placeholder durante la lettura', body());
    await wait(60);
    t.ok(body().includes('Ciao, Anna'), 'nome dopo la lettura', body());
  });
  test('utente cambiato durante la lettura: mai la risposta vecchia', async () => {
    __lab.fs.delay(__lab.db, 'users/anna1', 60);
    mount(); await wait(); await login(ANNA); await wait(5); await login(BRUNO);
    await wait(20);
    t.ok(body().includes('Ciao, Bruno'), 'deve mostrare Bruno', body());
    await wait(70);
    t.ok(body().includes('Ciao, Bruno') && !body().includes('Anna'), 'quando arriva la lettura lenta di Anna, NON deve sovrascrivere Bruno', body());
  }, 'Senza un flag "ignore" nel cleanup dell\'effect, la risposta lenta di Anna arriva per ultima e vince.');
  test('SIGN OUT esce davvero e il badge sparisce', async () => {
    mount(); await wait(); await login(ANNA); await wait();
    __lab.seedAccount({ email: 'x@y.it', password: 'xxxxxx' });
    fireEvent.click(screen.getByText('SIGN OUT')); await wait();
    t.eq(__lab.auth.currentUser, null, 'auth.currentUser');
    t.ok(body().includes('SIGN IN') && !body().includes('Ciao'), 'pagina dopo il logout', body());
  });
};
