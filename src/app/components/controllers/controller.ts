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

  public handleProductsCallback(action: ProductsAction, id: number): void {
    switch (action) {
      case ProductsAction.add:
        this.model.cart.toggleProduct(id);
        console.log(this.model.cart.getCartList());
        break;
      case ProductsAction.details:
        this.view.mountDetailsPage(id);
        break;
    }
  }

  public handleFiltersCallback(action: FiltersAction, filtersData?: FiltersData): void {
    switch (action) {
      case FiltersAction.filter:
        if (filtersData) this.model.filter.setFilter(filtersData);
        break;
      case FiltersAction.reset:
        this.model.filter.resetFilters();
        break;
      case FiltersAction.copy:
        break;
    }
  }
}
