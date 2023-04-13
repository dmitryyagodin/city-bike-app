import type { NextPage } from 'next';
import styles from '../styles/Home.module.css';
import Link from 'next/link';
import { NoDataView } from '@components';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1>City-bike-app</h1>
      <nav>
        <ul>
          <li>
            <Link href="/stations">Stations</Link>
          </li>
          <li>
            <Link href="/rides">Rides</Link>
          </li>
          <li>
            <Link href="/stations/on-map">Map</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Home;
