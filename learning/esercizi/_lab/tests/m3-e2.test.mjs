import { buildPath, isDocumentPath, isCollectionPath, parentCollection, userOrderPath } from '../../m3/e2-percorsi.mjs';

export default (test, t) => {
  test('buildPath unisce i segmenti', () => {
    t.eq(buildPath('users', 'abc'), 'users/abc', "buildPath('users','abc')");
    t.eq(buildPath('users', 'abc', 'orders'), 'users/abc/orders', "buildPath con 3 segmenti");
  }, 'È il modo in cui doc(db, "users", uid) costruisce l\'indirizzo internamente.');

  test('buildPath rifiuta segmenti vuoti', async () => {
    await t.throws(() => buildPath('users', ''), null, "buildPath('users','')");
  }, 'Un uid vuoto produrrebbe "users/" → un indirizzo che non punta a niente. Meglio fermarsi subito.');

  test('buildPath rifiuta segmenti non stringa', async () => {
    await t.throws(() => buildPath('users', undefined), null, "buildPath('users', undefined)");
    await t.throws(() => buildPath('users', 42), null, "buildPath('users', 42)");
  }, 'Se userAuth è sbagliato, userAuth.uid è undefined: deve esplodere qui, non scrivere "users/undefined" nel database.');

  test('buildPath rifiuta segmenti con "/" dentro', async () => {
    await t.throws(() => buildPath('users', 'a/b'), null, "buildPath('users','a/b')");
  }, 'Uno "/" dentro un segmento sposta silenziosamente il livello: ti ritroveresti in una collection invece che in un documento.');

  test('isDocumentPath: pari = documento', () => {
    t.eq(isDocumentPath('users/abc'), true, "'users/abc'");
    t.eq(isDocumentPath('users/abc/orders/o1'), true, "'users/abc/orders/o1'");
    t.eq(isDocumentPath('users'), false, "'users'");
    t.eq(isDocumentPath('users/abc/orders'), false, "'users/abc/orders'");
  });

  test('isDocumentPath: percorsi malformati sono false', () => {
    t.eq(isDocumentPath('users//abc'), false, "'users//abc'");
    t.eq(isDocumentPath('/users/abc'), false, "'/users/abc'");
    t.eq(isDocumentPath('users/abc/'), false, "'users/abc/'");
    t.eq(isDocumentPath(''), false, "''");
    t.eq(isDocumentPath(undefined), false, 'undefined');
  }, 'Il caso "normale" lo sanno scrivere tutti. I casi limite separano chi ha davvero pensato al problema.');

  test('isCollectionPath: dispari = collection', () => {
    t.eq(isCollectionPath('users'), true, "'users'");
    t.eq(isCollectionPath('users/abc/orders'), true, "'users/abc/orders'");
    t.eq(isCollectionPath('users/abc'), false, "'users/abc'");
    t.eq(isCollectionPath('users//x'), false, "'users//x'");
    t.eq(isCollectionPath(''), false, "''");
  });

  test('parentCollection toglie l\'ultimo segmento', () => {
    t.eq(parentCollection('users/abc'), 'users', "parentCollection('users/abc')");
    t.eq(parentCollection('users/abc/orders/o1'), 'users/abc/orders', "parentCollection('users/abc/orders/o1')");
  });

  test('parentCollection rifiuta ciò che non è un documento', async () => {
    await t.throws(() => parentCollection('users'), null, "parentCollection('users')");
    await t.throws(() => parentCollection('users//abc'), null, "parentCollection('users//abc')");
  }, 'Una collection non ha una "collection padre" nel senso di questa funzione: il contratto va rispettato.');

  test('userOrderPath', () => {
    t.eq(userOrderPath('abc', 'o1'), 'users/abc/orders/o1', "userOrderPath('abc','o1')");
  });

  test('userOrderPath riusa la validazione di buildPath', async () => {
    await t.throws(() => userOrderPath('', 'o1'), null, "userOrderPath('', 'o1')");
  }, 'Se userOrderPath usa davvero buildPath, eredita gratis la validazione. Se ha concatenato le stringhe a mano, questo test lo smaschera.');
};
