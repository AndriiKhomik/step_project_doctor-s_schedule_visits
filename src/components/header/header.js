import Element from "../element/element";
import logo from "./logo.png"

export default class Header extends Element {
  constructor() {
    super();
    this.render();
    this.changeTextOnLoginBtn();
  }

  changeTextOnLoginBtn() {
    this.loginBtn.addEventListener('click', event => {
      event.preventDefault();

      if (event.target.textContent === 'Login') {
        this.loginBtn.innerText = 'Logout'
      } else this.loginBtn.innerText = 'Login'
    })
  }

  render() {
    const header = this.createElement('header', ['header']);
    document.querySelector('#root').append(header);
    header.insertAdjacentHTML('afterbegin', `<img src=${logo} alt="logo" class="logo">`);
    const btnContainer = this.createElement('div');
    header.append(btnContainer);
    const addVisitBnt = this.createElement('button', ['btn', 'btn-success', 'add-visit-btn'], 'Add new visit');
    btnContainer.append(addVisitBnt);
    this.loginBtn = this.createElement('button', ['btn', 'btn-secondary', 'login-btn'], 'Login');
    // this.loginBtn.insertAdjacentHTML('beforeend', `<ion-icon name="log-in-outline"></ion-icon>`)
    btnContainer.append(this.loginBtn);
  }
}

new Header();