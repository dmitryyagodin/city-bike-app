import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import prisma from '@db';

const Stations: NextPage = ({ stations }) => {
  console.log(stations);
  return (
    <div className={styles.container}>
      <h1>Stations</h1>
      {/* {stations} */}
    </div>
  );
};

// export async function getStaticProps() {
//   const res = await prisma.station.findMany();
//   const stations = await res.json();

//   return {
//     props: {
//       stations,
//     }, // will be passed to the page component as props
//   };
// }

export async function getStaticProps() {
  const stations = await prisma.station.findMany();
  // const stations = await res.json();

  return { props: { stations } };
}

export default Stations;
