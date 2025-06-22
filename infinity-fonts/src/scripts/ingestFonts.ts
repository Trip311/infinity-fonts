import prisma from '../lib/prisma';
import { getFontMetadata, getFontDescription } from '../utils/fontParser';
import s3 from '../lib/s3';


// need to be runned every time there's a change in s3 data

async function listFontNamesFromS3(): Promise<string[]> {
  const BUCKET = process.env.AWS_S3_BUCKET!;
  const PREFIX = 'fonts/';
  const result = await s3
    .listObjectsV2({
      Bucket: BUCKET,
      Prefix: PREFIX,
    })
    .promise();

  return (result.Contents || [])
    .map(obj => obj.Key!)
    .filter(key => key.endsWith('.zip'))           // Only zip files
    .map(key => key.replace(PREFIX, '').replace('.zip', '')) // Remove 'fonts/' and '.zip'
    .filter(Boolean);
}

async function main() {
  const fontNames = await listFontNamesFromS3();

  for (const name of fontNames) {
    // Check if the zip file exists for this font
    const zipKey = `fonts/${name}.zip`;
    try {
      await s3.headObject({
        Bucket: process.env.AWS_S3_BUCKET!,
        Key: zipKey,
      }).promise();
    } catch (err: any) {
      if (err.code === 'NotFound' || err.statusCode === 404) {
        console.warn(`Zip file not found for font: ${name}, skipping...`);
        continue;
      }
      throw err;
    }

    const meta = await getFontMetadata(name);
    const description = await getFontDescription(name);
    const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/${zipKey}`;

    await prisma.font.upsert({
        where: { name: meta.name },
        update: {},
        create: {
            name: meta.name,
            style: meta.style,
            catagory: meta.catagory ?? '',
            description,
            s3Url,
        },
    });
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});