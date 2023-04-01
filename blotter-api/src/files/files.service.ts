import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as sharp from 'sharp';
import { Storage } from '@google-cloud/storage';

import { FileError } from 'src/common/errors/files/files-errors';
import { ServerError } from 'src/common/errors/server/server-errors';
import { cloudConfig } from 'src/config/cloud-config';
import { MFile } from './classes/m-files.class';

@Injectable()
export class FilesService {
  private storage: Storage;
  private bucket: string;

  constructor() {
    this.storage = new Storage({
      projectId: cloudConfig.cloud_project_id,
      credentials: {
        client_email: cloudConfig.cloud_client_email,
        private_key: cloudConfig.cloud_private_key,
      },
    });

    this.bucket = cloudConfig.cloud_media_bucket;
  }

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

  async saveFile(
    id: string,
    file: Express.Multer.File,
    path: string,
  ): Promise<string> {
    const { originalname, buffer } = await this.filterImage(file, id);
    const metadata: { [key: string]: string }[] = [{ id: id }];
    const object = metadata.reduce((obj, item) => Object.assign(obj, item), {});
    const fileStorage = this.storage
      .bucket(this.bucket)
      .file(`${path}/${originalname}`);
    const stream = fileStorage.createWriteStream();

    try {
      stream.on('finish', async () => {
        return await fileStorage.setMetadata({
          metadata: object,
        });
      });
      stream.end(buffer);
    } catch (err) {
      throw new InternalServerErrorException(ServerError.SaveFileServerError);
    }

    return `${cloudConfig.cloud_url}/${this.bucket}/${path}/${originalname}`;
  }
}
