import { Layout } from '@/core/layouts/Layout';
import { routes } from '@/core/utils/routes';
import { Users } from '@/modules/users/components/Users';

export const UsersPage = () => {
  return (
    <Layout title={routes.users.title}>
      <Users />
    </Layout>
  );
};
export default UsersPage;
