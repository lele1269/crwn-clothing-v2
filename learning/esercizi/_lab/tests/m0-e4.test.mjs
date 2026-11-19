import { loadNames, safeLoad, loadPair, loadUpperName } from '../../m0/e4-bug-async.mjs';
export default (test, t) => {
  test('loadNames', async () => { t.eq(await loadNames(['1', '2', '3']), ['User 1', 'User 2', 'User 3'], 'nomi'); },
    'forEach ignora le Promise delle callback: il return avviene prima che arrivino i dati.');
  test('safeLoad: successo', async () => { t.eq(await safeLoad('7'), { id: '7', name: 'User 7' }, 'utente'); });
  test('safeLoad: errore → null', async () => { t.eq(await safeLoad('bad'), null, 'utente "bad"'); },
    'return senza await esce dal try prima del rifiuto (M0, domanda 7).');
  test('loadPair', async () => { t.eq(await loadPair('a', 'b'), [{ id: 'a', name: 'User a' }, { id: 'b', name: 'User b' }], 'coppia'); },
    'Promise.all vuole delle Promise, non delle funzioni da chiamare.');
  test('loadUpperName', async () => { t.eq(await loadUpperName('x'), 'USER X', 'nome'); },
    'Un return dentro .then restituisce dalla callback, non dalla funzione esterna.');
};
