import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

const FALLBACK_PRODUCTS = [
  { id: 1, name: 'Cà phê sữa', price: 35000, description: 'Cà phê phin truyền thống đậm đà kết hợp sữa đặc ngọt béo.', category: 'COFFEE', image: '/ca-phe-sua.jpg', stock: 50, version: 1 },
  { id: 2, name: 'Americano', price: 40000, description: 'Espresso pha loãng với nước nóng, giữ trọn hương vị nguyên bản.', category: 'COFFEE', image: '/americano.jpg', stock: 50, version: 1 },
  { id: 3, name: 'Cappuccino', price: 45000, description: 'Espresso đậm vị hòa cùng sữa nóng và lớp bọt sữa bồng bềnh.', category: 'COFFEE', image: '/cappuccino.jpg', stock: 50, version: 1 },
  { id: 4, name: 'Trà đào cam sả', price: 45000, description: 'Trà đào thanh mát kết hợp lát cam tươi mọng nước và hương sả.', category: 'TEA', image: '/tra-dao.jpg', stock: 50, version: 1 },
];

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    try {
      const products = await this.prisma.product.findMany({ orderBy: { id: 'asc' } });
      if (products && products.length > 0) return products;
      return FALLBACK_PRODUCTS;
    } catch (error) {
      return FALLBACK_PRODUCTS;
    }
  }

  async findOne(id: number) {
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (product) return product;
    } catch (error) {}

    const fallback = FALLBACK_PRODUCTS.find((p) => p.id === id);
    if (!fallback) {
      throw new NotFoundException('Không tìm thấy sản phẩm');
    }
    return fallback;
  }

  getPricingOptions() {
    return {
      sizes: [
        { label: 'Size S (Nhỏ)', value: 'S', priceDelta: 0 },
        { label: 'Size M (Vừa)', value: 'M', priceDelta: 6000 },
        { label: 'Size L (Lớn)', value: 'L', priceDelta: 12000 },
      ],
      toppings: [
        { id: 'tp-pearl', name: 'Trân châu hoàng kim', price: 8000 },
        { id: 'tp-cream', name: 'Kem Macchiato phô mai', price: 12000 },
        { id: 'tp-shot', name: 'Thêm 1 Shot Espresso', price: 10000 },
        { id: 'tp-jelly', name: 'Thạch cà phê giòn', price: 8000 },
      ],
      promoCodes: [
        { code: 'BREWLITE10', type: 'PERCENT', value: 10, description: 'Giảm 10% tổng hóa đơn' },
        { code: 'GIAM10K', type: 'FIXED', value: 10000, description: 'Giảm 10.000đ trực tiếp' },
        { code: 'SGU2026', type: 'PERCENT', value: 20, description: 'Ưu đãi ĐH Sài Gòn - Giảm 20%' },
      ],
    };
  }
}
