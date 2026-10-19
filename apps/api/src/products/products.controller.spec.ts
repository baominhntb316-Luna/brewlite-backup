import { Test, TestingModule } from "@nestjs/testing";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { NotFoundException } from "@nestjs/common";

describe("ProductsController", () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
    await service.resetSeed();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  it("GET /products should return array of products", async () => {
    const result = await controller.getProducts();
    expect(Array.isArray(result)).toBe(true);
    expect(result.length).toBeGreaterThanOrEqual(999);
    expect(result[0].name).toBe("Cà phê sữa");
  });

  it("GET /products/:id should return single product if valid ID", async () => {
    const result = await controller.getProductById("americano");
    expect(result).toBeDefined();
    expect(result.id).toBe("americano");
    expect(result.basePrice).toBe(40000);
  });

  it("GET /products/:id should throw NotFoundException on invalid ID", async () => {
    await expect(controller.getProductById("unknown-id")).rejects.toThrow(
      NotFoundException,
    );
  });
});
