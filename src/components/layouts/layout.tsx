import Navbar from './navbar';
import Footer from './footer';
import styled from 'styled-components';

const PageWrapper = styled.div`
  min-height: 100vh;
`;

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <PageWrapper className="flex-column">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </PageWrapper>
  );
}
