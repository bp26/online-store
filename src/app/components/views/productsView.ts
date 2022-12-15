import { Element } from '../element';
import { ProductsData } from '../../types/types';

export class ProductsView extends Element {
  constructor(parent: HTMLElement, productsData: ProductsData) {
    super(parent, 'div', 'products');
  }
}
