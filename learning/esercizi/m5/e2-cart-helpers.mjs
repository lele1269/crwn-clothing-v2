/* ==========================================================================
   M5 · E2 ★★ · Helper del carrello immutabili
   AIUTI APERTI: 0      ← aggiorna con onestà

   Sono le funzioni PURE che il CartProvider usa per calcolare il nuovo array.
   Regola d'oro di React: MAI modificare l'array o gli oggetti ricevuti.
   Restituisci sempre strutture NUOVE per ciò che cambia, e riusa (stesso
   riferimento) ciò che non cambia.

   Test:  node learning/esercizi/verifica.mjs m5-e2
   ========================================================================== */

/** Aggiunge 1 pezzo. Nuovo prodotto → { ...product, quantity: 1 } in fondo. */
export const addCartItem = (cartItems, productToAdd) => {
  // TODO
};

/** Toglie 1 pezzo. quantity 1 → la riga sparisce. Prodotto assente → stesso array, invariato. */
export const removeCartItem = (cartItems, cartItemToRemove) => {
  // TODO
};

/** Elimina la riga del prodotto, qualunque sia la quantità. */
export const clearCartItem = (cartItems, cartItemToClear) => {
  // TODO
};

/** Numero totale di pezzi. */
export const getCartCount = (cartItems) => {
  // TODO
};

/** Totale in euro. */
export const getCartTotal = (cartItems) => {
  // TODO
};

/* ---------------------------------------------------------------------------
   DOMANDE

   1. Dopo addCartItem su un prodotto già presente, quali elementi del nuovo array
      sono LO STESSO oggetto (===) di quelli del vecchio, e quali no? Perché è
      importante per React? (Pensa a un <CartItem> avvolto in React.memo.)

   2. Il corso, in removeCartItem, fa existingCartItem.quantity === 1 senza
      controllare che existingCartItem esista. Cosa succede se rimuovi un prodotto
      che non c'è? Come l'hai gestito tu?

   3. getCartCount e getCartTotal: perché sono funzioni e non state?

   RISPOSTE:
--------------------------------------------------------------------------- */
