import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: ReactNode;
  personalInfo?: {
    phone: string;
    email: string;
    linkedin: string;
    github: string;
    instagram: string;
  };
}

const Layout = ({ children, personalInfo }: LayoutProps) => {
  return (
    <>
      <Header />
      <main style={{ minHeight: '100vh', paddingTop: '88px' }}>
        {children}
      </main>
      <Footer personalInfo={personalInfo} />
    </>
  );
};

export default Layout;
