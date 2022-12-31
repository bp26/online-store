import { Element } from '../element';
import { CartProductCard } from './cartComponents/cartProductCard';
import { CartHeaderContent } from './cartComponents/cartHeader';
import { CartSummaryContent } from './cartComponents/cartSummary';
import { IProduct } from '../../types/interfaces';
import { funcVoid } from '../../types/types';
import { HTMLTag } from '../../types/enums';

export class CartView extends Element {
  private arraySummaryData: number[];
  private btnNeg: funcVoid;
  private btnPos: funcVoid;
  private destroyCart: funcVoid;
  private getValueInput: (value: number) => IProduct[][];
  private getValueContentCart: () => number;
  private getCartList: (id: number) => number[];
  private btnPagination: (flag: boolean) => number;
  private getPaginationHead: () => number;
  private paginationHeadValue: (head: number) => number;
  private inputUpdatePaginationHead: () => void;
  private mountDetailsPage: (id: number) => void;
  private getPaginationPagesCount: () => number;
  private setPaginationPagesCount: (count: number) => void;
  private setPaginationInputValue: (value: number) => void;
  private getPaginationInputValue: () => number;
  private validationInputSummary: (value: string) => string[] | false;
  private setDiscountListItem: (flag: boolean) => void;
  private getDiscountListItem: () => number;
  private setNameDiscount: (name: string, discount: string) => void;
  private getNameDiscount: (name: string) => boolean;
  private deleteNameDiscount: (name: string) => void;
  private calculateProcent: () => number;
  private setDiscountProcent: (flag: boolean, discount: number) => void;
  private getValueDiscountData: () => Map<string, string>;
  private arrSummaryOrHeaderView: [CartSummaryContent, CartHeaderContent, CartProductCard] | [];

  constructor(
    parent: HTMLElement,
    arraySummaryData: number[],
    btnNeg: funcVoid,
    btnPos: funcVoid,
    destroyCart: funcVoid,
    getValueInput: (value: number) => IProduct[][],
    getValueContentCart: () => number,
    getCartList: (id: number) => number[],
    btnPagination: (flag: boolean) => number,
    getPaginationHead: () => number,
    paginationHeadValue: (head: number) => number,
    inputUpdatePaginationHead: () => void,
    mountDetailsPage: (id: number) => void,
    getPaginationPagesCount: () => number,
    setPaginationPagesCount: (count: number) => void,
    setPaginationInputValue: (value: number) => void,
    getPaginationInputValue: () => number,
    validationInputSummary: (value: string) => string[] | false,
    setDiscountListItem: (flag: boolean) => void,
    getDiscountListItem: () => number,
    setNameDiscount: (name: string, discount: string) => void,
    getNameDiscount: (name: string) => boolean,
    deleteNameDiscount: (name: string) => void,
    calculateProcent: () => number,
    setDiscountProcent: (flag: boolean, discount: number) => void,
    getValueDiscountData: () => Map<string, string>
  ) {
    super(parent, HTMLTag.DIV, 'cart-page');
    this.arraySummaryData = arraySummaryData;
    this.arrSummaryOrHeaderView = [];
    this.btnNeg = btnNeg;
    this.btnPos = btnPos;
    this.destroyCart = destroyCart;
    this.getValueInput = getValueInput;
    this.getValueContentCart = getValueContentCart;
    this.getCartList = getCartList;
    this.btnPagination = btnPagination;
    this.getPaginationHead = getPaginationHead;
    this.paginationHeadValue = paginationHeadValue;
    this.inputUpdatePaginationHead = inputUpdatePaginationHead;
    this.mountDetailsPage = mountDetailsPage;
    this.getPaginationPagesCount = getPaginationPagesCount;
    this.setPaginationPagesCount = setPaginationPagesCount;
    this.setPaginationInputValue = setPaginationInputValue;
    this.getPaginationInputValue = getPaginationInputValue;
    this.validationInputSummary = validationInputSummary;
    this.setDiscountListItem = setDiscountListItem;
    this.getDiscountListItem = getDiscountListItem;
    this.setNameDiscount = setNameDiscount;
    this.getNameDiscount = getNameDiscount;
    this.deleteNameDiscount = deleteNameDiscount;
    this.calculateProcent = calculateProcent;
    this.setDiscountProcent = setDiscountProcent;
    this.getValueDiscountData = getValueDiscountData;
    if (this.arraySummaryData[0] === 0) {
      this.drawEmptyCart();
    } else {
      this.drawCart();
    }
  }

  private drawCart(): void {
    const mainContentCart = new Element(this.elem, HTMLTag.SECTION, 'cart-content');
    const summaryBlock = new Element(this.elem, HTMLTag.SECTION, 'cart-summary');
    const headerContent = new CartHeaderContent(
      mainContentCart.elem,
      this.getValueInput,
      this.updateCartContent,
      this.btnPagination,
      this.inputUpdateHeaderCount,
      this.inputUpdatePaginationHead,
      this.getPaginationPagesCount,
      this.setPaginationPagesCount,
      this.getPaginationHead,
      this.setPaginationInputValue,
      this.getPaginationInputValue
    );
    const dataMatrix = headerContent.dataMatrix;
    const productCardContent = new CartProductCard(
      mainContentCart.elem,
      dataMatrix,
      this.btnNeg,
      this.btnPos,
      this.destroyCart,
      this.getValueContentCart,
      this.getCartList,
      this.getPaginationHead,
      this.paginationHeadValue,
      this.mountDetailsPage,
      this.drawEmptyCart
    );
    const summaryContent = new CartSummaryContent(
      summaryBlock.elem,
      this.arraySummaryData,
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
    this.arrSummaryOrHeaderView = [summaryContent, headerContent, productCardContent];
  }

  private drawEmptyCart = (): void => {
    this.elem.innerHTML = '';
    const mainContentCartIgnor = new Element(this.elem, HTMLTag.P, 'cart-empty', 'Cart is empty');
  };

  public summaryContent(arg: number[]): void {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[0].toggleContent(arg);
    }
  }

  private updateCartContent = (value: number, head: number): void => {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[2].updateCart(value, head);
    }
  };

  public countHeaderUpdate = (): void => {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[1].countUpdate();
    }
  };

  private inputUpdateHeaderCount = (): void => {
    if (this.arrSummaryOrHeaderView.length === 3) {
      this.arrSummaryOrHeaderView[1].inputUpdateCount();
    }
  };
}
