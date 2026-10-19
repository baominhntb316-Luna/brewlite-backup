import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductResponseDto } from './dto/product-response.dto';
import { SEED_PRODUCTS } from './seed/products.seed';

@Injectable()
export class ProductsService {
  private products: ProductResponseDto[] = [...SEED_PRODUCTS];

  /**
   * Lấy danh sách sản phẩm đang hoạt động (FR-01)
   */
  async findAll(): Promise<ProductResponseDto[]> {
    return this.products.filter((p) => p.isActive);
  }

  /**
   * Lấy chi tiết sản phẩm theo ID kèm Size và Topping (FR-02)
   * Ném lỗi 404 nếu không tìm thấy
   */
  async findById(id: string): Promise<ProductResponseDto> {
    const product = this.products.find((p) => p.id === id && p.isActive);
    if (!product) {
      throw new NotFoundException(`Product with ID "${id}" not found or inactive`);
    }
    return product;
  }

  /**
   * Phục vụ reset dữ liệu kiểm thử
   */
  async resetSeed(): Promise<void> {
    this.products = [...SEED_PRODUCTS];
  }
}
