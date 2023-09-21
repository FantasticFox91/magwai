export default class Burger {
  #burgerElement = null;
  #headerElement = null;

  constructor(burgerElement, headerElement) {
    this.#burgerElement = burgerElement;
    this.#headerElement = headerElement;
  }

  init() {
    this.#setInnerHandlers();
  }

  #setInnerHandlers() {
    this.#burgerElement.addEventListener('click', () => this.#toggleBurger());
  }

  #toggleBurger() {
    this.#headerElement.classList.toggle('header--open');
  }
}
