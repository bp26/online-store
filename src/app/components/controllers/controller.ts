import { Model } from '../models/model';
import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
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

  private handleProductsCallback(action: ProductsAction, id: number, price: number): void {
    switch (action) {
      case ProductsAction.ADD:
        this.model.cart.toggleProduct(id, price);
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

  getSummaryData(): number[] {
    return this.model.getSummaryData();
  }

  toggleBtnCart(flag: boolean): boolean {
    return this.model.toggleOpenCart(flag);
  }

  toggleCountProductCart(price: number, id: number, flag: boolean): void {
    this.model.toggleCountProductCart(price, id, flag);
  }

  getCartList(id: number): number[] {
    return this.model.getCartList(id);
  }

  getMatrixCart(value: number): IProduct[][] {
    return this.model.getMatrixCart(value);
  }

  togglePaginationHead(flag: boolean): void {
    this.model.togglePaginationHead(flag);
  }

  getPaginationHead(): number {
    return this.model.getPaginationHead();
  }

  getPaginationPagesCount(): number {
    return this.model.getPaginationPagesCount();
  }

  setPaginationPagesCount(count: number): void {
    this.model.setPaginationPagesCount(count);
  }

  paginationHeadValue(head: number) {
    return this.model.paginationHeadValue(head);
  }

  inputUpdatePaginationHead(): void {
    this.model.inputUpdatePaginationHead();
  }

  setPaginationInputValue(count: number): void {
    this.model.setPaginationInputValue(count);
  }

  getPaginationInputValue(): number {
    return this.model.getPaginationInputValue();
  }

  validationInputSummary = (value: string): string[] | false => {
    return this.model.validationInputSummary(value);
  };

  setDiscountListItem(flag: boolean): void {
    this.model.setDiscountListItem(flag);
  }

  getDiscountListItem(): number {
    return this.model.getDiscountListItem();
  }

  setNameDiscount(name: string, discount: string): void {
    this.model.setNameDiscount(name, discount);
  }

  deleteNameDiscount(name: string): void {
    this.model.deleteNameDiscount(name);
  }

  getNameDiscount(name: string): boolean {
    return this.model.getNameDiscount(name);
  }

  calculateProcent(): number {
    return this.model.calculateProcent();
  }

  setDiscountProcent(flag: boolean, discount: number): void {
    this.model.setDiscountProcent(flag, discount);
  }

  getValueDiscountData(): Map<string, string> {
    return this.model.getValueDiscountData();
  }
}
