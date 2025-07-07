import { getAllFontsFromS3,getFontURL } from "../repositories/font.repository"
export async function getAllFonts() {
  const fonts = await getAllFontsFromS3();
  return fonts;
}

export async function getFontPreview(fontName:string){
  const fontPreviewUrl = await getFontURL(fontName);
  return fontPreviewUrl;
  
}