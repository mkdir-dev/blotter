import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { FilesModule } from 'src/files/files.module';

import { TokenGuard } from 'src/common/guards/token.guard';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from '../config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),

    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const hostDB = configService.get<string>('db_host');
        const uriDB = configService.get<string>('db_uri');
        const userDB = configService.get<string>('db_user');
        const passDB = configService.get<string>('db_pass');
        const nameDB = configService.get<string>('db_name');

        return {
          uri: `${hostDB}://${userDB}:${passDB}@${uriDB}/${nameDB}`,
        };
      },
    }),

    UsersModule,
    AuthModule,
    FilesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: TokenGuard,
    },
  ],
})
export class AppModule {}
