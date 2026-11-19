/* ==========================================================================
   Finto firebase.utils.js: stesse funzioni esportate dal file del corso,
   ma costruite sui simulatori di Auth e Firestore.
   Negli esercizi React importa da qui invece che da '../../src/utils/...'.
   ========================================================================== */
import * as A from './auth-mock.mjs';
import * as F from './firestore-mock.mjs';

export let auth = A.getAuth();
export let db = F.getFirestore();
const googleProvider = new A.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

/* registro delle chiamate, per i test */
export const calls = { createUserDocumentFromAuth: [], errors: [] };

export const signInWithGooglePopup = () => A.signInWithPopup(auth, googleProvider);

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  calls.createUserDocumentFromAuth.push({ userAuth, additionalInformation });
  if (!userAuth) return;
  const userDocRef = F.doc(db, 'users', userAuth.uid);
  const userSnapshot = await F.getDoc(userDocRef);
  if (!userSnapshot.exists()) {
    const { displayName = null, email = null } = userAuth;
    try {
      await F.setDoc(userDocRef, { displayName, email, createdAt: new Date(), ...additionalInformation });
    } catch (error) {
      calls.errors.push(error); // come nel corso: l'errore viene intercettato (e "ingoiato")
    }
  }
  return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await A.createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await A.signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await A.signOut(auth);

export const onAuthStateChangedListener = (callback) => A.onAuthStateChanged(auth, callback);

/* ---- strumenti per i test ---- */
export const __lab = {
  reset() { auth = A.getAuth(); db = F.getFirestore(); calls.createUserDocumentFromAuth = []; calls.errors = []; },
  get auth() { return auth; },
  get db() { return db; },
  listeners() { return A.__lab.listeners(auth); },
  emit(user) { A.__lab.emit(auth, user); },
  nextPopup(action) { A.__lab.nextPopup(auth, action); },
  seedAccount(acc) { return A.__lab.seedAccount(auth, acc); },
  fs: F.__lab,
};
