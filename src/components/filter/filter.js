import Element from "../element/element";

export default class Filter extends Element {


  render() {
    const filter = this.createElement('div', ['filter'], 'this is filter');
    document.querySelector('.card__field').prepend(filter);
  }
}

new Filter();