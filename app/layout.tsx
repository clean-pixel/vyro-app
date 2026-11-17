import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'VYRO',
  description: 'Modern short-video social media experience',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
