import { Element } from '../../element';
import { HTMLTag } from '../../../types/enums';
import { BreadcrumbsView } from './breadcrumbsView';
import { DetailsImagesView } from './detailsImagesView';
import { DetailsInfoView } from './detailsInfoView';
import { DetailsCartView } from './detailsCartView';
import { IDetailsPageData } from '../../../types/interfaces';
import { DetailsCallback } from '../../../types/types';

export class DetailsPageView extends Element {
  constructor(parent: HTMLElement, { product, inCart }: IDetailsPageData, callback: DetailsCallback) {
    super(parent, HTMLTag.DIV, 'details-page');

    const breadcrumbs = new BreadcrumbsView(this.elem, product, callback);

    const container = new Element(this.elem, HTMLTag.DIV, 'details-page__product');
    const title = new Element(container.elem, HTMLTag.DIV, 'details-page__title', product.title);

    const content = new Element(this.elem, HTMLTag.DIV, 'details-page__content');
    const images = new DetailsImagesView(content.elem, product.images);
    const info = new DetailsInfoView(content.elem, product);
    const cart = new DetailsCartView(content.elem, product.id, product.price, inCart, callback);
  }
}
