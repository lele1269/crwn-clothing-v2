/* ==========================================================================
   Simulatore di Firestore in memoria.
   Ha la STESSA API di 'firebase/firestore' (doc, getDoc, setDoc, updateDoc…)
   così il codice che scrivi negli esercizi è identico a quello del progetto.
   Differenza: i dati vivono in RAM e spariscono a fine esecuzione.
   Come il vero Firestore, ogni operazione di rete è ASINCRONA (Promise).
   ========================================================================== */

const tick = () => new Promise((r) => setTimeout(r, 3));

export class Timestamp {
  constructor(seconds, nanoseconds = 0) { this.seconds = seconds; this.nanoseconds = nanoseconds; }
  static fromDate(d) { const ms = d.getTime(); return new Timestamp(Math.floor(ms / 1000), (ms % 1000) * 1e6); }
  static now() { return Timestamp.fromDate(new Date()); }
  toDate() { return new Date(this.seconds * 1000 + this.nanoseconds / 1e6); }
  toMillis() { return this.seconds * 1000 + this.nanoseconds / 1e6; }
}

class Increment { constructor(n) { this.n = n; } }
export const increment = (n) => new Increment(n);

class FirebaseError extends Error {
  constructor(code, message) { super(message); this.code = code; this.name = 'FirebaseError'; }
}

export function getFirestore() {
  return { type: 'firestore', __docs: new Map(), __stats: { reads: 0, writes: 0 } };
}

function normalize(segments, what) {
  const parts = segments.flatMap((s) => {
    if (typeof s !== 'string') throw new FirebaseError('invalid-argument', `${what}: ogni segmento del percorso deve essere una stringa, ricevuto ${s === undefined ? 'undefined' : typeof s}.`);
    return s.split('/');
  });
  if (parts.some((p) => p === '')) throw new FirebaseError('invalid-argument', `${what}: il percorso "${parts.join('/')}" contiene un segmento vuoto.`);
  return parts;
}

class DocumentReference {
  constructor(firestore, parts) { this.type = 'document'; this.firestore = firestore; this.__parts = parts; }
  get id() { return this.__parts[this.__parts.length - 1]; }
  get path() { return this.__parts.join('/'); }
  get parent() { return new CollectionReference(this.firestore, this.__parts.slice(0, -1)); }
}
class CollectionReference {
  constructor(firestore, parts) { this.type = 'collection'; this.firestore = firestore; this.__parts = parts; }
  get id() { return this.__parts[this.__parts.length - 1]; }
  get path() { return this.__parts.join('/'); }
}

function assertDb(db, fn) {
  if (!db || db.type !== 'firestore') throw new FirebaseError('invalid-argument', `${fn}(): il primo argomento deve essere l'istanza Firestore (db).`);
}

export function doc(db, ...segments) {
  assertDb(db, 'doc');
  const parts = normalize(segments, 'doc()');
  if (parts.length % 2 !== 0) {
    throw new FirebaseError('invalid-argument', `Invalid document reference. Document references must have an even number of segments, but ${parts.join('/')} has ${parts.length}.`);
  }
  return new DocumentReference(db, parts);
}

export function collection(db, ...segments) {
  assertDb(db, 'collection');
  const parts = normalize(segments, 'collection()');
  if (parts.length % 2 !== 1) {
    throw new FirebaseError('invalid-argument', `Invalid collection reference. Collection references must have an odd number of segments, but ${parts.join('/')} has ${parts.length}.`);
  }
  return new CollectionReference(db, parts);
}

function assertDocRef(ref, fn) {
  if (ref && typeof ref.then === 'function') throw new FirebaseError('invalid-argument', `${fn}(): hai passato una Promise invece di un DocumentReference. Ti manca un await?`);
  if (!(ref instanceof DocumentReference)) throw new FirebaseError('invalid-argument', `${fn}(): il primo argomento deve essere un DocumentReference creato con doc().`);
}

