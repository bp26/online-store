import { Model } from '../models/model';
import { CartList, ProductsData } from '../../types/types';
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

  searchDataCart() {

  }

  toggleBtnCart(): Boolean {
    return this.model.toggleOpenCart()
  }

  handleProductsCallback(action: ProductsAction, id: number, price: number): void {
    if (action === ProductsAction.add) {
      this.model.productCart(id, price);
      console.log(this.model.cart.getCartList());
    } else if (action === ProductsAction.details) {
      this.view.mountDetailsPage(id);
    }
  }

  getDataCart(): IProduct[] {
    return this.model.getDataCart()
  }
}
