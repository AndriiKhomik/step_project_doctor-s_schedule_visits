import Element from '../element/element'
import cardImg from './cardImg.png'

class Card extends Element {
  constructor() {
    super();
    this.showMoreBtn = this.createElement('button', ['card__show-more-btn', 'btn', 'btn-primary'], 'Show more');
    this.editBtn = this.createElement('button', ['card__edit-btn', 'btn', 'btn-primary'], 'Edit');
    this.deleteBtn = this.createElement('button', ['btn', 'close', 'card__delete-btn']);
    this.cardEl = this.createElement('li', ['card__item', 'card']);

  }

  renderCard(cardObj) {
    this.cardData = cardObj;

    this.cardEl.innerHTML = `
        <img class="card__img card-img-top" src=${cardImg} alt="Card image">
        <div class="card-body">
          <div class="card__info">
            <p class=" card__text card-text">Fullname: ${cardObj.fullName}</p>
            <p class=" card__text card-text">Doctor: ${cardObj.doctor}</p>
          </div>
        </div>`;

    this.deleteBtn.innerHTML = '<span class="card__delete-icon" aria-hidden="true">&times;</span>';

    const cardBody = this.cardEl.querySelector('.card-body');
    cardBody.append(this.showMoreBtn, this.editBtn, this.deleteBtn);
    this.cardContainer.append(this.cardEl)
    this.showMoreData();
  }

  renderExtraData(cardObj, parentEl) {
    const { fullName, doctor, ...extraData } = cardObj;
    console.log(extraData);
    Object.keys(extraData).forEach(prop => {
      const cardDataEl = this.createElement('p', ['card__text', 'card-text'], `${prop}: ${extraData[prop]}`);
      parentEl.append(cardDataEl);
    })
    return;
  }

  showMoreData() {
    const cardInfoEl = this.cardEl.querySelector('.card__info');

    this.showMoreBtn.addEventListener('click', () => {
      this.renderExtraData(this.cardData, cardInfoEl);
      this.showMoreBtn.remove();
    })
  }

  renderCardContainer() {
    this.cardContainer = this.createElement('div', ['card__field'])
    const root = document.querySelector('#root');
    root.append(this.cardContainer);
  }

}
const card = new Card();
card.renderCardContainer()
card.renderCard({ fullName: 'Yulia Boiko', doctor: 'Therapevt', age: 25, temerature: 27 });
