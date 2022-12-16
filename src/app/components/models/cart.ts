import { CartList } from '../../types/types';

export class Cart {
  readonly list: CartList;
  constructor() {
    this.list = {};
  }

  toggleProduct(id: number): void {
    if (this.list[id] !== undefined) {
      delete this.list[id];
    } else {
      this.list[id] = 1;
    }
  }

  getCartList(): CartList {
    return this.list;
  }

  incrementProduct(id: number) {
    this.list[id] += 1;
  }

  decrementProduct(id: number) {
    if (this.list[id] === 1) {
      delete this.list[id];
    } else {
      this.list.id -= 1;
    }
  }
}
