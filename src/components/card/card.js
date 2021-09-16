import Element from '../element/element'
import cardImg from './cardImg.png'
import { deleteVisitById } from "../api/api";

class Card extends Element {
  constructor() {
    super();
    this.showMoreBtn = this.createElement('button', ['card__show-more-btn', 'btn', 'btn-primary'], 'Show more');
    this.editBtn = this.createElement('button', ['card__edit-btn', 'btn', 'btn-primary'], 'Edit');
    this.deleteBtn = this.createElement('button', ['btn', 'close', 'card__delete-btn']);
    this.cardEl = this.createElement('li', ['card__item', 'card']);
    this.cardContainer = document.querySelector('.card__field');
  }

  renderCard(cardObj) {
    this.cardData = cardObj;
    this.cardEl.innerHTML = `
        <img class="card__img card-img-top" src=${cardImg} alt="Card image">
        <div class="card-body">
          <div class="card__info">
            <p class=" card__text card-text">Full name: ${cardObj['full name:']}</p>
            <p class=" card__text card-text">Doctor: ${cardObj["Doctor:"]}</p>
          </div>
        </div>`;

    this.deleteBtn.innerHTML = '<span class="card__delete-icon" aria-hidden="true">&times;</span>';

    const cardBody = this.cardEl.querySelector('.card-body');
    cardBody.append(this.showMoreBtn, this.editBtn, this.deleteBtn);
    this.cardContainer.append(this.cardEl)

    this.showMoreData();
    this.removeCard();
    this.editCard();
  }

  removeCard() {
    this.deleteBtn.addEventListener('click', async (e) => {
      await deleteVisitById(this.cardData.id);
      e.target.closest('.card__item').remove();
    })
  }

  renderExtraData(cardObj, parentEl) {
    // добавить деструктуризацию по нецельному ключу
    delete cardObj['full name:'];
    delete cardObj['Doctor:'];
    this.renderCardInfo(cardObj, parentEl);
    return;
  }

  renderCardInfo(obj, parentEl) {
    const { id, ...restObj } = obj;
    console.log(id);

    Object.keys(restObj).forEach(prop => {
      const cardDataEl = this.createElement('p', ['card__text', 'card-text'], `${prop} ${obj[prop]}`);
      parentEl.append(cardDataEl);
    })
  }

  showMoreData() {
    this.cardInfoEl = this.cardEl.querySelector('.card__info');

    this.showMoreBtn.addEventListener('click', () => {
      this.renderExtraData(this.cardData, this.cardInfoEl);
      this.showMoreBtn.remove();
    })
  }

  editCard() {
    this.editBtn.addEventListener('click', async () => {
      // here will call async modal editing card method, which  makes PATCH request and 
      // returns object with new data  
      // const newData =  await modal.method; 
      // const newData = { 'full name': 'Dan', doctor: 'Logoped', age: 5, temerature: 36, id: 3 };
      this.cardInfoEl.innerHTML = '';
      this.renderCardInfo(newData, this.cardInfoEl);
    })
  }

}


createCardContainer();

function createCardContainer() {
  const cardContainer = document.createElement('div');
  cardContainer.classList.add('card__field')
  const root = document.querySelector('#root');
  root.append(cardContainer);
}


export default Card
