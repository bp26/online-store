import { Element } from '../element';
import { Cart } from '../models/cart'

export class CartView extends Element {
  private cart: Cart
  constructor(parent: HTMLElement, cart: Cart ) {
    super(parent, 'div', 'cart__page')
    this.cart = cart
    this.drawCart()
  }

  drawCart() {
    const dataCart = this.cart.list
    console.log(dataCart)
  }
}
