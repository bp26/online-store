export interface IProduct {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ICartList {
  [key: string]: IDescriptionCartList;
}

export interface IDiscount {
  [key: string]: IDiscountValue;
}

interface IDiscountValue {
  name: string;
  value: string;
}

interface IDescriptionCartList {
  count: number;
  price: number;
}
