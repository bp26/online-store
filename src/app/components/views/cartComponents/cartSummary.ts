import { Element } from '../../element'

export class CartSummaryContent {
  private countTotal: Element
  private countProduct: Element
  private countDuscountTotal: Element
  private discountBlockPrice: Element
  private blockDiscount: Element | null
  private blockInputorTable: Element
  private listDiscount: Element | null
  constructor(node: HTMLElement, arrayData: number[], validationInputSummary: (value: string) => string[] | false) {
    this.blockDiscount = null
    this.listDiscount = null
    const headerSummary = new Element(node, 'div', 'summary-head')
    const titleSummaryIgnor = new Element(headerSummary.elem, 'p', 'summary-head__title', 'Summary')
    const blockProductSummary = new Element(node, 'div', 'summary-product')
    const titleProductIgnor = new Element(blockProductSummary.elem, 'p', 'summary-product__title', 'Products:')
    this.countProduct = new Element(blockProductSummary.elem, 'p', 'summary-product__count', `${arrayData[0]}`)
    const blockTotalorDiscont = new Element(node, 'div', 'summary-total-block')
    const blockTotalSummary = new Element(blockTotalorDiscont.elem, 'div', 'summary-total')
    const titleTotalIgnor = new Element(blockTotalSummary.elem, 'p', 'summary-total__title', 'Total:')
    this.countTotal = new Element(blockTotalSummary.elem, 'p', 'summary-total__count', `${arrayData[1]}`)
    const blockTotalDiscountSummary = new Element(blockTotalorDiscont.elem, 'div', 'summary-total-discount')
    const titleTotalDiscountIgnor = new Element(blockTotalDiscountSummary.elem, 'p', 'summary-total-discount__title', 'Total:')
    this.countDuscountTotal = new Element(blockTotalDiscountSummary.elem, 'p', 'summary-total-discount__count', `${arrayData[1]}`)
    this.blockInputorTable = new Element(node, 'div', 'summary-block-input')
    const inputSummary = new Element(this.blockInputorTable.elem, 'input', 'summary-input')
    const valueInput = <HTMLInputElement>inputSummary.elem
    inputSummary.elem.setAttribute('type', 'text')
    inputSummary.elem.setAttribute('placeholder', 'Enter promo code')
    inputSummary.elem.oninput = () => {
      const value = valueInput.value
      let validation: string[] | false = false
      if (value) {
        validation = validationInputSummary(value)
      }
      if (validation) {
        this.drawDiscountBlock(validation[0], validation[1])
      } else {
        this.blockDiscount?.destroy()
      }
    }
    this.discountBlockPrice = new Element(node, 'div', 'summary-block-disc-description')
    const discountDescrSummaryIgnor = new Element(this.discountBlockPrice.elem, 'p', 'summary-disc-description', "Promo for test: 'RS', 'EPM'")
    const buttonSummary = new Element(node, 'button', 'summary-button')
    const buttonSpanSummaryIgnor = new Element(buttonSummary.elem, 'span', 'summary-button__span', 'BUY NOW')
  }

  toggleContent(arrayData: number[]): void {
    this.countTotal.elem.textContent = `${arrayData[1]}`
    this.countProduct.elem.textContent = `${arrayData[0]}`
  }

  drawDiscountBlock(name: string, discount: string): void {
    this.blockDiscount = new Element(this.discountBlockPrice.elem, 'div', 'block-discount')
    const blockContentIgnor = new Element(this.blockDiscount.elem, 'p', 'block-discount__content', `${name} - ${discount}%`)
    const blockButton = new Element(this.blockDiscount.elem, 'button', 'block-discount__button')
    const blockButtonSpanIgnor = new Element(blockButton.elem, 'span', 'button-span', 'ADD')
  }

  bp(value: string): void {
    const tableBlock = new Element(this.blockInputorTable.elem, 'div', 'block-table')
    const titleBlockIgnor = new Element(tableBlock.elem, 'p', 'block-table__title', 'Applied codes')
    this.listDiscount = new Element(tableBlock.elem, 'ul', 'block-table__list')
    this.yr(this.listDiscount.elem, value)
  }

  yr(root: HTMLElement, value: string): void {
    const li = new Element(root, 'li', 'discount-item')
    const pIgnor = new Element(li.elem, 'p', 'discount-item__name', `${value}`)
    const button = new Element(li.elem, 'button', 'discount-item__button')
    const buttonSpanIgnor = new Element(button.elem, 'span', 'discount-item__button-span', 'DROP')
  }
}
