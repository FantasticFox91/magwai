import {initModals} from './modules/modals/init-modals';
import Burger from './modules/burger/burger';
import LoadMore from './modules/loadmore/load-more';
import Form from './modules/form/form';

const CARDS_PER_PAGE = 5;
const CARDS_LIMIT = 30;

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  const burger = new Burger(document.querySelector('[data-burger]'), document.querySelector('.header'));
  burger.init();

  const loadMore = new LoadMore(document.querySelector('[data-load-more]'), document.querySelector('.cards__list'), CARDS_PER_PAGE, CARDS_LIMIT);
  loadMore.init();

  const applicationForm = new Form(document.querySelector('[data-form]'));
  applicationForm.init();

  window.addEventListener('load', () => {
    initModals();
  });
});
