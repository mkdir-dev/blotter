import {
  Injectable,
  BadRequestException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';

import { ServerError, UserError } from 'src/common/errors/errors';
import { handlePagination } from 'src/common/pagination/pagination';
import { FilesService } from 'src/files/files.service';

import { User, UserDocument } from './schemas/user.schema';
import {
  ResponseRegisterUser,
  ResponseUser,
  ResponseUserAndHash,
} from './dto/general-user.dto';
import { RegisterUserDto } from './dto/create-user.dto';
import {
  GetUsersQueryParamsDto,
  ResponseUsersPagination,
} from './dto/get-users.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { valuesSortUsers } from './utils/constants';
import { DeleteUserDto } from './dto/delete-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<UserDocument>,
    private readonly filesService: FilesService,
  ) {}

  async handleHash(password: string): Promise<string | Error> {
    return await bcrypt
      .hash(password, 16)
      .then((hash): string => hash)
      .catch((): Error => {
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async createUser(data: RegisterUserDto): Promise<ResponseRegisterUser> {
    const hash = await this.handleHash(data.password);
    const uuid = uuidv4();
    const date = Date.now();

    if (!uuid || !date) {
      throw new InternalServerErrorException(ServerError.InternalServerError);
    }

    return await this.userModel
      .create({
        uuid,
        username: data.username,
        email: data.email,
        password: hash,
        createdAt: date,
        updatedAt: date,
      })
      .then(
        (user: User): ResponseRegisterUser => ({
          id: user._id,
          uuid: user.uuid,
          username: user.username,
          email: user.email,
          role: user.role,
        }),
      )
      .catch((err) => {
        if (err.name === 'ValidationError') {
          throw new BadRequestException(UserError.ValidationError);
        }
        if (err.name === 'CastError') {
          throw new BadRequestException(UserError.BadRequestError);
        }
        if (err.name === 'MongoError' || err.code === 11000) {
          throw new ConflictException(UserError.ConflictError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async getUserById(id: string): Promise<ResponseUser | Error> {
    return await this.userModel
      .findById(id)
      .orFail(new Error('NotFound'))
      .then(
        (user: User): ResponseUser => ({
          id: user._id,
          uuid: user.uuid,
          username: user.username,
          email: user.email,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          avatar: user.avatar,
          phone: user.phone,
          nationality: user.nationality,
          country: user.country,
          city: user.city,
          gender: user.gender,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          status: user.status,
        }),
      )
      .catch((err): Error => {
        if (err.name === 'CastError') {
          throw new BadRequestException(UserError.BadRequestError);
        }
        if (err.message === 'NotFound') {
          throw new NotFoundException(UserError.NotFoundError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async existUserByEmail(email: string): Promise<User> {
    try {
      return await this.userModel.findOne({ email });
    } catch (err) {
      if (err.name === 'CastError') {
        throw new BadRequestException(UserError.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundException(UserError.NotFoundError);
      }
      throw new InternalServerErrorException(ServerError.InternalServerError);
    }
  }

  async getUsers(
    query: GetUsersQueryParamsDto,
  ): Promise<ResponseUsersPagination | Error> {
    let search = {};
    const sort = {};

    if (query.search) {
      search = {
        $or: [
          { username: new RegExp(query.search.toString(), 'i') },
          { email: new RegExp(query.search.toString(), 'i') },
          { name: new RegExp(query.search.toString(), 'i') },
          { surname: new RegExp(query.search.toString(), 'i') },
        ],
      };
    }

    if (query.sort) {
      const sortKey = query.sort.replace(/[^a-z]/gi, '');
      const sortValue = query.sort.replace(/[^-]/gi, '') ? -1 : 1;
      const exist = valuesSortUsers.some((val) => val === sortKey);

      if (!exist) {
        throw new BadRequestException(
          `Параметра сортировки ${
            query.sort
          } не существует. Возможные значения: ${valuesSortUsers.join(', ')}`,
        );
      }

      sort[`${sortKey}`] = sortValue;
    }

    const total = await this.userModel.count(search).catch((err) => {
      if (err.name === 'CastError') {
        throw new BadRequestException(UserError.BadRequestError);
      }
      if (err.message === 'NotFound') {
        throw new NotFoundException(UserError.NotFoundError);
      }
      throw new InternalServerErrorException(ServerError.InternalServerError);
    });

    const pagination = handlePagination({
      page: query.page,
      per_page: query.per_page,
      total,
    });

    const users = await this.userModel
      .find(search)
      .sort(sort)
      .skip((pagination.page - 1) * pagination.per_page)
      .limit(pagination.per_page)
      .exec()
      .then((users: User[]) => {
        return users.map(
          (user): ResponseUser => ({
            id: user._id,
            uuid: user.uuid,
            username: user.username,
            email: user.email,
            name: user.name,
            surname: user.surname,
            birthday: user.birthday,
            avatar: user.avatar,
            phone: user.phone,
            nationality: user.nationality,
            country: user.country,
            city: user.city,
            gender: user.gender,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            role: user.role,
            status: user.status,
          }),
        );
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new BadRequestException(UserError.BadRequestError);
        }
        if (err.message === 'NotFound') {
          throw new NotFoundException(UserError.NotFoundError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });

    return {
      meta: pagination,
      data: users,
    };
  }

  async updateUser({
    id,
    data,
  }: {
    id: string;
    data: UpdateUserDto;
  }): Promise<ResponseUser | Error> {
    const date = Date.now();

    return await this.userModel
      .findByIdAndUpdate(
        id,
        { ...data, updatedAt: date },
        { new: true, runValidators: true },
      )
      .orFail(new Error('NotFound'))
      .then(
        (user: User): ResponseUser => ({
          id: user._id,
          uuid: user.uuid,
          username: user.username,
          email: user.email,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          avatar: user.avatar,
          phone: user.phone,
          nationality: user.nationality,
          country: user.country,
          city: user.city,
          gender: user.gender,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          status: user.status,
        }),
      )
      .catch((err): Error => {
        if (err.name === 'ValidationError') {
          throw new BadRequestException(UserError.ValidationError);
        }
        if (err.name === 'CastError') {
          throw new BadRequestException(UserError.BadRequestError);
        }
        if (err.message === 'NotFound') {
          throw new NotFoundException(UserError.NotFoundError);
        }
        if (err.name === 'MongoError' || err.code === 11000) {
          throw new ConflictException(UserError.ConflictError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async updateRT(id: string, rt: string | null) {
    const hash = rt === null ? rt : await this.handleHash(rt);

    return await this.userModel
      .findByIdAndUpdate(
        id,
        { hashRT: hash },
        { new: true, runValidators: true },
      )
      .orFail(new Error('NotFound'))
      .then(
        (user: User): ResponseUserAndHash => ({
          id: user._id,
          uuid: user.uuid,
          username: user.username,
          email: user.email,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          avatar: user.avatar,
          phone: user.phone,
          nationality: user.nationality,
          country: user.country,
          city: user.city,
          gender: user.gender,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          status: user.status,
          hashRT: user.hashRT,
        }),
      )
      .catch((err): Error => {
        if (err.name === 'CastError') {
          throw new BadRequestException(UserError.BadRequestError);
        }
        if (err.message === 'NotFound') {
          throw new NotFoundException(UserError.NotFoundError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async uploadAvatar(
    id: string,
    file: Express.Multer.File,
  ): Promise<ResponseUser | Error> {
    const date = Date.now();
    const path = 'users/avatars';
    const url = await this.filesService.saveFile(id, file, path);

    return await this.userModel
      .findByIdAndUpdate(
        id,
        { avatar: url, updatedAt: date },
        { new: true, runValidators: true },
      )
      .orFail(new Error('NotFound'))
      .then(
        (user: User): ResponseUser => ({
          id: user._id,
          uuid: user.uuid,
          username: user.username,
          email: user.email,
          name: user.name,
          surname: user.surname,
          birthday: user.birthday,
          avatar: user.avatar,
          phone: user.phone,
          nationality: user.nationality,
          country: user.country,
          city: user.city,
          gender: user.gender,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          role: user.role,
          status: user.status,
        }),
      )
      .catch((err): Error => {
        if (err.name === 'ValidationError') {
          throw new BadRequestException(UserError.ValidationError);
        }
        if (err.name === 'CastError') {
          throw new BadRequestException(UserError.BadRequestError);
        }
        if (err.message === 'NotFound') {
          throw new NotFoundException(UserError.NotFoundError);
        }
        if (err.name === 'MongoError' || err.code === 11000) {
          throw new ConflictException(UserError.ConflictError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async deleteUser(id: string): Promise<string | Error> {
    return await this.userModel
      .findByIdAndDelete(id)
      .orFail(new Error('NotFound'))
      .then((user: User) => `Пользователь ${user.username} удален`)
      .catch((err) => {
        if (err.message === 'NotFound') {
          throw new NotFoundException(UserError.NotFoundError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }

  async deleteManyUsers(data: DeleteUserDto): Promise<string | Error> {
    const { ids } = data;

    return await this.userModel
      .deleteMany({ _id: { $in: ids } })
      .orFail(new Error('NotFound'))
      .then(() => `Пользователи ${ids.join(', ')} удалены`)
      .catch((err) => {
        if (err.name === 'CastError') {
          throw new BadRequestException(UserError.BadRequestError);
        }
        if (err.message === 'NotFound') {
          throw new NotFoundException(UserError.NotFoundError);
        }
        throw new InternalServerErrorException(ServerError.InternalServerError);
      });
  }
}
