import { Element } from '../../element';

export class CartHeaderContent {
  constructor(node: HTMLElement, getValueInput: (value: number) => void, updateCartContent: (value: number) => void) {
    const headerCart = new Element(node, 'div', 'cart-header')
    const titleContent = new Element(headerCart.elem, 'p', 'cart-header__title', 'Products in Cart')
    const blockItemProduct = new Element(headerCart.elem, 'div', 'block-item')
    const itemProduct = new Element(blockItemProduct.elem, 'p', 'block-item__item', 'ITEMS:')
    const inputCountProduct = new Element(blockItemProduct.elem, 'input', 'block-item__input')
    inputCountProduct.elem.setAttribute('type', 'number')
    inputCountProduct.elem.setAttribute('value', '3')
    const blockPagination = new Element(headerCart.elem, 'div', 'block-pagination')
    const pagePagination = new Element(blockPagination.elem, 'p', 'block-pagination__page', 'Page:')
    const pageBtnLeft = new Element(blockPagination.elem, 'button', 'block-pagination__btn-left', '<')
    const pageNumber = new Element(blockPagination.elem, 'p', 'block-pagination__number', '1')
    const pageBtnRight = new Element(blockPagination.elem, 'button', 'block-pagination__btn-right', '>')
    const inputElem = <HTMLInputElement>inputCountProduct.elem
    const inputValue = Number(inputElem.value)
    getValueInput(inputValue)

    inputCountProduct.elem.oninput = () => {
      const inputValue = Number(inputElem.value)
      if (inputValue) {
        getValueInput(inputValue)
        updateCartContent(inputValue)
      }
    }

    pageBtnRight.elem.onclick = () => {

    }

    pageBtnLeft.elem.onclick = () => {

    }
  }
}
