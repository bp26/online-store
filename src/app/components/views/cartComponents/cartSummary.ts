import { Element } from '../../element'

export class CartSummaryContent {
  private countTotal: Element
  private countProduct: Element
  constructor(node: HTMLElement, arrayData: number[]) {
    const headerSummary = new Element(node, 'div', 'summary-head')
    const titleSummaryIgnor = new Element(headerSummary.elem, 'p', 'summary-head__title', 'Summary')
    const blockProductSummary = new Element(node, 'div', 'summary-product')
    const titleProductIgnor = new Element(blockProductSummary.elem, 'p', 'summary-product__title', 'Products:')
    this.countProduct = new Element(blockProductSummary.elem, 'p', 'summary-product__count', `${arrayData[0]}`)
    const blockTotalSummary = new Element(node, 'div', 'summary-total')
    const titleTotalIgnor = new Element(blockTotalSummary.elem, 'p', 'summary-total__title', 'Total:')
    this.countTotal = new Element(blockTotalSummary.elem, 'p', 'summary-total__count', `${arrayData[1]}`)
    const inputSummary = new Element(node, 'input', 'summary-input')
    inputSummary.elem.setAttribute('type', 'text')
    const buttonSummary = new Element(node, 'button', 'summary-button')
    const buttonSpanSummaryIgnor = new Element(buttonSummary.elem, 'span', 'summary-button__span', 'BUY NOW')
  }

  toggleContent(arrayData: number[]): void {
    this.countTotal.elem.textContent = `${arrayData[1]}`
    this.countProduct.elem.textContent = `${arrayData[0]}`
  }
}
