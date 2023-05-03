import { API_URL } from '@/utils/config';

export const refresh = async (token: string) => {
  const response = await fetch(`${API_URL}/refresh`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return response;
};
