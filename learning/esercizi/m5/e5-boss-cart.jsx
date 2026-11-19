/* ==========================================================================
   M5 · E5 ★★★★★ · BOSS · Il CartContext da dev
   AIUTI APERTI: 0      ← aggiorna con onestà

   Scrivi un CartContext migliore di quello del corso:
     1. cartCount e cartTotal sono DERIVATI (niente useEffect, niente state)
     2. useCart(): custom hook che legge il context e, se usato FUORI da
        CartProvider, lancia un Error il cui messaggio contiene "CartProvider"
        (niente più fallimenti silenziosi del default)
     3. quando l'utente fa logout (currentUser passa da un utente a null),
        il carrello si svuota e si chiude
     4. azioni: addItemToCart(product), removeItemFromCart(cartItem),
        clearItemFromCart(cartItem), toggleCart()
     5. immutabilità rigorosa (puoi importare i tuoi helper di E2)

   Il value esposto da useCart() deve avere ESATTAMENTE queste chiavi:
     isCartOpen, toggleCart, cartItems, addItemToCart, removeItemFromCart,
     clearItemFromCart, cartCount, cartTotal

   Test:  node learning/esercizi/verifica.mjs m5-e5
   I test montano: <UserProvider> (quello di riferimento) → <CartProvider> → consumer
   ========================================================================== */
import { createContext, useContext, useState, useEffect } from 'react';
import { UserContext } from '../_lab/user-context-ref.jsx';
// import { addCartItem, removeCartItem, clearCartItem } from './e2-cart-helpers.mjs';

export const CartContext = null; // TODO: che default scegli, visto il punto 2? Giustificalo.

export const CartProvider = ({ children }) => {
  // TODO
};

export const useCart = () => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOCUMENTO DI PROGETTO (obbligatorio — senza, voto massimo 6)

   1. Che defaultValue hai dato a createContext e perché, visto useCart?

   2. Il punto 3 (svuotare al logout) richiede un useEffect. Perché qui un effect
      è giusto, mentre per cartCount no? Qual è la differenza tra le due situazioni?
      (Cerca "You Might Not Need an Effect" su react.dev e cita la sezione che ti
      ha aiutato.)

   3. Come reagisce il tuo effect al PRIMO render, quando currentUser è null
      ma nessuno ha fatto logout? Il carrello si svuota inutilmente? È un problema?

   4. In index.js, CartProvider deve stare dentro o fuori UserProvider? Perché?

   5. Hai usato useMemo/useCallback? Perché sì / perché no? (Non c'è una risposta
      giusta: c'è una risposta GIUSTIFICATA.)
--------------------------------------------------------------------------- */
