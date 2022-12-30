import { Controller } from '../controllers/controller';
import { ProductsView } from './productsView';
import { CartView } from '../views/cartView';
import { IProduct } from '../../types/interfaces';

export class View {
  readonly root: HTMLElement;
  readonly controller: Controller;
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

  mountProductsPage(): void {
    this.root.innerHTML = '';
    this.disabledBtnCart(false);
    const productsCallback = this.controller.handleProductsCallback.bind(this.controller);
    const productsIgnor = new ProductsView(this.root, this.controller.handleProductsInit(), productsCallback);
  }

  mountCartPage(): void {
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
      this.getValueDiscountData
    );
  }

  mountDetailsPage = (id: number): void => {
    this.root.innerHTML = '';
    this.disabledBtnCart(false);
  };

  getSummaryData(): number[] {
    return this.controller.getSummaryData();
  }

  disabledBtnCart(flag: boolean): void {
    const openCart = this.controller.toggleBtnCart(flag);
    if (openCart) {
      this.buttonCart.disabled = true;
    } else {
      this.buttonCart.disabled = false;
    }
  }

  summaryContentCart(arg: number[]) {
    this.cart?.summaryContent(arg);
  }

  matrixCart = (): IProduct[][] => {
    const dataMatrix: IProduct[][] = this.controller.getMatrixCart(this.inputValue);
    this.dataMatrix = dataMatrix;
    if (this.dataMatrix) {
      return this.dataMatrix;
    }
    throw new Error('Array dataMatrix is null');
  };

  getValueInput = (value: number): IProduct[][] => {
    this.inputValue = value;
    this.matrixCart();
    if (this.dataMatrix) {
      return this.dataMatrix;
    }
    throw new Error('Array dataMatrix is null');
  };

  getValueContentCart = () => {
    return this.inputValue;
  };

  getCartList = (id: number): number[] => {
    return this.controller.getCartList(id);
  };

  destroyProductCart = (price: number, id: number) => {
    this.controller.toggleCountProductCart(price, id, false);
    this.controller.getMatrixCart(this.inputValue);
    this.summaryContentCart(this.controller.getSummaryData());
  };

  paginationHeadValue = (head: number) => {
    const toggle = this.controller.paginationHeadValue(head);
    if (!toggle) {
      this.cart?.countHeaderUpdate();
    }
    return this.controller.getPaginationHead();
  };

  btnNeg = (price: number, id: number): void => {
    this.controller.toggleCountProductCart(price, id, false);
    this.summaryContentCart(this.controller.getSummaryData());
  };

  btnPos = (price: number, id: number): void => {
    this.controller.toggleCountProductCart(price, id, true);
    this.summaryContentCart(this.controller.getSummaryData());
  };

  btnPagination = (flag: boolean): number => {
    this.togglePaginationHead(flag);
    return this.getPaginationHead();
  };

  togglePaginationHead(flag: boolean): void {
    this.controller.togglePaginationHead(flag);
  }

  getPaginationHead = (): number => {
    return this.controller.getPaginationHead();
  };

  inputUpdatePaginationHead = () => {
    this.controller.inputUpdatePaginationHead();
  };

  getPaginationPagesCount = (): number => {
    return this.controller.getPaginationPagesCount();
  };

  setPaginationPagesCount = (count: number): void => {
    this.controller.setPaginationPagesCount(count);
  };

  setPaginationInputValue = (count: number): void => {
    this.controller.setPaginationInputValue(count);
  };

  getPaginationInputValue = (): number => {
    return this.controller.getPaginationInputValue();
  };

  validationInputSummary = (value: string): string[] | false => {
    return this.controller.validationInputSummary(value);
  };

  setDiscountListItem = (flag: boolean): void => {
    this.controller.setDiscountListItem(flag);
  };

  getDiscountListItem = (): number => {
    return this.controller.getDiscountListItem();
  };

  setNameDiscount = (name: string, discount: string): void => {
    this.controller.setNameDiscount(name, discount);
  };

  getNameDiscount = (name: string): boolean => {
    return this.controller.getNameDiscount(name);
  };

  deleteNameDiscount = (name: string): void => {
    this.controller.deleteNameDiscount(name);
  };

  calculateProcent = (): number => {
    return this.controller.calculateProcent();
  };

  setDiscountProcent = (flag: boolean, discount: number): void => {
    this.controller.setDiscountProcent(flag, discount);
  };

  getValueDiscountData = (): Map<string, string> => {
    return this.controller.getValueDiscountData();
  };
}
