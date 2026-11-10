import { useEffect } from "react";
import { getRedirectResult } from "firebase/auth";
// getRedirectResult completa il login iniziato con signInWithRedirect:
// recupera le credenziali restituite da Google e autentica l'utente.
// Riceve auth per sapere su quale istanza (progetto Firebase) completare il login.
// Restituisce un UserCredential ({ user, ... }) oppure null se non c'è stato un redirect.

import {
  signInWithGooglePopUp,
  singInWithGoogleRedirect,
  createUserDocumentationFromAuth,
  auth,
} from "../../utils/firebase/firebase.utils";

import SignUp from '../../components/Sign-up/Sign-up.component'

const SingIn = () => {
  useEffect(() => {
    const handler = async () => {
      try {
        const response = await getRedirectResult(auth); //attende la response dal redirect
        console.log(response);
        if (response) {
          const userDocRef = await createUserDocumentationFromAuth(response.user);
        }
      } catch (err) {
        console.log(err);
      }
    };
    handler();
  }, []);

  const userAuth = async () => {
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentationFromAuth(user);
  };
  return (
    <div>
      <h1>This is the SingIn Page</h1>
      <button onClick={userAuth}>Sign In with Google PopUp</button>
      <button onClick={singInWithGoogleRedirect}>
        Sign In with Google Redirect
      </button>
      <SignUp />
    </div>
  );
};

export default SingIn;
