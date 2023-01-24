import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from 'src/users/users.module';
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
