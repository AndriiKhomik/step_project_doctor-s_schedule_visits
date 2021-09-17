import Element from '../element/element'
import Sortable from 'sortablejs';

import cardiologist from './cardiologist.jpeg'
import dentist from './dentist.jpeg'
import therapist from './therapist.jpeg'
import { deleteVisitById } from "../api/api";

class Card extends Element {
  constructor() {
    super();
    this.showMoreBtn = this.createElement('button', ['card__show-more-btn', 'btn', 'btn-primary', 'card__show-more-btn--closed'], 'Show more');
    this.editBtn = this.createElement('button', ['card__edit-btn', 'btn', 'btn-primary'], 'Edit');
    this.deleteBtn = this.createElement('button', ['btn', 'close', 'card__delete-btn']);
    this.cardEl = this.createElement('li', ['card__item', 'card']);
    this.cardContainer = document.querySelector('.card__list');
    this.doctorsPhoto = { cardiologist, dentist, therapist };
    this.shortData = {};
  }

  renderCard(cardObj) {
    this.fullData = cardObj;

    // short info for show less btn
    this.shortData['Full name:'] = cardObj['full name:'];
    this.shortData['Doctor:'] = cardObj['Doctor:'];

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
      await deleteVisitById(this.fullData.id);
      e.target.closest('.card__item').remove();
    })
  }

  renderExtraData(cardObj, parentEl) {
    const { ['full name:']: fullname, ['Doctor:']: doctor, ...restData } = cardObj;

    this.renderCardInfo(restData, parentEl);
    return;
  }

  renderCardInfo(obj, parentEl) {
    const { id, ...restObj } = obj;

    Object.keys(restObj).forEach(prop => {
      const cardDataEl = this.createElement('p', ['card__text', 'card-text']);
      cardDataEl.insertAdjacentHTML('beforeend', `<span class="card__title">${prop}</span><span class="card__value"> ${obj[prop]}</span>`)
      parentEl.append(cardDataEl);
    })
  }

  showMoreData() {
    this.cardInfoEl = this.cardEl.querySelector('.card__info');

    this.showMoreBtn.addEventListener('click', (e) => {
      e.target.classList.toggle('card__show-more-btn--closed');

      if (e.target.classList.contains('card__show-more-btn--closed')) {
        this.cardInfoEl.innerText = "";
        this.renderCardInfo(this.shortData, this.cardInfoEl);
        e.target.innerText = 'Show more';
      } else {
        this.renderExtraData(this.fullData, this.cardInfoEl);
        e.target.innerText = 'Show less';
      }

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
