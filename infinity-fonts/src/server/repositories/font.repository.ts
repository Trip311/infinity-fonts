import { readFile } from 'fs/promises';
import path from "path";
import s3 from '../lib/s3';
import { config } from 'dotenv';

config();
const BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET!;

export async function getAllFontsFromS3() {
    const filePath = path.join(process.cwd(), 'src',"scripts", "font-metadata.json");
    const content = await readFile(filePath, 'utf-8');
    return JSON.parse(content);
}

export async function getFontURL(fontName: string) {
  try {
    const key = `fonts-preview/${fontName}.ttf`;
    await s3.headObject({ Bucket: BUCKET, Key: key }).promise();

    const url = s3.getSignedUrl("getObject", {
      Bucket: BUCKET,
      Key: key,
      Expires: 60 * 5, // optional: 5 minutes
    });
    return url;
  } catch (error) {
    console.error("Error fetching font URL:", error);
    return null;
  }
}