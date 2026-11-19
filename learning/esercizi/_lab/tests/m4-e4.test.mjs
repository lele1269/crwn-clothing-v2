import { render, screen, fireEvent, cleanup } from '../react-env.mjs';
import { createElement as h } from 'react';
const { default: SignUpForm } = await import('../../m4/e4-bug-form.jsx');
let signed, google;
const mount = () => { signed = []; google = 0; render(h(SignUpForm, { onSignUp: (f) => signed.push({ ...f }), onGoogle: () => { google++; } })); };
const type = (label, v) => fireEvent.change(screen.getByLabelText(label), { target: { value: v } });
const fill = () => { type('Display Name', 'Sara'); type('Email', 's@x.it'); type('Password', 'abc123'); type('Confirm Password', 'abc123'); };
export const afterEach = cleanup;
export default (test, t) => {
  test('scrivere aggiorna l\'input', () => { mount(); type('Email', 's@x.it'); t.eq(screen.getByLabelText('Email').value, 's@x.it', 'input.value'); },
    'Se lo state è stato modificato ma l\'input no, React non ha visto un oggetto nuovo.');
  test('il campo conferma funziona', () => { mount(); type('Confirm Password', 'abc'); t.eq(screen.getByLabelText('Confirm Password').value, 'abc', 'input.value'); });
  test('submit valido → onSignUp una volta, pagina non ricaricata, form svuotato', () => {
    mount(); fill();
    const prevented = !fireEvent.submit(screen.getByText('Sign Up').closest('form'));
    t.eq(signed, [{ displayName: 'Sara', email: 's@x.it', password: 'abc123', confirmPassword: 'abc123' }], 'onSignUp ricevuto');
    t.ok(prevented, 'event.preventDefault() deve essere chiamato (altrimenti il browser ricarica la pagina)');
    t.eq(screen.getByLabelText('Email').value, '', 'form svuotato');
  });
  test('il bottone Google non invia il form', () => {
    mount(); fill();
    fireEvent.click(screen.getByText('Google'));
    t.eq(google, 1, 'onGoogle chiamato'); t.eq(signed.length, 0, 'onSignUp NON deve essere chiamato');
  }, 'Un <button> dentro un <form> senza type è un submit.');
};
