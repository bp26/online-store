import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { ListFilters } from '../../types/types';
import { CountFilters } from '../../types/types';
import { ListOption } from '../../types/types';
import { CountOption } from '../../types/types';

export class Filter {
  public setFilterOptions(data: ProductsData, filteredData: ProductsData) {
    return {
      category: this.setListOptions(data, filteredData, 'category'),
      brand: this.setListOptions(data, filteredData, 'brand'),
      price: this.setCountOptions(filteredData, 'price'),
      stock: this.setCountOptions(filteredData, 'stock'),
    };
  }

  private setListOptions(data: ProductsData, filteredData: ProductsData, filterName: ListFilters): ListOption {
    const fullOptions = data.reduce((acc: ListOption, product: IProduct) => {
      const filter = product[filterName];
      if (acc.filter === undefined) {
        acc.filter = {
          current: 0,
          full: 1,
        };
      } else {
        acc.filter.full += 1;
      }
      return acc;
    }, {});
    return filteredData.reduce((acc: ListOption, product: IProduct) => {
      const filter = product[filterName];
      acc.filter.current += 1;
      return acc;
    }, fullOptions);
  }

  private setCountOptions(filteredData: ProductsData, filterName: CountFilters): CountOption {
    return {
      min: filteredData.reduce((min, current) => (current[filterName] < min ? current[filterName] : min), 0),
      max: filteredData.reduce((max, current) => (current[filterName] > max ? current[filterName] : max), 0),
    };
  }
}
