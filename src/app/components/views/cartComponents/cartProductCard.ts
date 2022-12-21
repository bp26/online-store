import { Element } from '../../element';
import { IProduct } from '../../../types/interfaces';
import { btnCountCart } from '../../../types/types'

export class CartProductCard {
  constructor(node: HTMLElement, arrayProductCart: IProduct[], btnNeg: btnCountCart, btnPos: btnCountCart) {
    const ul = new Element(node, 'ul', 'item-product')

    for (let i = 0; i < arrayProductCart.length; i += 1) {
      const li = new Element(ul.elem, 'li', 'list-product')
      const countProduct = new Element(li.elem, 'p', 'count-product', `${i + 1}`)
      const imageBlockProduct = new Element(li.elem, 'div', 'image-block')
      const imageProduct = new Element(imageBlockProduct.elem, 'img', 'images-product')
      imageProduct.elem.setAttribute('src', `${arrayProductCart[i].images[0]}`)
      imageProduct.elem.setAttribute('alt', `${arrayProductCart[i].title}`)
      const descriptionBlockProduct = new Element(li.elem, 'div', 'block-base')
      const nameProduct = new Element(descriptionBlockProduct.elem, 'p', 'product-title', `${arrayProductCart[i].title}`)
      const descrBlock = new Element(descriptionBlockProduct.elem, 'div', 'block-description')
      const descriptionProduct = new Element(descrBlock.elem, 'p', 'product-description',`${arrayProductCart[i].description}`)
      const blockRatAndDisc = new Element(descrBlock.elem, 'div', 'block-data')
      const ratingProduct = new Element(blockRatAndDisc.elem, 'p', 'product-rating', `Rating: ${arrayProductCart[i].rating}`)
      const discountProduct = new Element(blockRatAndDisc.elem, 'p', 'product-discount', `Discount: ${arrayProductCart[i].discountPercentage}%`)
      const blockAmountProducts = new Element(li.elem, 'div', 'block-amount')
      const stockProduct = new Element(blockAmountProducts.elem, 'p', 'stock', `Stock: ${arrayProductCart[i].stock}`)
      const blockCounterProduct = new Element(blockAmountProducts.elem, 'div', 'block-counter')
      const buttonNegative = new Element(blockCounterProduct.elem, 'button', 'button-count', '-')
      const counterStocks = new Element(blockCounterProduct.elem, 'p', 'count-prod', '1')
      const buttonPositive = new Element(blockCounterProduct.elem, 'button', 'button-count', '+')
      const priceProduct = new Element(blockAmountProducts.elem, 'p', 'price', `$${arrayProductCart[i].price}`)

      const getPrice = this.closurePrice(arrayProductCart[i].price)
      const getAmountProduct = this.closureAmountProduct()
      let count = 0

      buttonNegative.elem.onclick = (): void => {
        count -= 1
        if (count < -1) {
          count += 1
          return
        }
        btnNeg(arrayProductCart[i].price, arrayProductCart[i].id)
        priceProduct.elem.textContent = `$${getPrice(false)}`
        counterStocks.elem.textContent = `${getAmountProduct(false)}`
      }

      buttonPositive.elem.onclick = (): void => {
        count += 1
        if (count === arrayProductCart[i].stock) {
          count -= 1
          return
        }
        btnPos(arrayProductCart[i].price, arrayProductCart[i].id)
        counterStocks.elem.textContent = `${getAmountProduct(true)}`
        priceProduct.elem.textContent = `$${getPrice(true)}`
      }
    }
  }

  private closurePrice(price: number) {
    let count = price
    return function (flag: boolean) {
      if (flag) {
        return count += price
      }
      if (count) {
        return count -= price
      }
      return count
    }
  }

  private closureAmountProduct() {
    let count = 1
    return function (flag: boolean) {
      if (flag) {
        return count += 1
      }
      return count -= 1
    }
  }
}
