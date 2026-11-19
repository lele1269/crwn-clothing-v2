import { createAppRegistry } from '../../m1/e3-registro-app.mjs';
const O = { apiKey: 'AIza1', projectId: 'p-123456' };
export default (test, t) => {
  test('initializeApp crea l\'app [DEFAULT]', () => {
    const r = createAppRegistry(); const app = r.initializeApp(O);
    t.eq(app.name, '[DEFAULT]', 'name'); t.eq(app.options, O, 'options');
    t.ok(r.getApp() === app, 'getApp() deve restituire la stessa app');
  });
  test('stesse options (oggetto diverso, ordine diverso) → stessa app', () => {
    const r = createAppRegistry(); const a = r.initializeApp(O);
    const b = r.initializeApp({ projectId: 'p-123456', apiKey: 'AIza1' });
    t.ok(a === b, 'deve restituire l\'app esistente');
  }, 'Confrontare con === due oggetti diversi dà sempre false: serve un confronto per contenuto.');
  test('options diverse → app/duplicate-app', async () => {
    const r = createAppRegistry(); r.initializeApp(O);
    let err = null; try { r.initializeApp({ ...O, projectId: 'altro-123' }); } catch (e) { err = e; }
    t.ok(err && err.code === 'app/duplicate-app' && /\[DEFAULT\]/.test(err.message), 'errore con code e nome dell\'app', err && { code: err.code, message: err.message });
  });
  test('app con nome', () => {
    const r = createAppRegistry(); r.initializeApp(O); const b = r.initializeApp({ ...O, projectId: 'altro-123' }, 'secondo');
    t.eq(b.name, 'secondo', 'name'); t.ok(r.getApp('secondo') === b, 'getApp("secondo")');
    t.eq(r.getApps().map((a) => a.name).sort(), ['[DEFAULT]', 'secondo'], 'getApps');
  });
  test('getApp senza initializeApp → app/no-app', () => {
    const r = createAppRegistry(); let err = null;
    try { r.getApp(); } catch (e) { err = e; }
    t.ok(err && err.code === 'app/no-app', 'code', err && err.code);
    t.eq(err && err.message, "No Firebase App '[DEFAULT]' has been created - call initializeApp() first", 'message');
  });
  test('deleteApp e isolamento delle options', () => {
    const r = createAppRegistry(); const opts = { ...O }; const app = r.initializeApp(opts);
    opts.projectId = 'modificato-da-fuori';
    t.eq(app.options.projectId, 'p-123456', 'le options salvate non devono cambiare');
    r.deleteApp(app); t.eq(r.getApps(), [], 'getApps dopo deleteApp');
    const list = r.getApps(); list.push('x'); t.eq(r.getApps(), [], 'getApps deve restituire un array nuovo');
  });
};
