import { Layout } from '@/core/layouts/Layout';
import { routes } from '@/core/utils/routes';

import { Auth } from '@/modules/auth/components/Auth';
import { SignUp } from '@/modules/auth/components/SignUp';

export const SignUpPage = () => {
  return (
    <Layout authPage title={routes.signup.title}>
      <Auth>
        <SignUp />
      </Auth>
    </Layout>
  );
};

export default SignUpPage;
