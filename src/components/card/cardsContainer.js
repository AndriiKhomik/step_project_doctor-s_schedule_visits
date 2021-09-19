import Element from '../element/element'
import Card from "../card/card";
import Header from '../header/header'
// import { header } from '../header/header'
import { deleteVisitById, getData } from "../api/api";

class CardsContainer extends Element {
  constructor() {
    super();
    this.createCardsContainer();

  }

  createCardsContainer() {
    const root = document.querySelector('#root');
    root.insertAdjacentHTML('beforeend',
      '<div class="card__field"><ul class="card__list"></ul></div>');
  }

  async checkItemsOnPage() {
    await getData()
      .then(data => {
        header.checkItemsOnPage(data);
      });
  }


}

export default CardsContainer;