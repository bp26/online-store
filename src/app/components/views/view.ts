import { Controller } from '../controllers/controller';
import { ProductsView } from './productsView';
import { CartView } from '../views/cartView'




export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = new Controller();
    this.mountProductsPage();

  }

  mountProductsPage(): void {
    this.root.innerHTML = '';
    const products = new ProductsView(this.root, this.controller.handleProductsData());
  }

  mountCartPage(): void {
    this.root.innerHTML = '';
    const cart = new CartView(this.root)
  }

  mountDetailsPage(): void {
    this.root.innerHTML = '';
  }
}
