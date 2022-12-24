import { Model } from '../models/model';
import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { View } from '../views/view';
import { ProductsAction } from '../../types/enums';

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

  getSummaryData(): number[] {
    return this.model.getSummaryData()
  }

  toggleBtnCart(): Boolean {
    return this.model.toggleOpenCart()
  }

  toggleCountProductCart(price: number, id: number, flag: boolean): void {
    this.model.toggleCountProductCart(price, id, flag)
  }

  handleProductsCallback(action: ProductsAction, id: number, price: number): void {
    if (action === ProductsAction.add) {
      this.model.productCart(id, price);
    } else if (action === ProductsAction.details) {
      this.view.mountDetailsPage(id);
    }
  }

  getCartList(id: number, price: number) {
    return this.model.getCartList(id, price)
  }

  getMatrixCart(value: number): IProduct[][] {
    return this.model.getMatrixCart(value)
  }
}
