import s3 from '../lib/s3';
import * as cheerio from 'cheerio';


const BUCKET = process.env.AWS_S3_BUCKET!;


export async function getFontMetadata(fontName: string) {
  const metadataFile = await s3.getObject({
    Bucket: BUCKET,
    Key: `font-metadatas/${fontName}.pb`,
  }).promise();
  
  const text = metadataFile.Body!.toString('utf-8');
  const meta: Record<string, string> = {};
  for (const line of text.split('\n')) {
    const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*"(.*)"\s*$/);
    if (match) {
      meta[match[1]] = match[2];
    }
  }
  return meta;
}


export async function getFontDescription(fontName: string) {
  const descObj = await s3.getObject({
    Bucket: BUCKET,
    Key: `font-descriptions/${fontName}.html`,
  }).promise();

  const html = descObj.Body!.toString('utf-8');
  const $ = cheerio.load(html);
  return $('p').text();
}