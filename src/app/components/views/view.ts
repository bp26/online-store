import { Controller } from '../controllers/controller';
import { ProductsView } from './productsView';
import { CartView } from '../views/cartView'

export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
  private buttonCart: HTMLButtonElement;
  private cart: CartView | undefined
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
    const arrSummaryData = this.getSummaryData()
    this.cart = new CartView(this.root, this.controller, arrSummaryData, this.btnNeg, this.btnPos, this.destroyProductCart)
  }

  mountDetailsPage(id: number): void {
    this.root.innerHTML = '';
  }

  getSummaryData(): number[] {
    return this.controller.getSummaryData()
  }

  disabledBtnCart(): void {
    const openCart = this.controller.toggleBtnCart()
    if (openCart) {
      this.buttonCart.disabled = true
    } else {
      this.buttonCart.disabled = false
    }
  }

  summaryContentCart(arg: number[]) {
    this.cart?.summaryContent(arg)
  }

  destroyProductCart = (price: number, id: number) => {
    this.controller.toggleCountProductCart(price, id, false)
    this.summaryContentCart(this.controller.getSummaryData())
  }

  btnNeg = (price: number, id: number): void => {
    this.controller.toggleCountProductCart(price, id, false)
    this.summaryContentCart(this.controller.getSummaryData())
  }

  btnPos = (price: number, id: number): void => {
    this.controller.toggleCountProductCart(price, id, true)
    this.summaryContentCart(this.controller.getSummaryData())
  }
}
