/* Blocchi del quiz M0-E1. File del professore: lo studente NON lo apre e non lo modifica.
   Ogni `codice` viene mostrato nel terminale ed eseguito dopo la previsione. */
/* eslint-disable no-console */

export const tentativo = 4;

export const blocchi = [
  {
    id: 'B1',
    titolo: 'riferimenti e spread',
    codice: () => {
      const a = { tags: ['x'], meta: { v: 1 } };
      const b = { ...a, tags: [...a.tags] };
      b.tags.push('y');
      b.meta.v = 2;
      console.log(a.tags.length, a.meta.v, a.tags === b.tags, a.meta === b.meta);
    },
  },
  {
    id: 'B2',
    titolo: 'spread e ordine delle chiavi',
    codice: () => {
      const defaults = { theme: 'light', lang: 'it', size: 12 };
      const user = { size: 14, theme: 'dark' };
      const settings = { ...defaults, ...user };
      console.log(settings);
    },
  },
  {
    id: 'B3',
    titolo: 'destructuring con rest',
    codice: () => {
      const props = { label: 'Email', id: 'mail', type: 'email' };
      const { label, ...inputProps } = props;
      console.log(label, inputProps);
      console.log(Object.keys(inputProps).length, inputProps.label);
    },
  },
  {
    id: 'B4',
    titolo: 'event loop',
    codice: () => {
      console.log('a');
      setTimeout(() => console.log('b'), 0);
      const p = new Promise((resolve) => {
        console.log('c');
        resolve();
      });
      p.then(() => console.log('d'));
      (async () => {
        await p;
        console.log('e');
      })();
      console.log('f');
    },
  },
  {
    id: 'B5',
    titolo: 'parametri di default',
    codice: () => {
      const pick = ({ color = 'nero', size } = {}) => `${color}-${size}`;
      console.log(pick(), pick({ size: 'M' }), pick({ color: null, size: 'S' }), pick({ color: undefined }));
    },
  },
  {
    id: 'B6',
    titolo: 'async, await e try/catch',
    codice: () => {
      const fetchUser = async (id) => {
        if (id < 0) throw new Error('id non valido');
        return { id };
      };
      const main = async () => {
        try {
          const u = await fetchUser(1);
          console.log('utente', u.id);
          fetchUser(-1);
          console.log('continuo');
        } catch (e) {
          console.log('catch', e.message);
        }
      };
      main();
      console.log('sincrono');
    },
  },
];
