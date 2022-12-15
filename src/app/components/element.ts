export class Element {
  elem: HTMLElement;
  constructor(parent: HTMLElement, tag = 'div', className: string, textContent = '') {
    const elem = document.createElement(tag);

    elem.className = className;
    elem.textContent = textContent;

    parent.append(elem);
    this.elem = elem;
  }

  destroy() {
    this.elem.remove();
  }
}
