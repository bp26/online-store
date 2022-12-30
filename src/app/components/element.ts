export class Element {
  elem: HTMLElement;
  constructor(parent: HTMLElement, tag: string, className: string, textContent = '', flag = true) {
    const elem = document.createElement(tag);

    elem.className = className;
    elem.textContent = textContent;

    flag ? parent.append(elem) : parent.prepend(elem);

    this.elem = elem;
  }

  destroy() {
    this.elem.remove();
  }
}
