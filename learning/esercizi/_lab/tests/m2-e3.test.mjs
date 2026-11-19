import { __lab, calls } from '../firebase-utils-mock.mjs';
import { signUpUser } from '../../m2/e3-signup.mjs';
const OK = { displayName: '  Sara ', email: 'sara@mail.it', password: 'abc12345', confirmPassword: 'abc12345' };
export const beforeEach = () => __lab.reset();
export default (test, t) => {
  test('sign-up valido: restituisce user e crea il documento', async () => {
    const user = await signUpUser(OK);
    t.ok(user && user.uid && user.email === 'sara@mail.it', 'user restituito', user);
    const raw = __lab.fs.raw(__lab.db, 'users/' + user.uid);
    t.ok(raw && raw.displayName === 'Sara' && raw.email === 'sara@mail.it', 'documento con displayName senza spazi', raw);
  });
  test('dati non validi: errore con fieldErrors e nessuna chiamata', async () => {
    let e = null; try { await signUpUser({ ...OK, confirmPassword: 'x' }); } catch (x) { e = x; }
    t.ok(e && e.message === 'dati non validi' && e.fieldErrors && e.fieldErrors.confirmPassword, 'errore', e && { message: e.message, fieldErrors: e.fieldErrors });
    t.eq(__lab.auth.__accounts.size, 0, 'account creati');
    t.eq(calls.createUserDocumentFromAuth.length, 0, 'documenti tentati');
  }, 'Validare PRIMA delle chiamate di rete: controlli economici prima di quelli costosi.');
  test('email già usata: errore di Auth invariato, nessun documento', async () => {
    __lab.seedAccount({ email: 'sara@mail.it', password: 'x123456' });
    let e = null; try { await signUpUser(OK); } catch (x) { e = x; }
    t.ok(e && e.code === 'auth/email-already-in-use', 'error.code', e && e.code);
    t.eq(calls.createUserDocumentFromAuth.length, 0, 'documenti tentati');
  }, 'Chi chiama deve poter decidere cosa mostrare: per questo l\'errore deve arrivare con il suo code.');
  test('restituisce una Promise che si risolve DOPO il documento', async () => {
    const user = await signUpUser(OK);
    t.ok(__lab.fs.raw(__lab.db, 'users/' + user.uid), 'il documento deve esistere quando signUpUser finisce');
  }, 'Se non fai await sul documento, il componente potrebbe navigare alla pagina profilo prima che esista.');
};
