# M6 · E3 ★★★★★ · BOSS · Indagine su 4 segnalazioni

**Aiuti aperti:** 0  ← aggiorna questo numero con onestà

Sei il dev di turno. Arrivano quattro segnalazioni sull'app del corso (versione lezione 16,
con UserContext v2 e CartContext). Per ognuna applica il **metodo del debug playbook** (M6 ⑨)
e consegna una scheda così:

```
SEGNALAZIONE N
1. Riproduzione: passi esatti
2. Localizzazione: quale dei 4 posti ha il dato sbagliato, e come lo hai verificato (strumento)
3. Catena: chi scrive quel dato, quando (file e funzione)
4. Causa: la riga o il meccanismo responsabile
5. Correzione: il codice (anche parziale) e perché funziona
6. Prevenzione: quale test, regola o abitudine avrebbe impedito il bug
7. Idea sbagliata dietro il bug
```

---

**#1 · "Il mio nome non compare"**
> Mi sono registrata con email, ho scritto "Giulia" come nome. Nel profilo vedo "Ciao, " e basta.
> Con mio marito, che si è registrato con Google, funziona.

Log in console: nessun errore.
Firestore `users/k2Lm9`: `{ displayName: null, email: "giulia@…", createdAt: … }`

---

**#2 · "Dopo il logout vedo il carrello di prima"**
> Uso il PC di casa con mia figlia. Esco, entra lei, e nel carrello ci sono i miei articoli.

---

**#3 · "Non riesco più a fare niente da stamattina"**
> Ieri funzionava tutto. Oggi login ok, ma il negozio dà errore e il profilo non si salva.

Console:
```
FirebaseError: Missing or insufficient permissions.
```
Nessun commit al codice da una settimana.

---

**#4 · "A volte il contatore del carrello è sbagliato per un attimo"**
> Clicco velocemente "Add to cart" e il numero sull'icona sembra restare indietro di uno
> per una frazione di secondo, poi si corregge.

---

**Domanda finale:** due di queste segnalazioni hanno la stessa **categoria** di causa (non lo
stesso bug: la stessa *famiglia*). Quali, e qual è la famiglia? Come si chiama il principio di
progettazione che le eviterebbe entrambe?

**Schede:**
