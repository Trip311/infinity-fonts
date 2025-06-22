import type { Metadata } from 'next';
import styles from './layout.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import infinityImg from "@/app/assets/infinity.png";
import "@/app/globals.scss";
import { NavRootLayout } from './navbar';
export const metadata: Metadata = {
  title: 'Infinity Fonts',
  description: 'A collection of fonts and icons for developers',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <header className={styles.navbar}>
          <div className={styles.logo}>
          <Link href="/">Home
            <Image src={infinityImg} alt="Logo" width={40} height={40} />
            <span>Infinity Fonts</span>
          </Link>
          </div>
          <NavRootLayout></NavRootLayout>
          <input
            type="text"
            placeholder="Search fonts or icons..."
            className={styles.search}
          />
        </header>

        {children}
      </body>
    </html>
  );
}