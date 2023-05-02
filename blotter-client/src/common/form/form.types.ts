import { TextFieldProps } from '@mui/material';
import { Control, FieldValues, Path, RegisterOptions } from 'react-hook-form';

export type ControlledInputProps<T extends FieldValues = FieldValues> = Omit<
  TextFieldProps,
  'select'
> & {
  control?: Control<T>;
  name: Path<T>;
  rules?: RegisterOptions<T>;
};
