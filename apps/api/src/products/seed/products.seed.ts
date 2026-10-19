import { ProductResponseDto } from "../dto/product-response.dto";

export const SEED_PRODUCTS: ProductResponseDto[] = [
  {
    id: "coffee-milk",
    name: "Cà phê sữa",
    basePrice: 35000,
    imageUrl:
      "https://images.unsplash.com/photo-1541167760496-1628856ab772?w=600&auto=format&fit=crop&q=80",
    stock: 25,
    isActive: true,
    variants: [
      { size: "S", priceDelta: 0 },
      { size: "M", priceDelta: 6000 },
      { size: "L", priceDelta: 10000 },
    ],
    toppings: [
      { id: "topping-pearl", name: "Trân châu đen", extraPrice: 5000 },
      { id: "topping-foam", name: "Kem phô mai", extraPrice: 8000 },
    ],
  },
  {
    id: "americano",
    name: "Americano",
    basePrice: 40000,
    imageUrl:
      "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=600&auto=format&fit=crop&q=80",
    stock: 20,
    isActive: true,
    variants: [
      { size: "S", priceDelta: 0 },
      { size: "M", priceDelta: 6000 },
      { size: "L", priceDelta: 10000 },
    ],
    toppings: [{ id: "topping-foam", name: "Kem phô mai", extraPrice: 8000 }],
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    basePrice: 45000,
    imageUrl:
      "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop&q=80",
    stock: 15,
    isActive: true,
    variants: [
      { size: "S", priceDelta: 0 },
      { size: "M", priceDelta: 6000 },
      { size: "L", priceDelta: 10000 },
    ],
    toppings: [
      { id: "topping-pearl", name: "Trân châu đen", extraPrice: 5000 },
      { id: "topping-foam", name: "Kem phô mai", extraPrice: 8000 },
    ],
  },
  {
    id: "peach-tea",
    name: "Trà đào cam sả",
    basePrice: 39000,
    imageUrl:
      "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop&q=80",
    stock: 18,
    isActive: true,
    variants: [
      { size: "S", priceDelta: 0 },
      { size: "M", priceDelta: 6000 },
      { size: "L", priceDelta: 10000 },
    ],
    toppings: [
      { id: "topping-pearl", name: "Trân châu đen", extraPrice: 5000 },
      { id: "topping-aloe", name: "Thạch nha đam", extraPrice: 6000 },
    ],
  },
];
