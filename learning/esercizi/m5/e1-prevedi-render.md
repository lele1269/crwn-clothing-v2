# M5 · E1 ★ · Prevedi i re-render

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

**Regola:** non usare il simulatore della sezione ⑦ finché non hai scritto le risposte. Dopo
puoi usarlo per **confrontare**, e scrivi sotto ogni risposta se il simulatore ti ha dato ragione.
Se no, spiega quale idea era sbagliata. Il ciclo è: prevedi → verifica → spiega.

Albero (corso, lezione 16):

```
UserProvider (state: currentUser)
└─ ProductsProvider (state: products)
   └─ CartProvider (state: isCartOpen, cartItems, cartCount, cartTotal)
      └─ App
         └─ Routes
            └─ Navigation        useContext(UserContext), useContext(CartContext) → isCartOpen
               ├─ CartIcon       useContext(CartContext) → isCartOpen, setIsCartOpen, cartCount
               ├─ CartDropdown   useContext(CartContext) → cartItems   (solo se isCartOpen)
               └─ <Outlet/> → Shop  useContext(ProductsContext)
                                └─ ProductCard ×4  useContext(CartContext) → addItemToCart
```

Per ogni domanda: **elenca i componenti che fanno re-render** e per ognuno scrivi il **motivo**:
(S) possiede lo state · (C) è consumer del context cambiato · (K) è disegnato direttamente da
chi fa re-render.

**D1.** Sei sulla pagina Shop, carrello chiuso. L'utente fa logout.

**D2.** Sei sulla pagina Shop, carrello chiuso. Clicchi l'icona del carrello (si apre).

**D3.** Carrello aperto. Clicchi "Add to cart" su una ProductCard. Usa la versione del corso
(con `useEffect` per cartCount e cartTotal): **quanti render** fa CartProvider, e cosa vale
`cartCount` in ciascuno?

**D4.** Perché `App` non fa re-render in nessuno dei tre casi, pur stando sotto tutti e tre i
Provider? Spiegalo come lo spiegheresti a un bambino.

**D5 (da dev).** ProductCard usa solo `addItemToCart`, una funzione che non "cambia" mai dal
punto di vista dell'utente. Perché fa comunque re-render in D2? Indica la riga del CartProvider
che lo causa.

**Risposte:**
