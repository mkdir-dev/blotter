import { AuthParams } from '@/modules/auth/utils/auth.validation';
import { routes } from '@/core/utils/routes';
import { API_URL } from '@/utils/config';

export const signin = async (values: AuthParams) => {
  const response = await fetch(`${API_URL}${routes.signin.path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  });

  return response;
};
