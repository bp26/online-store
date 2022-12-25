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

  toggleBtnCart(flag: boolean): boolean {
    return this.model.toggleOpenCart(flag)
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

  getCartList(id: number) {
    return this.model.getCartList(id)
  }

  getMatrixCart(value: number): IProduct[][] {
    return this.model.getMatrixCart(value)
  }

  togglePaginationHead(flag: boolean): void {
    this.model.togglePaginationHead(flag)
  }

  getPaginationHead(): number {
    return this.model.getPaginationHead()
  }

  paginationHeadValue(head: number) {
    return this.model.paginationHeadValue(head)
  }

  inputUpdatePaginationHead() {
    this.model.inputUpdatePaginationHead()
  }
}
