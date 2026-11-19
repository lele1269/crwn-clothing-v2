# M2 · E1 ★ · Prevedi il comportamento di Auth

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

Rispondi senza eseguire niente. Per ogni risposta: **cosa succede** + **perché** + **la fonte**
(sezione della pagina M2, o della documentazione ufficiale).

**D1.** Un utente si registra con email e password. Elenca in ordine tutto quello che succede
tra il click su "Sign Up" e il form svuotato, incluso **quando** viene avvisato `onAuthStateChanged`.

**D2.** Lo stesso utente chiude il browser e lo riapre il giorno dopo. Dove era salvata la sessione?
Cosa vale `auth.currentUser` nel primissimo istante dopo il caricamento? E un secondo dopo?

**D3.** Scrivi il valore esatto di `error.code` in questi casi (progetto creato nel 2025):
a) sign-up con un'email già registrata · b) sign-up con password `"123"` · c) login con password
sbagliata · d) login con un'email mai registrata · e) popup di Google chiuso.

**D4.** Perché c) e d) danno lo stesso codice? Che informazione proteggono, e da chi?

**D5 (da dev).** Il tuo SignUpForm fa `alert` solo per `auth/email-already-in-use`. Elenca gli
altri errori che un utente reale può provocare dal form e cosa vede oggi in ciascun caso.

**Risposte:**
