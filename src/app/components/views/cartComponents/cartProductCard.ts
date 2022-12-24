import { Element } from '../../element';
import { IProduct } from '../../../types/interfaces';
import { funcVoid } from '../../../types/types'

export class CartProductCard {
  ul: Element
  arrayProductCart: IProduct[][]
  destroyCart: funcVoid
  btnPos: funcVoid
  btnNeg: funcVoid
  getValueContentCart: () => number
  getCartList: (id: number, price: number) => number
  constructor(node: HTMLElement, arrayProductCart: IProduct[][], btnNeg: funcVoid, btnPos: funcVoid, destroyCart: funcVoid, getValueContentCart: () => number, getCartList: (id: number, price: number) => number) {
    this.arrayProductCart = arrayProductCart
    this.destroyCart = destroyCart
    this.btnPos = btnPos
    this.btnNeg = btnNeg
    this.getCartList = getCartList
    this.getValueContentCart = getValueContentCart
    this.ul = new Element(node, 'ul', 'item-product')
    this.drawContent(this.getValueContentCart())
  }

  private drawContent(value: number) {
    console.log(this.arrayProductCart)
    for (let i = 0; i < value && this.arrayProductCart[0][i]; i += 1) {
      const id = this.arrayProductCart[0][i].id
      const price = this.arrayProductCart[0][i].price
      let count = this.getCartList(id, price)
      const li = new Element(this.ul.elem, 'li', 'list-product')
      const countProduct = new Element(li.elem, 'p', 'count-product', `${i + 1}`)
      const imageBlockProduct = new Element(li.elem, 'div', 'image-block')
      const imageProduct = new Element(imageBlockProduct.elem, 'img', 'images-product')
      imageProduct.elem.setAttribute('src', `${this.arrayProductCart[0][i].images[0]}`)
      imageProduct.elem.setAttribute('alt', `${this.arrayProductCart[0][i].title}`)
      const descriptionBlockProduct = new Element(li.elem, 'div', 'block-base')
      const nameProduct = new Element(descriptionBlockProduct.elem, 'p', 'product-title', `${this.arrayProductCart[0][i].title}`)
      const descrBlock = new Element(descriptionBlockProduct.elem, 'div', 'block-description')
      const descriptionProduct = new Element(descrBlock.elem, 'p', 'product-description',`${this.arrayProductCart[0][i].description}`)
      const blockRatAndDisc = new Element(descrBlock.elem, 'div', 'block-data')
      const ratingProduct = new Element(blockRatAndDisc.elem, 'p', 'product-rating', `Rating: ${this.arrayProductCart[0][i].rating}`)
      const discountProduct = new Element(blockRatAndDisc.elem, 'p', 'product-discount', `Discount: ${this.arrayProductCart[0][i].discountPercentage}%`)
      const blockAmountProducts = new Element(li.elem, 'div', 'block-amount')
      const stockProduct = new Element(blockAmountProducts.elem, 'p', 'stock', `Stock: ${this.arrayProductCart[0][i].stock}`)
      const blockCounterProduct = new Element(blockAmountProducts.elem, 'div', 'block-counter')
      const buttonNegative = new Element(blockCounterProduct.elem, 'button', 'button-count', '-')
      const counterStocks = new Element(blockCounterProduct.elem, 'p', 'count-prod', `${count}`)
      const buttonPositive = new Element(blockCounterProduct.elem, 'button', 'button-count', '+')
      const priceProduct = new Element(blockAmountProducts.elem, 'p', 'price', `$${this.arrayProductCart[0][i].price}`)


      const getPrice = this.closurePrice(this.arrayProductCart[0][i].price)
      const getAmountProduct = this.closureAmountProduct(count)

      buttonNegative.elem.onclick = (): void => {
        if (count === 1) {
          li.destroy()
          this.destroyCart(this.arrayProductCart[0][i].price, this.arrayProductCart[0][i].id)
          this.updateCart(this.getValueContentCart())
          return
        }
        count -= 1
        this.btnNeg(this.arrayProductCart[0][i].price, this.arrayProductCart[0][i].id)
        priceProduct.elem.textContent = `$${getPrice(false)}`
        counterStocks.elem.textContent = `${getAmountProduct(false)}`
      }

      buttonPositive.elem.onclick = (): void => {
        if (count === this.arrayProductCart[0][i].stock) {
          return
        }
        count += 1
        this.btnPos(this.arrayProductCart[0][i].price, this.arrayProductCart[0][i].id)
        counterStocks.elem.textContent = `${getAmountProduct(true)}`
        priceProduct.elem.textContent = `$${getPrice(true)}`
      }
    }
  }

  public updateCart(value: number) {
    this.ul.elem.innerHTML = ''
    this.drawContent(value)
  }

  private closurePrice(price: number) {
    let count = price
    return function (flag: boolean) {
      if (flag) {
        return count += price
      }
      return count -= price
    }
  }

  private closureAmountProduct(amount: number) {
    let count = amount
    return function (flag: boolean) {
      if (flag) {
        console.log(count)
        return count += 1
      }
      return count -= 1
    }
  }
}
