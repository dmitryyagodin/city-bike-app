import Navbar from './navbar';
import Footer from './footer';

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
