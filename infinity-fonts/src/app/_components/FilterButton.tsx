"use client";
import filterImage from "@/app/assets/tune.png";
import Image from "next/image";
import React, { PropsWithChildren, useState } from "react";
import styles from "@/styles/components/MenuButton.module.scss";

const FilterButton = ({children}: PropsWithChildren) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(true);
  return (
    <>
      <button
        className={styles.filterbtn}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <Image src={filterImage} alt="filter menu" />
      </button>
      {isMenuOpen && children}
    </>
  );
};

export default FilterButton;
