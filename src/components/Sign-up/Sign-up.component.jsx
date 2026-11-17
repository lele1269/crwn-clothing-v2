import { useState } from 'react'
import FormInput from './../../components/form/form.component';
import {
  createAuthUserWithEmailandPassword,
  createUserDocumentationFromAuth,
} from "../../utils/firebase/firebase.utils";
import Button from './../button/button.component'
import './sign-up.style.scss'
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

const resetFormFields = () => {
  setFormValues(formFields);
}

const onSubmitHandler = async (e) => {
  e.preventDefault();
  console.log(e);
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
    resetFormFields(); // Resetta i campi del form
  } catch (err) {
    if (err.code === "auth/email-already-in-use"){
      alert("Email already in use");
      return;
    }else{
      console.log("Errore nella registrazione", err.code);
    }
  }
};
    return (
        <div className="sign-up-container">
          <h2>Don't have an account?</h2>
          <span>Sign Up with your Email and Password</span>
          <form onSubmit={onSubmitHandler}>
            <FormInput
              label="Display Name"
              onChange={onChangeHandler}
              name="displayName"
              type="text"
              value={displayName}
              required
            />
            <FormInput
              label="Email:"
              onChange={onChangeHandler}
              name="email"
              type="email"
              value={email}
              required
            />
            <FormInput
              label="Password:"
              onChange={onChangeHandler}
              name="password"
              type="password"
              value={password}
              required
            />
            <FormInput
              label="Confirm Password:"
              onChange={onChangeHandler}
              name="confirmPassword"
              type="password"
              value={confirmPassword}
              required
            />
            <Button buttonType={"base"} type="submit">
              Sign Up
            </Button>
          </form>
    </div>
    );
}
export default SignUp;