import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { ListFilters } from '../../types/types';
import { CountFilters } from '../../types/types';
import { ListOptions } from '../../types/types';
import { CountOptions } from '../../types/types';
import { IFilters } from '../../types/interfaces';
import { FiltersData } from '../../types/types';
import { FiltersType } from '../../types/enums';

export class Filter {
  private filters: IFilters;
  constructor() {
    this.filters = this.initFilters();
  }

  private initFilters(): IFilters {
    return {
      category: [],
      brand: [],
      price: null,
      stock: null,
    };
  }

  public resetFilters(): void {
    this.filters = this.initFilters();
  }

  public setFilter(filtersData: FiltersData) {
    const { type, filter } = filtersData;
    switch (type) {
      case FiltersType.category:
        if (typeof filter === 'string') this.setListFilter('category', filter);
        break;
      case FiltersType.brand:
        if (typeof filter === 'string') this.setListFilter('brand', filter);
        break;
      case FiltersType.price:
        if (typeof filter !== 'string') this.setCountFilter('price', filter);
        break;
      case FiltersType.stock:
        if (typeof filter !== 'string') this.setCountFilter('stock', filter);
        break;
    }
  }

  private setListFilter(filterName: ListFilters, filter: string): void {
    if (this.filters[filterName].includes(filter)) {
      this.filters[filterName].splice(this.filters[filterName].indexOf(filter), 1);
    } else {
      this.filters[filterName].push(filter);
    }
  }

  private setCountFilter(filterName: CountFilters, filter: CountOptions): void {
    console.log(filterName, filter);
  }

  public setFilterOptions(data: ProductsData, filteredData: ProductsData) {
    return {
      category: this.setListOptions(data, filteredData, 'category'),
      brand: this.setListOptions(data, filteredData, 'brand'),
      price: this.setCountOptions(filteredData, 'price'),
      stock: this.setCountOptions(filteredData, 'stock'),
    };
  }

  private setListOptions(data: ProductsData, filteredData: ProductsData, filterName: ListFilters): ListOptions {
    const fullOptions = data.reduce((acc: ListOptions, product: IProduct) => {
      const filter = product[filterName];
      if (acc[filter] === undefined) {
        acc[filter] = {
          current: 0,
          full: 1,
          isActive: this.filters[filterName].includes(filter) ? true : false,
        };
      } else {
        acc[filter].full += 1;
      }
      return acc;
    }, {});
    return filteredData.reduce((acc: ListOptions, product: IProduct) => {
      const filter = product[filterName];
      acc[filter].current += 1;
      return acc;
    }, fullOptions);
  }

  private setCountOptions(filteredData: ProductsData, filterName: CountFilters): CountOptions {
    return {
      min: Math.min(...filteredData.map((product) => product[filterName])),
      max: Math.max(...filteredData.map((product) => product[filterName])),
    };
  }
}
