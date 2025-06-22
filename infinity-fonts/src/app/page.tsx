// src/app/layout.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Infinity Fonts',
  description: 'A collection of fonts and icons for developers',
};
import "@/app/globals.scss"
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}