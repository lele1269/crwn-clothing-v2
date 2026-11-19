import { getFirestore, Timestamp, __lab } from '../firestore-mock.mjs';
import { updateUserProfile } from '../../m3/e4-aggiorna-profilo.mjs';

const CREATED = new Date('2026-01-10T10:00:00Z');
const seeded = () => {
  const db = getFirestore();
  __lab.seed(db, 'users/abc', { displayName: 'Leo', email: 'leo@mail.it', createdAt: CREATED });
  return db;
};

export default (test, t) => {
  test('aggiorna displayName', async () => {
    const db = seeded();
    await updateUserProfile(db, 'abc', { displayName: 'Leandro' });
    t.eq(__lab.raw(db, 'users/abc').displayName, 'Leandro', 'displayName nel database');
  });

  test('non tocca email e createdAt', async () => {
    const db = seeded();
    await updateUserProfile(db, 'abc', { displayName: 'Leandro' });
    const raw = __lab.raw(db, 'users/abc');
    t.eq(raw.email, 'leo@mail.it', 'email nel database');
    t.ok(raw.createdAt instanceof Timestamp && raw.createdAt.toMillis() === CREATED.getTime(), 'createdAt deve restare la data originale', raw.createdAt);
  }, 'Se qui fallisce, quasi certamente hai usato setDoc senza merge: ha SOSTITUITO il documento intero.');

  test('salva updatedAt', async () => {
    const db = seeded();
    const before = Date.now();
    await updateUserProfile(db, 'abc', { displayName: 'Leandro' });
    const u = __lab.raw(db, 'users/abc').updatedAt;
    t.ok(u instanceof Timestamp && u.toMillis() >= before - 1000, 'updatedAt deve essere la data di adesso', u);
  });

  test('toglie gli spazi a displayName', async () => {
    const db = seeded();
    await updateUserProfile(db, 'abc', { displayName: '   Leandro  ' });
    t.eq(__lab.raw(db, 'users/abc').displayName, 'Leandro', 'displayName salvato');
  });

  test('restituisce i dati aggiornati con id', async () => {
    const r = await updateUserProfile(seeded(), 'abc', { displayName: 'Leandro' });
    t.ok(r && r.id === 'abc' && r.displayName === 'Leandro' && r.email === 'leo@mail.it' && r.updatedAt instanceof Timestamp, 'valore restituito', r);
  }, 'Restituire ciò che è DAVVERO nel database (rileggendolo) evita di mostrare all\'utente dati che non sono stati salvati.');

  test('rifiuta campi non ammessi senza scrivere', async () => {
    const db = seeded();
    await t.throws(() => updateUserProfile(db, 'abc', { displayName: 'X', email: 'hacker@x.it' }), /campo non modificabile: email/, 'cambio email');
    t.eq(__lab.stats(db).writes, 0, 'scritture dopo il rifiuto');
    t.eq(__lab.raw(db, 'users/abc').displayName, 'Leo', 'displayName deve restare quello vecchio');
  }, '"Tutto o niente": se una parte della richiesta non è valida, non si applica neanche la parte valida.');

  test('rifiuta displayName vuoto o non stringa', async () => {
    const db = seeded();
    await t.throws(() => updateUserProfile(db, 'abc', { displayName: '   ' }), /displayName non valido/, 'solo spazi');
    await t.throws(() => updateUserProfile(db, 'abc', { displayName: 42 }), /displayName non valido/, 'un numero');
  });

  test('rifiuta input non validi', async () => {
    const db = seeded();
    await t.throws(() => updateUserProfile(db, '', { displayName: 'X' }), /dati non validi/, 'uid vuoto');
    await t.throws(() => updateUserProfile(db, 'abc', null), /dati non validi/, 'changes null');
    await t.throws(() => updateUserProfile(db, 'abc', 'Leandro'), /dati non validi/, 'changes stringa');
  });

  test('utente inesistente: errore e nessun documento creato', async () => {
    const db = seeded();
    await t.throws(() => updateUserProfile(db, 'fantasma', { displayName: 'Boo' }), /utente inesistente/, 'uid inesistente');
    t.eq(__lab.raw(db, 'users/fantasma'), undefined, 'il documento users/fantasma');
  }, 'setDoc con merge su un documento inesistente lo CREA: avresti un utente "fantasma" senza email né createdAt.');
};
