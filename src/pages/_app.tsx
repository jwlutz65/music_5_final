import { AppProps } from 'next/app';
import '../styles/globals.css';

/**
 * Next.js App component that wraps all pages
 * Imports global styles and can be extended with providers
 */
export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
} 