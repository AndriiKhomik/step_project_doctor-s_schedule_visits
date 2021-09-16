import Element from '../element/element';
import logo from './logo.png';
import Visit from "../modal/visit";
import VisitModal from "../modal/visitModal";

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

  addVisit() {
    this.addVisitBnt.addEventListener('click', () => {
      console.log('click')
      const modal = new VisitModal("Create visit");
      modal.show();
    })
  }

  render() {
    this.header = this.createElement('header', ['header']);
    document.querySelector('#root').prepend(this.header);
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
    btnContainer.append(this.loginBtn);
  }
}

new Header();