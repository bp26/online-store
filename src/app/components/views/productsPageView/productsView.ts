import { Element } from '../../element';
import { ProductsData } from '../../../types/types';
import { IProduct } from '../../../types/interfaces';
import { infoList } from '../../../utils/constants';
import { ProductsCallback } from '../../../types/types';
import { ProductsAction } from '../../../types/enums';
import { CardButtonTitles } from '../../../types/enums';

export class ProductsView extends Element {
  constructor(parent: HTMLElement, data: ProductsData, callback: ProductsCallback) {
    super(parent, 'div', 'products');
    this.renderProducts(data, callback);
  }

  public renderProducts(data: ProductsData, callback: ProductsCallback): void {
    this.elem.innerHTML = '';
    if (data.length !== 0) {
      data.forEach((product) => {
        this.elem.append(this.drawProduct(product, callback));
      });
    } else {
      const emptyMessage = new Element(this.elem, 'p', 'products__empty-message', 'NOT FOUND');
    }
  }

  private drawProduct(product: IProduct, callback: ProductsCallback): DocumentFragment {
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
        callback(ProductsAction.DETAILS, product.id);
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

    infoList.forEach((item) => {
      const li = new Element(info, 'li', `product-card__${item}`, `${item}: ${product[item as keyof IProduct]}`);
    });

    const addButton = clone.querySelector('.product-card__button');
    if (!(addButton instanceof HTMLButtonElement)) {
      throw new Error(`${addButton} is not an HTMLButtonElement`);
    }

    addButton.onclick = () => {
      callback(ProductsAction.ADD, product.id);
      card.classList.toggle('product-card_added');
      if (addButton.textContent === CardButtonTitles.ADD) {
        addButton.textContent = CardButtonTitles.REMOVE;
      } else {
        addButton.textContent = CardButtonTitles.ADD;
      }
    };

    return clone;
  }
}
