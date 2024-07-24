import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/navbar';
import './globals.css';
import { Container } from '@mui/material';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Upload your files',
  description: 'Free file uploader',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Container maxWidth='md' className='pt-24 max-sm:pt-[5.5rem]'>
          <Navbar />
          {children}
        </Container>
      </body>
    </html>
  );
}
