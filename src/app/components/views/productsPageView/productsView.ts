import { Element } from '../../element';
import { IProduct } from '../../../types/interfaces';
import { INFO_LIST } from '../../../utils/constants';
import { ProductsCallback } from '../../../types/types';
import { ProductsAction } from '../../../types/enums';
import { CardButtonTitles } from '../../../types/enums';
import { HTMLTag } from '../../../types/enums';
import { IProductsOptions } from '../../../types/interfaces';

export class ProductsView extends Element {
  constructor(parent: HTMLElement, productsOptions: IProductsOptions, callback: ProductsCallback) {
    super(parent, HTMLTag.DIV, 'products');
    this.renderProducts(productsOptions, callback);
  }

  public renderProducts({ data, cartArray }: IProductsOptions, callback: ProductsCallback): void {
    this.elem.innerHTML = '';
    if (data.length !== 0) {
      data.forEach((product) => {
        this.elem.append(this.drawProduct(product, cartArray.includes(product.id), callback));
      });
    } else {
      const emptyMessage = new Element(this.elem, HTMLTag.P, 'products__empty-message', 'NOT FOUND');
    }
  }

  private drawProduct(product: IProduct, inCart: boolean, callback: ProductsCallback): DocumentFragment {
    const temp = document.querySelector('#temp-product-card');
    if (!(temp instanceof HTMLTemplateElement)) {
      throw new Error(`${temp} is not an HTMLTemplateElement`);
    }

    const clone = temp.content.cloneNode(true);
    if (!(clone instanceof DocumentFragment)) {
      throw new Error(`${clone} is not a DocumentFragment`);
    }

    const card = clone.querySelector('.product-card');
    if (!(card instanceof HTMLElement)) {
      throw new Error(`${card} is not an HTMLElement`);
    }
    card.style.backgroundImage = `url(${product.thumbnail})`;

    card.onclick = (e) => {
      if (!(e.target instanceof HTMLElement)) {
        throw new Error(`${e} is not an HTMLElement`);
      }
      if (!e.target.classList.contains('product-card__button')) {
        callback(ProductsAction.DETAILS, product.id, product.price);
      }
    };

    const name = clone.querySelector('.product-card__name');
    if (!(name instanceof HTMLElement)) {
      throw new Error(`${name} is not an HTMLElement`);
    }
    name.textContent = product.title;

    const info = clone.querySelector('.product-card__info-list');
    if (!(info instanceof HTMLElement)) {
      throw new Error(`${info} is not an HTMLElement`);
    }

    INFO_LIST.forEach((item) => {
      const li = new Element(info, HTMLTag.LI, `product-card__${item}`, `${item}: ${product[item as keyof IProduct]}`);
    });

    const addButton = clone.querySelector('.product-card__button');
    if (!(addButton instanceof HTMLButtonElement)) {
      throw new Error(`${addButton} is not an HTMLButtonElement`);
    }

    if (inCart) {
      card.classList.add('product-card_added');
      addButton.textContent = CardButtonTitles.REMOVE;
    } else {
      addButton.textContent = CardButtonTitles.ADD;
    }

    addButton.onclick = () => callback(ProductsAction.ADD, product.id, product.price);

    return clone;
  }
}
