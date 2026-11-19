import { getFirestore, __lab } from '../firestore-mock.mjs';
import { createUserDocumentFromAuth } from '../../m3/e5-caccia-bug.mjs';

const googleUser = { uid: 'g7Hk2', displayName: 'Leandro L.', email: 'leo@mail.it' };
const emailUser = { uid: 'e9Pq1', displayName: null, email: 'leo2@mail.it' };

export default (test, t) => {
  test('non va in crash con un utente nuovo', async () => {
    await createUserDocumentFromAuth(getFirestore(), googleUser);
  }, 'Se qui crasha, leggi il messaggio: dice ESATTAMENTE quale metodo non esiste e su cosa lo stai chiamando.');

  test('crea il documento per un utente nuovo', async () => {
    const db = getFirestore();
    await createUserDocumentFromAuth(db, googleUser);
    const raw = __lab.raw(db, 'users/g7Hk2');
    t.ok(raw, 'il documento users/g7Hk2 dovrebbe esistere dopo il primo login', raw);
    t.eq(raw.email, 'leo@mail.it', 'email salvata');
    t.ok(raw.createdAt, 'createdAt salvato', raw.createdAt);
  });

  test('non riscrive un utente esistente (idempotenza)', async () => {
    const db = getFirestore();
    __lab.seed(db, 'users/g7Hk2', { displayName: 'Nome scelto dall\'utente', email: 'leo@mail.it', createdAt: new Date('2025-05-01') });
    await createUserDocumentFromAuth(db, googleUser);
    t.eq(__lab.stats(db).writes, 0, 'scritture per un utente che esiste già');
    t.eq(__lab.raw(db, 'users/g7Hk2').displayName, 'Nome scelto dall\'utente', 'displayName non deve essere sovrascritto');
  }, 'A ogni login l\'utente perderebbe le modifiche al profilo e la data di registrazione vera.');

  test('le informazioni aggiuntive vincono su quelle di Auth', async () => {
    const db = getFirestore();
    await createUserDocumentFromAuth(db, emailUser, { displayName: 'Leo' });
    t.eq(__lab.raw(db, 'users/e9Pq1')?.displayName, 'Leo', 'displayName salvato per lo sign-up con email');
  }, 'Con email/password Auth non conosce il nome (null): il nome scritto nel form DEVE prevalere.');

  test('restituisce il DocumentReference', async () => {
    const r = await createUserDocumentFromAuth(getFirestore(), googleUser);
    t.ok(r && r.type === 'document' && r.path === 'users/g7Hk2', 'il valore restituito dovrebbe essere il riferimento users/g7Hk2', r && { type: r.type, path: r.path, hasThen: typeof r.then === 'function' });
  }, 'Chi chiama la funzione si aspetta un indirizzo riutilizzabile (per leggere o aggiornare dopo), non una vecchia fotografia.');

  test('userAuth assente → undefined, nessuna operazione', async () => {
    const db = getFirestore();
    t.eq(await createUserDocumentFromAuth(db, null), undefined, 'con userAuth null');
    t.eq(__lab.stats(db).reads + __lab.stats(db).writes, 0, 'operazioni su Firestore');
  });
};
