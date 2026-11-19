import { delay, runInSequence, runInParallel, withTimeout, retry } from '../../m0/e3-async.mjs';
const now = () => Date.now();
export default (test, t) => {
  test('delay', async () => {
    const s = now(); const p = delay(40);
    t.ok(p && typeof p.then === 'function', 'delay deve restituire una Promise', p);
    await p; t.ok(now() - s >= 35, 'deve aspettare ~40ms', now() - s);
  });
  test('runInSequence: ordine e tempi', async () => {
    const log = [];
    const mk = (n, ms) => async () => { log.push('start' + n); await new Promise((r) => setTimeout(r, ms)); log.push('end' + n); return n; };
    const s = now();
    const r = await runInSequence([mk(1, 30), mk(2, 10), mk(3, 10)]);
    t.eq(r, [1, 2, 3], 'risultati');
    t.eq(log, ['start1', 'end1', 'start2', 'end2', 'start3', 'end3'], 'ordine di esecuzione');
    t.ok(now() - s >= 45, 'in sequenza i tempi si sommano', now() - s);
  }, 'Ogni task deve partire solo quando la precedente è finita.');
  test('runInParallel: tutte insieme', async () => {
    const mk = (n, ms) => () => new Promise((r) => setTimeout(() => r(n), ms));
    const s = now();
    const r = await runInParallel([mk(1, 60), mk(2, 10), mk(3, 30)]);
    t.eq(r, [1, 2, 3], 'risultati nell\'ordine delle task (non di arrivo)');
    t.ok(now() - s < 100, 'in parallelo conta solo la più lenta', now() - s);
  });
  test('withTimeout: risolve in tempo', async () => {
    t.eq(await withTimeout(delay(10).then(() => 'ok'), 100), 'ok', 'valore');
  });
  test('withTimeout: scade', async () => {
    await t.throws(() => withTimeout(delay(200), 30), /timeout/, 'promise troppo lenta');
  });
  test('withTimeout: propaga l\'errore originale', async () => {
    await t.throws(() => withTimeout(Promise.reject(new Error('rete')), 100), /rete/, 'promise rifiutata');
  });
  test('retry', async () => {
    let n = 0;
    const flaky = async () => { n++; if (n < 3) throw new Error('fail ' + n); return 'ok'; };
    t.eq(await retry(flaky, 5), 'ok', 'successo al terzo tentativo');
    t.eq(n, 3, 'tentativi fatti');
    let m = 0;
    await t.throws(() => retry(async () => { m++; throw new Error('err ' + m); }, 2), /err 2/, 'tutti falliti → ultimo errore');
    t.eq(m, 2, 'tentativi quando falliscono tutti');
  });
};
