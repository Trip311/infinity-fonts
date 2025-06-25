import styles from './fonts.module.scss';
import Image from 'next/image';
import filterImage from "@/app/assets/tune.png";
import { IFont } from '../interfaces/font.interface';



async function fetchFonts(): Promise<IFont[]> {
  try {
    const res = await fetch('http://localhost:3000/api/font', { cache: 'no-store' });
    const data = await res.json();
    return data.data.map((name: string) => ({
      name,
      preview: name.slice(0, 2), 
    }));
  } catch (error) {
    console.error('Failed to fetch fonts:', error);
    return [];
  }
}


export default async function FontsPage() {
  const fonts = await fetchFonts();
  console.log(fonts.length)
  // const fonts:Font[] = [
  //   {name:"wefwef", preview:"fdbr"},
  // ]

  return (
    <div className={styles.container}>
      <button className={styles.filterbtn}>
        <Image src={filterImage} alt='' />
      </button>
      <div className={styles.grid}>
        {fonts.map((font, index) => (
          <button key={index} className={styles.cube}>
            <div className={styles.preview} style={{ fontFamily: font.name }}>
              {font.preview}
            </div>
            <div className={styles.name}>{font.name}</div>
          </button>
        ))}
      </div>
    </div>
  );
}