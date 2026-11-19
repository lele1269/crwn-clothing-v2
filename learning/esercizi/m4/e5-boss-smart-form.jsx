/* ==========================================================================
   M4 · E5 ★★★★★ · BOSS · Un form guidato dalla configurazione
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m4-e5

   <SmartForm
      fields={[
        { name: 'email', label: 'Email', type: 'email', required: true,
          validate: (value, values) => messaggio | null },
        ...
      ]}
      submitLabel="Sign Up"
      onSubmit={async (values) => { ... }}     // può rifiutare con un Error
   />

   Requisiti:
     1. un input per campo, collegato alla sua label (getByLabelText(label) deve funzionare)
     2. al submit: valida TUTTI i campi
          - required e vuoto (dopo trim) → 'Campo obbligatorio'
          - altrimenti, se c'è validate → il suo messaggio (se non è null)
        Ogni errore va mostrato in un elemento con data-error-for="<name>".
        Se ci sono errori, onSubmit NON viene chiamato.
     3. correggere un campo cancella SUBITO il suo errore (non quelli degli altri)
     4. durante onSubmit: bottone disabled; alla fine riabilitato
     5. onSubmit riuscito → campi svuotati
        onSubmit rifiutato → messaggio error.message in un elemento role="alert", campi intatti
     6. validate riceve anche TUTTI i valori (serve per "conferma password")
   ========================================================================== */
import { useState } from 'react';

const SmartForm = ({ fields, submitLabel = 'Invia', onSubmit }) => {
  // TODO
};

export default SmartForm;

/* DOCUMENTO DI PROGETTO (obbligatorio — senza, voto massimo 6)
   1. Che forma ha il tuo state? Perché? (valori, errori, stato di invio, errore globale)
   2. Gli errori di campo sono state o derivati? Se derivati, perché il requisito 3 (cancellare
      solo dopo il submit) rende difficile derivarli?
   3. Come riscriveresti il SignUpForm del corso con SmartForm? Scrivi la configurazione fields.
   4. Quali limiti ha questo approccio "a configurazione"? Quando NON lo useresti?
*/
