import Element from '../element/element';
import logo from './logo.png';

export default class Header extends Element {
  constructor() {
    super();
    this.render();
    this.authorization();
  }

  authorization() {
    this.loginBtn.addEventListener('click', event => {
      event.preventDefault();

      if (event.target.textContent === 'Login') {

        // after successfully authorization
        this.loginBtn.innerText = 'Logout';
        this.addVisitBnt.classList.remove('hide');
        this.greeting.classList.remove('hide');
      } else {

        // after successfully logout
        this.loginBtn.innerText = 'Login';
        this.addVisitBnt.classList.add('hide');
        this.greeting.classList.add('hide');
      }
    })
  }

  greetingText() {
    this.greeting = this.createElement('h3', ['title', 'hide'], 'Welcome ${user}');
    this.header.append(this.greeting)
  }

  render() {
    this.header = this.createElement('header', ['header']);
    document.querySelector('#root').append(this.header);
    this.header.insertAdjacentHTML('afterbegin',
      `
              <a href="https://med.sumdu.edu.ua/en/" target="_blank">
                <img src=${logo} alt="logo" class="logo">
              </a>`);
    this.greetingText();
    const btnContainer = this.createElement('div');
    this.header.append(btnContainer);
    this.addVisitBnt = this.createElement('button', ['btn', 'btn-success', 'add-visit-btn', 'hide'], 'Add new visit');
    btnContainer.append(this.addVisitBnt);
    this.loginBtn = this.createElement('button', ['btn', 'btn-secondary', 'login-btn'], 'Login');
    // this.loginBtn.insertAdjacentHTML('beforeend', `<ion-icon name="log-in-outline"></ion-icon>`)
    btnContainer.append(this.loginBtn);
  }
}

new Header();