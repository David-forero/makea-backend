import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Enable CORS
app.enableCors({
  origin: ['http://localhost:3000', 'http://localhost:4200', 'http://localhost:5173'], // URL de origen permitida
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos HTTP permitidos
  allowedHeaders: ['Content-Type', 'Authorization'], // Cabeceras permitidas
});

  await app.listen(3000);
}
bootstrap();
