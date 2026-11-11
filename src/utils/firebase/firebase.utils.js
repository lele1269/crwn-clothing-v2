import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect, createUserWithEmailAndPassword  } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAJLac1CzyL-xz294inaYJTh9qrqg9Yaas",
  authDomain: "crwn-clothing-db-ad3ed.firebaseapp.com",
  projectId: "crwn-clothing-db-ad3ed",
  storageBucket: "crwn-clothing-db-ad3ed.firebasestorage.app",
  messagingSenderId: "506280368666",
  appId: "1:506280368666:web:e26d255fff9b83a11ecfa3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth(app); // con una sola app, getAuth() userebbe comunque quella predefinita
export const signInWithGooglePopUp = () => signInWithPopup(auth, googleProvider);
export const singInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
export const createAuthUserWithEmailandPassword = async (email, password) => {
  if(!email||!password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
}


export const db = getFirestore();
//Astrazione che possiamo riutilizzare nei componenti
export const createUserDocumentationFromAuth = async (
  userAuth,
  additionalInfo = {},
) => {
  //definizione della referenza di un documento nella collezione "users"
  const userDocRef = doc(db, "users", userAuth.uid); //abbiamo la variabile che contiene il puntatore

  //otteniamo i dati del documento dell'user (appunto lo snapShot) presenti in firestore: può restituire null se non esiste e quindi lo crea.;
  const userSnapshot = await getDoc(userDocRef);
  //se non esiste lo crea. Quindi questo blocco viene eseguito solo se user.uid non esiste.
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      //si utilizza setDoc per impostare i dati del documento a cui passiamo i puntatore ottenuto con la variabile userDocRef
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInfo
      });
      console.log("User created in Firestore");
    } catch (err) {
      console.log("Error creating new user", err.message);
    }
  }
  // Restituisce il riferimento al documento dell'utente (nuovo o già esistente).
  return userDocRef;
};



