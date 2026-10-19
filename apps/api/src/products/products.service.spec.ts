import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { ProductsService } from './products.service';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    await service.resetSeed();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll (FR-01)', () => {
    it('should return all active seed products', async () => {
      const products = await service.findAll();
      expect(Array.isArray(products)).toBe(true);
      expect(products.length).toBeGreaterThanOrEqual(4);

      const first = products[0];
      expect(first).toHaveProperty('id');
      expect(first).toHaveProperty('name');
      expect(first).toHaveProperty('basePrice');
      expect(first).toHaveProperty('imageUrl');
      expect(first).toHaveProperty('stock');
      expect(first.isActive).toBe(true);
      expect(first.variants.length).toBeGreaterThan(0);
    });
  });

  describe('findById (FR-02)', () => {
    it('should return product details when ID exists', async () => {
      const product = await service.findById('coffee-milk');
      expect(product).toBeDefined();
      expect(product.id).toBe('coffee-milk');
      expect(product.name).toBe('Cà phê sữa');
      expect(product.basePrice).toBe(35000);
      expect(product.variants).toBeDefined();
      expect(product.toppings).toBeDefined();
    });

    it('should throw NotFoundException (404) when ID does not exist', async () => {
      await expect(service.findById('non-existent-drink')).rejects.toThrow(
        NotFoundException,
      );
    });
  });
});
