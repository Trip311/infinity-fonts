import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/NavigationBar.module.scss";
import infinityImg from "@/app/assets/infinity.png";

function NavigationBar() {
  return (
    <header className={styles.navbar}>
      <nav>
        <Link href="/fonts" className={styles.link}>
          Fonts
        </Link>
        <Link href="/icons" className={styles.link}>
          Icons
        </Link>
      </nav>
          <h1>Infinity Fonts</h1>
      <div className={styles.logo}>
        <Link href="/fonts">
          Home
          <Image src={infinityImg} alt="Logo" width={40} height={40} />
        </Link>
      </div>
      {/* <input
        type="text"
        placeholder="Search fonts or icons..."
        className={styles.search}
      /> */}
    </header>
  );
}
export default NavigationBar;
