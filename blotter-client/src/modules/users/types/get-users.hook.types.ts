import { FetchNextPageOptions, InfiniteQueryObserverResult } from 'react-query';

import { ResponseUser, ResponseUsersPagination } from '@/common/types/users.api.types';
import { Meta } from '@/common/types/api.types';

export interface UseGetUsers {
  dataUsers: ResGetUserHook | undefined;
  isLoadingUsers: boolean;
  isErrorUsers: boolean;
  hasNextPageUsers: boolean | undefined;
  isFetchingUsers: boolean;
  fetchNextPageUsers: (
    options?: FetchNextPageOptions | undefined
  ) => Promise<InfiniteQueryObserverResult<ResponseUser, Response>>;
}

export interface UseGetUsersProps {
  token: string;
  page: number;
  perPage: number;
  // onSuccess: (value: any) => void;
  onError: (err: Response) => void;
}

export interface UseGetUsersDataPagination {
  pageParams: unknown[];
  pages: ResponseUsersPagination[];
}

export interface ResGetUserHook {
  pageParams: Meta[] | unknown[];
  pages: ResponseUser[];
}
