import { getFirestore, Timestamp, __lab } from '../firestore-mock.mjs';
import { getUserDocument } from '../../m3/e3-leggi-utente.mjs';

const seeded = () => {
  const db = getFirestore();
  __lab.seed(db, 'users/abc123', { displayName: 'Leo', email: 'leo@mail.it', createdAt: new Date('2026-01-10T10:00:00Z') });
  return db;
};

export default (test, t) => {
  test('restituisce una Promise (la funzione è async)', () => {
    const r = getUserDocument(seeded(), 'abc123');
    t.ok(r && typeof r.then === 'function', 'getUserDocument deve restituire una Promise', r);
  });

  test('utente esistente → dati + id', async () => {
    const u = await getUserDocument(seeded(), 'abc123');
    t.ok(u && typeof u === 'object', 'mi aspettavo un oggetto', u);
    t.eq(u.id, 'abc123', 'il campo id');
    t.eq(u.displayName, 'Leo', 'il campo displayName');
    t.eq(u.email, 'leo@mail.it', 'il campo email');
  }, 'L\'id non sta in data(): sta sullo snapshot. Se lo perdi, poi non sai più a quale documento appartengono i dati.');

  test('createdAt torna come Timestamp, non come Date', async () => {
    const u = await getUserDocument(seeded(), 'abc123');
    t.ok(u && u.createdAt instanceof Timestamp, 'createdAt dovrebbe essere un Timestamp di Firestore', u && u.createdAt);
  }, 'Non devi convertirlo tu: questo test ti fa SOLO notare che ciò che salvi (Date) non è ciò che rileggi (Timestamp).');

  test('utente inesistente → null', async () => {
    const u = await getUserDocument(seeded(), 'nessuno');
    t.eq(u, null, 'per un uid inesistente');
  }, 'data() su un documento inesistente dà undefined; {id, ...undefined} darebbe {id} e sembrerebbe un utente vero senza dati. Bug subdolo.');

  test('uid vuoto → null, senza letture', async () => {
    const db = seeded();
    t.eq(await getUserDocument(db, ''), null, "uid ''");
    t.eq(await getUserDocument(db, undefined), null, 'uid undefined');
    t.eq(__lab.stats(db).reads, 0, 'numero di letture fatte su Firestore');
  }, 'Ogni lettura costa (soldi e tempo). Il controllo economico va fatto PRIMA della chiamata costosa.');

  test('non modifica il database', async () => {
    const db = seeded();
    await getUserDocument(db, 'abc123');
    t.eq(__lab.stats(db).writes, 0, 'numero di scritture');
  }, 'Una funzione che si chiama "get" non deve mai scrivere.');
};
