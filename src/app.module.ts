import { Module, OnModuleInit } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as Joi from 'joi';
import { join } from 'path';
import { UploadModule } from './upload/upload.module';

const envFilePath = join(__dirname, `../.env.stage.${process.env.STAGE}`);

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath,
      validationSchema: Joi.object({
        PG_HOST: Joi.string().required(),
        PG_PORT: Joi.number().required(),
        PG_USERNAME: Joi.string().required(),
        PG_PASSWORD: Joi.string().required(),
        PG_DB: Joi.string().required(),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PG_HOST'),
        port: +configService.get('PG_PORT'),
        username: configService.get('PG_USERNAME'),
        password: configService.get('PG_PASSWORD'),
        database: configService.get('PG_DB'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: configService.get('STAGE') === 'dev',
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UploadModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  onModuleInit() {
    console.log('STAGE::', process.env.STAGE);
  }
}
