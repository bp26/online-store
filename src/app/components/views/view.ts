import { Controller } from '../controllers/controller';
import { ProductsView } from './productsView';
import { CartView } from '../views/cartView'

export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
  private buttonCart: HTMLButtonElement;
  constructor(root: HTMLElement) {
    this.root = root;
    this.buttonCart = <HTMLButtonElement>document.querySelector('.cart')
    this.buttonCart.onclick = () => this.mountCartPage()
    this.controller = new Controller(this);
    this.mountProductsPage();
  }

  mountProductsPage(): void {
    this.root.innerHTML = '';
    const productsCallback = this.controller.handleProductsCallback.bind(this.controller);
    const products = new ProductsView(this.root, this.controller.handleProductsInit(), productsCallback);
  }

  mountCartPage(): void {
    this.root.innerHTML = '';
    this.disabledBtnCart()
    const cart = new CartView(this.root, this.controller.model.cart)
  }

  mountDetailsPage(id: number): void {
    this.root.innerHTML = '';
  }

  disabledBtnCart(): void {
    if (this.controller.model.openCart) {
      this.controller.model.openCart = false
      this.buttonCart.disabled = false
    }
    this.controller.model.openCart = true
    this.buttonCart.disabled = true
  }
}
