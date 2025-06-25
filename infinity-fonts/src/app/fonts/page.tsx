// "use client";

// import styles from './fonts.module.scss';
// import Image from 'next/image';
// import filterImage from "@/app/assets/tune.png"
// import { useSelector } from 'react-redux';

// interface Font {
//   name: string;
//   preview: string;
//   style: string;
//   category: string;
// }

// interface RootState {
//   fonts: {
//     items: Font[];
//     searchQuery: string;
//   };
// }

// export default function FontsPage() {
//   const fonts = useSelector((state: RootState) => state.fonts.items);
//   const search = useSelector((state: RootState) => state.fonts.searchQuery);

//   const filteredFonts = fonts.filter(font =>
//     font.name.toLowerCase().startsWith(search.toLowerCase())
//   );

//   return (
//     <div className={styles.container}>
//       <button className={styles.filterbtn}>
//         <Image src={filterImage} alt='' />
//       </button>
//       <div className={styles.grid}>
//         {filteredFonts.map((font, index) => (
//           <button key={index} className={styles.cube}>
//             <div className={styles.preview} style={{ fontFamily: font.name }}>
//               {font.preview || font.name[0]}
//             </div>
//             <div className={styles.name}>{font.name}</div>
//           </button>
//         ))}
//       </div>
//       {filteredFonts.length === 0 && (
//   <div className={styles.noResults}>
//     <span>
//       Sorry, no fonts matched your search.
//     </span>
//     <span className={styles.noResultsQuery}>
//       {search && `“${search}”`}
//     </span>
//     <span className={styles.noResultsSuggestion}>
//       Try a different name or check for typos.
//     </span>
//   </div>
// )}
//     </div>
//   );
// }

"use client";

import styles from './fonts.module.scss';
import Image from 'next/image';
import filterImage from "@/app/assets/tune.png";
import { useSelector } from 'react-redux';
import { useState, useMemo } from 'react';
import FontFilter from './FontFilter';

interface Font {
  name: string;
  preview: string;
  style: string;
  category: string;
}

interface RootState {
  fonts: {
    items: Font[];
    searchQuery: string;
  };
}

export default function FontsPage() {
  const fonts = useSelector((state: RootState) => state.fonts.items);
  const search = useSelector((state: RootState) => state.fonts.searchQuery);

  // Get unique styles and categories from demoFonts
  const styleOptions = useMemo(
    () => Array.from(new Set(fonts.map(f => f.style).filter(Boolean))),
    []
  );
  const categoryOptions = useMemo(
    () => Array.from(new Set(fonts.map(f => f.category).filter(Boolean))),
    []
  );

  const [selectedStyle, setSelectedStyle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // Combine search and filter logic
  const filteredFonts = fonts.filter(font =>
    font.name.toLowerCase().includes(search.toLowerCase()) &&
    (selectedStyle ? font.style === selectedStyle : true) &&
    (selectedCategory ? font.category === selectedCategory : true)
  );

  return (
    <div className={styles.container}>
      <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
        <FontFilter
          styles={styleOptions}
          categories={categoryOptions}
          selectedStyle={selectedStyle}
          selectedCategory={selectedCategory}
          onStyleChange={setSelectedStyle}
          onCategoryChange={setSelectedCategory}
        />
        <div style={{ flex: 1 }}>
          <button className={styles.filterbtn}>
            <Image src={filterImage} alt='' />
          </button>
          <div className={styles.grid}>
            {filteredFonts.map((font, index) => (
              <button key={index} className={styles.cube}>
                <div className={styles.preview} style={{ fontFamily: font.name }}>
                  {font.preview || font.name[0]}
                </div>
                <div className={styles.name}>{font.name}</div>
              </button>
            ))}
          </div>
          {filteredFonts.length === 0 && (
            <div className={styles.noResults}>
              <span>
                Sorry, no fonts matched your search.
              </span>
              <span className={styles.noResultsQuery}>
                {search && `“${search}”`}
              </span>
              <span className={styles.noResultsSuggestion}>
                Try a different name, style, or category.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}