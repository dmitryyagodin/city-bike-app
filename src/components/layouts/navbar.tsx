import Link from 'next/link';
import Container from '../ui/container';

// export default function Navbar({ children }: { children: JSX.Element }) {
export default function Navbar() {
  return (
    <Container>
      <header />
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
      <header />
    </Container>
  );
}
