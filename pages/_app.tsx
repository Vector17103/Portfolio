import type { AppProps } from 'next/app';
import { Inter, Playfair_Display } from 'next/font/google';
import '../styles/globals.css';

const sans = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

const serif = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-serif',
  display: 'swap',
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${sans.variable} ${serif.variable}`}>
      <Component {...pageProps} />
    </div>
  );
}
