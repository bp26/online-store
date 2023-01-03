import { SortType } from '../../types/enums';
import { SortDirection } from '../../types/enums';
import { SortCategory } from '../../types/enums';
import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';

export class Sort {
  private type: SortType;

  constructor() {
    this.type = SortType.DEFAULT;
  }

  public setType(type: SortType): void {
    this.type = type;
  }

  public sortData(data: ProductsData): ProductsData {
    switch (this.type) {
      case SortType.DEFAULT:
        return data;
      case SortType.PRICE_ASC:
        return this.sortByCategory(data, SortCategory.PRICE, SortDirection.ASC);
      case SortType.PRICE_DESC:
        return this.sortByCategory(data, SortCategory.PRICE, SortDirection.DESC);
      case SortType.DISCOUNT_ASC:
        return this.sortByCategory(data, SortCategory.DISCOUNT, SortDirection.ASC);
      case SortType.DISCOUNT_DESC:
        return this.sortByCategory(data, SortCategory.DISCOUNT, SortDirection.DESC);
      case SortType.RATING_ASC:
        return this.sortByCategory(data, SortCategory.RATING, SortDirection.ASC);
      case SortType.RATING_DESC:
        return this.sortByCategory(data, SortCategory.RATING, SortDirection.DESC);
    }
  }

  private sortByCategory(data: ProductsData, category: SortCategory, direction: SortDirection): ProductsData {
    switch (direction) {
      case SortDirection.ASC:
        return data.sort((a, b) => a[category] - b[category]);
      case SortDirection.DESC:
        return data.sort((a, b) => b[category] - a[category]);
    }
  }
}
