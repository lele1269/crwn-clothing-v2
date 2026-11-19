/* ==========================================================================
   M5 · E4 ★★★★ · Caccia ai bug nel CartProvider
   AIUTI APERTI: 0      ← aggiorna con onestà

   Questo CartProvider ha 4 BUG. Ognuno corrisponde a un modello mentale
   sbagliato su React. Esegui i test PRIMA di toccare niente:
       node learning/esercizi/verifica.mjs m5-e4
   Correggi un bug alla volta. Non riscrivere tutto: modifica il minimo.
   ========================================================================== */
import { createContext, useState, useEffect } from 'react';

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  toggleCart: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  cartCount: 0,
});

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    setCartCount(cartItems.reduce((total, item) => total + item.quantity, 0));
  }, []);

  const toggleCart = () => setIsCartOpen(isCartOpen);

  const addItemToCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      cartItems.push({ ...product, quantity: 1 });
      setCartItems(cartItems);
    }
  };

  const removeItemFromCart = (product) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (!existing) return;
    if (existing.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== product.id));
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    toggleCart,
    cartItems,
    addItemToCart,
    removeItemToCart: removeItemFromCart,
    cartCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/* ---------------------------------------------------------------------------
   SCHEDA BUG (per ognuno)
     Riga · Cosa faceva · Cosa doveva fare · Modello mentale sbagliato · Come l'ho scoperto

   BUG 1:

   BUG 2:

   BUG 3:

   BUG 4:

   DOMANDA FINALE: uno dei 4 bug sarebbe stato impossibile da commettere se cartCount
   fosse un valore derivato invece che state. Quale, e perché?
--------------------------------------------------------------------------- */
