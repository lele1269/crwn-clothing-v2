import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth, signInWithPopup, signInWithRedirect } from "firebase/auth";
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

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);


export const db = getFirestore();
//Astrazione che possiamo riutilizzare nei componenti
export const createUserDocumentationFromAuth = async (userAuth) => {
 //definizione della referenza di un documento nella collezione "users"
 const userDocRef = doc(db, "users", userAuth.uid); //abbiamo la variabile che contiene il puntatore

 //ci salviamo l'oggetto dei dati user di questo momento in una variabile userSnapShot
 const userSnapshot = await getDoc(userDocRef); //otteniamo i dati del documento di questo cliente.
 //adesso dobbiamo verificare che esista e nel caso aggiornare o inserire
 if(!userSnapshot.exists()){
  const { displayName, email} = userAuth;
  const createdAt = new Date();
  try{
    //si utilizza setDoc per impostare i dati del documento a cui passiamo i puntatore ottenuto con la variabile userDocRef
    await setDoc(userDocRef, {
      displayName,
      email,
      createdAt
    })
  console.log("User created in Firestore");
  }catch(err){
    console.log('Error creating new user', err.message)
  }
 }
 return userDocRef; //restituisce i dati del documento senza creare l'utente.
}



