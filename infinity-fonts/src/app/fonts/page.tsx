"use client";
// import Image from 'next/image';
import styles from './fonts.module.scss';

import { useState, useMemo, useEffect } from "react";
import FontFilter from "@/app/_components/FontFilter";
import FilterButton from "@/app/_components/FilterButton";
import { fetchFonts } from "@/app/redux/fontsSlice"; // <-- import the thunk
import { useAppDispatch, useAppSelector } from "@/app/redux/hooks";

interface Font {
  name: string;
  preview: string;
  style: string;
  category: string;
}

// interface RootState {
//   fonts: {
//     items: Font[];
//     searchQuery: string;
//   };
// }
export default function FontsPage() {
  const dispatch = useAppDispatch();
  const fonts = useAppSelector((state) => state.fonts.items) as Font[]; 
  const search = useAppSelector((state) => state.fonts.searchQuery);

  // Fetch fonts from backend on mount
  useEffect(() => {
    dispatch(fetchFonts());
  }, [dispatch]);

  // Get unique styles and categories from loaded fonts
  const styleOptions = useMemo(
    () => Array.from(new Set(fonts.map((f) => f.style).filter(Boolean))),
    [fonts]
  );
  const categoryOptions = useMemo(
    () => Array.from(new Set(fonts.map((f) => f.category).filter(Boolean))),
    [fonts]
  );

  const [selectedStyle, setSelectedStyle] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Combine search and filter logic
  const filteredFonts = fonts.filter(
    (font) =>
      font.name.toLowerCase().includes(search.toLowerCase()) &&
      (selectedStyle ? font.style === selectedStyle : true) &&
      (selectedCategory ? font.category === selectedCategory : true)
  );

  return (
    <div className={styles.container}>
      <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
        <FilterButton>
          <FontFilter
            styles={styleOptions}
            categories={categoryOptions}
            selectedStyle={selectedStyle}
            selectedCategory={selectedCategory}
            onStyleChange={setSelectedStyle}
            onCategoryChange={setSelectedCategory}
          />
        </FilterButton>
        <div style={{ flex: 1 }}>
          <div className={styles.grid}>
            {filteredFonts.map((font, index) => (
              <button key={index} className={styles.cube}>
                <div
                  className={styles.preview}
                  style={{ fontFamily: font.name }}
                >
                  {font.preview || font.name[0]}
                </div>
                <div className={styles.name}>{font.name}</div>
              </button>
            ))}
          </div>
          {filteredFonts.length === 0 && (
            <div className={styles.noResults}>
              <span>Sorry, no fonts matched your search.</span>
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