import { Element } from '../element'
import { CartProductCard } from './cartComponents/cartProductCard'
import { CartHeaderContent } from './cartComponents/cartHeader'
import { CartSummaryContent } from './cartComponents/cartSummary'
import { IProduct } from '../../types/interfaces'
import { funcVoid } from '../../types/types'

export class CartView extends Element {
  private arraySummaryData: number[]
  private btnNeg: funcVoid
  private btnPos: funcVoid
  private destroyCart: funcVoid
  private getValueInput: (value: number) => IProduct[][]
  private getValueContentCart: () => number
  private getCartList: (id: number) => number[]
  private btnPagination: (flag: boolean) => number
  private getPaginationHead: () => number
  private paginationHeadValue: (head: number) => number
  private inputUpdatePaginationHead: () => void
  private mountDetailsPage: (id: number) => void
  private getPaginationPagesCount: () => number
  private setPaginationPagesCount: (count: number) => void
  private setPaginationInputValue: (value: number) => void
  private getPaginationInputValue: () => number
  private arrSummaryOrHeaderView: [CartSummaryContent, CartHeaderContent, CartProductCard] | []

  constructor(
    parent: HTMLElement,
    arraySummaryData: number[],
    btnNeg: funcVoid,
    btnPos: funcVoid,
    destroyCart: funcVoid,
    getValueInput: (value: number) => IProduct[][],
    getValueContentCart: () => number,
    getCartList: (id: number) => number[],
    btnPagination: (flag: boolean) => number,
    getPaginationHead: () => number,
    paginationHeadValue: (head: number) => number,
    inputUpdatePaginationHead: () => void,
    mountDetailsPage: (id: number) => void,
    getPaginationPagesCount: () => number,
    setPaginationPagesCount: (count: number) => void,
    setPaginationInputValue: (value: number) => void,
    getPaginationInputValue: () => number
  ) {
    super(parent, 'div', 'cart-page')
    this.arraySummaryData = arraySummaryData
    this.arrSummaryOrHeaderView = []
    this.btnNeg = btnNeg
    this.btnPos = btnPos
    this.destroyCart = destroyCart
    this.getValueInput = getValueInput
    this.getValueContentCart = getValueContentCart
    this.getCartList = getCartList
    this.btnPagination = btnPagination
    this.getPaginationHead = getPaginationHead
    this.paginationHeadValue = paginationHeadValue
    this.inputUpdatePaginationHead = inputUpdatePaginationHead
    this.mountDetailsPage = mountDetailsPage
    this.getPaginationPagesCount = getPaginationPagesCount
    this.setPaginationPagesCount = setPaginationPagesCount
    this.setPaginationInputValue = setPaginationInputValue
    this.getPaginationInputValue = getPaginationInputValue
    if (this.arraySummaryData[0] === 0) {
      this.drawEmptyCart()
    } else {
      this.drawCart()
    }
  }

  private drawCart(): void {
    const mainContentCart = new Element(this.elem, 'section', 'cart-content')
    const summaryBlock = new Element(this.elem, 'section', 'cart-summary')
    const headerContent = new CartHeaderContent(
      mainContentCart.elem,
      this.getValueInput,
      this.updateCartContent,
      this.btnPagination,
      this.inputUpdateHeaderCount,
      this.inputUpdatePaginationHead,
      this.getPaginationPagesCount,
      this.setPaginationPagesCount,
      this.getPaginationHead,
      this.setPaginationInputValue,
      this.getPaginationInputValue
    )
    const dataMatrix = headerContent.dataMatrix
    const productCardContent = new CartProductCard(
      mainContentCart.elem,
      dataMatrix,
      this.btnNeg,
      this.btnPos,
      this.destroyCart,
      this.getValueContentCart,
      this.getCartList,
      this.getPaginationHead,
      this.paginationHeadValue,
      this.mountDetailsPage,
      this.drawEmptyCart
    )
    const summaryContent = new CartSummaryContent(summaryBlock.elem, this.arraySummaryData)
    this.arrSummaryOrHeaderView = [summaryContent, headerContent, productCardContent]
  }

  private drawEmptyCart = () => {
    this.elem.innerHTML = ''
    const mainContentCartIgnor = new Element(this.elem, 'p', 'cart-empty', 'Cart is empty')
  }

  public summaryContent(arg: number[]) {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[0].toggleContent(arg)
    }
  }

  private updateCartContent = (value: number, head: number) => {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[2].updateCart(value, head)
    }
  }

  public countHeaderUpdate = () => {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[1].countUpdate()
    }
  }

  private inputUpdateHeaderCount = () => {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[1].inputUpdateCount()
    }
  }
}
