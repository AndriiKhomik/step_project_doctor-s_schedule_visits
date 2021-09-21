import Element from "../element/element";
import { header } from "../header/header";

export default class Filter extends Element {
  constructor() {
    super();
    this.render();
    header.filterItems();
  }

  renderInput() {
    this.filter.insertAdjacentHTML('afterbegin', `
      <div class="input-group ">
        <div class="input-group-prepend">
        </div>
        <input type="text" class="form-control filter__item" placeholder="Type to search visit" aria-label="Username" aria-describedby="basic-addon1">
      </div>
    `)
  }

  renderIsDoneSelect() {
    this.filter.insertAdjacentHTML('beforeend', `
      <select class="form-select form-select__filter form-select__filter--done" aria-label="Default select example">
        <option selected>All</option>
        <option value="open">Open</option>
        <option value="done">Done</option>
      </select>
    `)
  }

  renderPrioritySelect() {
    this.filter.insertAdjacentHTML('beforeend', `
      <select class="form-select form-select__filter form-select__filter--priority" aria-label="Default select example">
        <option selected>All</option>
        <option value="high">high</option>
        <option value="normal">normal</option>
        <option value="low">low</option>
      </select>
    `)
  }

  renderSearchButton() {
    this.filter.insertAdjacentHTML('beforeend', `
      <button class="btn btn-light search-btn" type="submit">Search</button>
    `)
  }

  render() {
    this.filter = this.createElement('form', ['filter']);
    document.querySelector('.card__field').prepend(this.filter);
    this.renderInput();
    this.renderIsDoneSelect();
    this.renderPrioritySelect();
    this.renderSearchButton();

  }
}

new Filter();