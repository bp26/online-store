import { Element } from '../element';
import { Controller } from '../controllers/controller'
import { CartProductCard } from './cartComponents/cartProductCard'
import { CartHeaderContent } from './cartComponents/cartHeader'
import { CartSummaryContent } from './cartComponents/cartSummary'
import { IProduct } from '../../types/interfaces';
import { funcVoid } from '../../types/types'

export class CartView extends Element {
  private controller: Controller
  private arraySummaryData: number[]
  private btnNeg: funcVoid
  private btnPos: funcVoid
  private destroyCart: funcVoid
  private matrixCart: () => IProduct[][]
  private getValueInput: (value: number) => IProduct[][]
  private getValueContentCart: () => number
  private getCartList: (id: number) => number[]
  private btnPagination: (flag: boolean) => number
  private getPaginationHead: () => number
  private paginationHeadValue: (head: number) => number
  private inputUpdatePaginationHead: () => void
  private mountDetailsPage: (id: number) => void
  private arrSummaryOrHeaderView: [CartSummaryContent, CartHeaderContent, CartProductCard]

  constructor(parent: HTMLElement, controller: Controller, arraySummaryData: number[], btnNeg: funcVoid, btnPos: funcVoid, destroyCart: funcVoid, matrixCart: () => IProduct[][], getValueInput: (value: number) => IProduct[][], getValueContentCart: () => number, getCartList: (id: number) => number[], btnPagination: (flag: boolean) => number, getPaginationHead: () => number,  paginationHeadValue: (head: number) => number, inputUpdatePaginationHead: () => void, mountDetailsPage: (id: number) => void) {
    super(parent, 'div', 'cart-page')
    this.controller = controller
    this.arraySummaryData = arraySummaryData
    this.btnNeg = btnNeg
    this.btnPos = btnPos
    this.destroyCart = destroyCart
    this.matrixCart = matrixCart
    this.getValueInput = getValueInput
    this.getValueContentCart = getValueContentCart
    this.getCartList = getCartList
    this.btnPagination = btnPagination
    this.getPaginationHead = getPaginationHead
    this.paginationHeadValue =  paginationHeadValue
    this.inputUpdatePaginationHead = inputUpdatePaginationHead
    this.mountDetailsPage = mountDetailsPage
    this.arrSummaryOrHeaderView =  this.drawCart()
  }

  drawCart(): [CartSummaryContent, CartHeaderContent, CartProductCard] {
    const mainContentCart = new Element(this.elem, 'section', 'cart-content')
    const summaryBlock = new Element(this.elem, 'section', 'cart-summary')
    const headerContent = new CartHeaderContent(mainContentCart.elem, this.getValueInput, this.updateCartContent, this.btnPagination, this.inputUpdateHeaderCount, this.inputUpdatePaginationHead)
    const productCardContent = new CartProductCard(mainContentCart.elem, this.matrixCart(), this.btnNeg, this.btnPos, this.destroyCart, this.getValueContentCart, this.getCartList,  this.getPaginationHead, this.paginationHeadValue, this.countHeaderUpdate, this.mountDetailsPage)
    const summaryContent = new CartSummaryContent(summaryBlock.elem, this.arraySummaryData)
    return [summaryContent, headerContent, productCardContent]
  }

  summaryContent(arg: number[]) {
    this.arrSummaryOrHeaderView[0].toggleContent(arg)
  }

  updateCartContent = (value: number, head: number) => {
    this.arrSummaryOrHeaderView[2].updateCart(value, head)
  }

  countHeaderUpdate = () => {
    this.arrSummaryOrHeaderView[1].countUpdate()
  }

  inputUpdateHeaderCount = () => {
    this.arrSummaryOrHeaderView[1].inputUpdateCount()
  }
}

