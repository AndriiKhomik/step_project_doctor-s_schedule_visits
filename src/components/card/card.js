import Element from '../element/element'
import Sortable from 'sortablejs';

import cardiologist from './cardiologist.jpeg'
import dentist from './dentist.jpeg'
import therapist from './therapist.jpeg'
import { deleteVisitById } from "../api/api";

class Card extends Element {
  constructor() {
    super();
    this.showMoreBtn = this.createElement('button', ['card__show-more-btn', 'btn', 'btn-primary'], 'Show more');
    this.editBtn = this.createElement('button', ['card__edit-btn', 'btn', 'btn-primary'], 'Edit');
    this.deleteBtn = this.createElement('button', ['btn', 'close', 'card__delete-btn']);
    this.cardEl = this.createElement('li', ['card__item', 'card']);
    this.cardContainer = document.querySelector('.card__list');
    this.doctorsPhoto = { cardiologist, dentist, therapist }
  }

  renderCard(cardObj) {
    this.cardData = cardObj;
    const doctor = cardObj['Doctor:'].toLowerCase();
    console.log(this.cardData);
    this.cardEl.classList.add(`card__item--${this.cardData['Urgency:'].toLowerCase()}`);
    this.cardEl.innerHTML = `
        <img class="card__img card-img-top" src=${this.doctorsPhoto[doctor]} alt="Card image">
        <div class="card-body">
          <div class="card__info">
            <p class="card__text card-text"><span class="card__title">Full name:</span><span class="card__value"> ${cardObj['full name:']}</span></p>
            <p class="card__text card-text"><span class="card__title">Doctor:</span><span class="card__value"> ${cardObj['Doctor:']}</span></p>
          </div>
        </div>`;

    this.deleteBtn.innerHTML = '<span class="card__delete-icon" aria-hidden="true">&times;</span>';

    const cardBody = this.cardEl.querySelector('.card-body');
    cardBody.append(this.showMoreBtn, this.editBtn, this.deleteBtn);
    this.cardContainer.append(this.cardEl)

    this.showMoreData();
    this.removeCard();
    this.editCard();
    this.dragAndDropCard();
  }

  removeCard() {
    this.deleteBtn.addEventListener('click', async (e) => {
      await deleteVisitById(this.cardData.id);
      e.target.closest('.card__item').remove();
    })
  }

  renderExtraData(cardObj, parentEl) {
    //these properties aren't needed in the method
    delete cardObj['full name:'];
    delete cardObj['Doctor:'];
    this.renderCardInfo(cardObj, parentEl);
    return;
  }

  renderCardInfo(obj, parentEl) {
    const { id, ...restObj } = obj;
    console.log(id);

    Object.keys(restObj).forEach(prop => {
      const cardDataEl = this.createElement('p', ['card__text', 'card-text']);
      // const cardDataInnerText = this.createElement('span',[])
      cardDataEl.insertAdjacentHTML('beforeend', `<span class="card__title">${prop}</span><span class="card__value"> ${obj[prop]}</span>`)
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

  dragAndDropCard() {
    new Sortable(this.cardContainer, {
      animation: 450
    })
  }

}


createCardContainer();

function createCardContainer() {
  const root = document.querySelector('#root');
  root.insertAdjacentHTML('beforeend',
    '<div class="card__field"><ul class="card__list"></ul></div>')
}


export default Card
