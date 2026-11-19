import { render, screen, fireEvent, act, cleanup, reactWarnings } from '../react-env.mjs';
import { createElement as h } from 'react';
const M = await import('../../m4/e3-use-form.jsx');
let api = null;
const Harness = ({ defaults }) => {
  api = M.useForm(defaults);
  return h('div', null,
    h(M.FormInput, { label: 'Email', name: 'email', value: api.fields.email, onChange: api.handleChange }),
    h(M.FormInput, { label: 'Password', name: 'password', type: 'password', value: api.fields.password, onChange: api.handleChange }));
};
export const afterEach = cleanup;
export default (test, t) => {
  test('fields e handleChange', () => {
    render(h(Harness, { defaults: { email: '', password: '' } }));
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'leo@x.it' } });
    t.eq(api.fields, { email: 'leo@x.it', password: '' }, 'fields');
    t.eq(screen.getByLabelText('Email').value, 'leo@x.it', 'input.value');
  }, 'Se getByLabelText non trova l\'input, la label non è collegata (htmlFor ↔ id).');
  test('aggiornamenti ravvicinati: nessuno perso', () => {
    render(h(Harness, { defaults: { email: '', password: '' } }));
    act(() => {
      api.handleChange({ target: { name: 'email', value: 'a@b.it' } });
      api.handleChange({ target: { name: 'password', value: 'segreta' } });
    });
    t.eq(api.fields, { email: 'a@b.it', password: 'segreta' }, 'fields');
  }, 'Due chiamate nello stesso batch: senza la forma funzionale, la seconda cancella la prima (M4 ❸).');
  test('setField e resetFields', () => {
    render(h(Harness, { defaults: { email: 'x@y.it', password: '' } }));
    act(() => api.setField('password', 'abc'));
    t.eq(api.fields.password, 'abc', 'dopo setField');
    act(() => api.resetFields());
    t.eq(api.fields, { email: 'x@y.it', password: '' }, 'dopo resetFields');
  });
  test('label shrink', () => {
    render(h(Harness, { defaults: { email: '', password: '' } }));
    const label = () => document.querySelector('label');
    t.eq(label().className, 'form-input-label', 'classe a campo vuoto');
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'l' } });
    t.eq(label().className, 'shrink form-input-label', 'classe con testo');
  });
  test('FormInput non crasha con value undefined/null e non diventa uncontrolled', () => {
    reactWarnings.length = 0;
    render(h('div', null, h(M.FormInput, { label: 'A', name: 'a', value: undefined, onChange: () => {} }), h(M.FormInput, { label: 'B', name: 'b', value: null, onChange: () => {} })));
    t.eq([screen.getByLabelText('A').value, screen.getByLabelText('B').value], ['', ''], 'valori');
    t.eq(reactWarnings.filter((w) => /uncontrolled|null/.test(w)).length, 0, 'warning di React');
  });
};
