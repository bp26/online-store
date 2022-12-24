import { Controller } from '../controllers/controller';
import { ProductsView } from './productsView';
import { CartView } from '../views/cartView'
import { IProduct } from '../../types/interfaces';

export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
  private buttonCart: HTMLButtonElement;
  private inputValue: number;
  private cart: CartView | undefined
  private dataMatrix: IProduct[][] | undefined
  constructor(root: HTMLElement) {
    this.root = root;
    this.dataMatrix;
    this.inputValue = 0
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
    this.cart = new CartView(this.root, this.controller, arrSummaryData, this.btnNeg, this.btnPos, this.destroyProductCart, this.matrixCart, this.getValueInput, this.getValueContentCart, this.getCartList)
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

  matrixCart = (): IProduct[][] => {
    if (this.dataMatrix) {
      return this.dataMatrix
    }
    throw new Error ('Array dataMatrix is null')
  }

  getValueInput = (value: number): void =>  {
    const dataMatrix: IProduct[][] = this.controller.getMatrixCart(value)
    this.inputValue = value
    this.dataMatrix = dataMatrix
  }

  getValueContentCart = () => {
    return this.inputValue
  }

  getCartList = (id: number, price: number) => {
    return this.controller.getCartList(id, price)
  }

  destroyProductCart = (price: number, id: number) => {
    this.controller.toggleCountProductCart(price, id, false)
    this.controller.getMatrixCart(this.inputValue)
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
