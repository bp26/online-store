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
    const { data, filterOptions } = this.controller.handleProductsPageInit();

    const filtersCallback = this.controller.handleFiltersCallback.bind(this.controller);
    const filters = new FiltersView(this.root, filterOptions, filtersCallback);

    const productsCallback = this.controller.handleProductsCallback.bind(this.controller);
    const products = new ProductsView(this.root, data, productsCallback);
  }

  public mountCartPage(): void {
    this.root.innerHTML = '';
  }

  public mountDetailsPage(id: number): void {
    this.root.innerHTML = '';
  }
}
