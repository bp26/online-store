import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { products } from '../../../assets/data/products';
import { Cart } from './cart';
import { Filter } from './filter';
import { Sort } from './sort';
import { Search } from './search';
import { IProductsPageData } from '../../types/interfaces';
import { IProductsOptions } from '../../types/interfaces';
import { IProductsHeaderOptions } from '../../types/interfaces';
import { ProductDisplay } from '../../types/enums';
import { IDetailsPageData } from '../../types/interfaces';
import { binarySearch } from '../../utils/binarySearch';

export class Model {
  readonly data: ProductsData;
  readonly filter: Filter;
  readonly sort: Sort;
  readonly search: Search;
  readonly cart: Cart;
  private openCart = false;
  private productDisplay: ProductDisplay = ProductDisplay.DETAILED;

  constructor() {
    this.data = products;
    this.cart = new Cart();
    this.filter = new Filter();
    this.sort = new Sort();
    this.search = new Search();
  }

  private getData(): ProductsData {
    return this.data;
  }

  private transformData(data: ProductsData): ProductsData {
    const filteredData = this.filter.filterData(data);
    const searchedData = this.search.searchData(filteredData);
    const sortedData = this.sort.sortData(searchedData);

    return sortedData;
  }

  public getProductsPageData(): IProductsPageData {
    const initialData = this.getData();
    const transData = this.transformData(initialData);
    return {
      productsOptions: this.setProductsOptions(transData),
      filterOptions: this.filter.setFilterOptions(initialData, transData),
      headerOptions: this.setHeaderOptions(transData),
    };
  }

  private setProductsOptions(data: ProductsData): IProductsOptions {
    return {
      data,
      cartArray: this.cart.getCartArray(),
      productDisplay: this.productDisplay,
    };
  }

  private setHeaderOptions(data: ProductsData): IProductsHeaderOptions {
    return {
      sortType: this.sort.getType(),
      productsCount: data.length,
    };
  }

  public setProductDisplay(display: ProductDisplay): void {
    this.productDisplay = display;
  }

  public getProductDisplay(): ProductDisplay {
    return this.productDisplay;
  }

  public getDetailsPageData(id: number): IDetailsPageData {
    const data = this.getData();
    return {
      product: binarySearch(data, id),
      inCart: false,
    };
  }

  public getCartPageData(): ProductsData {
    return this.getData().filter((product) => this.cart.getCartArray().includes(product.id));
  }

  getSummaryData(): number[] {
    return this.cart.getSummaryData();
  }

  togglePaginationHead(flag: boolean): void {
    this.cart.togglePaginationHead(flag);
  }

  getPaginationHead(): number {
    return this.cart.getPaginationHead();
  }

  getPaginationPagesCount(): number {
    return this.cart.getPaginationPagesCount();
  }

  setPaginationPagesCount(count: number): void {
    this.cart.setPaginationPagesCount(count);
  }

  setPaginationInputValue(count: number): void {
    this.cart.setPaginationInputValue(count);
  }

  getPaginationInputValue(): number {
    return this.cart.getPaginationInputValue();
  }

  paginationHeadValue(head: number): boolean {
    return this.cart.paginationHeadValue(head);
  }

  inputUpdatePaginationHead(): void {
    this.cart.inputUpdatePaginationHead();
  }

  toggleCountProductCart(price: number, id: number, flag: boolean): void {
    this.cart.amountProductCart(flag);
    this.cart.summaProductCart(flag, price);
    this.cart.incOrDecProduct(id, price, flag);
  }

  productCart(id: number, price: number): void {
    this.cart.toggleProduct(id, price);
  }

  toggleOpenCart(flag: boolean): boolean {
    flag ? (this.openCart = true) : (this.openCart = false);
    return this.openCart;
  }

  getCartList(id: number): number[] {
    return this.cart.getCartList(id);
  }

  getMatrixCart(value: number): IProduct[][] {
    return this.cart.matrixCard(value);
  }

  validationInputSummary = (value: string): string[] | false => {
    return this.cart.validationInputSummary(value);
  };

  setDiscountListItem(flag: boolean): void {
    this.cart.setDiscountListItem(flag);
  }

  getDiscountListItem(): number {
    return this.cart.getDiscountListItem();
  }

  setNameDiscount(name: string, discount: string): void {
    this.cart.setNameDiscount(name, discount);
  }

  deleteNameDiscount(name: string): void {
    this.cart.deleteNameDiscount(name);
  }

  getValueDiscountData(): Map<string, string> {
    return this.cart.getValueDiscountData();
  }

  getNameDiscount(name: string): boolean {
    return this.cart.getNameDiscount(name);
  }

  calculateProcent(): number {
    return this.cart.calculateProcent();
  }

  setDiscountProcent(flag: boolean, discount: number): void {
    this.cart.setDiscountProcent(flag, discount);
  }

  clearCart() {
    this.cart.clearCart();
  }
}
