import { validateFirebaseConfig as v } from '../../m1/e2-config.mjs';
const GOOD = { apiKey: 'AIzaSyAJLac1Cz', authDomain: 'crwn-clothing-db-ad3ed.firebaseapp.com', projectId: 'crwn-clothing-db-ad3ed', storageBucket: 'crwn-clothing-db-ad3ed.firebasestorage.app', messagingSenderId: '506280368666', appId: '1:506280368666:web:e26d' };
export default (test, t) => {
  test('config corretta', () => { t.eq(v(GOOD), { errors: [], warnings: [] }, 'la tua config'); });
  test('non oggetto', () => {
    t.eq(v(null), { errors: ['config non valida'], warnings: [] }, 'null');
    t.eq(v([]), { errors: ['config non valida'], warnings: [] }, 'array');
    t.eq(v('x'), { errors: ['config non valida'], warnings: [] }, 'stringa');
  }, 'typeof null === "object": il caso null va gestito a parte (è un classico).');
  test('chiavi mancanti, nell\'ordine', () => {
    t.eq(v({ authDomain: 'p-123456.firebaseapp.com', apiKey: '' }).errors, ['manca apiKey', 'manca projectId', 'manca appId'], 'errori');
  });
  test('apiKey e projectId non validi', () => {
    t.eq(v({ ...GOOD, apiKey: 'xyz' }).errors, ['apiKey non valida'], 'apiKey');
    t.eq(v({ ...GOOD, projectId: 'Crwn_DB', authDomain: 'Crwn_DB.firebaseapp.com' }).errors, ['projectId non valido'], 'maiuscole e underscore');
    t.eq(v({ ...GOOD, projectId: '1abcdef', authDomain: '1abcdef.web.app' }).errors, ['projectId non valido'], 'inizia con una cifra');
    t.eq(v({ ...GOOD, projectId: 'abc', authDomain: 'abc.web.app' }).errors, ['projectId non valido'], 'troppo corto');
  });
  test('warnings', () => {
    t.eq(v({ ...GOOD, databaseURL: 'x', foo: 1 }).warnings, ['chiave sconosciuta: databaseURL', 'chiave sconosciuta: foo'], 'chiavi sconosciute');
    t.eq(v({ ...GOOD, authDomain: 'login.miosito.it' }).warnings, ['authDomain e projectId non coincidono'], 'dominio personalizzato');
    t.eq(v({ ...GOOD, measurementId: 'G-XXXX' }).warnings, [], 'measurementId è ammessa');
  });
};
