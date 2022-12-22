import { Element } from '../element';
import { Controller } from '../controllers/controller'
import { CartProductCard } from './cartComponents/cartProductCard'
import { CartHeaderContent } from './cartComponents/cartHeader'
import { CartSummaryContent } from './cartComponents/cartSummary'
import { IProduct } from '../../types/interfaces';
import { btnCountCart } from '../../types/types'

export class CartView extends Element {
  private controller: Controller
  private arraySummaryData: number[]
  private btnNeg: btnCountCart
  private btnPos: btnCountCart
  private summaryView: CartSummaryContent
  constructor(parent: HTMLElement, controller: Controller, arraySummaryData: number[], btnNeg: btnCountCart, btnPos: btnCountCart) {
    super(parent, 'div', 'cart-page')
    this.controller = controller
    this.arraySummaryData = arraySummaryData
    this.btnNeg = btnNeg
    this.btnPos = btnPos
    this.summaryView =  this.drawCart()
  }

  drawCart(): CartSummaryContent {
    const arrayProductCart: IProduct[] = this.controller.getDataCart()
    const mainContentCart = new Element(this.elem, 'section', 'cart-content')
    const summaryBlock = new Element(this.elem, 'section', 'cart-summary')
    const headerContent = new CartHeaderContent(mainContentCart.elem)
    const productCardContent = new CartProductCard(mainContentCart.elem, arrayProductCart, this.btnNeg, this.btnPos)
    const summaryContent = new CartSummaryContent(summaryBlock.elem, this.arraySummaryData)
    return summaryContent
  }

  summaryContent(arg: number[]) {
    this.summaryView.toggleContent(arg)
  }
}

