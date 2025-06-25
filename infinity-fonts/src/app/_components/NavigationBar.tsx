
"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "@/styles/NavigationBar.module.scss";
import infinityImg from "@/app/assets/infinity.png";
import SearchBar from "../_components/SearchBar";
import { useSelector, useDispatch } from "react-redux";
import { setSearchQuery } from "../redux/fontsSlice";

function NavigationBar() {
  const dispatch = useDispatch();
  const search = useSelector((state: any) => state.fonts.searchQuery);

  const handleChange = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  return (
    <>
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
      </header>
      <section className={styles.searchBarSection}>
        <div className={styles.searchBarTitle}>
          Search for your fonts and icons
        </div>
        <SearchBar
          placeholder="Search..."
          value={search}
          onChange={handleChange}
        />
      </section>
    </>
  );
}
export default NavigationBar;