import { useState, createContext, useEffect } from 'react';
import { OnAuthUserStateChanged } from './../utils/firebase/firebase.utils';

//creare l'user context
export const UserContext = createContext({
  currentUser: null,
  setCurrentUser: () => null, //perchè a currentUser passiamo direttamente null mentre a setCurrentUser passiamo un funzione che ritorna null?
});

//creare userProvider
export const UserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = OnAuthUserStateChanged((user) => {
      console.log(user);
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
