import { Element } from '../../element';
import { IProduct } from '../../../types/interfaces';

export class CartProductCard {
  constructor(node: HTMLElement, arrayProductCart: IProduct[] ) {
    const ul = new Element(node, 'ul', 'cart-itemProduct')
    for (let i = 0; i < arrayProductCart.length; i += 1) {
      const li = new Element(ul.elem, 'li', 'list')
      const blockProduct = new Element(li.elem, 'div', 'list__wrapper')
      let imageProduct = new Element(blockProduct.elem, 'img', 'wrapper__image')
      imageProduct.elem.setAttribute('src', `${arrayProductCart[i].images[0]}`)
      const nameProduct = new Element(blockProduct.elem, 'p', 'product__title', `${arrayProductCart[i].title}`)
      const categoryProduct = new Element(blockProduct.elem, 'p', 'product__category', `${arrayProductCart[i].category}`)
      const amountProduct = new Element(blockProduct.elem, 'p', 'product__category', `${arrayProductCart[i].price}`)
    }
  }
}
