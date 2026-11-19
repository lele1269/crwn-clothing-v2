/* ==========================================================================
   M0 · E4 ★★★★ · Caccia ai bug asincroni
   AIUTI APERTI: 0      ← aggiorna con onestà
   Ogni funzione ha UN bug. Esegui i test prima di toccare:
       node learning/esercizi/verifica.mjs m0-e4
   ========================================================================== */
const fakeFetchUser = async (id) => {
  await new Promise((r) => setTimeout(r, 5));
  if (id === 'bad') throw new Error('utente non trovato');
  return { id, name: 'User ' + id };
};

/** Deve restituire i nomi di tutti gli utenti, nell'ordine degli id. */
export const loadNames = async (ids) => {
  const names = [];
  ids.forEach(async (id) => {
    const user = await fakeFetchUser(id);
    names.push(user.name);
  });
  return names;
};

/** Deve restituire l'utente, oppure null se il caricamento fallisce. */
export const safeLoad = async (id) => {
  try {
    return fakeFetchUser(id);
  } catch (e) {
    return null;
  }
};

/** Deve caricare due utenti IN PARALLELO e restituirli come array. */
export const loadPair = async (a, b) => {
  return Promise.all([fakeFetchUser, fakeFetchUser]).then(([ua, ub]) => [ua(a), ub(b)]);
};

/** Deve restituire il nome in maiuscolo. */
export const loadUpperName = async (id) => {
  fakeFetchUser(id).then((user) => {
    return user.name.toUpperCase();
  });
};

/* SCHEDA BUG (una per funzione): cosa faceva · cosa doveva fare · modello mentale sbagliato
   loadNames:
   safeLoad:
   loadPair:
   loadUpperName:
*/
