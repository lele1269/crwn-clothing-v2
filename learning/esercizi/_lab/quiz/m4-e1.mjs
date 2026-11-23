/* Quiz M4-E1 · Prevedi il form. File del professore: lo studente non lo modifica.
   I blocchi "output" montano componenti React 17 veri (jsdom + Testing Library).
   h(...) è React.createElement: è quello che il JSX diventa dopo la compilazione. */
/* eslint-disable no-console */
import { React, render, screen, fireEvent, cleanup } from '../react-env.mjs';

const h = React.createElement;
const { useState } = React;

const FormInputDelCorso = `const FormInput = ({ label, ...otherProps }) => {
  return (
    <div className='group'>
      <input className='form-input' {...otherProps} />
      {label && (
        <label className={\`\${otherProps.value.length ? 'shrink' : ''} form-input-label\`}>
          {label}
        </label>
      )}
    </div>
  );
};`;

export const tentativo = 1;
export const titolo = 'Prevedi il form';

export const blocchi = [
  {
    id: 'D1',
    tipo: 'ordina',
    titolo: 'un tasto, passo per passo',
    domanda: 'Nel SignUpForm il campo email contiene "le". L\'utente preme "o". Metti in ordine quello che succede.',
    voci: [
      'React esegue di nuovo SignUpForm, e questa volta formFields.email vale "leo"',
      'il browser genera l\'evento e React chiama onChange, cioè handleChange(event)',
      '`setFormFields({ ...formFields, [name]: value })` prenota il nuovo state',
      'da `event.target` si leggono name ("email") e value ("leo")',
      'FormInput riceve value="leo" e l\'etichetta resta in alto (classe shrink)',
    ],
    giusto: [2, 4, 3, 1, 5],
    spiegazione: 'handleChange legge l\'evento, poi chiama il setter. Il setter non cambia formFields subito: prenota un nuovo render.\nNel nuovo render SignUpForm riparte da capo con il nuovo state e passa i nuovi value ai FormInput figli.',
  },
  {
    id: 'D2',
    titolo: 'quanti render?',
    domanda: 'Un form ridotto come il tuo: un genitore con lo state e due campi figli. Ogni componente stampa quando viene eseguito. h(Campo, props) equivale a <Campo {...props} />.',
    codice: () => {
      cleanup();
      const Campo = ({ label, ...otherProps }) => {
        console.log('render Campo', otherProps.name);
        return h('input', otherProps);
      };
      const Form = () => {
        const [fields, setFields] = useState({ email: 'le', password: '' });
        console.log('render Form', fields.email);
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFields({ ...fields, [name]: value });
        };
        return h('form', null,
          h(Campo, { label: 'Email', name: 'email', value: fields.email, onChange: handleChange }),
          h(Campo, { label: 'Password', name: 'password', value: fields.password, onChange: handleChange }));
      };
      render(h(Form));
      console.log('--- premo o ---');
      fireEvent.change(screen.getByDisplayValue('le'), { target: { value: 'leo' } });
    },
  },
  {
    id: 'D3',
    titolo: 'il name sbagliato',
    domanda: 'Nell\'input hai scritto name="name", ma nello state la chiave si chiama displayName. L\'utente scrive "Sara". (Una stringa vuota si scrive \'\' oppure non si scrive affatto.)',
    codice: () => {
      cleanup();
      const Form = () => {
        const [fields, setFields] = useState({ displayName: '', email: '' });
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFields({ ...fields, [name]: value });
        };
        console.log(fields);
        return h('input', { name: 'name', value: fields.displayName, onChange: handleChange, 'data-testid': 'nome' });
      };
      render(h(Form));
      fireEvent.change(screen.getByTestId('nome'), { target: { value: 'Sara' } });
      console.log('nel campo si vede:', screen.getByTestId('nome').value);
    },
  },
  {
    id: 'D4',
    tipo: 'scelta',
    titolo: 'il bottone senza type',
    domanda: 'Nel SignInForm togli type="button" dal bottone "Google sign in" (che ha onClick={signInWithGoogle}). Email e password sono vuote e hanno required. L\'utente clicca "Google sign in". Cosa succede?',
    opzioni: {
      a: 'si apre solo il popup di Google, come prima',
      b: 'non si apre il popup: il browser mostra solo "Compila questo campo"',
      c: 'parte onClick e si apre il popup; poi il bottone, che ora è un submit, prova a inviare il form, ma required lo blocca e il browser mostra "Compila questo campo"',
      d: 'parte handleSubmit con email e password vuote e Firebase risponde con un errore',
    },
    giusta: 'c',
    spiegazione: 'Un <button> dentro un <form> senza type è type="submit". Al click prima girano gli handler onClick (quindi il popup),\npoi il browser prova a inviare il form. La validazione di required lo ferma prima dell\'evento submit, quindi handleSubmit non parte.',
  },
  {
    id: 'D5',
    titolo: 'lo state è una fotografia',
    domanda: 'Un console.log subito dopo il setter. L\'utente scrive la prima lettera, "l". (Una stringa vuota si scrive \'\' oppure non si scrive affatto.)',
    codice: () => {
      cleanup();
      const Form = () => {
        const [fields, setFields] = useState({ email: '' });
        const handleChange = (e) => {
          const { name, value } = e.target;
          setFields({ ...fields, [name]: value });
          console.log('dentro handleChange:', fields.email);
        };
        console.log('render:', fields.email);
        return h('input', { name: 'email', value: fields.email, onChange: handleChange, 'data-testid': 'email' });
      };
      render(h(Form));
      fireEvent.change(screen.getByTestId('email'), { target: { value: 'l' } });
    },
  },
  {
    id: 'D6',
    tipo: 'aperta',
    titolo: 'da dev: far crashare FormInput',
    contesto: FormInputDelCorso,
    domanda: 'Il tuo FormInput legge otherProps.value.length. Elenca tre modi diversi in cui un collega potrebbe farlo crashare usandolo, e proponi una correzione di una riga.',
    puntiChiave: [
      'Non passare value (input non controllato): otherProps.value è undefined → "Cannot read properties of undefined (reading \'length\')".',
      'Passare value={null}, per esempio da un dato non ancora caricato: stesso crash su null.',
      'Sbagliare il nome della chiave nello state (value={formFields.emial}): value è undefined → crash.',
      '(Un numero non fa crashare: (5).length è undefined, ma l\'etichetta non si alza mai: bug silenzioso.)',
      'Correzione di una riga: otherProps.value?.length (optional chaining), oppure String(otherProps.value ?? \'\').length per gestire anche i numeri.',
    ],
  },
];
