import { Element } from '../../element';

export class CartHeaderContent {
  constructor(node: HTMLElement) {
    const headerCart = new Element(node, 'div', 'cart-header')
    const titleContent = new Element(headerCart.elem, 'p', 'cart-header__title', 'Products in Cart')
    const blockItemProduct = new Element(headerCart.elem, 'div', 'block-item')
    const itemProduct = new Element(blockItemProduct.elem, 'p', 'block-item__item', 'ITEMS:')
    const itemCountProduct = new Element(blockItemProduct.elem, 'p', 'block-item__count', '0')
    const blockPagination = new Element(headerCart.elem, 'div', 'block-pagination')
    const pagePagination = new Element(blockPagination.elem, 'p', 'block-pagination__page', 'Page:')
    const pageBtnLeft = new Element(blockPagination.elem, 'button', 'block-pagination__btn-left', '<')
    const pageNumber = new Element(blockPagination.elem, 'p', 'block-pagination__number', '1')
    const pageBtnRight = new Element(blockPagination.elem, 'button', 'block-pagination__btn-right', '>')
  }
}
