import { Element } from '../../element';
import { IProduct } from '../../../types/interfaces';
import { funcVoid } from '../../../types/types';
import { HTMLTag } from '../../../types/enums';

export class CartProductCard {
  ul: Element;
  arrayProductCart: IProduct[][];
  private destroyCart: funcVoid;
  private btnPos: funcVoid;
  private btnNeg: funcVoid;
  private getValueContentCart: () => number;
  private getCartList: (id: number) => number[];
  private paginationHeadValue: (head: number) => number;
  private mountDetailsPage: (id: number) => void;
  private drawEmptyCart: () => void;
  constructor(
    node: HTMLElement,
    arrayProductCart: IProduct[][],
    btnNeg: funcVoid,
    btnPos: funcVoid,
    destroyCart: funcVoid,
    getValueContentCart: () => number,
    getCartList: (id: number) => number[],
    getPaginationHead: () => number,
    paginationHeadValue: (head: number) => number,
    mountDetailsPage: (id: number) => void,
    drawEmptyCart: () => void
  ) {
    this.arrayProductCart = arrayProductCart;
    this.destroyCart = destroyCart;
    this.btnPos = btnPos;
    this.btnNeg = btnNeg;
    this.getCartList = getCartList;
    this.getValueContentCart = getValueContentCart;
    this.paginationHeadValue = paginationHeadValue;
    this.mountDetailsPage = mountDetailsPage;
    this.drawEmptyCart = drawEmptyCart;
    this.ul = new Element(node, HTMLTag.UL, 'item-product');
    this.drawContent(this.getValueContentCart(), getPaginationHead());
  }

  private drawContent(value: number, head: number): void {
    if (this.arrayProductCart.length === 0) {
      this.drawEmptyCart();
      return;
    }
    for (let i = 0; i < value && this.arrayProductCart[head][i]; i += 1) {
      const arrayCountOrPrice = this.getCartList(this.arrayProductCart[head][i].id);
      let count = arrayCountOrPrice[0];
      const price = arrayCountOrPrice[1];

      const li = new Element(this.ul.elem, HTMLTag.LI, 'list-product');
      const countProductIgnor = new Element(li.elem, HTMLTag.P, 'count-product', `${i + 1}`);
      const imageBlockProduct = new Element(li.elem, HTMLTag.DIV, 'image-block');
      const imageProduct = new Element(imageBlockProduct.elem, HTMLTag.IMG, 'images-product');
      imageProduct.elem.setAttribute('src', `${this.arrayProductCart[head][i].images[0]}`);
      imageProduct.elem.setAttribute('alt', `${this.arrayProductCart[head][i].title}`);
      const descriptionBlockProduct = new Element(li.elem, HTMLTag.DIV, 'block-base');
      descriptionBlockProduct.elem.onclick = () => {
        this.mountDetailsPage(this.arrayProductCart[head][i].id);
      };
      const nameProductIgnor = new Element(descriptionBlockProduct.elem, HTMLTag.P, 'product-title', `${this.arrayProductCart[head][i].title}`);
      const descrBlock = new Element(descriptionBlockProduct.elem, HTMLTag.DIV, 'block-description');
      const descriptionProductIgnor = new Element(descrBlock.elem, HTMLTag.P, 'product-description', `${this.arrayProductCart[head][i].description}`);
      const blockRatAndDisc = new Element(descrBlock.elem, HTMLTag.DIV, 'block-data');
      const ratingProductIgnor = new Element(blockRatAndDisc.elem, HTMLTag.P, 'product-rating', `Rating: ${this.arrayProductCart[head][i].rating}`);
      const discountProductIgnor = new Element(blockRatAndDisc.elem, HTMLTag.P, 'product-discount', `Discount: ${this.arrayProductCart[head][i].discountPercentage}%`);
      const blockAmountProducts = new Element(li.elem, HTMLTag.DIV, 'block-amount');
      const stockProductIgnor = new Element(blockAmountProducts.elem, HTMLTag.P, 'stock', `Stock: ${this.arrayProductCart[head][i].stock}`);
      const blockCounterProduct = new Element(blockAmountProducts.elem, HTMLTag.DIV, 'block-counter');
      const buttonNegative = new Element(blockCounterProduct.elem, HTMLTag.BUTTON, 'button-count', '-');
      const counterStocks = new Element(blockCounterProduct.elem, HTMLTag.P, 'count-prod', `${count}`);
      const buttonPositive = new Element(blockCounterProduct.elem, HTMLTag.BUTTON, 'button-count', '+');
      const priceProduct = new Element(blockAmountProducts.elem, HTMLTag.P, 'price', `$${price}`);

      const getPrice = this.closurePrice(price, this.arrayProductCart[head][i].price);
      const getAmountProduct = this.closureAmountProduct(count);

      buttonNegative.elem.onclick = (): void => {
        if (count === 1) {
          li.destroy();
          this.destroyCart(this.arrayProductCart[head][i].price, this.arrayProductCart[head][i].id);
          const headUpdate = this.paginationHeadValue(head);
          this.updateCart(this.getValueContentCart(), headUpdate);
          return;
        }
        count -= 1;
        this.btnNeg(this.arrayProductCart[head][i].price, this.arrayProductCart[head][i].id);
        priceProduct.elem.textContent = `$${getPrice(false)}`;
        counterStocks.elem.textContent = `${getAmountProduct(false)}`;
      };

      buttonPositive.elem.onclick = (): void => {
        if (count === this.arrayProductCart[head][i].stock) return;
        count += 1;
        this.btnPos(this.arrayProductCart[head][i].price, this.arrayProductCart[head][i].id);
        counterStocks.elem.textContent = `${getAmountProduct(true)}`;
        priceProduct.elem.textContent = `$${getPrice(true)}`;
      };
    }
  }

  public updateCart(value: number, head: number): void {
    this.ul.elem.innerHTML = '';
    this.drawContent(value, head);
  }

  private closurePrice(price: number, actualPrice: number): (flag: boolean) => number {
    let count = price;
    return function (flag: boolean) {
      flag ? (count += actualPrice) : (count -= actualPrice);
      return count;
    };
  }

  private closureAmountProduct(amount: number): (flag: boolean) => number {
    let count = amount;
    return function (flag: boolean) {
      flag ? (count += 1) : (count -= 1);
      return count;
    };
  }
}
