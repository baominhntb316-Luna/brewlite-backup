export interface ProductVariant {
  size: 'S' | 'M' | 'L';
  priceDelta: number;
}

export interface ProductTopping {
  id: string;
  name: string;
  extraPrice: number;
}

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  variants: ProductVariant[];
  toppings: ProductTopping[];
}

export interface CartItem {
  productId: string;
  name: string;
  size: 'S' | 'M' | 'L';
  qty: number;
  unitPrice: number;
  lineTotal: number;
  toppingIds: string[];
}
