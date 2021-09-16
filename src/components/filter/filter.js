import Element from "../element/element";

export default class Filter extends Element {
  constructor() {
    super();
    this.render();
  }

  renderInput() {
    this.filter.insertAdjacentHTML('afterbegin', `
      <div class="input-group ">
        <div class="input-group-prepend">
<!--          <span class="input-group-text" id="basic-addon1">@</span>-->
        </div>
        <input type="text" class="form-control filter__item" placeholder="Type to search visit" aria-label="Username" aria-describedby="basic-addon1">
      </div>
    `)
  }

  renderIsDoneSelect() {
    this.filter.insertAdjacentHTML('beforeend', `
      <select class="form-select form-select__filter" aria-label="Default select example">
        <option selected>All</option>
        <option value="1">Open</option>
        <option value="2">Done</option>
      </select>
    `)
  }

  renderPrioritySelect() {
    this.filter.insertAdjacentHTML('beforeend', `
      <select class="form-select form-select__filter" aria-label="Default select example">
        <option selected>All</option>
        <option value="1">high</option>
        <option value="2">normal</option>
        <option value="2">low</option>
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
    this.renderSearchButton()
  }
}

new Filter();