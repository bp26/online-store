import { Model } from '../models/model';
import { ProductsData } from '../../types/types';
import { View } from '../views/view';
import { ProductsAction } from '../../types/enums';
import { FiltersAction } from '../../types/enums';
import { IFilterOptions } from '../../types/interfaces';
import { FiltersData } from '../../types/types';

export class Controller {
  readonly model: Model;
  readonly view: View;
  constructor(view: View) {
    this.view = view;
    this.model = new Model();
  }

  public handleProductsInit(): ProductsData {
    return this.model.getData();
  }

  public handleFiltersInit(): IFilterOptions {
    return this.model.getFilterOptions();
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
        break;
      case FiltersAction.reset:
        break;
      case FiltersAction.copy:
        break;
    }
  }
}
