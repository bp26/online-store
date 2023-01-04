import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { SEARCH_CATEGORIES } from '../../utils/constants';

export class Search {
  private line: string = '';

  public setSearchLine(line: string): void {
    this.line = line;
  }

  private unsetSearch(): void {
    this.line = '';
  }

  public searchData(data: ProductsData): ProductsData {
    const compliantProducts = data.filter((product) => this.checkProduct(product));
    this.unsetSearch();
    return compliantProducts;
  }

  private checkProduct(product: IProduct): boolean {
    return SEARCH_CATEGORIES.some((category) =>
      String(product[category as keyof IProduct])
        .toLowerCase()
        .includes(this.line)
    );
  }
}
