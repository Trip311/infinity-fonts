"use client"
import styles from "@/styles/components/fontPopUp.module.scss"

export default function fontPopUp(fontName:string){
    return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeBtn}>
          ✕
        </button>
        <h2 className={styles.title}>{font.name}</h2>

        <ul className={styles.metaList}>
          {Object.entries(fontName).map(
            ([key, value]) =>
              key !== 'name' && (
                <li key={key}>
                  <strong>{key}:</strong> {String(value)}
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}