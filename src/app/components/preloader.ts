import { ProductsData } from '../types/types';
import { IDetailsPageData, IProductsPageData } from '../types/interfaces';

export class Preloader {
  public async preloadProductsData(pageData: IProductsPageData): Promise<void> {
    const { data } = pageData;
    await Promise.allSettled(
      data.map(async (product) => {
        await this.preloadImage(product.thumbnail, 4000);
      })
    );
  }

  public async preloadCartData(pageData: ProductsData): Promise<void> {
    await Promise.allSettled(
      pageData.map(async (product) => {
        await this.preloadImage(product.thumbnail, 4000);
      })
    );
  }

  public async preloadDetailsData(pageData: IDetailsPageData): Promise<void> {
    const { product } = pageData;
    await Promise.allSettled(
      product.images.map(async (image) => {
        await this.preloadImage(image, 2000);
      })
    );
  }

  private async preloadImage(link: string, timeout: number): Promise<void> {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        resolve();
      };
      img.onerror = () => {
        setTimeout(() => (img.src = link), timeout);
      };
      img.src = link;
    });
  }
}
