import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import helmet from '@fastify/helmet'

async function bootstrap() {
  const configService = new ConfigService();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      maxParamLength: configService.get('MAX_PARAMS_LENGTH'),
    }),
  );
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.getHttpAdapter().getInstance().register(helmet);
  const config = new DocumentBuilder()
    .setTitle('CRM')
    .setDescription('API CRM')
    .setVersion('1.0')
    .addTag('crm')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(configService.get('PORT'));
}
bootstrap();