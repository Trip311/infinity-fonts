import Link from "next/link";
import styles from './layout.module.scss';
export function NavRootLayout () {
    return (
        <>
        <nav>
            <Link href="/fonts" className={styles.link}>Fonts</Link>
            <Link href="/icons" className={styles.link}>Icons</Link>
          </nav>
        </>
    )
}