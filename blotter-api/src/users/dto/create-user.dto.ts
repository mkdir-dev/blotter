export class CreateUserDto {
  username: string;
  password: string;
  email: string;
}

export class ResponseCreateUserDto {
  uuid: string;
  username: string;
  email: string;
}

// ! для создания админа
// role: string[];

/*
uuid: string; // @Prop({ required: true, unique: true })
  username: string; // @Prop({ required: true, unique: true })
  password: string; // @Prop({ required: true, minLength: 8 })
  email: string; // @Prop({ required: true, unique: true })
*/

/*
// @Prop({ default: null })
  name: string | null;

  // @Prop({ default: null })
  surname: string | null;

  // @Prop({ default: null })
  avatar: string | null;

  // @Prop({ default: null })
  phone: number | null;

  // @Prop({ default: null })
  country: string | null;

  // @Prop({ default: null })
  city: string | null;

  // @Prop({ default: null, enum: Object.values(genderEnum) })
  gender: string | null;

  // @Prop({ default: null })
  registration_date: string | null;

  /*
  @Prop({
    type: [String],
    default: [roleEnum.user],
    enum: Object.values(roleEnum),
  })
  */
// role: string[];

// @Prop({ default: statusEnum.active, enum: Object.values(statusEnum) })
// status: 'active' | 'block';
