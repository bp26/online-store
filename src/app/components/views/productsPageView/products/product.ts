import { Element } from '../../../element';
import { IProduct } from '../../../../types/interfaces';
import { INFO_LIST } from '../../../../utils/constants';
import { ProductsCallback } from '../../../../types/types';
import { ProductsAction } from '../../../../types/enums';
import { CardButtonTitles } from '../../../../types/enums';
import { HTMLTag } from '../../../../types/enums';
import { ProductDisplay } from '../../../../types/enums';

export class Product extends Element {
  constructor(parent: HTMLElement, product: IProduct, private inCart: boolean, productDisplay: ProductDisplay, callback: ProductsCallback) {
    super(parent, HTMLTag.DIV, 'product-card');

    const temp = document.querySelector('#temp-product-card');
    if (!(temp instanceof HTMLTemplateElement)) {
      throw new Error(`${temp} is not an HTMLTemplateElement`);
    }

    const clone = temp.content.cloneNode(true);
    if (!(clone instanceof DocumentFragment)) {
      throw new Error(`${clone} is not a DocumentFragment`);
    }

    const card = clone.querySelector('.product-card__container');
    if (!(card instanceof HTMLElement)) {
      throw new Error(`${card} is not an HTMLElement`);
    }
    card.style.backgroundImage = `url(${product.thumbnail})`;
    if (productDisplay === ProductDisplay.SIMPLE) card.classList.add('product-card__container_simple');

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

    this.setCartDisplay(card, addButton);

    addButton.onclick = () => {
      callback(ProductsAction.ADD, product.id, product.price);
      this.inCart = this.inCart === true ? false : true;
      this.setCartDisplay(card, addButton);
    };

    this.elem.append(clone);
  }

  private setCartDisplay(card: HTMLElement, addButton: HTMLElement): void {
    if (this.inCart) {
      card.classList.add('product-card__container_added');
      addButton.textContent = CardButtonTitles.REMOVE;
    } else {
      addButton.textContent = CardButtonTitles.ADD;
      card.classList.remove('product-card__container_added');
    }
  }
}
