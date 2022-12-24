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
  private getValueInput: (value: number) => void
  private getValueContentCart: () => number
  private getCartList: (id: number) => number[]
  private arrSummaryOrHeaderView: [CartSummaryContent, CartProductCard]

  constructor(parent: HTMLElement, controller: Controller, arraySummaryData: number[], btnNeg: funcVoid, btnPos: funcVoid, destroyCart: funcVoid, matrixCart: () => IProduct[][], getValueInput: (value: number) => void, getValueContentCart: () => number, getCartList: (id: number) => number[]) {
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
    this.arrSummaryOrHeaderView =  this.drawCart()
  }

  drawCart(): [CartSummaryContent, CartProductCard] {
    const mainContentCart = new Element(this.elem, 'section', 'cart-content')
    const summaryBlock = new Element(this.elem, 'section', 'cart-summary')
    const headerContent = new CartHeaderContent(mainContentCart.elem, this.getValueInput, this.updateCartContent)
    const productCardContent = new CartProductCard(mainContentCart.elem, this.matrixCart(), this.btnNeg, this.btnPos, this.destroyCart, this.getValueContentCart, this.getCartList)
    const summaryContent = new CartSummaryContent(summaryBlock.elem, this.arraySummaryData)
    return [summaryContent, productCardContent]
  }

  summaryContent(arg: number[]) {
    this.arrSummaryOrHeaderView[0].toggleContent(arg)
  }

  updateCartContent = (value: number) => {
    this.arrSummaryOrHeaderView[1].updateCart(value)
  }


}

