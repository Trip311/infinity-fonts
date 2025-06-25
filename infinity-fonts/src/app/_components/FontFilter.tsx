import styles from '@/styles/components/filterButton.module.scss';

interface FontFilterProps {
  styles: string[];
  categories: string[];
  selectedStyle: string;
  selectedCategory: string;
  onStyleChange: (style: string) => void;
  onCategoryChange: (category: string) => void;
}

export default function FontFilter({
  styles: styleOptions,
  categories: categoryOptions,
  selectedStyle,
  selectedCategory,
  onStyleChange,
  onCategoryChange,
}: FontFilterProps) {
  return (
    <div className={styles.filterSquare}>
      <div className={styles.filterTitle}>Filter Fonts</div>
      <div className={styles.filterGroup}>
        <label>Style:</label>
        <select
          value={selectedStyle}
          onChange={e => onStyleChange(e.target.value)}
        >
          <option value="">All</option>
          {styleOptions.map(style => (
            <option key={style} value={style}>{style}</option>
          ))}
        </select>
      </div>
      <div className={styles.filterGroup}>
        <label>Category:</label>
        <select
          value={selectedCategory}
          onChange={e => onCategoryChange(e.target.value)}
        >
          <option value="">All</option>
          {categoryOptions.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>
    </div>
  );
}