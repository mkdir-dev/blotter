import { Layout } from '@/core/layouts/Layout';
import { routes } from '@/core/utils/routes';

import { Auth } from '@/modules/auth/components/Auth';
import { Signin } from '@/modules/auth/components/SignIn';

export const SignInPage = () => (
  <Layout title={routes.signin.title}>
    <Auth>
      <Signin />
    </Auth>
  </Layout>
);
export default SignInPage;
