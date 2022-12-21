import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { ListFilters } from '../../types/types';
import { CountFilters } from '../../types/types';
import { ListOption } from '../../types/types';
import { CountOption } from '../../types/types';
import { IFilters } from '../../types/interfaces';

export class Filter {
  private filters: IFilters;
  constructor() {
    this.filters = this.initFilters();
  }

  public setListFilter(filterName: ListFilters, filter: string): void {
    if (this.filters[filterName].includes(filter)) {
      this.filters[filterName].splice(this.filters[filterName].indexOf(filter), 1);
    } else {
      this.filters[filterName].push(filter);
    }
  }

  public setFilterOptions(data: ProductsData, filteredData: ProductsData) {
    return {
      category: this.setListOptions(data, filteredData, 'category'),
      brand: this.setListOptions(data, filteredData, 'brand'),
      price: this.setCountOptions(filteredData, 'price'),
      stock: this.setCountOptions(filteredData, 'stock'),
    };
  }

  public resetFilters(): void {
    this.filters = this.initFilters();
  }

  private setListOptions(data: ProductsData, filteredData: ProductsData, filterName: ListFilters): ListOption {
    const fullOptions = data.reduce((acc: ListOption, product: IProduct) => {
      const filter = product[filterName];
      if (acc[filter] === undefined) {
        acc[filter] = {
          current: 0,
          full: 1,
        };
      } else {
        acc[filter].full += 1;
      }
      return acc;
    }, {});
    return filteredData.reduce((acc: ListOption, product: IProduct) => {
      const filter = product[filterName];
      acc[filter].current += 1;
      return acc;
    }, fullOptions);
  }

  private setCountOptions(filteredData: ProductsData, filterName: CountFilters): CountOption {
    return {
      min: Math.min(...filteredData.map((product) => product[filterName])),
      max: Math.max(...filteredData.map((product) => product[filterName])),
    };
  }

  private initFilters(): IFilters {
    return {
      category: [],
      brand: [],
      price: null,
      stock: null,
    };
  }
}
