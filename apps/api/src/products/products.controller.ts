import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductResponseDto } from './dto/product-response.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  /**
   * GET /products
   * Lấy danh sách sản phẩm active cho Menu (FR-01)
   */
  @Get()
  async getProducts(): Promise<ProductResponseDto[]> {
    return this.productsService.findAll();
  }

  /**
   * GET /products/:id
   * Lấy chi tiết sản phẩm, size và topping (FR-02)
   */
  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<ProductResponseDto> {
    return this.productsService.findById(id);
  }
}
