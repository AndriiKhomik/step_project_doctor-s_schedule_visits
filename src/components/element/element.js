class Element {
  createElement(tagName, classNames = [], text = '') {
    const element = document.createElement(tagName);
    if (text) { element.textContent = text; }
    element.classList.add(...classNames);
    return element
  }
}

export default Element