import { Model } from '../models/model';
import { ProductsData } from '../../types/types';

export class Controller {
  readonly model: Model;
  constructor() {
    this.model = new Model();
  }

  handleProductsData(): ProductsData {
    return this.model.getData();
  }
}
