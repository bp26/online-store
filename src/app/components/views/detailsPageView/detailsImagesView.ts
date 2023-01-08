import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { IProduct } from '../../../types/interfaces';

export class DetailsImagesView extends Element {
  mainImage: Element;

  constructor(parent: HTMLElement, imageLinks: IProduct['images']) {
    super(parent, HTMLTag.DIV, 'details-page__product-images product-images');

    const imagesContainer = new Element(this.elem, HTMLTag.DIV, 'product-images__side-container');
    imageLinks.forEach((link, index) => {
      const img = new Element(imagesContainer.elem, HTMLTag.IMG, 'product-images__image product-images__image_side');
      this.setSideImage(img, link);
      img.elem.onclick = () => this.setMainImage(index, imageLinks);
    });

    const mainContainer = new Element(this.elem, HTMLTag.DIV, 'product-images__main-container');
    this.mainImage = new Element(mainContainer.elem, HTMLTag.IMG, 'product-images__image product-images__image_main');
    this.setMainImage(0, imageLinks);
  }

  private setMainImage(index: number, imageLinks: IProduct['images']) {
    if (!(this.mainImage.elem instanceof HTMLImageElement)) {
      throw new Error();
    }
    this.mainImage.elem.src = imageLinks[index];
  }

  private setSideImage(img: Element, link: string) {
    if (!(img.elem instanceof HTMLImageElement)) {
      throw new Error();
    }
    img.elem.src = link;
  }
}
