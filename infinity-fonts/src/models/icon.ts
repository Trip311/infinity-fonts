export interface Icon {
  id: string;
  name: string;
  category?: string;
  license: string;
  tags: string[];
  version?: string;
  lastModified?: string;
  files: Record<string, string>;
  createdAt: string;
  updatedAt: string;
}