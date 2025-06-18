export interface Font {
  id: string;
  family: string;
  designer?: string;
  license: string;
  category?: string;
  subsets: string[];
  variants: string[];
  version?: string;
  lastModified?: string;
  files: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}