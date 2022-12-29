import { Element } from '../../element'

export class CartSummaryContent {
  private countTotal: Element
  private countProduct: Element
  private countDuscountTotal: Element
  private discountBlockPrice: Element
  private stringDiscount: Element | null
  private blockInputorTable: Element
  private rootTableDiscount: Element | null
  private ulDiscount: Element | null
  private setDiscountListItem: (flag: boolean) => void
  private getDiscountListItem: () => number
  private setNameDiscount: (name: string) => void
  private getNameDiscount: (name: string) => boolean
  private deleteNameDiscount: (name: string) => void
  private validationInputSummary: (value: string) => string[] | false
  private valueInput: HTMLInputElement
  constructor(
    node: HTMLElement,
    arrayData: number[],
    validationInputSummary: (value: string) => string[] | false,
    setDiscountListItem: (flag: boolean) => void,
    getDiscountListItem: () => number,
    setNameDiscount: (name: string) => void,
    getNameDiscount: (name: string) => boolean,
    deleteNameDiscount: (name: string) => void
  ) {
    this.setDiscountListItem = setDiscountListItem
    this.getDiscountListItem = getDiscountListItem
    this.setNameDiscount = setNameDiscount
    this.getNameDiscount = getNameDiscount
    this.deleteNameDiscount = deleteNameDiscount
    this.validationInputSummary = validationInputSummary
    this.rootTableDiscount = null
    this.stringDiscount = null
    this.ulDiscount = null
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
    this.valueInput = <HTMLInputElement>inputSummary.elem
    inputSummary.elem.setAttribute('type', 'text')
    inputSummary.elem.setAttribute('placeholder', 'Enter promo code')
    inputSummary.elem.oninput = () => {
      this.examinationInput(this.valueInput.value)
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

  drawDiscountString(name: string, discount: string): void {
    const examination = this.getNameDiscount(name)
    this.stringDiscount = new Element(this.discountBlockPrice.elem, 'div', 'block-discount')
    const blockContentIgnor = new Element(this.stringDiscount.elem, 'p', 'block-discount__content', `${name} - ${discount}%`)
    if (!examination) {
      const blockButton = new Element(this.stringDiscount.elem, 'button', 'block-discount__button')
      const blockButtonSpanIgnor = new Element(blockButton.elem, 'span', 'button-span', 'ADD')
      blockButton.elem.onclick = () => {
        const valueDiscIgnor = Number(discount)
        this.setNameDiscount(name)
        this.drawTableBlock(name, discount)
        this.setDiscountListItem(true)
        blockButton.destroy()
      }
    }
  }

  drawTableBlock(name: string, discount: string): void {
    const amountList = this.getDiscountListItem()
    if (!amountList) {
      this.rootTableDiscount = new Element(this.blockInputorTable.elem, 'div', 'block-table', '', false)
      const titleBlockIgnor = new Element(this.rootTableDiscount.elem, 'p', 'block-table__title', 'Applied codes')
      this.ulDiscount = new Element(this.rootTableDiscount.elem, 'ul', 'block-table__list')
      this.drawItemTableBlock(name, discount, this.ulDiscount.elem, this.rootTableDiscount)
    } else {
      this.drawItemTableBlock(name, discount)
    }
  }

  drawItemTableBlock(name: string, discount: string, ul: HTMLElement = this.ulDiscount!.elem, root: Element = this.rootTableDiscount!): void {
    const li = new Element(ul, 'li', 'discount-item')
    const pIgnor = new Element(li.elem, 'p', 'discount-item__name', `${name} - ${discount}% - `)
    const button = new Element(li.elem, 'button', 'discount-item__button')
    const buttonSpanIgnor = new Element(button.elem, 'span', 'discount-item__button-span', 'DROP')
    button.elem.onclick = () => {
      this.setDiscountListItem(false)
      this.deleteNameDiscount(name)
      if (this.stringDiscount) {
        this.stringDiscount.destroy()
        this.examinationInput(this.valueInput.value)
      }
      const amountList = this.getDiscountListItem()
      if (amountList) {
        li.destroy()
      } else {
        root.destroy()
      }
    }
  }

  examinationInput(value: string) {
    let validation: string[] | false = false
    if (value) {
      validation = this.validationInputSummary(value)
    }
    if (validation) {
      this.drawDiscountString(validation[0], validation[1])
    } else {
      this.stringDiscount?.destroy()
    }
  }
}
