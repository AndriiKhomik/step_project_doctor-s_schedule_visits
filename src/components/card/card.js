import Element from '../element/element'
import Sortable from 'sortablejs';
import VisitModal from '../modal/visitModal';
import cardiologist from './cardiologist.jpeg'
import dentist from './dentist.jpeg'
import therapist from './therapist.jpeg'
import { deleteVisitById, getData } from "../api/api";
import Header from '../header/header'
import CardsContainer from './cardsContainer'

const cardsContainer = new CardsContainer();
// cardsContainer.createCardsContainer();

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

  async renderCard(cardObj) {
    this.fullData = cardObj;

    await cardsContainer.checkItemsOnPage();

    // short info for show less btn
    this.shortData['Full name:'] = cardObj['Full name:'];
    this.shortData['Doctor:'] = cardObj['Doctor:'];
    console.log('объект который передали в рендер карточки', this.fullData, 'поле врач - ', this.fullData['Doctor:']);
    const doctor = cardObj['Doctor:'].toLowerCase();
    this.cardEl.classList.add(`card__item--${this.fullData["Urgency:"].toLowerCase()}`);
    this.cardEl.innerHTML = `
            <img class="card__img card-img-top" src=${this.doctorsPhoto[doctor]} alt="doctor's photo">
            <div class="card-body">
              <div class="card__info">
                <p class="card__text card-text"><span class="card__title">Full name:</span><span class="card__value"> ${cardObj['Full name:']}</span></p>
                <p class="card__text card-text"><span class="card__title">Doctor:</span><span class="card__value"> ${cardObj['Doctor:']}</span></p>
              </div>
            </div>`;
    this.deleteBtn.innerHTML = '<span class="card__delete-icon" aria-hidden="true">&times;</span>';
    const cardBody = this.cardEl.querySelector('.card-body');
    cardBody.append(this.showMoreBtn, this.editBtn, this.deleteBtn);
    this.cardContainer.append(this.cardEl);
    this.showMoreData();
    this.removeCard();
    this.editCard();
    this.dragAndDropCard();
  }

  removeCard() {
    this.deleteBtn.addEventListener('click', async (e) => {
      await deleteVisitById(this.fullData.id);
      e.target.closest('.card__item').remove();
      cardsContainer.checkItemsOnPage();
    })
  }

  renderExtraData(cardObj, parentEl) {
    const { ['Full name:']: fullname, ['Doctor:']: doctor, ...restData } = cardObj;

    this.renderCardInfo(restData, parentEl, false);
    return;
  }

  renderCardInfo(obj, parentEl, isShort) {
    this.fullData = obj;
    const { id, ...restObj } = obj;

    let cardInfo;

    if (isShort) {
      cardInfo = { 'Full name:': obj['Full name:'], 'Doctor:': obj['Doctor:'] }
    } else {
      const { ['Full name:']: fullname, ['Doctor:']: doctor, ...restData } = this.fullData;
      cardInfo = restData;
    }

    Object.keys(cardInfo).forEach(prop => {
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
        this.renderCardInfo(this.fullData, this.cardInfoEl, true);
        console.log(this.fullData);
        e.target.innerText = 'Show more';
      } else {

        this.renderCardInfo(this.fullData, this.cardInfoEl, false);
        console.log(this.fullData);
        e.target.innerText = 'Show less';
      }

    })
  }

  async editCard() {
    this.editBtn.addEventListener('click', async () => {
      const newCardObj = await getData(this.fullData.id);
      this.fullData = newCardObj;
      console.log(newCardObj);

      const visitModal = new VisitModal("Edit card");
      visitModal.editCard(newCardObj, this.cardInfoEl);

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


export default Card;

