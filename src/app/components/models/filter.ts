import { ProductsData } from '../../types/types';
import { IProduct } from '../../types/interfaces';
import { ListFilterNames } from '../../types/types';
import { CountFilterNames } from '../../types/types';
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

  public filterData(data: ProductsData): ProductsData {
    const categoryFilter = (product: IProduct) => this.filterList(product, 'category');
    const brandFilter = (product: IProduct) => this.filterList(product, 'brand');
    const priceFilter = (product: IProduct) => this.filterCount(product, 'price');
    const stockFilter = (product: IProduct) => this.filterCount(product, 'stock');
    const filterArray = [categoryFilter, brandFilter, priceFilter, stockFilter];
    return filterArray.reduce((data, filterFunc) => data.filter(filterFunc), data);
  }

  private filterList(product: IProduct, filterName: ListFilterNames): boolean {
    const filter = this.filters[filterName];
    return filter.length !== 0 ? filter.includes(product[filterName]) : true;
  }

  private filterCount(product: IProduct, filterName: CountFilterNames): boolean {
    const filter = this.filters[filterName];
    return filter !== null ? product[filterName] >= filter.min && product[filterName] <= filter.max : true;
  }

  public resetFilters(): void {
    this.filters = this.initFilters();
  }

  public setFilter(filtersData: FiltersData): void {
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

  private setListFilter(filterName: ListFilterNames, filterValue: string): void {
    const filter = this.filters[filterName];
    if (filter.includes(filterValue)) {
      filter.splice(filter.indexOf(filterValue), 1);
    } else {
      filter.push(filterValue);
    }
  }

  private setCountFilter(filterName: CountFilterNames, filterValue: [number, number]): void {
    const sortedFilter = filterValue.sort();
    this.filters[filterName] = {
      min: sortedFilter[0],
      max: sortedFilter[1],
      isActive: true,
    };
  }

  public setFilterOptions(data: ProductsData, filteredData: ProductsData) {
    return {
      category: this.setListOptions(data, filteredData, 'category'),
      brand: this.setListOptions(data, filteredData, 'brand'),
      price: this.setCountOptions(filteredData, 'price'),
      stock: this.setCountOptions(filteredData, 'stock'),
    };
  }

  private setListOptions(data: ProductsData, filteredData: ProductsData, filterName: ListFilterNames): ListOptions {
    const fullOptions = data.reduce((acc: ListOptions, product: IProduct) => {
      const filter = product[filterName];
      if (acc[filter] === undefined) {
        acc[filter] = {
          current: 0,
          full: 1,
          isChecked: this.filters[filterName].includes(filter) ? true : false,
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

  private setCountOptions(filteredData: ProductsData, filterName: CountFilterNames): CountOptions {
    const filter = this.filters[filterName];
    if (filter && filter.isActive) {
      filter.isActive = false;
      return {
        min: filter.min,
        max: filter.max,
      };
    } else {
      return {
        min: Math.min(...filteredData.map((product) => product[filterName])),
        max: Math.max(...filteredData.map((product) => product[filterName])),
      };
    }
  }
}
