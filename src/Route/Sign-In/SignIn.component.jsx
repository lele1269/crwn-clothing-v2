import {
  signInWithGooglePopUp,
  createUserDocumentationFromAuth,
} from "../../utils/firebase/firebase.utils";

const SingIn = () =>{

const userAuth = async () =>{
    const { user } = await signInWithGooglePopUp();
    const userDocRef = await createUserDocumentationFromAuth(user);
}
    return(
        <div>
            <h1>This is the SingIn Page</h1>
            <button onClick={userAuth}>Sign In with Google</button>
        </div>
    )
}

export default SingIn;