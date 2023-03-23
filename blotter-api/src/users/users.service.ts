import {
  Injectable,
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto, ResponseCreateUserDto } from './dto/create-user.dto';
import { UserError } from 'src/common/errors/users/users-errors';
import { ServerError } from 'src/common/errors/server/server-errors';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async hashPassword(password: string): Promise<string | Error> {
    return await bcrypt
      .hash(password, 16)
      .then((hash): string => hash)
      .catch((): Error => {
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async createUser(
    createUserDto: CreateUserDto,
  ): Promise<ResponseCreateUserDto | Error> {
    const hash = await this.hashPassword(createUserDto.password);
    const uuid = uuidv4();
    const date = Date.now();

    if (!uuid || !date) {
      throw new InternalServerErrorException(ServerError.InternalServerError);
    }

    const newCreateUser: ResponseCreateUserDto | Error = await this.userModel
      .create({
        uuid,
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
        createdAt: date,
        updatedAt: date,
      })
      .then(
        (user: User): ResponseCreateUserDto => ({
          uuid: user.uuid,
          username: user.username,
          email: user.email,
        }),
      )
      .catch((err): Error => {
        if (err.name === 'ValidationError') {
          throw new BadRequestException([UserError.ValidationError]);
        }
        if (err.name === 'CastError') {
          throw new BadRequestException([UserError.BadRequestError]);
        }
        if (err.name === 'MongoError' || err.code === 11000) {
          throw new ConflictException([UserError.ConflictError]);
        }
        throw new InternalServerErrorException([
          ServerError.InternalServerError,
        ]);
      });

    return newCreateUser;
  }

  /*
  module.exports.getUser = (req, res, next) => {
  User.findById(req.user)
    .orFail(new Error('NotFound'))
    .then((user) => res.status(SUCCESS_OK).send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestError(userErr.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundError(userErr.NotFoundError);
      }
      throw new InternalServerError(serverErr.InternalServerError);
    })
    .catch(next);
};
  */
}
