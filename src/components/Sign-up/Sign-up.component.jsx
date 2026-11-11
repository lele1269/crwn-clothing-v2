import { useState } from 'react'
import { createAuthUserWithEmailandPassword, createUserDocumentationFromAuth } from  '../../utils/firebase/firebase.utils'

const formFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
}

const SignUp = () =>{

const [formValues, setFormValues] = useState(formFields);

const { displayName, email, password, confirmPassword } = formValues;

const onChangeHandler = (e) =>{
    const { name, value } = e.target;
    setFormValues({
        ...formValues,
        [name]: value
    });
}

const onSubmitHandler = async (e) => {
  e.preventDefault();
  if (password !== confirmPassword) {
    alert("Password does not match");
    return;
  }
  try {
    // Crea l'utente in Firebase Authentication con email e password
    // e restituisce un UserCredential: ne estraiamo user, che contiene l'uid.
    const { user } = await createAuthUserWithEmailandPassword(email, password);

    // Crea il documento users/{uid} su Firestore (solo se non esiste già).
    // Passiamo displayName come info aggiuntiva perché con email/password
    // user.displayName è null.
    await createUserDocumentationFromAuth(user, { displayName });
  } catch (err) {
    console.log("Errore nella registrazione", err.code);
  }
};
    return (
      <div>
        <h1>Sign Up form</h1>
        <form onSubmit={onSubmitHandler}>
          <label>Display Name:</label>
          <input
            onChange={onChangeHandler}
            name="displayName"
            type="text"
            value={displayName}
            required
          />
          <label>Email:</label>
          <input
            onChange={onChangeHandler}
            name="email"
            type="email"
            value={email}
            required
          />
          <label>Password:</label>
          <input
            onChange={onChangeHandler}
            name="password"
            type="password"
            value={password}
            required
          />
          <label>Confirm Password:</label>
          <input
            onChange={onChangeHandler}
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            required
          />
          <button type="submit">Sign Up</button>
        </form>
      </div>
    );
}
export default SignUp;