import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import validator from 'validator';

// import { genderEnum } from '../enums/gender.enum';
import { roleEnum } from '../enums/role.enum';
import { statusEnum } from '../enums/status.enum';
import { EmailValidation } from 'src/common/validation/users/email/email-validation';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  readonly _id: string;

  @Prop({ required: true, unique: true })
  uuid: string;

  @Prop({ required: true, unique: true, minLength: 4, maxLength: 40 })
  username: string;

  @Prop({ required: true, minLength: 8 })
  password: string;

  @Prop({
    required: true,
    unique: true,
    minLength: 8,
    validate: {
      validator(value: string): boolean {
        return validator.isEmail(value);
      },
      message: EmailValidation.IsEmail,
    },
  })
  email: string;

  @Prop({ default: null })
  name: string | null;

  @Prop({ default: null })
  surname: string | null;

  @Prop({ default: null })
  birthday: number | null;

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
  createdAt: number | null;

  @Prop({ default: null })
  updatedAt: number | null;

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
