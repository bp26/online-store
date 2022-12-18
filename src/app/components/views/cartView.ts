import { Element } from '../element';
import { Controller } from '../controllers/controller'
import { CartProductCard } from './cartProductCard'
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
    const ul = new Element(this.elem, 'ul', 'cart-menu')
    const productCardContent = new CartProductCard(ul.elem, arrayProductCart)
  }
}

