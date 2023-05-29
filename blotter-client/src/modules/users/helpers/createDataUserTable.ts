import { genderEnum, roleEnum, statusEnum } from '@/common/types/users.api.types';
import { DataUserTable } from '../types/users.table.types';

export const createDataUserTable = (
  id: string,
  // uuid: string,
  username: string,
  email: string,
  name: string | null,
  surname: string | null,
  birthday: number | null,
  // avatar: string | null,
  phone: string | null,
  nationality: string | null,
  country: string | null,
  city: string | null,
  gender: genderEnum | null | string,
  // createdAt: number | null,
  // updatedAt: number | null,
  role: roleEnum,
  status: statusEnum
): DataUserTable => {
  return {
    id,
    // uuid,
    username,
    email,
    name: name || '-',
    surname: surname || '-',
    birthday: birthday || '-',
    // avatar: avatar || '-',
    phone: phone || '-',
    nationality: nationality || '-',
    country: country || '-',
    city: city || '-',
    gender: gender || '-',
    role: role,
    status: status,
    // createdAt: createdAt || '-',
    // updatedAt: updatedAt || '-',
  };
};
