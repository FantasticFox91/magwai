export default class LoadMore {
  #buttonElement = null;
  #buttonTextElement = null;
  #listElement = null;
  #limit = null;
  #page = 1;
  #cardsLimit = null;
  #cardsOnPage = null;
  #baseUrl = 'https://jsonplaceholder.typicode.com/posts'

  constructor(buttonElement, listElement, cardsPerPage = 10, cardsLimit) {
    this.#buttonElement = buttonElement;
    this.#buttonTextElement = this.#buttonElement.querySelector('.button__text')
    this.#listElement = listElement;
    this.#limit = cardsPerPage;
    this.#cardsOnPage = this.#listElement.querySelectorAll('.card').length;
    this.#cardsLimit = cardsLimit;
  }

  init() {
    this.#setInnerHandlers();
  }

  #setInnerHandlers() {
    this.#buttonElement.addEventListener('click', () => this.#requestNewCards())
  }

  #requestNewCards() {
    try {
      this.#disableButton();
      fetch(`${this.#baseUrl}?_page=${this.#page}&_limit=${this.#limit}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
          }
          return response.json();
        })
        .then((cards) => {
          this.#page++;
          this.#addCards(cards);
          this.#cardsOnPage += cards.length;

          if (this.#cardsOnPage >= this.#cardsLimit) {
            this.#removeButton();
          }
          this.#enableButton();
        });
    } catch (error) {
      console.error("An error occurred:", error);
    } finally {
      this.#enableButton();
    }
  }

  #disableButton() {
    this.#buttonTextElement.textContent = 'Загрузка';
    this.#buttonElement.disabled = true;
  }

  #enableButton() {
    this.#buttonTextElement.textContent = 'Загрузить еще';
    this.#buttonElement.disabled = false;
  }

  #createCardTemplate(data) {
    return(`
      <li class="cards__item">
        <div class="card">
          <picture>
            <source type="image/webp" srcset="./img/nature.webp, ./img/nature@2x.webp 2x" width="329" height="185">
            <img class="card__image" src="./img/nature.jpg" srcset="./img/nature@2x.jpg" alt="Монетки" width="329" height="185">
          </picture>
          <div class="card__description">
            <h3 class="card__heading">${data.title}</h3>
            <p class="card__subheading">${data.title}</p>
            <p class="card__info">
              ${data.body}
            </p>
            <p class="card__bottom">Posted by <span class="card__author">Eugenia</span>, on <span class="card__date">July  24, 2019</span></p>
            <a class="card__link-button" href="#">Continue reading</a>
          </div>
        </div>
      </li>
    `)
  }

  #createCardsTemplate(cards) {
    return cards.reduce((acc, card) => {
      return acc + this.#createCardTemplate(card);
    }, '');
  }

  #addCards(cards) {
    this.#listElement.innerHTML += this.#createCardsTemplate(cards);
  }

  #removeButton() {
    this.#buttonElement.remove();
  }
}
