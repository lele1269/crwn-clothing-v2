//import { useEffect } from "react";
//import { getRedirectResult } from "firebase/auth";
// getRedirectResult completa il login iniziato con signInWithRedirect:
// recupera le credenziali restituite da Google e autentica l'utente.
// Riceve auth per sapere su quale istanza (progetto Firebase) completare il login.
// Restituisce un UserCredential ({ user, ... }) oppure null se non c'è stato un redirect.
import {
  signInWithGooglePopUp,
  signInWithGoogleRedirect,
  createUserDocumentationFromAuth,
  signInAuthWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import SignUp from '../../components/Sign-up/Sign-up.component'
import Button from './../../components/button/button.component'
import FormInputs from './../../components/form/form.component'
import { useState } from 'react';
import './sign-in.style.scss'


const SignIn = () => {

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });

  const resetFormFields = () => {
    setFormValues({ email: "", password: "" });
  };

  // useEffect(() => {
  //   const handler = async () => {
  //     try {
  //       const response = await getRedirectResult(auth); //attende la response dal redirect
  //       console.log(response);
  //       if (response) {
  //         const userDocRef = await createUserDocumentationFromAuth(response.user);
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };
  //   handler();
  // }, []);

  const userAuth = async () => {
    try {
      const { user } = await signInWithGooglePopUp();
      await createUserDocumentationFromAuth(user);
    } catch (e) {
      console.log("Login con Google fallito:", e.code);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const userAuthWithEmailAndPassword = async (event) => {
    event.preventDefault();
    try {
      const { user } = await signInAuthWithEmailAndPassword(
        formValues.email,
        formValues.password,
      );
      resetFormFields();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="sign-container">
      <div className="sign-in-container">
        <h2>This is the SignIn Page</h2>
        <form className="sign-in-form" onSubmit={userAuthWithEmailAndPassword}>
          <FormInputs
            type="email"
            name="email"
            label="Email"
            value={formValues.email}
            onChange={handleChange}
            required
          />
          <FormInputs
            type="password"
            name="password"
            label="Password"
            value={formValues.password}
            onChange={handleChange}
            required
          />
          <div className="buttons-container">
            <Button buttonType={"base"} type="submit">
              Sign In
            </Button>
            <Button type="button" buttonType={"google"} onClick={userAuth}>
              Google Sign In
            </Button>
          </div>
        </form>
      </div>
      <SignUp />
    </div>
  );
};

export default SignIn;
