import { Container } from '@components';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';

const StyledFooter = styled.footer`
  margin-top: auto;
  background-color: ${({ theme }) => theme.color.primary};

  & ul {
    padding: 0;
    height: 80px;
    margin: 0;
    list-style: none;
    color: white;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;

    & a {
      font-weight: 800;
      color: inherit;
      text-decoration: none;
    }

    & .github-link {
      margin-left: auto;

      & a {
        display: flex;
        align-items: center;
      }
    }

    & .github-name {
      padding-left: 4px;
      font-size: 1rem;
    }
  }
`;

export default function Footer() {
  return (
    <StyledFooter>
      <Container>
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
            <li className="github-link">
              <Link href="https://github.com/dmitryyagodin/city-bike-app">
                <Image src="/github-mark-white.png" alt="github icon" width="18" height="18" />
                <span className="github-name">dmitryyagodin</span>
              </Link>
            </li>
          </ul>
        </nav>
      </Container>
    </StyledFooter>
  );
}
