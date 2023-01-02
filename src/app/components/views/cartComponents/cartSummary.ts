import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';

export class CartSummaryContent {
  private countTotal: Element;
  private countProduct: Element;
  private countDiscountTotal: Element | null;
  private discountBlockPrice: Element;
  private stringDiscount: Element | null;
  private blockInputorTable: Element;
  private rootTableDiscount: Element | null;
  private ulDiscount: Element | null;
  private valueInput: HTMLInputElement;
  private blockTotalSummary: Element;
  private arrayData: number[];
  private setDiscountListItem: (flag: boolean) => void;
  private getDiscountListItem: () => number;
  private setNameDiscount: (name: string, discount: string) => void;
  private getNameDiscount: (name: string) => boolean;
  private deleteNameDiscount: (name: string) => void;
  private validationInputSummary: (value: string) => string[] | false;
  private calculateProcent: () => number;
  private setDiscountProcent: (flag: boolean, discount: number) => void;
  private getValueDiscountData: () => Map<string, string>;

  constructor(
    node: HTMLElement,
    arrayData: number[],
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
    this.arrayData = arrayData;
    this.rootTableDiscount = null;
    this.stringDiscount = null;
    this.ulDiscount = null;
    this.countDiscountTotal = null;
    this.setDiscountListItem = setDiscountListItem;
    this.getDiscountListItem = getDiscountListItem;
    this.setNameDiscount = setNameDiscount;
    this.getNameDiscount = getNameDiscount;
    this.deleteNameDiscount = deleteNameDiscount;
    this.validationInputSummary = validationInputSummary;
    this.calculateProcent = calculateProcent;
    this.setDiscountProcent = setDiscountProcent;
    this.getValueDiscountData = getValueDiscountData;

    const headerSummary = new Element(node, HTMLTag.DIV, 'summary-head');
    const titleSummaryIgnor = new Element(headerSummary.elem, HTMLTag.P, 'summary-head__title', 'Summary');
    const blockProductSummary = new Element(node, HTMLTag.DIV, 'summary-product');
    this.countProduct = new Element(blockProductSummary.elem, HTMLTag.P, 'summary-product__count', `Products: ${arrayData[0]}`);
    const blockTotalorDiscont = new Element(node, HTMLTag.DIV, 'summary-total-block');
    this.blockTotalSummary = new Element(blockTotalorDiscont.elem, HTMLTag.DIV, 'summary-total');
    this.countTotal = new Element(this.blockTotalSummary.elem, HTMLTag.P, 'summary-total__count', `Total: ${arrayData[1]}`);
    this.blockInputorTable = new Element(node, HTMLTag.DIV, 'summary-block-input');
    const inputSummary = new Element(this.blockInputorTable.elem, HTMLTag.INPUT, 'summary-input');
    this.valueInput = <HTMLInputElement>inputSummary.elem;
    inputSummary.elem.setAttribute('type', 'text');
    inputSummary.elem.setAttribute('placeholder', 'Enter promo code');
    inputSummary.elem.oninput = () => {
      this.examinationInput(this.valueInput.value);
    };
    this.discountBlockPrice = new Element(node, HTMLTag.DIV, 'summary-block-disc-description');
    const discountDescrSummaryIgnor = new Element(this.discountBlockPrice.elem, HTMLTag.P, 'summary-disc-description', "Promo for test: 'RS', 'EPM'");
    const buttonSummary = new Element(node, HTMLTag.BUTTON, 'summary-button');
    const buttonSpanSummaryIgnor = new Element(buttonSummary.elem, HTMLTag.SPAN, 'summary-button__span', 'BUY NOW');
    const amountList = this.getDiscountListItem();
    if (amountList) {
      let count = 0;
      const myMap = this.getValueDiscountData();
      myMap.forEach((value, key) => {
        if (!count) {
          this.drawLocalStorageContent(key, value);
          count += 1;
        } else {
          this.drawItemTableBlock(key, value, this.ulDiscount!.elem, this.rootTableDiscount!);
        }
      });
    }
  }

  toggleContent(arrayData: number[]): void {
    this.arrayData = arrayData;
    this.countTotal.elem.textContent = `Total: ${arrayData[1]}`;
    this.countProduct.elem.textContent = `Products: ${arrayData[0]}`;
    if (this.countDiscountTotal) {
      const result = this.calculateProcent();
      this.countDiscountTotal.elem.textContent = `Total: ${result}`;
    }
  }

