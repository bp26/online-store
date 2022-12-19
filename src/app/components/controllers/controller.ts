import { Model } from '../models/model';
import { ProductsData } from '../../types/types';
import { View } from '../views/view';
import { ProductsAction } from '../../types/enums';
import { IFilterOptions } from '../../types/interfaces';

export class Controller {
  readonly model: Model;
  readonly view: View;
  constructor(view: View) {
    this.view = view;
    this.model = new Model();
  }

  handleProductsInit(): ProductsData {
    return this.model.getData();
  }

  handleFiltersInit(): IFilterOptions {
    return this.model.getFilterOptions();
  }

  handleProductsCallback(action: ProductsAction, id: number): void {
    if (action === ProductsAction.add) {
      this.model.cart.toggleProduct(id);
      console.log(this.model.cart.getCartList());
    } else if (action === ProductsAction.details) {
      this.view.mountDetailsPage(id);
    }
  }
}
