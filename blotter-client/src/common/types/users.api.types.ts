import { Meta } from "./api.types";

export enum genderEnum {
  male = 'male',
  female = 'female',
  non_binary = 'non-binary',
  none = 'none',
}

export enum roleEnum {
  user = 'user',
  admin = 'admin',
}

export enum statusEnum {
  block = 'block',
  active = 'active',
}

export interface ResponseUser {
  id: string;
  uuid: string;
  username: string;
  email: string;
  name: string | null;
  surname: string | null;
  birthday: number | null;
  avatar: string | null;
  phone: string | null;
  nationality: string | null;
  country: string | null;
  city: string | null;
  gender: genderEnum | null;
  createdAt: number | null;
  updatedAt: number | null;
  role: roleEnum;
  status: statusEnum;
}

export interface ResponseUsersPagination {
  meta: Meta;
  data: ResponseUser[];
}
