import { __lab } from '../firebase-utils-mock.mjs';
import { handleGoogleSignIn, handleEmailSignIn, handleSignOut } from '../../m2/e4-bug-handlers.mjs';
export const beforeEach = () => __lab.reset();
export default (test, t) => {
  test('Google: successo', async () => {
    __lab.nextPopup({ type: 'choose', email: 'leo@mail.it', displayName: 'Leo' });
    const r = await handleGoogleSignIn();
    t.ok(r.ok === true && r.user && r.user.email === 'leo@mail.it', 'risultato', r);
  });
  test('Google: popup chiuso → { ok: false, message: null }', async () => {
    __lab.nextPopup({ type: 'close' });
    t.eq(await handleGoogleSignIn(), { ok: false, message: null }, 'risultato');
  });
  test('Email: login corretto', async () => {
    __lab.seedAccount({ email: 'leo@mail.it', password: 'giusta1' });
    t.eq(await handleEmailSignIn('leo@mail.it', 'giusta1'), { ok: true }, 'risultato');
    t.eq(__lab.auth.currentUser && __lab.auth.currentUser.email, 'leo@mail.it', 'utente loggato quando l\'handler restituisce');
  });
  test('Email: password sbagliata', async () => {
    __lab.seedAccount({ email: 'leo@mail.it', password: 'giusta1' });
    t.eq(await handleEmailSignIn('leo@mail.it', 'sbagliata'), { ok: false, message: 'Email o password non corretti' }, 'risultato');
  }, 'Il simulatore si comporta come un progetto recente: email enumeration protection attiva.');
  test('Sign out: l\'utente esce davvero', async () => {
    __lab.seedAccount({ email: 'leo@mail.it', password: 'giusta1' });
    await handleEmailSignIn('leo@mail.it', 'giusta1');
    const r = await handleSignOut();
    t.eq(r, { ok: true }, 'risultato');
    t.eq(__lab.auth.currentUser, null, 'auth.currentUser dopo il sign out');
  });
};
