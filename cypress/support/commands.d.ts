/// <reference types="cypress" />

declare namespace Cypress {
  type Action<T> = { type: string; resource?: string; payload?: T };
  interface Chainable<Subject = any> {
    pick<E extends Element>(value: string): Chainable<JQuery<E>>;
  }
}
