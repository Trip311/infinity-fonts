"use client";
import styles from "@/styles/components/fontPopUp.module.scss";
import { IFont } from "../interfaces/font.interface";
import { useEffect, useState } from "react";
interface FontPopUpProps {
  font: IFont;
  onClose: () => void;
}

export default function FontPopUp({ font, onClose }: FontPopUpProps) {
    async function fetchFontPreview(fontName: string) {
    try {
        const res = await fetch(`/api/font/font-preview?fontName=${encodeURIComponent(fontName)}`);
        const data = await res.json();

        if (!res.ok || !data.success) {
        throw new Error(data.message || "Failed to fetch font preview");
        }

        return data.data; // This should be the signed URL or font data
    } catch (error) {
        console.error("Error fetching font preview:", error);
        return null;
    }
}
    const [fontUrl, setFontUrl] = useState<string | null>(null);
    useEffect(() => {
    async function loadFont() {
    const fontUrl = await fetchFontPreview(font.name);

    if (fontUrl) {
      const styleTag = document.createElement("style");
      styleTag.innerHTML = `
        @font-face {
          font-family: '${font.name}';
          src: url('${fontUrl}') format('truetype');
          font-weight: normal;
          font-style: normal;
        }
      `;
      document.head.appendChild(styleTag);
      setFontUrl(fontUrl);
    }
  }

  loadFont();
}, [font.name]);

  if (!fontUrl) {
    return <div>Loading font preview...</div>;
  }

    return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          ✕
        </button>
        <h2 className={styles.title}>{font.name}</h2>

        <ul className={styles.metaList}>
            <li>
                Font name: {font.name}
            </li>
            <li>
                short Description: {font.description.split(".")[0]}.
            </li>
            <li>
                Category: {font.catagory}
            </li>
            <li>
                style: {font.style}
            </li>
                some Preview:
            <li className={styles.preview} style={{fontFamily:font.name}}>
                The quick brown fox jumps over the lazy dog
            </li>
        </ul>
      </div>
    </div>
  );
}