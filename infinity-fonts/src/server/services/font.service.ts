import { getAllFontsFromS3 } from "../repositories/font.repository"
export async function getAllFontsName() {
  const fonts = await getAllFontsFromS3();
  return fonts.map((font: { name: string }) => font.name);
}