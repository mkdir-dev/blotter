import { IdValid, DateValid } from './general-validation.types';

export const IdValidation: IdValid = {
  IsString: 'ID должен быть строкой',
  Length: 'Неверный формат ID',
};

export const BirthdayValidation: DateValid = {
  IsNumber: 'Неверный формат даты рождения',
  IsNotEmpty: 'Дата рождения не может быть пустой',
};
