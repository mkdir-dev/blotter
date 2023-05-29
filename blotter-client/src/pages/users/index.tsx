import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';

export { default } from './Users';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);

  console.log('session', session);

  // @ts-ignore
  // if (session?.user.role !== 'admin') return { notFound: true };

  return { props: {} };
};
