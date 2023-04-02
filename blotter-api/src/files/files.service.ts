import {
  Injectable,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as sharp from 'sharp';
import { Storage } from '@google-cloud/storage';

import { ServerError, FileError } from 'src/common/errors/errors';
import { MFile } from './classes/m-files.class';

@Injectable()
export class FilesService {
  private storage: Storage;
  private bucket: string;
  private cloud_url: string;

  constructor(private readonly configService: ConfigService) {
    this.storage = new Storage({
      projectId: this.configService.get<string>('cloud_project_id'),
      credentials: {
        client_email: this.configService.get<string>('cloud_client_email'),
        private_key: this.configService.get<string>('cloud_private_key'),
      },
    });

    this.bucket = this.configService.get<string>('cloud_media_bucket');
    this.cloud_url = this.configService.get<string>('cloud_url');
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
    const stream = fileStorage.createWriteStream({
      resumable: false,
      gzip: true,
    });

    try {
      stream.on('finish', async () => {
        return await fileStorage.setMetadata({
          metadata: object,
        });
      });
      stream.end(buffer);
    } catch (err) {
      throw new InternalServerErrorException(ServerError.SaveFileError);
    }

    return `${this.cloud_url}/${this.bucket}/${path}/${originalname}`;
  }
}
