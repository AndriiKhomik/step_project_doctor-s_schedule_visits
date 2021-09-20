import Element from '../element/element'
import Sortable from 'sortablejs';
import VisitModal from '../modal/visitModal';
import cardiologist from './cardiologist.jpeg'
import dentist from './dentist.jpeg'
import therapist from './therapist.jpeg'
import { deleteVisitById, getData } from "../api/api";
import { cardsContainer } from './cardsContainer'


export default class Card extends Element {
  constructor() {
    super();
    this.showMoreBtn = this.createElement('button', ['card__show-more-btn', 'btn', 'btn-primary', 'card__show-more-btn--closed'], 'Show more');
    this.editBtn = this.createElement('button', ['card__edit-btn', 'btn', 'btn-primary'], 'Edit');
    this.deleteBtn = this.createElement('button', ['btn', 'close', 'card__delete-btn']);
    this.cardEl = this.createElement('li', ['card__item', 'card']);
    this.cardContainer = document.querySelector('.card__list');
    this.doctorsPhoto = { cardiologist, dentist, therapist };
  }

  async renderCard(cardObj) {
    this.fullData = cardObj;

    await cardsContainer.checkItemsOnPage();

    const doctor = cardObj['Doctor:'].toLowerCase();
    this.cardEl.classList.add(`card__item--${this.fullData["Urgency:"].toLowerCase()}`);
    this.cardEl.innerHTML = `
            <img class="card__img card-img-top" src=${this.doctorsPhoto[doctor]} alt="doctor's photo">
            <div class="card-body">
              <select class="card__status">
                <option selected value="open">Open</option>
                <option value="done">Done</option>
              </select>
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
    this.cardStatusHandler();
    this.checkCardDate();
    this.dragAndDropCard();

  }

  changeCardStatus(statusValue) {

    if (statusValue === 'done') {
      this.cardEl.classList.add('card__item--done');
      this.editBtn.disabled = true;
    } else {
      this.cardEl.classList.remove('card__item--done');
      this.editBtn.disabled = false;
    }

  }

  cardStatusHandler() {
    this.statusSelect = this.cardEl.querySelector('.card__status');

    this.statusSelect.addEventListener('change', (e) => {
      this.changeCardStatus(e.target.value);
    })
  }

  checkCardDate() {
    const statusSelect = this.cardEl.querySelector('.card__status');
    const visitDateStr = this.fullData['Date of visit:'].split('-').join(',');
    const visitDate = new Date(visitDateStr);
    const currentDate = new Date();

    if (visitDate - currentDate < 0) {
      if (statusSelect) statusSelect.disabled = true;
      this.changeCardStatus('done')
    }
  }

  removeCard() {
    this.deleteBtn.addEventListener('click', async (e) => {
      await deleteVisitById(this.fullData.id);
      e.target.closest('.card__item').remove();
      cardsContainer.checkItemsOnPage();
    })
  }

  renderCardInfo(obj, parentEl, isShort) {
    this.fullData = obj;
    let cardInfo;

    if (isShort) {
      cardInfo = { 'Full name:': obj['Full name:'], 'Doctor:': obj['Doctor:'] };
    } else {
      const { ['Full name:']: fullname, ['Doctor:']: doctor, id, ...restData } = this.fullData;
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

    this.showMoreBtn.addEventListener('click', async (e) => {

      const newCardObj = await getData(this.fullData.id);
      e.target.classList.toggle('card__show-more-btn--closed');

      if (e.target.classList.contains('card__show-more-btn--closed')) {
        this.cardInfoEl.innerText = "";
        this.renderCardInfo(newCardObj, this.cardInfoEl, true);

        e.target.innerText = 'Show more';
      } else {

        this.renderCardInfo(newCardObj, this.cardInfoEl, false);
        e.target.innerText = 'Show less';
      }
      return;

    })
  }

  async editCard() {
    this.editBtn.addEventListener('click', async () => {
      const newCardObj = await getData(this.fullData.id);
      this.fullData = newCardObj;

      const visitModal = new VisitModal("Edit card");
      visitModal.editCard(newCardObj, this.cardInfoEl);

      // сворачивает карточку в краткую версию
      this.showMoreBtn.classList.add('card__show-more-btn--closed');
      this.showMoreBtn.innerText = 'Show more';

    })
  }

  async removeCardInfo(infoBlockEl) {
    return await new Promise(resolve => {
      infoBlockEl.innerText = '';
      resolve();
    })
  }

  dragAndDropCard() {
    new Sortable(this.cardContainer, {
      animation: 450
    })
  }

}




