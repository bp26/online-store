export class Element {
  elem: HTMLElement
  constructor(parent: HTMLElement, tag: string, className: string, textContent = '', flag = true) {
    const elem = document.createElement(tag)

    elem.className = className
    elem.textContent = textContent
    if (flag) {
      parent.append(elem)
    } else {
      parent.prepend(elem)
    }

    this.elem = elem
  }

  destroy() {
    this.elem.remove()
  }
}
