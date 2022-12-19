import { Element } from '../../element';

export class CartSummaryContent {
  constructor(node: HTMLElement) {
    const headerSummary = new Element(node, 'div', 'summary-head')
    const titleSummary = new Element(headerSummary.elem, 'p', 'summary-head__title', 'Summary')
    const blockProductSummary = new Element(node, 'div', 'summary-product')
    const titleProduct = new Element(blockProductSummary.elem, 'p', 'summary-product__title', 'Products:')
    const countProduct = new Element(blockProductSummary.elem, 'p', 'summary-product__count', '1')
    const blockTotalSummary = new Element(node, 'div', 'summary-total')
    const titleTotal = new Element(blockTotalSummary.elem, 'p', 'summary-total__title', 'Total:')
    const countTotal = new Element(blockTotalSummary.elem, 'p', 'summary-total__count', '0')
    const inputSummary = new Element(node, 'input', 'summary-input')
    inputSummary.elem.setAttribute('type', 'text')
    const buttonSummary = new Element(node, 'button', 'summary-button')
    const buttonSpanSummary = new Element(buttonSummary.elem, 'span', 'summary-button', 'BUY NOW')
  }
}
