import { Layout } from '@/core/layouts/Layout';
import { routes } from '@/core/utils/routes';

const SignInPage = () => {
  return (
    <Layout authPage title={routes.signin.title}>
      Signup
    </Layout>
  );
};

export default SignInPage;
