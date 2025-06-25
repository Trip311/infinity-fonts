import { readFile } from 'fs/promises';
import path from "path";
export async function getAllFontsFromS3() {
    const filePath = path.join(process.cwd(), 'src',"scripts", "font-metadata.json");
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
}