export class MFile {
  buffer: Buffer;
  mimetype: string;
  originalname: string;

  constructor(file: Express.Multer.File | MFile) {
    this.buffer = file.buffer;
    this.mimetype = file.mimetype;
    this.originalname = file.originalname;
  }
}

export class StorageFile {
  buffer: Buffer;
  metadata: Map<string, string>;
  contentType: string;
}
