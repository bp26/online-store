import { Element } from '../../element';
import { IProduct } from '../../../types/interfaces';

export class CartHeaderContent {
  public dataMatrix: IProduct[][]
  private paginationHead: number
  private count: number
  private pageNumber: Element
  constructor(node: HTMLElement, getValueInput: (value: number) => IProduct[][], updateCartContent: (value: number, head: number) => void, btnPagination: (flag: boolean) => number, inputUpdateHeaderCount: () => void, inputUpdatePaginationHead: () => void, getPaginationPagesCount: () => number, setPaginationPagesCount: (count: number) => void, getPaginationHead: () => number, setPaginationInputValue: (value: number) => void, getPaginationInputValue: () => number) {
    this.paginationHead = getPaginationHead()
    this.count = getPaginationPagesCount()
    const headerCart = new Element(node, 'div', 'cart-header')
    const titleContent = new Element(headerCart.elem, 'p', 'cart-header__title', 'Products in Cart')
    const blockItemProduct = new Element(headerCart.elem, 'div', 'block-item')
    const itemProduct = new Element(blockItemProduct.elem, 'p', 'block-item__item', 'ITEMS:')
    const inputCountProduct = new Element(blockItemProduct.elem, 'input', 'block-item__input')
    inputCountProduct.elem.setAttribute('type', 'number')
    inputCountProduct.elem.setAttribute('value', `${getPaginationInputValue()}`)
    const inputElem = <HTMLInputElement>inputCountProduct.elem
    const inputValue = Number(inputElem.value)
    this.dataMatrix = getValueInput(inputValue)
    const blockPagination = new Element(headerCart.elem, 'div', 'block-pagination')
    const pagePagination = new Element(blockPagination.elem, 'p', 'block-pagination__page', 'Page:')
    const pageBtnLeft = new Element(blockPagination.elem, 'button', 'block-pagination__btn-left', '<')
    this.pageNumber = new Element(blockPagination.elem, 'p', 'block-pagination__number', `${this.count}`)
    const pageBtnRight = new Element(blockPagination.elem, 'button', 'block-pagination__btn-right', '>')

    inputCountProduct.elem.onkeydown = (event) => {
        return !(/^[Ee - +-]$/.test(event.key))
    }

    inputCountProduct.elem.oninput = () => {
      const inputValue = Number(inputElem.value)
      if (inputValue) {
        this.dataMatrix = getValueInput(inputValue)
        inputUpdateHeaderCount()
        inputUpdatePaginationHead()
        this.paginationHead = 0
        updateCartContent(inputValue, this.paginationHead)
        setPaginationPagesCount(this.count)
        setPaginationInputValue(inputValue)
      }
    }

    pageBtnRight.elem.onclick = () => {
      const inputValue = Number(inputElem.value)
      if (this.count === this.dataMatrix.length) {
        return
      }
      this.count += 1
      this.paginationHead = btnPagination(true)
      this.pageNumber.elem.textContent = `${this.count}`
      updateCartContent(inputValue, this.paginationHead)
      setPaginationPagesCount(this.count)
    }

    pageBtnLeft.elem.onclick = () => {
      const inputValue = Number(inputElem.value)
      if (this.count === 1) {
        return
      }
      this.count -= 1
      this.paginationHead = btnPagination(false)
      this.pageNumber.elem.textContent = `${this.count}`
      updateCartContent(inputValue, this.paginationHead)
      setPaginationPagesCount(this.count)
    }
  }

  public countUpdate() {
    this.count -= 1
    this.pageNumber.elem.textContent = `${this.count}`
  }

  public inputUpdateCount() {
    this.count = 1
    this.pageNumber.elem.textContent = `${this.count}`
  }
}
