/* Ambiente React per i test: DOM simulato (jsdom) + React Testing Library. */
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);

if (!globalThis.window) {
  const { JSDOM } = require('jsdom');
  const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/', pretendToBeVisual: true });
  const set = (k, v) => Object.defineProperty(globalThis, k, { value: v, configurable: true, writable: true });
  set('window', dom.window);
  set('document', dom.window.document);
  set('navigator', dom.window.navigator);
  for (const k of ['HTMLElement', 'HTMLInputElement', 'Node', 'Event', 'MouseEvent', 'KeyboardEvent', 'InputEvent', 'FocusEvent']) set(k, dom.window[k]);
  set('getComputedStyle', dom.window.getComputedStyle.bind(dom.window));
  set('requestAnimationFrame', dom.window.requestAnimationFrame.bind(dom.window));
  set('cancelAnimationFrame', dom.window.cancelAnimationFrame.bind(dom.window));
  globalThis.IS_REACT_ACT_ENVIRONMENT = true;
}

const RTL = require('@testing-library/react');
export const { render, screen, fireEvent, act, cleanup, waitFor } = RTL;
export const React = require('react');

/* Silenzia i warning di React durante i test ma li registra: alcuni test li controllano. */
export const reactWarnings = [];
const origError = console.error;
console.error = (...args) => {
  const msg = args.map(String).join(' ');
  if (/Warning:|act\(/.test(msg)) { reactWarnings.push(msg); return; }
  origError(...args);
};
