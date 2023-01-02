import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';

export class ModalView extends Element {
  constructor() {
    super(document.body, HTMLTag.DIV, 'wrapper-modal');
    const modal = new Element(this.elem, HTMLTag.DIV, 'modal-form');
    const form = new Element(modal.elem, HTMLTag.FORM, 'form');
    const titleFormIgnor = new Element(form.elem, HTMLTag.H2, 'form__title', 'Personal details');
    const inputNameIgnor = new Element(form.elem, HTMLTag.INPUT, 'form__input-name');
    const inputPhoneIgnor = new Element(form.elem, HTMLTag.INPUT, 'form__input-phone');
    const inputAdressIgnor = new Element(form.elem, HTMLTag.INPUT, 'form__input-adress');
    const inputMailIgnor = new Element(form.elem, HTMLTag.INPUT, 'form__input-mail');
    const wrapperCard = new Element(form.elem, HTMLTag.DIV, 'wrapper-card');
    const titleCardIgnor = new Element(wrapperCard.elem, HTMLTag.H2, 'wrapper-card__title', 'Credit card details');
    const card = new Element(wrapperCard.elem, HTMLTag.DIV, 'modal-card');
    const inputCardNumberIgnor = new Element(card.elem, HTMLTag.INPUT, 'modal-card__number');
    const blockDateOrCvv = new Element(card.elem, HTMLTag.DIV, 'block-date-or-cvv');
    const blockDate = new Element(blockDateOrCvv.elem, HTMLTag.DIV, 'block-date');
    const titleBlockDateIgnor = new Element(blockDate.elem, HTMLTag.P, 'block-date__title', 'Date');
    const inputCardDateIgnor = new Element(blockDate.elem, HTMLTag.INPUT, 'block-date__input');
    const blockCvv = new Element(blockDateOrCvv.elem, HTMLTag.DIV, 'block-cvv');
    const titleBlockCvvIgnor = new Element(blockCvv.elem, HTMLTag.P, 'block-cvv__title', 'CVV');
    const inputCardCvvIgnor = new Element(blockCvv.elem, HTMLTag.INPUT, 'block-cvv__input');
    const buttonCard = new Element(wrapperCard.elem, HTMLTag.BUTTON, 'wrapper-card__button');
    const buttonSpanCardIgnor = new Element(buttonCard.elem, HTMLTag.SPAN, 'wrapper-card__button-span', 'Confirm');
  }
}
