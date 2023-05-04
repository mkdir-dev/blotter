import { Layout } from '@/core/layouts/Layout';
import { routes } from '@/core/utils/routes';

import { Signin } from '@/modules/auth/components/SignIn';

export const SignInPage = () => {
  return (
    <Layout authPage title={routes.signin.title}>
      <Signin />
    </Layout>
  );
};

export default SignInPage;
