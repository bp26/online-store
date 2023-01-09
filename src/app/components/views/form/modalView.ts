import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { InputName } from './inputComponent/inputName';
import { InputPhone } from './inputComponent/inputPhone';
import { InputAdress } from './inputComponent/inputAdress';
import { InputMail } from './inputComponent/inputMail';
import { InputCardNumber } from './inputComponent/inputCardNumber';
import { InputCardDate } from './inputComponent/inputCardDate';
import { InputCardCvv } from './inputComponent/inputCardCvv';
import { resetModalView } from './resetModalView';

export class ModalView extends Element {
  private inputName: InputName;
  private inputPhone: InputPhone;
  private inputAdress: InputAdress;
  private inputMail: InputMail;
  private inputCardNum: InputCardNumber;
  private inputCardDate: InputCardDate;
  private inputCardCvv: InputCardCvv;
  constructor(clearCart: () => void, mountProductsPage: () => void) {
    super(document.body, HTMLTag.DIV, 'wrapper-modal');
    const modal = new Element(this.elem, HTMLTag.DIV, 'modal-form');
    this.elem.onclick = () => {
      this.destroy();
    };
    modal.elem.onclick = (e) => {
      e.stopImmediatePropagation();
    };
    const form = new Element(modal.elem, HTMLTag.FORM, 'form');
    const titleFormIgnor = new Element(form.elem, HTMLTag.H2, 'form__title', 'Personal details');
    const wrapperInputForm = new Element(form.elem, HTMLTag.DIV, 'wrapper-form');

    this.inputName = new InputName(wrapperInputForm.elem);
    this.inputPhone = new InputPhone(wrapperInputForm.elem);
    this.inputAdress = new InputAdress(wrapperInputForm.elem);
    this.inputMail = new InputMail(wrapperInputForm.elem);

    const wrapperCard = new Element(form.elem, HTMLTag.DIV, 'wrapper-card');
    const titleCardIgnor = new Element(wrapperCard.elem, HTMLTag.H2, 'wrapper-card__title', 'Credit card details');
    const logoCard = new Element(wrapperCard.elem, HTMLTag.DIV, 'card-logo');
    const card = new Element(wrapperCard.elem, HTMLTag.DIV, 'modal-card');
    this.inputCardNum = new InputCardNumber(card.elem, logoCard.elem);
    const blockDateOrCvv = new Element(card.elem, HTMLTag.DIV, 'block-date-or-cvv');
    this.inputCardDate = new InputCardDate(blockDateOrCvv.elem);
    const blockCvv = new Element(blockDateOrCvv.elem, HTMLTag.DIV, 'block-cvv');
    this.inputCardCvv = new InputCardCvv(blockCvv.elem);

    const buttonCard = new Element(form.elem, HTMLTag.BUTTON, 'wrapper-card__button');
    buttonCard.elem.onclick = (e) => {
      e.preventDefault();
      const result = this.checkValidation();
      if (!result) {
        clearCart();
        modal.destroy();
        this.elem.onclick = null;
        new resetModalView(this, mountProductsPage);
      }
    };
    const buttonSpanCardIgnor = new Element(buttonCard.elem, HTMLTag.SPAN, 'wrapper-card__button-span', 'Confirm');
  }

  checkValidation(): boolean {
    const arrInput = [this.inputName, this.inputPhone, this.inputAdress, this.inputMail, this.inputCardNum, this.inputCardDate, this.inputCardCvv];
    const arrValidation = arrInput.map((item) => {
      if (item.valid) {
        return item.valid;
      }
      item.validation();
      return item.valid;
    });
    const result = arrValidation.includes(false);
    return result;
  }
}
