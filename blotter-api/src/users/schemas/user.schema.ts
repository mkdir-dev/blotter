import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// import { genderEnum } from '../enums/gender.enum';
import { roleEnum } from '../enums/role.enum';
import { statusEnum } from '../enums/status.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true, unique: true, minLength: 4, maxLength: 40 })
  username: string;

  @Prop({ required: true, minLength: 8 })
  password: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ default: null })
  name: string | null;

  @Prop({ default: null })
  surname: string | null;

  @Prop({ default: null })
  avatar: string | null;

  @Prop({ default: null })
  phone: number | null;

  @Prop({ default: null })
  country: string | null;

  @Prop({ default: null })
  city: string | null;

  // @Prop({ default: null, enum: Object.values(genderEnum) })
  @Prop({ default: null })
  gender: 'male' | 'female' | 'non-binary' | null;

  @Prop({ default: null })
  registration_date: string | null;

  @Prop({
    type: [String],
    default: [roleEnum.user],
    enum: Object.values(roleEnum),
  })
  role: string[];

  @Prop({ default: statusEnum.active, enum: Object.values(statusEnum) })
  status: string;
}

export const Userchema = SchemaFactory.createForClass(User);
