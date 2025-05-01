import { ReflectionService } from '@grpc/reflection';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const protoPath = join(__dirname, 'grpc/proto/airline.proto');
  console.log('protoPath', protoPath);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: [
        'airline.flight',
        'airline.booking',
        'airline.aircraft',
        'airline.airport',
        'airline.ticket',
        'airline.ticketflight',
        'airline.common',
      ],
      protoPath,
      url: 'localhost:5000',
      onLoadPackageDefinition: (pkg, server) => {
        new ReflectionService(pkg).addToServer(server);
      },
    },
  });

  // Configure Swagger documentation for REST API
  const config = new DocumentBuilder()
    .setTitle('Adventure Works API')
    .setDescription(
      'Adventure Works API with four protocols: REST, GraphQL, gRPC, and WebSockets',
    )
    .setVersion('1.0')
    .addTag('adventure-works')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // Start microservices
  await app.startAllMicroservices();

  // Start HTTP server
  await app.listen(3000);
  const appUrl = await app.getUrl();
  console.log(`Application is running on: ${appUrl}`);
  console.log(`REST API documentation available at: ${appUrl}/api-docs`);
  console.log(`GraphQL playground available at: ${appUrl}/graphql`);
  console.log(`gRPC API available at: localhost:5000`);
  console.log(
    `WebSocket API available at: ws://${appUrl.replace('http://', '')}`,
  );
}
bootstrap();
