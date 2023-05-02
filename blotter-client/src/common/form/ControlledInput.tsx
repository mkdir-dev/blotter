import { useState } from 'react';
import { Controller, FieldValues } from 'react-hook-form';

import { TextField, IconButton, InputAdornment } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import { ControlledInputProps } from './form.types';

export const ControlledInput = <T extends FieldValues>(props: ControlledInputProps<T>) => {
  const { name, label, control, error, type, rules, InputProps, ...rest } = props;

  const [hidden, setHidden] = useState(false);

  const handleClickShowPassword = () => setHidden((hidden) => !hidden);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field }) =>
        type === 'hidden' ? (
          <input {...field} type={type} />
        ) : (
          <TextField
            sx={{
              position: 'relative',
              mb: 2,

              '& .MuiFormHelperText-root': { position: 'absolute', top: 55 },
            }}
            label={label}
            type={type === 'password' && !hidden ? 'password' : 'text'}
            InputProps={{
              endAdornment:
                type === 'password' ? (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {hidden ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                  </InputAdornment>
                ) : undefined,
              autoComplete: 'off',
              ...InputProps,
            }}
            {...rest}
            {...field}
            error={error}
          />
        )
      }
    />
  );
};
