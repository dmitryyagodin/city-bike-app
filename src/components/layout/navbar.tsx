import Link from 'next/link';

// export default function Navbar({ children }: { children: JSX.Element }) {
export default function Navbar() {
  return (
    <>
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
      {/* {children} */}
      <header />
    </>
  );
}
