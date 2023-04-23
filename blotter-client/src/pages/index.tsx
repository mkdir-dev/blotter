import Image from 'next/image';

import { CircularProgress } from '@mui/material';

import { Layout } from '@/core/layouts/Layout';

import logo from '../../public/images/blotter-logo.png';

const Home = () => {
  return (
    <Layout>
      <CircularProgress />

      <Image
        src={logo}
        alt={'Picture'}
        // width={500} height={500}
      />
    </Layout>
  );
};

export default Home;
