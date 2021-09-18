import Element from '../element/element';
import logo from './logo.png';
import Visit from "../modal/visit";
import VisitModal from "../modal/visitModal";
import LoginForm from '../modal/loginForm'
import {deleteVisitById, getData } from "../api/api";
import Card from "../card/card";

export default class Header extends Element {
  constructor() {
    super();
    this.render();
    this.authorization();
    this.addVisit();
  }

  authorization() {
    this.loginBtn.addEventListener('click', event => {
      event.preventDefault();

      if (event.target.textContent === 'Login' &&
          localStorage.getItem('isLogged')) {
        this.loginform = new LoginForm("Welcome");
        this.loginform.show();
        this.checkEmailAndPassword();
      } else {

        // after successfully logout
        localStorage.setItem('isLogged', false);
        this.loginBtn.innerText = 'Login';
        this.addVisitBnt.classList.add('hide');
        this.greeting.classList.add('hide');
      }
    })
  }

  addVisit() {
    this.addVisitBnt.addEventListener('click', () => {
      const modal = new VisitModal("Create visit");
      modal.show();
    })
  }

  greetingText(name) {
    this.greeting = this.createElement('h3', ['title'], `Welcome ${name}`);
    document.querySelector('.btn__group').before(this.greeting)
  }

  render() {
    this.header = this.createElement('header', ['header']);
    document.querySelector('#root').prepend(this.header);
    this.header.insertAdjacentHTML('afterbegin',
      `
              <a href="https://med.sumdu.edu.ua/en/" target="_blank">
                <img src=${logo} alt="logo" class="logo">
              </a>`);
    const btnContainer = this.createElement('div', ['btn__group']);
    this.header.append(btnContainer);
    this.addVisitBnt = this.createElement('button', ['btn', 'btn-success', 'add-visit-btn', 'hide'], 'Add new visit');
    btnContainer.append(this.addVisitBnt);
    this.loginBtn = this.createElement('button', ['btn', 'btn-secondary', 'login-btn'], 'Login');
    btnContainer.append(this.loginBtn);
  }

  checkEmailAndPassword() {
    this.mail = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submitAuthorizationBtn = document.querySelector('#login-submit-btn');
    submitAuthorizationBtn.addEventListener('click', () => {
      // if (mail.value === 'andr@gmail.com' && password.value === 'admin111') {
      if (this.mail.value === '1' && password.value === '1') {
        this.renderPageAfterLogin();

        this.loginBtn.innerText = 'Logout';
        this.addVisitBnt.classList.remove('hide');

        localStorage.setItem('isLogged', true);
        localStorage.setItem('token', 'e8f8357e-bd0c-40b1-8074-b37d5a74b6f6');
        this.greetingText(this.mail.value);
      }
    })
  }

  checkItemsOnPage(items) {
    const title = this.createElement('h2', ['visit__title', 'hide'], 'Please add your first visit');
    document.querySelector('.card__field').append(title);
    if (items.length === 0) {
      title.classList.remove('hide')
    } else {
      title.classList.add('hide')
    }
  }

  renderPageAfterLogin() {
    getData()
      .then(data => {
        this.checkItemsOnPage(data);
        data.map(item => {
          const card = new Card();
          card.renderCard(item)
        })
      });
  }
}

new Header();