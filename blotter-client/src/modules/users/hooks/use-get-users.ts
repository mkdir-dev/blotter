import { useInfiniteQuery } from 'react-query';
import queryString from 'query-string';

import { getUsers } from '@/pages/api/users/get-users';
import { Meta } from '@/common/types/api.types';
import { ResponseUser, ResponseUsersPagination } from '@/common/types/users.api.types';
import {
  ResGetUserHook,
  UseGetUsersDataPagination,
  UseGetUsersProps,
  UseGetUsers,
} from '../types/get-users.hook.types';

export const useGetUsers = ({
  token,
  page,
  perPage,
  // onSuccess,
  onError,
}: UseGetUsersProps): UseGetUsers => {
  const {
    isLoading,
    error,

    data,

    hasNextPage,
    isFetching,
    fetchNextPage,
  } = useInfiniteQuery(
    ['users', token, page, perPage],
    async ({ pageParam = page + 1 }) => {
      const queryParams = {
        page: pageParam,
        per_page: perPage,
      };

      const res = await getUsers(token, `/?${queryString.stringify(queryParams)}`);

      if (res.ok) {
        const result: {
          meta: Meta;
          data: ResponseUser[];
        } = await res.json();

        return result;
      }

      return Promise.reject(res);
    },
    {
      // enabled: !!token,
      // onSuccess,
      onError,
      getNextPageParam: (res: ResponseUsersPagination) => {
        const { last_page, page } = res.meta;
        const nextPage: number = page + 1;

        return nextPage <= last_page ? nextPage : undefined;
      },
      select: (res: UseGetUsersDataPagination): ResGetUserHook => {
        const params: Meta = {
          ...res.pages[0].meta,
          page: page + 1,
        };
        const resultData = res?.pages.map((page) => page.data).flat();

        return {
          pageParams: [params],
          pages: resultData,
        };
      },
    }
  );

  return {
    dataUsers: data,

    isLoadingUsers: isLoading,
    isErrorUsers: !!error,

    hasNextPageUsers: hasNextPage,
    isFetchingUsers: isFetching,
    fetchNextPageUsers: fetchNextPage,
  };
};
