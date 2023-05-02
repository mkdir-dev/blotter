import { Children, createElement, isValidElement, ReactNode, useEffect } from 'react';

import {
  FieldErrors,
  FieldValue,
  FieldValues,
  Path,
  Resolver,
  SubmitHandler,
  useForm,
} from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import Stack, { StackProps } from '@mui/material/Stack';

export type TFormProps<T extends FieldValues> = Omit<StackProps<'form'>, 'onSubmit'> & {
  defaultValues?: T;
  setValues?: [Path<T>, FieldValue<T>][];
  submitText: string;
  isLoading: boolean;
  isError?: boolean;
  textError?: string | null;
  resolver?: Resolver<T, unknown>;
  onSubmit: SubmitHandler<T>;
};

export const Form = <T extends FieldValues>(props: TFormProps<T>) => {
  const {
    setValues,
    children,
    defaultValues,
    submitText,
    isLoading,
    isError,
    textError,
    onSubmit,
    resolver,
    ...rest
  } = props;

  const {
    control,
    formState: { errors, isValid, isDirty },
    handleSubmit,
    setValue,
  } = useForm<T>({
    values: defaultValues,
    mode: 'all',
    reValidateMode: 'onBlur',
    resolver,
  });

  const renderChildren = (child: ReactNode): ReactNode => {
    if (!isValidElement(child)) return child;

    const { name, children, ...rest } = child.props;

    if (name) {
      return createElement(child.type, {
        name,
        control,
        error: !!errors[name as keyof FieldErrors<T>],
        helperText: errors[name as keyof FieldErrors<T>]?.message,
        ...rest,
      });
    }

    if (children) {
      return createElement(child.type, child.props, Children.map(children, renderChildren));
    }

    return child;
  };

  useEffect(() => {
    if (setValues) {
      setValues.forEach((pair) => setValue(...pair));
    }
  }, [setValues, setValue]);

  return (
    <Stack component={'form'} onSubmit={handleSubmit(onSubmit)} {...rest}>
      {Children.map(children, renderChildren)}

      <Box
        width={'100%'}
        mt={2}
        position={'relative'}
        display={'flex'}
        flexDirection={'column'}
        alignItems={'center'}
      >
        <LoadingButton
          sx={{ width: '100%', mb: 3, position: 'relative' }}
          size={'large'}
          type={'submit'}
          variant={'contained'}
          disabled={!isDirty || !isValid}
          loading={isLoading}
          loadingPosition="center"
        >
          {submitText}
        </LoadingButton>

        {isError && !!textError && (
          <Typography variant={'caption'} color={'error'} position={'absolute'} top={50}>
            {textError}
          </Typography>
        )}
      </Box>
    </Stack>
  );
};
