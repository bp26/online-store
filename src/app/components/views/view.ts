import { Controller } from '../controllers/controller';
import { ProductsPageView } from './productsPageView/productsPageView';
import { CartView } from '../views/cartView';
import { IProduct } from '../../types/interfaces';
import { ModalView } from './form/modalView';

export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
  productsPage?: ProductsPageView;
  private buttonCart: HTMLButtonElement;
  private pageMain: HTMLHeadElement;
  private inputValue: number;
  private cart: CartView | undefined;
  private dataMatrix: IProduct[][] | undefined;
  constructor(root: HTMLElement) {
    this.root = root;
    this.dataMatrix;
    this.inputValue = 0;
    this.buttonCart = <HTMLButtonElement>document.querySelector('.cart');
    this.pageMain = <HTMLHeadElement>document.querySelector('.shop-name');
    this.pageMain.onclick = () => this.mountProductsPage();
    this.buttonCart.onclick = () => this.mountCartPage();
    this.controller = new Controller(this);
    this.mountProductsPage();
  }

  public mountProductsPage = (): void => {
    this.root.innerHTML = '';
    this.disabledBtnCart(false);
    this.productsPage = new ProductsPageView(this.root, this.controller.handleProductsPageInit(), this.controller.handleProductsPageCallbacks());
    this.mountModal()
  };

  public mountCartPage(): void {
    this.root.innerHTML = '';
    this.disabledBtnCart(true);
    const arrSummaryData = this.getSummaryData();
    this.cart = new CartView(
      this.root,
      arrSummaryData,
      this.btnNeg,
      this.btnPos,
      this.destroyProductCart,
      this.getValueInput,
      this.getValueContentCart,
      this.getCartList,
      this.btnPagination,
      this.getPaginationHead,
      this.paginationHeadValue,
      this.inputUpdatePaginationHead,
      this.mountDetailsPage,
      this.getPaginationPagesCount,
      this.setPaginationPagesCount,
      this.setPaginationInputValue,
      this.getPaginationInputValue,
      this.validationInputSummary,
      this.setDiscountListItem,
      this.getDiscountListItem,
      this.setNameDiscount,
      this.getNameDiscount,
      this.deleteNameDiscount,
      this.calculateProcent,
      this.setDiscountProcent,
      this.getValueDiscountData,
      this.mountModal
    );
  }

  private mountModal = (): void => {
    new ModalView(this.clearCart, this.mountProductsPage);
  };

  public mountDetailsPage = (id: number): void => {
    this.root.innerHTML = '';
    this.disabledBtnCart(false);
  };

  private getSummaryData(): number[] {
    return this.controller.getSummaryData();
  }

  private disabledBtnCart(flag: boolean): void {
    const openCart = this.controller.toggleBtnCart(flag);
    openCart ? (this.buttonCart.disabled = true) : (this.buttonCart.disabled = false);
  }

  private summaryContentCart(arg: number[]) {
    this.cart?.summaryContent(arg);
  }

  private matrixCart = (): IProduct[][] => {
    const dataMatrix: IProduct[][] = this.controller.getMatrixCart(this.inputValue);
    this.dataMatrix = dataMatrix;
    if (this.dataMatrix) {
      return this.dataMatrix;
    }
    throw new Error('Array dataMatrix is null');
  };

  private getValueInput = (value: number): IProduct[][] => {
    this.inputValue = value;
    this.matrixCart();
    if (this.dataMatrix) {
      return this.dataMatrix;
    }
    throw new Error('Array dataMatrix is null');
  };

  private getValueContentCart = (): number => {
    return this.inputValue;
  };

  private getCartList = (id: number): number[] => {
    return this.controller.getCartList(id);
  };

  private destroyProductCart = (price: number, id: number): void => {
    this.controller.toggleCountProductCart(price, id, false);
    this.controller.getMatrixCart(this.inputValue);
    this.summaryContentCart(this.controller.getSummaryData());
  };

  private paginationHeadValue = (head: number): number => {
    const toggle = this.controller.paginationHeadValue(head);
    if (!toggle) {
      this.cart?.countHeaderUpdate();
    }
    return this.controller.getPaginationHead();
  };

  private btnNeg = (price: number, id: number): void => {
    this.controller.toggleCountProductCart(price, id, false);
    this.summaryContentCart(this.controller.getSummaryData());
  };

  private btnPos = (price: number, id: number): void => {
    this.controller.toggleCountProductCart(price, id, true);
    this.summaryContentCart(this.controller.getSummaryData());
  };

  private btnPagination = (flag: boolean): number => {
    this.togglePaginationHead(flag);
    return this.getPaginationHead();
  };

  private togglePaginationHead(flag: boolean): void {
    this.controller.togglePaginationHead(flag);
  }

  private getPaginationHead = (): number => {
    return this.controller.getPaginationHead();
  };

  private inputUpdatePaginationHead = (): void => {
    this.controller.inputUpdatePaginationHead();
  };

  private getPaginationPagesCount = (): number => {
    return this.controller.getPaginationPagesCount();
  };

  private setPaginationPagesCount = (count: number): void => {
    this.controller.setPaginationPagesCount(count);
  };

  private setPaginationInputValue = (count: number): void => {
    this.controller.setPaginationInputValue(count);
  };

  private getPaginationInputValue = (): number => {
    return this.controller.getPaginationInputValue();
  };

  private validationInputSummary = (value: string): string[] | false => {
    return this.controller.validationInputSummary(value);
  };

  private setDiscountListItem = (flag: boolean): void => {
    this.controller.setDiscountListItem(flag);
  };

  private getDiscountListItem = (): number => {
    return this.controller.getDiscountListItem();
  };

  private setNameDiscount = (name: string, discount: string): void => {
    this.controller.setNameDiscount(name, discount);
  };

  private getNameDiscount = (name: string): boolean => {
    return this.controller.getNameDiscount(name);
  };

  private deleteNameDiscount = (name: string): void => {
    this.controller.deleteNameDiscount(name);
  };

  private calculateProcent = (): number => {
    return this.controller.calculateProcent();
  };

  private setDiscountProcent = (flag: boolean, discount: number): void => {
    this.controller.setDiscountProcent(flag, discount);
  };

  private getValueDiscountData = (): Map<string, string> => {
    return this.controller.getValueDiscountData();
  };

  private clearCart = (): void => {
    this.controller.clearCart();
    this.cart?.countHeaderUpdate();
    this.cart?.drawEmptyCart();
  };
}
