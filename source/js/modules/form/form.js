export default class Form {
  #formElement = null;
  #nameInput = null;
  #phoneInput = null;
  #agreeInput = null;
  #phoneRegEx = /^(\+7|8)?(\d{10})$/;
  #nameRegEx = /^[A-Za-zА-Яа-я]+$/;

  constructor(formElement) {
    this.#formElement = formElement;
    this.#nameInput = this.#formElement.querySelector('#first-name-modal');
    this.#phoneInput = this.#formElement.querySelector('#phone-number-modal');
    this.#agreeInput = this.#formElement.querySelector('#agree');
  }

  init() {
    this.#setInnerHandlers();
  }

  #setInnerHandlers() {
    this.#formElement.addEventListener('submit', (e) => {
      e.preventDefault();
      if (this.#validateForm()) {
        const data = new FormData(this.#formElement);
        console.log('succes', data);
        return;
      }
      console.log('error during validation');
    });
  }

  #validateForm() {
    this.#validateInput(this.#nameInput, this.#nameRegEx);
    this.#validateInput(this.#phoneInput, this.#phoneRegEx);
    this.#validateAgree();
    return this.#validateInput(this.#nameInput, this.#nameRegEx) && this.#validateInput(this.#phoneInput, this.#phoneRegEx) && this.#validateAgree();
  }

  #validateInput(element, regex) {
    const isValid = regex.test(element.value);
    if (!isValid) {
      element.classList.add('form__input--error');
      setTimeout(() => {
        element.classList.remove('form__input--error');
      }, 2000);
    }
    return isValid;
  }

  #validateAgree() {
    const isValid = this.#agreeInput.checked;
    if (!isValid) {
      this.#agreeInput.classList.add('form__input--error');
      setTimeout(() => {
        this.#agreeInput.classList.remove('form__input--error');
      }, 2000);
    }
    return isValid;
  }
}
