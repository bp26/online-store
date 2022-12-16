import { CartList } from '../../types/types';

export class Cart {
  readonly list: CartList;
  constructor() {
    this.list = {};
  }

  toggleProduct(id: number): void {
    const idKey = id + '';
    if (this.list[idKey] !== undefined) {
      delete this.list[idKey];
    } else {
      this.list[idKey] = 1;
    }
  }

  getCartList(): CartList {
    return this.list;
  }

  incrementProduct(id: string) {
    this.list[id] += 1;
  }

  decrementProduct(id: string) {
    if (this.list[id] === 1) {
      delete this.list[id];
    } else {
      this.list.id -= 1;
    }
  }
}
