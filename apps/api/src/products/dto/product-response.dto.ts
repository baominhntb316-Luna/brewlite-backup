export class ProductVariantDto {
  size: "S" | "M" | "L";
  priceDelta: number;
}

export class ProductToppingDto {
  id: string;
  name: string;
  extraPrice: number;
}

export class ProductResponseDto {
  id: string;
  name: string;
  basePrice: number;
  imageUrl: string;
  stock: number;
  isActive: boolean;
  variants: ProductVariantDto[];
  toppings: ProductToppingDto[];
}
