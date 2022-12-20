import { Controller } from '../controllers/controller';
import { ProductsView } from './productsView';
import { FiltersView } from './filters/filtersView';

export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
  constructor(root: HTMLElement) {
    this.root = root;
    this.controller = new Controller(this);
    this.mountProductsPage();
  }

  public mountProductsPage(): void {
    this.root.innerHTML = '';
    const filtersCallback = this.controller.handleFiltersCallback.bind(this.controller);
    const filters = new FiltersView(this.root, this.controller.handleFiltersInit(), filtersCallback);

    const productsCallback = this.controller.handleProductsCallback.bind(this.controller);
    const products = new ProductsView(this.root, this.controller.handleProductsInit(), productsCallback);
  }

  public mountCartPage(): void {
    this.root.innerHTML = '';
  }

  public mountDetailsPage(id: number): void {
    this.root.innerHTML = '';
  }
}
