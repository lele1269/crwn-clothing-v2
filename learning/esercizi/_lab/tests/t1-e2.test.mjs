import { getFirestore, Timestamp, __lab } from '../firestore-mock.mjs';
import { recordLogin, deleteUserDocument, setUserPreferences } from '../../t1/e2-astrazione.mjs';

const seeded = () => {
  const db = getFirestore();
  __lab.seed(db, 'users/u1', { displayName: 'Leo', email: 'leo@mail.it', createdAt: new Date('2026-01-01') });
  return db;
};

export default (test, t) => {
  test('recordLogin: primo login → loginCount 1', async () => {
    const db = seeded();
    await recordLogin(db, 'u1');
    t.eq(__lab.raw(db, 'users/u1').loginCount, 1, 'loginCount');
  }, 'Nella reference di increment: se il campo non esiste, viene impostato al valore dato. Non serve inizializzarlo.');

  test('recordLogin: incrementa e salva lastLoginAt', async () => {
    const db = seeded();
    await recordLogin(db, 'u1'); await recordLogin(db, 'u1'); await recordLogin(db, 'u1');
    const raw = __lab.raw(db, 'users/u1');
    t.eq(raw.loginCount, 3, 'loginCount dopo 3 login');
    t.ok(raw.lastLoginAt instanceof Timestamp, 'lastLoginAt deve essere una data', raw.lastLoginAt);
  });

  test('recordLogin: non tocca gli altri campi', async () => {
    const db = seeded();
    await recordLogin(db, 'u1');
    const raw = __lab.raw(db, 'users/u1');
    t.ok(raw.email === 'leo@mail.it' && raw.displayName === 'Leo' && raw.createdAt, 'email/displayName/createdAt', raw);
  });

  test('recordLogin: utente inesistente → fallisce senza creare', async () => {
    const db = seeded();
    await t.throws(() => recordLogin(db, 'ghost'), null, 'recordLogin su utente inesistente');
    t.eq(__lab.raw(db, 'users/ghost'), undefined, 'il documento users/ghost');
  }, '"The update will fail if applied to a document that does not exist." Con updateDoc il requisito è gratis; con setDoc+merge avresti creato un utente fantasma.');

  test('recordLogin: uid mancante', async () => {
    const db = seeded();
    await t.throws(() => recordLogin(db, ''), /uid mancante/, 'uid vuoto');
    await t.throws(() => recordLogin(db, undefined), /uid mancante/, 'uid undefined');
    t.eq(__lab.stats(db).writes, 0, 'scritture');
  });

  test('deleteUserDocument: cancella', async () => {
    const db = seeded();
    await deleteUserDocument(db, 'u1');
    t.eq(__lab.raw(db, 'users/u1'), undefined, 'users/u1 dopo la cancellazione');
  });

  test('deleteUserDocument: documento inesistente non è un errore', async () => {
    await deleteUserDocument(seeded(), 'ghost');
  });

  test('deleteUserDocument: uid mancante', async () => {
    const db = seeded();
    await t.throws(() => deleteUserDocument(db, ''), /uid mancante/, 'uid vuoto');
    t.eq(__lab.raw(db, 'users/u1') !== undefined, true, 'users/u1 deve esistere ancora');
  }, 'Senza questo controllo, doc(db, "users", "") lancerebbe un errore poco chiaro. Una guardia esplicita dà un messaggio che si capisce.');

  test('setUserPreferences: salva senza toccare il resto', async () => {
    const db = seeded();
    await setUserPreferences(db, 'u1', { theme: 'dark' });
    const raw = __lab.raw(db, 'users/u1');
    t.eq(raw.preferences, { theme: 'dark' }, 'preferences');
    t.eq(raw.email, 'leo@mail.it', 'email');
  });

  test('setUserPreferences: le preferenze si sommano', async () => {
    const db = seeded();
    await setUserPreferences(db, 'u1', { theme: 'dark' });
    await setUserPreferences(db, 'u1', { lang: 'it' });
    t.eq(__lab.raw(db, 'users/u1').preferences, { theme: 'dark', lang: 'it' }, 'preferences dopo due chiamate');
  }, 'Se qui perdi theme, hai sovrascritto la mappa intera. Rileggi cosa fa merge sui campi annidati.');

  test('setUserPreferences: input non valido', async () => {
    const db = seeded();
    await t.throws(() => setUserPreferences(db, 'u1', null), /preferenze non valide/, 'null');
    await t.throws(() => setUserPreferences(db, 'u1', ['dark']), /preferenze non valide/, 'array');
    await t.throws(() => setUserPreferences(db, 'u1', 'dark'), /preferenze non valide/, 'stringa');
  });
};
