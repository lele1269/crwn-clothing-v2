/* ==========================================================================
   M4 · E4 ★★★★ · Caccia ai bug nel form
   AIUTI APERTI: 0      ← aggiorna con onestà
   4 bug. Test PRIMA di toccare:  node learning/esercizi/verifica.mjs m4-e4
   Il componente chiama onSignUp(fields) al submit e onGoogle() dal bottone Google.
   ========================================================================== */
import { useState } from 'react';

const defaultFormFields = { displayName: '', email: '', password: '', confirmPassword: '' };

const SignUpForm = ({ onSignUp, onGoogle }) => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;

  const handleChange = (event) => {
    const { name, value } = event.target;
    formFields[name] = value;
    setFormFields(formFields);
  };

  const handleSubmit = (event) => {
    if (password !== confirmPassword) return;
    onSignUp(formFields);
    setFormFields(defaultFormFields);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input aria-label="Display Name" name="displayName" value={displayName} onChange={handleChange} />
      <input aria-label="Email" name="email" value={email} onChange={handleChange} />
      <input aria-label="Password" name="password" type="password" value={password} onChange={handleChange} />
      <input aria-label="Confirm Password" name="confirm" type="password" value={confirmPassword} onChange={handleChange} />
      <button type="submit">Sign Up</button>
      <button onClick={onGoogle}>Google</button>
    </form>
  );
};

export default SignUpForm;

/* SCHEDA BUG (4): riga · cosa faceva · cosa doveva fare · modello mentale sbagliato · come l'ho scoperto
   BUG 1:
   BUG 2:
   BUG 3:
   BUG 4:
*/
