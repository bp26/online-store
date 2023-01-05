import { Element } from '../../../element';
import { ProductsCallback } from '../../../../types/types';
import { HTMLTag } from '../../../../types/enums';
import { IProductsOptions } from '../../../../types/interfaces';
import { Product } from './product';

export class ProductsView extends Element {
  constructor(parent: HTMLElement, productsOptions: IProductsOptions, callback: ProductsCallback) {
    super(parent, HTMLTag.DIV, 'products');
    this.renderProducts(productsOptions, callback);
  }

  public renderProducts({ data, cartArray, productDisplay }: IProductsOptions, callback: ProductsCallback): void {
    this.elem.innerHTML = '';
    if (data.length !== 0) {
      data.forEach((product) => {
        const productView = new Product(this.elem, product, cartArray.includes(product.id), productDisplay, callback);
      });
    } else {
      const emptyMessage = new Element(this.elem, HTMLTag.P, 'products__empty-message', 'NOT FOUND');
    }
  }
}
