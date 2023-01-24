import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { format } from 'date-fns';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CreateUser } from './types/create-user.types';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<CreateUser> {
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const uuid = uuidv4();
    const date = format(new Date(), 'yyyy-MM-dd');

    const newCreateUser: CreateUser = await this.userModel
      .create({
        uuid,
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
        registration_date: date,
      })
      .then(
        (user: User): CreateUser => ({
          uuid: user.uuid,
          username: user.username,
          email: user.email,
        }),
      )
      .catch((err) => {
        console.log('err', err);

        // заглушка
        return {
          uuid: 'none',
          username: createUserDto.username,
          email: createUserDto.email,
        };
        /*
            if (err.name === 'ValidationError') {
              // throw new BadRequestError(userErr.ValidationError);
              throw new BadRequestError(userErr.ValidationError);
            }
            if (err.name === 'CastError') {
              throw new BadRequestError(userErr.BadRequestError);
            }
            if (err.name === 'MongoError' && err.code === 11000) {
              throw new ConflictError(userErr.ConflictError);
            }
            throw new InternalServerError(serverErr.InternalServerError);
            */
      });

    return newCreateUser;

    /*
    const salt = await bcrypt.genSalt(8);
    const hash = await bcrypt.hash(createUserDto.password, salt);
    const uuid = uuidv4();

    const newCreateUser: ResponseCreateUser = await this.userModel
      .create({
        uuid,
        username: createUserDto.username,
        email: createUserDto.email,
        password: hash,
      })
      .then(
        (user: User): ResponseCreateUser => ({
          uuid: user.uuid,
          username: user.username,
          email: user.email,
        }),
      );
    /*
      .catch((err) => {
        if (err.name === 'ValidationError') {
          // throw new BadRequestError(userErr.ValidationError);
          throw new BadRequestError(userErr.ValidationError);
        }
        if (err.name === 'CastError') {
          throw new BadRequestError(userErr.BadRequestError);
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError(userErr.ConflictError);
        }
        throw new InternalServerError(serverErr.InternalServerError);
      }))
    */

    // return newCreateUser;
  }
}

/*
module.exports.register = (req, res, next) => {
  const {
    email, password, name, lang, admin,
  } = req.body;

  bcrypt
    .hash(password, 8)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      lang,
      admin,
    })
      .then((user) => res.status(SUCCESS_OK).send({
        name: user.name,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          // throw new BadRequestError(userErr.ValidationError);
          throw new BadRequestError(userErr.ValidationError);
        }
        if (err.name === 'CastError') {
          throw new BadRequestError(userErr.BadRequestError);
        }
        if (err.name === 'MongoError' && err.code === 11000) {
          throw new ConflictError(userErr.ConflictError);
        }
        throw new InternalServerError(serverErr.InternalServerError);
      }))
    .catch(next);
};
*/
