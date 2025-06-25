"use client";
import styles from "@/styles/components/SearchBar.module.scss" 
import { FaSearch } from "react-icons/fa";

import React from "react";

interface SearchBarProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

export default function SearchBar({
  placeholder = "Search...",
  value,
  onChange,
  className = "",
  ...props
}: SearchBarProps) {
  return (
    <div className={`${styles.searchBarWrapper} ${className}`}>
      <FaSearch className={styles.icon} />
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  );
}