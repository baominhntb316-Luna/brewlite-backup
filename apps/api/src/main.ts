import { NestFactory } from "@nestjs/core";
import { ValidationPipe } from "@nestjs/common";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Kích hoạt CORS cho kết nối từ Next.js Frontend
  app.enableCors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true,
  });

  // Bật ValidationPipe toàn cục tuân thủ NFR-03 (tự động loại bỏ trường thừa, ném 400 khi sai định dạng)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.API_PORT || 3001;
  await app.listen(port);
  console.log(`[BrewLite API] Server running on http://localhost:${port}`);
}
bootstrap();
