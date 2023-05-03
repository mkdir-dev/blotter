// import { GetServerSideProps } from 'next';
import { useSession } from 'next-auth/react';

import { Layout } from '@/core/layouts/Layout';
import { routes } from '@/core/utils/routes';

import { Signin } from '@/modules/auth/components/SignIn';

const SignInPage = () => {
  const session = useSession();

  console.log('session', session);

  return (
    <Layout authPage title={routes.signin.title}>
      <Signin />
    </Layout>
  );
};

export default SignInPage;
