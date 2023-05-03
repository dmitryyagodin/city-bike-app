import type { NextPage } from 'next';
import Head from 'next/head';

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>City-bike Helsinki | Homepage</title>
        <meta
          name="description"
          content="Helsinki city bike. Homepage"
          key="desc"
        />
      </Head>
      <div>
        <h1>City-bike-app</h1>
      </div>
    </>
  );
};

export default Home;
