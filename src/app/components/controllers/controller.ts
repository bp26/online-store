import { Model } from '../models/model';
import { ProductsData } from '../../types/types';
import { View } from '../views/view';
import { ProductsAction } from '../../types/enums';
import { FiltersAction } from '../../types/enums';
import { FiltersData } from '../../types/types';
import { IProductsPageData } from '../../types/interfaces';

export class Controller {
  readonly model: Model;
  readonly view: View;
  constructor(view: View) {
    this.view = view;
    this.model = new Model();
  }

  public handleProductsPageInit(): IProductsPageData {
    return this.model.getProductsPageData();
  }

  public handleProductsPageCallbacks() {
    return {
      productsCallback: this.handleProductsCallback.bind(this),
      filtersCallback: this.handleFiltersCallback.bind(this),
    };
  }

  private handleProductsCallback(action: ProductsAction, id: number): void {
    switch (action) {
      case ProductsAction.ADD:
        this.model.cart.toggleProduct(id);
        break;
      case ProductsAction.DETAILS:
        this.view.mountDetailsPage(id);
        break;
    }
  }

  private handleFiltersCallback(action: FiltersAction, filtersData?: FiltersData): void {
    switch (action) {
      case FiltersAction.FILTER:
        if (filtersData) this.model.filter.setFilter(filtersData);
        if (this.view.productsPage) this.view.productsPage.updateOnFilter(this.handleProductsPageInit(), this.handleProductsPageCallbacks());
        break;
      case FiltersAction.RESET:
        this.model.filter.resetFilters();
        if (this.view.productsPage) this.view.productsPage.updateOnFilter(this.handleProductsPageInit(), this.handleProductsPageCallbacks());
        break;
      case FiltersAction.COPY:
        break;
    }
  }
}
