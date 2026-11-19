import { classifyAuthError as c, validateSignUp as v } from '../../m2/e2-errori.mjs';
const err = (code) => Object.assign(new Error('x'), { code });
export default (test, t) => {
  test('ignore', () => {
    t.eq(c(err('auth/popup-closed-by-user')), { kind: 'ignore', message: null }, 'popup chiuso');
    t.eq(c(err('auth/cancelled-popup-request')), { kind: 'ignore', message: null }, 'popup annullato');
  });
  test('credenziali: stesso messaggio', () => {
    for (const code of ['auth/invalid-credential', 'auth/wrong-password', 'auth/user-not-found'])
      t.eq(c(err(code)), { kind: 'show', message: 'Email o password non corretti' }, code);
  }, 'Messaggi diversi rivelerebbero se un\'email è registrata: annulleresti la protezione.');
  test('altri show', () => {
    t.eq(c(err('auth/email-already-in-use')).message, 'Email già registrata', 'email-already-in-use');
    t.eq(c(err('auth/weak-password')).message, 'La password deve avere almeno 6 caratteri', 'weak-password');
    t.eq(c(err('auth/invalid-email')).message, 'Email non valida', 'invalid-email');
    t.eq(c(err('auth/too-many-requests')).message, 'Troppi tentativi, riprova tra qualche minuto', 'too-many-requests');
  });
  test('generic, anche per input strani', () => {
    const G = { kind: 'generic', message: 'Qualcosa è andato storto, riprova' };
    t.eq(c(err('auth/network-request-failed')), G, 'errore di rete');
    t.eq(c(new Error('boom')), G, 'errore senza code');
    t.eq(c(null), G, 'null');
    t.eq(c('stringa'), G, 'stringa');
  }, 'Un gestore di errori non deve MAI andare in crash: è l\'ultima linea di difesa.');
  test('validateSignUp: tutto ok', () => {
    t.eq(v({ displayName: 'Leo', email: 'leo@mail.it', password: '123456', confirmPassword: '123456' }), {}, 'campi validi');
  });
  test('validateSignUp: tutti gli errori insieme', () => {
    t.eq(v({ displayName: '   ', email: 'leo@mail', password: '123', confirmPassword: '124' }),
      { displayName: 'Inserisci un nome', email: 'Email non valida', password: 'Almeno 6 caratteri', confirmPassword: 'Le password non coincidono' }, 'errori');
  });
  test('validateSignUp: solo conferma sbagliata', () => {
    t.eq(v({ displayName: 'Leo', email: 'a@b.it', password: '123456', confirmPassword: '1234567' }), { confirmPassword: 'Le password non coincidono' }, 'errori');
  });
};
