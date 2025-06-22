



import s3 from '../lib/s3';
import protobuf from 'protobufjs';
import * as cheerio from 'cheerio';
import path from 'path';

const BUCKET = process.env.AWS_S3_BUCKET!;
const PROTO_PATH = path.join(__dirname, '..', 'protos', 'font.proto') // Adjust as needed

export async function getFontMetadata(fontName: string) {
  const pbObj = await s3.getObject({
    Bucket: BUCKET,
    Key: `font-metadatas/${fontName}.pb`,
  }).promise();

  const root = await protobuf.load(PROTO_PATH);
  const FontMeta = root.lookupType('FontMeta');
  const message = FontMeta.decode(pbObj.Body as Buffer);
  const meta = FontMeta.toObject(message);

  return meta as { name: string; style: string; catagory: string };
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