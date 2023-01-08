import { ProductsData } from '../types/types';
import { IDetailsPageData, IProductsPageData } from '../types/interfaces';
import { PreloadTimeout } from '../types/enums';

export class Preloader {
  public async preloadProductsData(pageData: IProductsPageData): Promise<void> {
    const data = pageData.productsOptions.data;
    await Promise.allSettled(
      data.map(async (product) => {
        await this.preloadImage(product.thumbnail, +PreloadTimeout.HIGH);
      })
    );
  }

  public async preloadCartData(pageData: ProductsData): Promise<void> {
    await Promise.allSettled(
      pageData.map(async (product) => {
        await this.preloadImage(product.thumbnail, +PreloadTimeout.LOW);
      })
    );
  }

  public async preloadDetailsData(pageData: IDetailsPageData): Promise<void> {
    const { product } = pageData;
    await Promise.allSettled(
      product.images.map(async (image) => {
        await this.preloadImage(image, +PreloadTimeout.LOW);
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
