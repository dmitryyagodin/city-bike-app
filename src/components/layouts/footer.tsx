import { Container } from '@components';
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
    align-items: center;
    justify-content: center;
    gap: 20px;

    & a {
      font-weight: 800;
      color: inherit;
      text-decoration: none;
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
          </ul>
        </nav>
      </Container>
    </StyledFooter>
  );
}
