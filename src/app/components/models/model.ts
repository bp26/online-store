import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { products } from '../../../assets/data/products';
import { Cart } from './cart';

export class Model {
  readonly data: ProductsData;
  readonly cart: Cart;
  private openCart: boolean;
  constructor() {
    this.data = products;
    this.cart = new Cart();
    this.openCart = false;
  }

  getData(): ProductsData {
    return this.data;
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
    if (flag) {
      return (this.openCart = true);
    }
    return (this.openCart = false);
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
}
