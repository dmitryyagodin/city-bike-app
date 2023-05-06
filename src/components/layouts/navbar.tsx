import Link from 'next/link';
import Container from '../ui/container';

import styled from 'styled-components';
import { useRouter } from 'next/router';

const StyledHeader = styled.header`
  background-color: ${({ theme }) => theme.color.primary};
  & ul {
    padding: 0;
    height: 80px;
    margin: 0;
    list-style: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 20px;

    & a {
      font-weight: 800;
      color: inherit;
      text-decoration: none;

      &.current {
        border-bottom: 2px solid white;
      }
    }
  }
`;

// export default function Navbar({ children }: { children: JSX.Element }) {
export default function Navbar() {
  const router = useRouter();
  return (
    <StyledHeader>
      <Container>
        <nav>
          <ul>
            <li>
              <Link href="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  fill="white"
                  viewBox="0 96 960 960"
                >
                  <path d="M194 896q-81 0-137.5-57T0 701q0-81 57.038-137.5Q114.075 507 195 507q71 0 124.5 45.5T384 668h51l-82-232h-73v-60h188v60h-52l26 71h222l-71-191H488v-60h99q24 0 40.5 11t24.5 33l76 207h38q80.51 0 137.255 56.234Q960 619.468 960 699.254 960 780 903.74 838 847.48 896 766 896q-71.602 0-125.801-48T574 728H384q-11 72-64.5 120T194 896Zm0-60q48 0 83.5-31t47.5-77H206v-60h119q-12-45-48-73t-82-28q-56 0-95.5 39T60 701q0 56.25 39 95.625T194 836Zm305-168h76q4-23 15.5-51t31.5-50H463l36 101Zm267 168q56 0 95-39.375T900 701q0-56-39-95t-95-39h-16l39 113-56 19-43-112q-29 17-43.5 48T632 701q0 56.25 39 95.625T766 836ZM193 701Zm573 0Z" />
                </svg>
              </Link>
            </li>
            <li>
              <Link href="/stations" className={router.route === '/stations' ? 'current' : ''}>
                Stations
              </Link>
            </li>
            <li>
              <Link href="/rides" className={router.route === '/rides' ? 'current' : ''}>
                Rides
              </Link>
            </li>
            <li>
              <Link
                href="/stations/on-map"
                className={router.route === '/stations/on-map' ? 'current' : ''}
              >
                Map
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </StyledHeader>
  );
}
