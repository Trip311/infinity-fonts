// src/app/fonts/page.tsx
import styles from './fonts.module.scss';
import Image from 'next/image';
import filterImage from "@/app/assets/tune.png"
const fonts = [
  { name: 'Roboto', preview: 'Aa' },
  { name: 'Montserrat', preview: 'Bb' },
  { name: 'Lora', preview: 'Cc' },
  { name: 'Oswald', preview: 'Dd' },
  { name: 'Poppins', preview: 'Ee' },
  { name: 'Raleway', preview: 'Ff' },
  // Add more font samples here
];

export default function FontsPage() {
  return (
    <main className={styles.container}>
        <button className={styles.filterbtn}>
            <Image src={filterImage} alt=''>
                
            </Image>
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
    </main>
  );
}