  drawDiscountString(name: string, discount: string): void {
    const examination = this.getNameDiscount(name);
    this.stringDiscount = new Element(this.discountBlockPrice.elem, HTMLTag.DIV, 'block-discount');
    const blockContentIgnor = new Element(this.stringDiscount.elem, HTMLTag.P, 'block-discount__content', `${name} - ${discount}%`);
    if (!examination) {
      const blockButton = new Element(this.stringDiscount.elem, HTMLTag.BUTTON, 'block-discount__button');
      const blockButtonSpanIgnor = new Element(blockButton.elem, HTMLTag.SPAN, 'button-span', 'ADD');
      blockButton.elem.onclick = () => {
        const valueDisc = Number(discount);
        this.setNameDiscount(name, discount);
        this.setDiscountProcent(true, valueDisc);
        this.drawTableBlock(name, discount);
        this.setDiscountListItem(true);
        blockButton.destroy();
      };
    }
  }

  drawTableBlock(name: string, discount: string): void {
    const amountList = this.getDiscountListItem();
    if (!amountList) {
      this.rootTableDiscount = new Element(this.blockInputorTable.elem, HTMLTag.DIV, 'block-table', '', false);
      const titleBlockIgnor = new Element(this.rootTableDiscount.elem, HTMLTag.P, 'block-table__title', 'Applied codes');
      this.ulDiscount = new Element(this.rootTableDiscount.elem, HTMLTag.UL, 'block-table__list');
      this.countTotal.elem.classList.add('summary-total__count_cross-out');
      this.drawItemTableBlock(name, discount, this.ulDiscount.elem, this.rootTableDiscount);
      this.drawDiscountPrice();
    } else {
      this.drawItemTableBlock(name, discount);
      if (this.countDiscountTotal) {
        const result = this.calculateProcent();
        this.countDiscountTotal.elem.textContent = `Total: ${result}`;
      }
    }
  }

  drawItemTableBlock(name: string, discount: string, ul: HTMLElement = this.ulDiscount!.elem, root: Element = this.rootTableDiscount!): void {
    const li = new Element(ul, HTMLTag.LI, 'discount-item');
    const pIgnor = new Element(li.elem, HTMLTag.P, 'discount-item__name', `${name} - ${discount}% - `);
    const button = new Element(li.elem, HTMLTag.BUTTON, 'discount-item__button');
    const buttonSpanIgnor = new Element(button.elem, HTMLTag.SPAN, 'discount-item__button-span', 'DROP');
    button.elem.onclick = () => {
      const valueDisc = Number(discount);
      this.setDiscountProcent(false, valueDisc);
      this.setDiscountListItem(false);
      this.deleteNameDiscount(name);
      if (this.countDiscountTotal) {
        const result = this.calculateProcent();
        this.countDiscountTotal.elem.textContent = `Total: ${result}`;
      }
      if (this.stringDiscount) {
        this.stringDiscount.destroy();
        this.examinationInput(this.valueInput.value);
      }
      const amountList = this.getDiscountListItem();
      if (amountList) {
        li.destroy();
      } else {
        this.countDiscountTotal?.destroy();
        this.countTotal.elem.classList.remove('summary-total__count_cross-out');
        root.destroy();
      }
    };
  }

  drawDiscountPrice(): void {
    const result = this.calculateProcent();
    this.countDiscountTotal = new Element(this.blockTotalSummary.elem, HTMLTag.P, 'summary-total-discount__count', `Total: ${result}`);
  }

  examinationInput(value: string): void {
    let validation: string[] | false = false;
    if (value) {
      validation = this.validationInputSummary(value);
    }
    if (validation) {
      this.drawDiscountString(validation[0], validation[1]);
    } else {
      this.stringDiscount?.destroy();
    }
  }

  drawLocalStorageContent(name: string, discount: string): void {
    this.rootTableDiscount = new Element(this.blockInputorTable.elem, HTMLTag.DIV, 'block-table', '', false);
    const titleBlockIgnor = new Element(this.rootTableDiscount.elem, HTMLTag.P, 'block-table__title', 'Applied codes');
    this.ulDiscount = new Element(this.rootTableDiscount.elem, HTMLTag.UL, 'block-table__list');
    this.countTotal.elem.classList.add('summary-total__count_cross-out');
    this.drawItemTableBlock(name, discount, this.ulDiscount.elem, this.rootTableDiscount);
    this.drawDiscountPrice();
  }
}
