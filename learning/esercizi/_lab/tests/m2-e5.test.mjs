import { render, screen, fireEvent, act, cleanup } from '../react-env.mjs';
import { createElement as h } from 'react';
import { __lab } from '../firebase-utils-mock.mjs';
const { default: SignInForm } = await import('../../m2/e5-boss-signin.jsx');
const wait = (ms = 30) => act(() => new Promise((r) => setTimeout(r, ms)));
const email = () => screen.getByLabelText('Email');
const pw = () => screen.getByLabelText('Password');
const type = (el, v) => fireEvent.change(el, { target: { value: v } });
const submit = () => fireEvent.click(screen.getByText('Sign In'));
const google = () => fireEvent.click(screen.getByText('Sign In With Google'));
const alertText = () => { const a = screen.queryByRole('alert'); return a ? a.textContent : null; };
export const beforeEach = () => { __lab.reset(); __lab.seedAccount({ email: 'leo@mail.it', password: 'giusta1' }); };
export const afterEach = cleanup;
export default (test, t) => {
  test('input controllati', () => {
    render(h(SignInForm)); type(email(), 'leo@mail.it'); type(pw(), 'abc');
    t.eq([email().value, pw().value], ['leo@mail.it', 'abc'], 'valori');
  });
  test('login riuscito → campi svuotati, nessun messaggio', async () => {
    render(h(SignInForm)); type(email(), 'leo@mail.it'); type(pw(), 'giusta1');
    submit(); await wait();
    t.eq([email().value, pw().value, alertText()], ['', '', null], '[email, password, alert]');
    t.eq(__lab.auth.currentUser && __lab.auth.currentUser.email, 'leo@mail.it', 'utente loggato');
  });
  test('credenziali sbagliate → messaggio, campi intatti', async () => {
    render(h(SignInForm)); type(email(), 'leo@mail.it'); type(pw(), 'sbagliata');
    submit(); await wait();
    t.eq(alertText(), 'Email o password non corretti', 'messaggio');
    t.eq(email().value, 'leo@mail.it', 'email non svuotata');
  });
  test('bottoni disabilitati durante la richiesta', async () => {
    render(h(SignInForm)); type(email(), 'leo@mail.it'); type(pw(), 'giusta1');
    submit();
    t.ok(screen.getByText('Sign In').disabled && screen.getByText('Sign In With Google').disabled, 'entrambi disabled subito dopo il submit');
    await wait();
    t.ok(!screen.getByText('Sign In').disabled, 'riabilitati alla fine');
  });
  test('popup chiuso → nessun messaggio, bottoni riabilitati', async () => {
    render(h(SignInForm)); __lab.nextPopup({ type: 'close' });
    google(); await wait();
    t.eq(alertText(), null, 'messaggio');
    t.ok(!screen.getByText('Sign In With Google').disabled, 'bottone riabilitato');
  }, 'Se resetti isSubmitting solo nel try, dopo un errore i bottoni restano bloccati per sempre: finally.');
  test('nuovo tentativo cancella il vecchio messaggio', async () => {
    render(h(SignInForm)); type(email(), 'leo@mail.it'); type(pw(), 'sbagliata');
    submit(); await wait();
    type(pw(), 'giusta1'); submit();
    t.eq(alertText(), null, 'messaggio subito dopo il nuovo submit');
    await wait();
  });
};
