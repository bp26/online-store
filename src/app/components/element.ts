export class Element {
  elem: HTMLElement;
  constructor(parent: HTMLElement, tag = 'div', className?: string, textContent?: string) {
    const elem = document.createElement(tag);

    if (className) {
      elem.className = className;
    }

    if (textContent) {
      elem.textContent = textContent;
    }

    parent.append(elem);
    this.elem = elem;
  }

  destroy() {
    this.elem.remove();
  }
}
