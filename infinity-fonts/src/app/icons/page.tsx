"use client"
// import styles from "./icons.module.scss";
import styles from "@/app/fonts/fonts.module.scss"
import { useEffect, useState } from "react";

export default function iconsPage() {
  const [icons, setIcons] = useState<string[]>([]);

  useEffect(() => {
    async function fetchIcons() {
      try {
        const res = await fetch("/api/icons"); // replace with your actual API route
        const { data } = await res.json();
        const iconUrls = data
          .filter(
            (key: string) =>
              key.includes("materialicons/") && key.includes("24px.svg")
          )
          .map((key: string) => `${key}`);
          console.log(iconUrls.length)
        setIcons(iconUrls);
    } catch (err) {
        console.error("Failed to fetch icons", err);
      }
    }

    fetchIcons();
  }, []);
  return (
    <div className={styles.container}>
          <div className={styles.grid}>
              {icons.map((iconUrl, key) => (
                <button key={key} className={styles.iconCube}>
                  <img src={iconUrl} alt={`icon-${key}`} width={48} height={48} loading="lazy" />
                </button>
              ))}
          </div>
    </div>
  );
}
