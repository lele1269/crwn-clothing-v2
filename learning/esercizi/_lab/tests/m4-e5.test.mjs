import { render, screen, fireEvent, act, cleanup } from '../react-env.mjs';
import { createElement as h } from 'react';
const { default: SmartForm } = await import('../../m4/e5-boss-smart-form.jsx');
const FIELDS = [
  { name: 'email', label: 'Email', type: 'email', required: true, validate: (v) => (/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(v) ? null : 'Email non valida') },
  { name: 'password', label: 'Password', type: 'password', required: true, validate: (v) => (v.length >= 6 ? null : 'Almeno 6 caratteri') },
  { name: 'confirm', label: 'Conferma', type: 'password', required: true, validate: (v, all) => (v === all.password ? null : 'Le password non coincidono') },
];
let calls;
const mount = (impl) => { calls = []; render(h(SmartForm, { fields: FIELDS, submitLabel: 'Sign Up', onSubmit: async (vals) => { calls.push(vals); if (impl) return impl(vals); } })); };
const type = (l, v) => fireEvent.change(screen.getByLabelText(l), { target: { value: v } });
const submit = () => fireEvent.click(screen.getByText('Sign Up'));
const errFor = (n) => { const e = document.querySelector(`[data-error-for="${n}"]`); return e ? e.textContent : null; };
const wait = (ms = 20) => act(() => new Promise((r) => setTimeout(r, ms)));
export const afterEach = cleanup;
export default (test, t) => {
  test('un input per campo, collegato alla label', () => {
    mount(); t.ok(screen.getByLabelText('Email') && screen.getByLabelText('Password') && screen.getByLabelText('Conferma'), 'input trovati');
    t.eq(screen.getByLabelText('Password').type, 'password', 'type');
  });
  test('submit vuoto → tutti obbligatori, onSubmit non chiamato', async () => {
    mount(); submit(); await wait();
    t.eq([errFor('email'), errFor('password'), errFor('confirm')], ['Campo obbligatorio', 'Campo obbligatorio', 'Campo obbligatorio'], 'errori');
    t.eq(calls.length, 0, 'chiamate a onSubmit');
  });
  test('validate personalizzati, anche tra campi', async () => {
    mount(); type('Email', 'leo@x'); type('Password', '123'); type('Conferma', '124'); submit(); await wait();
    t.eq([errFor('email'), errFor('password'), errFor('confirm')], ['Email non valida', 'Almeno 6 caratteri', 'Le password non coincidono'], 'errori');
  });
  test('correggere un campo cancella SOLO il suo errore', async () => {
    mount(); submit(); await wait();
    type('Email', 'l');
    t.eq([errFor('email'), errFor('password')], [null, 'Campo obbligatorio'], '[email, password]');
  });
  test('successo → onSubmit con i valori, campi svuotati, bottone disabilitato durante', async () => {
    mount(() => new Promise((r) => setTimeout(r, 20)));
    type('Email', 'leo@x.it'); type('Password', 'abc123'); type('Conferma', 'abc123'); submit();
    await act(() => Promise.resolve());
    t.ok(screen.getByText('Sign Up').disabled, 'bottone disabled durante l\'invio');
    await wait(40);
    t.eq(calls, [{ email: 'leo@x.it', password: 'abc123', confirm: 'abc123' }], 'valori passati');
    t.eq(screen.getByLabelText('Email').value, '', 'campi svuotati');
    t.ok(!screen.getByText('Sign Up').disabled, 'bottone riabilitato');
  });
  test('errore da onSubmit → role=alert, campi intatti', async () => {
    mount(() => { throw new Error('Email già registrata'); });
    type('Email', 'leo@x.it'); type('Password', 'abc123'); type('Conferma', 'abc123'); submit(); await wait();
    t.eq(screen.queryByRole('alert') && screen.queryByRole('alert').textContent, 'Email già registrata', 'messaggio');
    t.eq(screen.getByLabelText('Email').value, 'leo@x.it', 'campi intatti');
    t.ok(!screen.getByText('Sign Up').disabled, 'bottone riabilitato');
  });
};
