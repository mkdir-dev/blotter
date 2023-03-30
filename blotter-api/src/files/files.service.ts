import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { access, mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import * as sharp from 'sharp';

import { FileError } from 'src/common/errors/files/files-errors';
import { ServerError } from 'src/common/errors/server/server-errors';
import { MFile } from './classes/m-files.class';

@Injectable()
export class FilesService {
  async convertToWebP(file: Buffer): Promise<Buffer> {
    return await sharp(file).webp().toBuffer();
  }

  async filterImage(
    file: Express.Multer.File,
    nameFile: string,
  ): Promise<MFile> {
    const mimetype = file.mimetype;
    const currentFileType = file.mimetype.split('/')[1];

    if (!mimetype.includes('image')) {
      throw new BadRequestException(FileError.BadRequestError);
    }

    if (currentFileType != 'svg+xml') {
      const buffer = await this.convertToWebP(file.buffer);

      return new MFile({
        buffer,
        mimetype,
        originalname: `${nameFile}.webp`,
      });
    }

    return new MFile({
      buffer: file.buffer,
      mimetype,
      originalname: `${nameFile}.svg`,
    });
  }

  async saveFile(file: MFile, folder: string, path: string): Promise<string> {
    try {
      await access(folder);
    } catch (err) {
      await mkdir(folder, { recursive: true });
    }

    try {
      await writeFile(join(folder, file.originalname), file.buffer);
    } catch (err) {
      throw new InternalServerErrorException(ServerError.InternalServerError);
    }

    return `/${path}/${file.originalname}`;
  }
}
