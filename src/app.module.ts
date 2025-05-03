import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import { AuthModule } from './auth/auth.module';
import { KLineModule } from './k-line/k-line.module';
import { UploadModule } from './upload/upload.module';
import { ProfileModule } from './profile/profile.module';
import { AppController } from './app.controller';
import { OrdersModule } from './orders/orders.module';
import { RedisService } from './redis/redis.service';
import { RedisModule } from './redis/redis.module';
import { BackTestModule } from './back-test/back-test.module';
import { UserAgentMiddleware } from './middlewares/user-agent.middleware';

@Module({
  imports: [
    LoggerModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const isProd = configService.get('NODE_ENV') === 'production';
        return {
          pinoHttp: {
            transport: isProd
              ? undefined
              : {
                  target: 'pino-pretty',
                  options: {
                    singleLine: true,
                  },
                },
            level: isProd ? 'info' : 'debug',
          },
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UsersModule,
    AuthModule,
    KLineModule,
    UploadModule,
    ProfileModule,
    OrdersModule,
    RedisModule,
    BackTestModule,
  ],
  controllers: [AppController],
  providers: [RedisService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserAgentMiddleware).forRoutes('*');
  }
}
