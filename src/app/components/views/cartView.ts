import { Element } from '../element';
import { Controller } from '../controllers/controller'
import { CartProductCard } from './cartComponents/cartProductCard'
import { CartHeaderContent } from './cartComponents/cartHeader'
import { CartSummaryContent } from './cartComponents/cartSummary'
import { IProduct } from '../../types/interfaces';

export class CartView extends Element {
  private controller: Controller
  constructor(parent: HTMLElement, controller: Controller ) {
    super(parent, 'div', 'cart-page')
    this.controller = controller
    this.drawCart()
  }

  drawCart() {
    const arrayProductCart: IProduct[] = this.controller.getDataCart()
    const mainContentCart = new Element(this.elem, 'section', 'cart-content')
    const summaryBlock = new Element(this.elem, 'section', 'cart-summary')
    const headerContent = new CartHeaderContent(mainContentCart.elem)
    const productCardContent = new CartProductCard(mainContentCart.elem, arrayProductCart)
    const summaryContent = new CartSummaryContent(summaryBlock.elem)
  }
}

