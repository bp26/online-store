import { Element } from '../../../element';
import { ProductsCallback } from '../../../../types/types';
import { HTMLTag } from '../../../../types/enums';
import { IProductsOptions } from '../../../../types/interfaces';
import { Product } from './product';
import { ProductDisplay } from '../../../../types/enums';

export class ProductsView extends Element {
  constructor(parent: HTMLElement, productsOptions: IProductsOptions, callback: ProductsCallback) {
    super(parent, HTMLTag.DIV, 'products');
    this.toggleDisplay(productsOptions.productDisplay);
    this.renderProducts(productsOptions, callback);
  }

  public renderProducts({ data, cartArray }: IProductsOptions, callback: ProductsCallback): void {
    this.elem.innerHTML = '';
    if (data.length) {
      data.forEach((product) => {
        const productView = new Product(this.elem, product, cartArray.includes(product.id), callback);
      });
    } else {
      const emptyMessage = new Element(this.elem, HTMLTag.P, 'products__empty-message', 'NOT FOUND');
    }
  }

  public toggleDisplay(productDisplay: ProductDisplay) {
    if (productDisplay === ProductDisplay.SIMPLE) {
      this.elem.classList.add('products_simple');
    } else {
      this.elem.classList.remove('products_simple');
    }
  }
}
