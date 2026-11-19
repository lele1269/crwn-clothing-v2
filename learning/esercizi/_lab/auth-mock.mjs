/* ==========================================================================
   Simulatore di Firebase Auth (stessa API di 'firebase/auth', in memoria).
   Riproduce: creazione account, login, logout, onAuthStateChanged,
   codici di errore reali (con la "email enumeration protection" attiva,
   come nei progetti Firebase recenti: login fallito → auth/invalid-credential).
   ========================================================================== */
const tick = () => new Promise((r) => setTimeout(r, 3));

class FirebaseError extends Error {
  constructor(code) { super(`Firebase: Error (${code}).`); this.code = code; this.name = 'FirebaseError'; }
}

let uidSeq = 0;
const newUid = () => 'u' + (++uidSeq).toString(36) + Math.random().toString(36).slice(2, 6);

export function getAuth() {
  return { type: 'auth', currentUser: null, __accounts: new Map(), __listeners: new Set(), __popup: null };
}

function makeUser(acc) {
  return { uid: acc.uid, email: acc.email, displayName: acc.displayName ?? null, providerData: [{ providerId: acc.providerId }] };
}
function setUser(auth, user) {
  auth.currentUser = user;
  for (const cb of [...auth.__listeners]) cb(user);
}
const validEmail = (e) => typeof e === 'string' && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(e);

export async function createUserWithEmailAndPassword(auth, email, password) {
  await tick();
  if (!validEmail(email)) throw new FirebaseError('auth/invalid-email');
  if (typeof password !== 'string' || password.length < 6) throw new FirebaseError('auth/weak-password');
  if ([...auth.__accounts.values()].some((a) => a.email === email)) throw new FirebaseError('auth/email-already-in-use');
  const acc = { uid: newUid(), email, password, displayName: null, providerId: 'password' };
  auth.__accounts.set(acc.uid, acc);
  const user = makeUser(acc);
  setUser(auth, user);
  return { user, providerId: null, operationType: 'signIn' };
}

export async function signInWithEmailAndPassword(auth, email, password) {
  await tick();
  if (!validEmail(email)) throw new FirebaseError('auth/invalid-email');
  const acc = [...auth.__accounts.values()].find((a) => a.email === email && a.providerId === 'password');
  if (!acc || acc.password !== password) throw new FirebaseError('auth/invalid-credential');
  const user = makeUser(acc);
  setUser(auth, user);
  return { user, providerId: null, operationType: 'signIn' };
}

export class GoogleAuthProvider {
  constructor() { this.providerId = 'google.com'; this.params = {}; }
  setCustomParameters(p) { this.params = { ...p }; return this; }
}

/* Il "popup": il test decide cosa farà l'utente con __lab.nextPopup(...) */
export async function signInWithPopup(auth, provider) {
  await tick();
  const action = auth.__popup || { type: 'close' };
  auth.__popup = null;
  if (action.type === 'close') throw new FirebaseError('auth/popup-closed-by-user');
  let acc = [...auth.__accounts.values()].find((a) => a.email === action.email && a.providerId === 'google.com');
  if (!acc) { acc = { uid: newUid(), email: action.email, displayName: action.displayName, providerId: 'google.com' }; auth.__accounts.set(acc.uid, acc); }
  const user = makeUser(acc);
  setUser(auth, user);
  return { user, providerId: 'google.com', operationType: 'signIn' };
}

export async function signOut(auth) {
  await tick();
  setUser(auth, null);
}

export function onAuthStateChanged(auth, nextOrObserver) {
  const cb = typeof nextOrObserver === 'function' ? nextOrObserver : nextOrObserver.next.bind(nextOrObserver);
  auth.__listeners.add(cb);
  // come il vero SDK: il callback parte anche subito (in modo asincrono) con lo stato attuale
  const fire = setTimeout(() => { if (auth.__listeners.has(cb)) cb(auth.currentUser); }, 0);
  return () => { clearTimeout(fire); auth.__listeners.delete(cb); };
}

/* ---- strumenti per i test ---- */
export const __lab = {
  nextPopup(auth, action) { auth.__popup = action; },          // {type:'choose', email, displayName} | {type:'close'}
  listeners(auth) { return auth.__listeners.size; },
  emit(auth, user) { setUser(auth, user); },                   // simula un cambio di stato (es. sessione ripristinata)
  seedAccount(auth, { email, password, displayName = null, providerId = 'password' }) {
    const acc = { uid: newUid(), email, password, displayName, providerId };
    auth.__accounts.set(acc.uid, acc);
    return acc.uid;
  },
};
