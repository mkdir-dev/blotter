import { useState, ChangeEvent } from 'react';
import { useSession } from 'next-auth/react';

import { useSnackbar } from 'notistack';

import { Box, Typography, CircularProgress, LinearProgress } from '@mui/material';

import { ErrorResponse } from '@/common/types/api.types';
import { UsersTable } from './UsersTable';
import { useGetUsers } from '../hooks/use-get-users';

export const Users = () => {
  const [page, setPage] = useState<number>(0);
  const [perPage, setPerPage] = useState<number>(20);
  const [textErr, setTextErr] = useState<string | null>(null);
  const { data: session } = useSession();
  const { enqueueSnackbar } = useSnackbar();

  const { dataUsers, isLoadingUsers, isErrorUsers, fetchNextPageUsers } = useGetUsers({
    // @ts-ignore
    token: session?.user?.access_token,
    page,
    perPage,
    // onSuccess: (data) => console.log('onSuccess', data),
    onError: async (err) => {
      const error: ErrorResponse = await err.json();

      if (!!error.message && Array.isArray(error.message)) {
        setTextErr(error.message[0]);

        error.message?.forEach((element) => {
          enqueueSnackbar(element, { variant: 'warning' });
        });
      } else if (!!error.message) {
        setTextErr(error.message);
        enqueueSnackbar(error.message, { variant: 'error' });
      }
    },
  });

  const handleChangePage = async (event: unknown, newPage: number) => {
    setPage(newPage);
    await fetchNextPageUsers();
  };

  const handleChangePerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setPage(0);
    setPerPage(parseInt(event.target.value, 10));
  };

  if (isErrorUsers) {
    return (
      <Typography color={'error'} width={'100%'} textAlign={'center'}>
        {textErr || 'Ошибка загрузки. Попробуйте позже.'}
      </Typography>
    );
  }

  return (
    <>
      {isLoadingUsers && (
        <Box position={'absolute'} top={'-64px'} left={0} width={'100%'} zIndex={20000}>
          <LinearProgress />
        </Box>
      )}

      <UsersTable
        dataUsers={dataUsers}
        page={page}
        perPage={
          // dataUsers?.pages[0].meta.per_page ||
          perPage
        }
        handleChangePage={handleChangePage}
        handleChangePerPage={handleChangePerPage}
      />
    </>
  );
};
export default Users;
