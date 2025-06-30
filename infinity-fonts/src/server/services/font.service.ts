import { getAllFontsFromS3 } from "../repositories/font.repository"
export async function getAllFonts() {
  const fonts = await getAllFontsFromS3();
  return fonts;
}