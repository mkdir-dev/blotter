import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { FilesService } from 'src/files/files.service';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User, Userchema } from './schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: Userchema }]),
  ],
  controllers: [UsersController],
  providers: [UsersService, FilesService],
})
export class UsersModule {}
