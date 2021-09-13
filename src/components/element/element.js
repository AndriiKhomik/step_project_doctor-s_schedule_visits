class Element {
  constructor() {
    this.createContainer()
  }
  createElement(tagName, classNames = [], text = '') {
    const element = document.createElement(tagName);
    element.textContent = text;
    element.classList.add(...classNames);
    return element
  }

  addAttribute(element, attributeName, attributeValue) {
    element.setAttribute(attributeName, attributeValue);
    return element
  }

  createContainer() {
    this.containerEl = this.createElement('div', ['container']);
    document.querySelector('#root').append(this.containerEl);
    return this.containerEl
  }
}

new Element();

export default Element