/* Converte i valori come farebbe Firestore: Date → Timestamp, undefined → errore. */
function encode(value, field) {
  if (value === undefined) throw new FirebaseError('invalid-argument', `Function setDoc() called with invalid data. Unsupported field value: undefined (found in field ${field}).`);
  if (value instanceof Date) return Timestamp.fromDate(value);
  if (value instanceof Timestamp || value instanceof Increment) return value;
  if (Array.isArray(value)) return value.map((v, i) => encode(v, `${field}.${i}`));
  if (value && typeof value === 'object') {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = encode(v, field ? `${field}.${k}` : k);
    return out;
  }
  return value;
}
function clone(value) {
  if (value instanceof Timestamp) return new Timestamp(value.seconds, value.nanoseconds);
  if (Array.isArray(value)) return value.map(clone);
  if (value && typeof value === 'object') { const o = {}; for (const [k, v] of Object.entries(value)) o[k] = clone(v); return o; }
  return value;
}
function applyIncrements(target, data) {
  for (const [k, v] of Object.entries(data)) {
    if (v instanceof Increment) target[k] = (typeof target[k] === 'number' ? target[k] : 0) + v.n;
    else if (v && typeof v === 'object' && !(v instanceof Timestamp) && !Array.isArray(v) && target[k] && typeof target[k] === 'object' && !Array.isArray(target[k])) applyIncrements(target[k], v);
    else target[k] = clone(v);
  }
  return target;
}

class DocumentSnapshot {
  constructor(ref, data) { this.ref = ref; this.id = ref.id; this.__data = data; this.metadata = { fromCache: false }; }
  exists() { return this.__data !== undefined; }
  data() { return this.__data === undefined ? undefined : clone(this.__data); }
  get(field) { return this.__data === undefined ? undefined : clone(field.split('.').reduce((o, k) => (o == null ? undefined : o[k]), this.__data)); }
}

export async function getDoc(ref) {
  assertDocRef(ref, 'getDoc');
  await tick();
  const extra = ref.firestore.__delays && ref.firestore.__delays.get(ref.path);
  if (extra) await new Promise((r) => setTimeout(r, extra));
  ref.firestore.__stats.reads++;
  return new DocumentSnapshot(ref, ref.firestore.__docs.get(ref.path));
}

export async function setDoc(ref, data, options = {}) {
  assertDocRef(ref, 'setDoc');
  if (!data || typeof data !== 'object' || Array.isArray(data)) throw new FirebaseError('invalid-argument', 'setDoc(): i dati devono essere un oggetto.');
  const enc = encode(data, '');
  await tick();
  const store = ref.firestore.__docs;
  const base = options.merge && store.has(ref.path) ? clone(store.get(ref.path)) : {};
  store.set(ref.path, applyIncrements(base, enc));
  ref.firestore.__stats.writes++;
}

export async function updateDoc(ref, data) {
  assertDocRef(ref, 'updateDoc');
  const enc = encode(data, '');
  await tick();
  const store = ref.firestore.__docs;
  if (!store.has(ref.path)) throw new FirebaseError('not-found', `No document to update: ${ref.path}`);
  const cur = clone(store.get(ref.path));
  for (const [k, v] of Object.entries(enc)) {
    // supporta i percorsi "a.b.c" come il vero updateDoc
    const keys = k.split('.');
    let o = cur;
    for (const kk of keys.slice(0, -1)) { if (!o[kk] || typeof o[kk] !== 'object') o[kk] = {}; o = o[kk]; }
    applyIncrements(o, { [keys[keys.length - 1]]: v });
  }
  store.set(ref.path, cur);
  ref.firestore.__stats.writes++;
}

export async function deleteDoc(ref) {
  assertDocRef(ref, 'deleteDoc');
  await tick();
  ref.firestore.__docs.delete(ref.path);
  ref.firestore.__stats.writes++;
}

export async function getDocs(colRef) {
  if (!(colRef instanceof CollectionReference)) throw new FirebaseError('invalid-argument', 'getDocs(): serve un CollectionReference creato con collection().');
  await tick();
  const prefix = colRef.path + '/';
  const docs = [];
  for (const [path, data] of colRef.firestore.__docs) {
    if (path.startsWith(prefix) && !path.slice(prefix.length).includes('/')) {
      colRef.firestore.__stats.reads++;
      docs.push(new DocumentSnapshot(new DocumentReference(colRef.firestore, path.split('/')), data));
    }
  }
  return { docs, size: docs.length, empty: docs.length === 0, forEach: (fn) => docs.forEach(fn) };
}

/* ---- strumenti per i test (non esistono nel vero Firestore) ---- */
export const __lab = {
  seed(db, path, data) { db.__docs.set(path, encode(data, '')); },
  raw(db, path) { const d = db.__docs.get(path); return d === undefined ? undefined : clone(d); },
  paths(db) { return [...db.__docs.keys()]; },
  stats(db) { return { ...db.__stats }; },
  delay(db, path, ms) { (db.__delays = db.__delays || new Map()).set(path, ms); },  // rallenta la lettura di un documento
};
