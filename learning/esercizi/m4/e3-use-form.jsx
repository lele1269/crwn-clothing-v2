/* ==========================================================================
   M4 · E3 ★★★ · Il tuo primo custom hook: useForm
   AIUTI APERTI: 0      ← aggiorna con onestà
   Test:  node learning/esercizi/verifica.mjs m4-e3

   Ogni form del corso ripete: useState(defaults), handleChange, resetFormFields.
   Estrailo in un hook riutilizzabile, e scrivi un FormInput che non possa crashare.
   ========================================================================== */
import { useState } from 'react';

/**
 * useForm(defaults) → { fields, handleChange, resetFields, setField }
 *   - handleChange(event): aggiorna fields[event.target.name] con event.target.value
 *     usando la FORMA FUNZIONALE del setter (resiste agli aggiornamenti ravvicinati)
 *   - resetFields(): torna ai defaults
 *   - setField(name, value): aggiorna un campo da codice (non da un evento)
 */
export const useForm = (defaults) => {
  // TODO
};

/**
 * FormInput robusto:
 *   - stessa API del corso: ({ label, ...otherProps })
 *   - se value è undefined o null → l'input riceve '' (mai uncontrolled)
 *   - la label (se presente) ha classe 'shrink form-input-label' se c'è testo,
 *     altrimenti 'form-input-label' (niente spazi iniziali)
 *   - la label è collegata all'input: id = otherProps.id oppure otherProps.name,
 *     e <label htmlFor={…}>   (così getByLabelText funziona e lo screen reader pure)
 */
export const FormInput = ({ label, ...otherProps }) => {
  // TODO
};

/* DOMANDE
   1. Cos'è un custom hook per React? Perché il suo nome deve iniziare con "use"?
      (Cerca "Reusing Logic with Custom Hooks" su react.dev.)
   2. Due componenti che chiamano useForm condividono lo stesso state? Perché?
   RISPOSTE:
*/
