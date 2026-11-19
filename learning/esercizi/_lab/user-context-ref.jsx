/* UserContext di riferimento (versione del corso, lezione 11) per gli esercizi
   che hanno bisogno di un utente. È lo stesso codice spiegato in M5 ⑥. */
import { createContext, useState, useEffect } from 'react';
import { onAuthStateChangedListener, createUserDocumentFromAuth } from './firebase-utils-mock.mjs';

export const UserContext = createContext({ setCurrentUser: () => null, currentUser: null });

export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };
  useEffect(() => {
    const unsubscribe = onAuthStateChangedListener((user) => {
      if (user) createUserDocumentFromAuth(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
