import { genderEnum, roleEnum, statusEnum } from '@/common/types/users.api.types';

export interface DataUserTable {
  id: string;
  username: string;
  email: string;
  name: string | null;
  surname: string | null;
  birthday: number | null | string;
  phone: string | null;
  nationality: string | null;
  country: string | null;
  city: string | null;
  gender: genderEnum | null | string;
  role: roleEnum;
  status: statusEnum;
}

export interface HeadCellUserTable {
  id: keyof DataUserTable;
  label: string;
}
