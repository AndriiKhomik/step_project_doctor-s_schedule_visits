import Element from '../element/element';
import logo from './logo.png';
import Visit from "../modal/visit";
import VisitModal from "../modal/visitModal";
import LoginForm from '../modal/loginForm'
import { deleteVisitById, getData } from "../api/api";
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

      if (event.target.textContent === 'Login') {
        this.loginform = new LoginForm("Welcome");
        this.loginform.show();
        this.checkEmailAndPassword();

      } else {
        document.querySelector('.card__list').innerText = '';
        localStorage.removeItem('isLogged');
        this.loginBtn.innerText = 'Login';
        this.addVisitBnt.classList.add('hide');
        if (this.greeting) {
          this.greeting.remove()
        }
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
    if (localStorage.getItem('isLogged')) {
      this.header = this.createElement('header', ['header']);
      document.querySelector('#root').prepend(this.header);
      this.header.insertAdjacentHTML('afterbegin',
        `
              <a href="https://med.sumdu.edu.ua/en/" target="_blank">
                <img src=${logo} alt="logo" class="logo">
              </a>`);
      const btnContainer = this.createElement('div', ['btn__group']);
      this.header.append(btnContainer);
      this.addVisitBnt = this.createElement('button', ['btn', 'btn-success', 'add-visit-btn'], 'Add new visit');
      btnContainer.append(this.addVisitBnt);
      this.loginBtn = this.createElement('button', ['btn', 'btn-secondary', 'login-btn'], 'Logout');
      btnContainer.append(this.loginBtn);
      this.renderPageAfterLogin();
      this.greetingText(localStorage.getItem('user'))
    }
    if (!localStorage.getItem('isLogged') || (localStorage.getItem('isLogged') === 'false')) {
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
  }

  renderUserName(name) {
    let userName = name.split('@');
    this.userName = userName[0].toString();
    localStorage.setItem('user', this.userName)
    return this.userName;
  }

  checkEmailAndPassword() {
    this.mail = document.querySelector('#email');
    const password = document.querySelector('#password');
    const submitAuthorizationBtn = document.querySelector('#login-submit-btn');
    submitAuthorizationBtn.addEventListener('click', () => {
      if (this.mail.value === 'andr@gmail.com' && password.value === 'admin111') {
        this.renderPageAfterLogin();
        this.renderUserName(this.mail.value);
        this.loginBtn.innerText = 'Logout';
        this.addVisitBnt.classList.remove('hide');
        localStorage.setItem('isLogged', true);
        localStorage.setItem('token', 'e8f8357e-bd0c-40b1-8074-b37d5a74b6f6');
        this.greetingText(this.userName);
      }
    })
  }

  renderAddVisitTitle(items) {
    const cardField = document.querySelector('.card__field');

    if (items.length === 0) {
      const title = this.createElement('h2', ['visit__title'], 'Please add your first visit');
      cardField.append(title);
    } else {
      const visitTitle = cardField.querySelector('.visit__title');
      if (visitTitle) visitTitle.remove();
    }
  }

  renderPageAfterLogin() {
    getData()
      .then(data => {
        this.renderAddVisitTitle(data);

        data.map(item => {
          const card = new Card();
          card.renderCard(item)
        })
      });
  }
}

const header = new Header();
export { header };