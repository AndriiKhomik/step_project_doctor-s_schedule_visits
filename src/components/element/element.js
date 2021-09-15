class Element {
  constructor() {
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
}

new Element();

export default Element