import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Logger } from 'nestjs-pino';
import cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';
import { GlobalFilter } from './filters/global.filter';
import { ConvertBigIntInterceptor } from './interceptors/convert-big-int.interceptor';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useLogger(app.get(Logger));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );
  app.use(cookieParser());
  app.useStaticAssets('public', {
    prefix: '/static',
  });
  app.setGlobalPrefix('api');
  app.get(ConfigService).getOrThrow('NODE_ENV') === 'development' &&
    app.enableCors();
  app.useGlobalFilters(new GlobalFilter());
  app.useGlobalInterceptors(new ConvertBigIntInterceptor());
  await app.listen(app.get(ConfigService).getOrThrow('PORT'));
}
bootstrap();
