import { Controller } from '../controllers/controller';
import { ProductsPageView } from './productsPageView/productsPageView';

export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
  productsPage?: ProductsPageView;
  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = new Controller(this);
    this.mountProductsPage();
  }

  public mountProductsPage(): void {
    this.root.innerHTML = '';
    this.productsPage = new ProductsPageView(this.root, this.controller.handleProductsPageInit(), this.controller.handleProductsPageCallbacks());
  }

  public mountCartPage(): void {
    this.root.innerHTML = '';
  }

  public mountDetailsPage(id: number): void {
    this.root.innerHTML = '';
  }
}
