import { Controller } from '../controllers/controller';
import { ProductsView } from './productsView';

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
    const products = new ProductsView(this.root, this.controller.handleProductsInit());
  }

  mountCartPage(): void {
    this.root.innerHTML = '';
  }

  mountDetailsPage(): void {
    this.root.innerHTML = '';
  }
}
