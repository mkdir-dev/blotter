import { HeadCellUserTable } from '../types/users.table.types';

/*
  id: string;
  uuid: string;

  avatar: string | null;
  
  createdAt: number | null;
  updatedAt: number | null;
  
*/

export const headCellUserTable: readonly HeadCellUserTable[] = [
  { id: 'username', label: 'Логин' },
  { id: 'email', label: 'E-mail' },
  { id: 'name', label: 'Имя' },
  { id: 'surname', label: 'Фамилия' },
  { id: 'birthday', label: 'Дата рождения' },
  { id: 'phone', label: 'Номер телефона' },
  { id: 'nationality', label: 'Национальность' },
  { id: 'country', label: 'Страна' },
  { id: 'city', label: 'Город' },
  { id: 'gender', label: 'Пол' },
  { id: 'role', label: 'Роль' },
  { id: 'status', label: 'Статус' },
];
