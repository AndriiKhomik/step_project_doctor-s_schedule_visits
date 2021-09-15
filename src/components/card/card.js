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
            <p class=" card__text card-text">Full name: ${cardObj.fullName}</p>
            <p class=" card__text card-text">Doctor: ${cardObj.doctor}</p>
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
            await deleteVisitById(this.cardObject.id);
            e.target.closest('.card__item').remove();
        })
    }

    renderExtraData(cardObj, parentEl) {
        const { fullName, doctor, ...extraData } = cardObj;
        console.log(extraData);
        this.renderCardInfo(extraData, parentEl);
        return;
    }

    renderCardInfo(obj, parentEl) {
        const { id, ...restObj } = obj;

        Object.keys(restObj).forEach(prop => {
            const capitalizeProperty = prop[0].toUpperCase() + prop.slice(1);
            const cardDataEl = this.createElement('p', ['card__text', 'card-text'], `${capitalizeProperty}: ${obj[prop]}`);
            parentEl.append(cardDataEl);
        })
    }

    showMoreData() {
        const cardInfoEl = this.cardEl.querySelector('.card__info');
        this.cardInfoEl = cardInfoEl;
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
            const newData = { 'full name': 'Dan', doctor: 'Logoped', age: 5, temerature: 36, id: 3 };
            this.cardInfoEl.innerHTML = '';
            this.renderCardInfo(newData, this.cardInfoEl);
        })
    }

}


createCardContainer();
const card = new Card();
card.renderCard({ fullName: 'Larisa', doctor: 'Logoped', age: 45, temerature: 36 });


function createCardContainer() {
    const cardContainer = document.createElement('div');
    cardContainer.classList.add('card__field')
    const root = document.querySelector('#root');
    root.append(cardContainer);
}



