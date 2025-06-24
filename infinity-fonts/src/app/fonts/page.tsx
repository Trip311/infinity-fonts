import styles from './fonts.module.scss';
// import Image from 'next/image';
// import filterImage from "@/app/assets/tune.png"
import FilterButton from '@/app/_components/FilterButton';
const fonts = [
  { name: 'Roboto', preview: 'Aa' },
  { name: 'Montserrat', preview: 'Bb' },
  { name: 'Lora', preview: 'Cc' },
  { name: 'Oswald', preview: 'Dd' },
  { name: 'Poppins', preview: 'Ee' },
  { name: 'Raleway', preview: 'Ff' },
];
const mockFonts = [
  {
    "name": "Roboto",
    "style": "Sans-serif",
    "catagory": "Modern",
    "description": "A clean, geometric font by Google.",
    "createdAt": "2025-06-24T12:00:00.000Z"
  },
]
export default function FontsPage() {
  return (
    <div className={styles.container}>
      <FilterButton>
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
      </FilterButton>
    </div>
  );
}