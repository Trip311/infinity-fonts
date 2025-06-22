import prisma from '../lib/prisma';
import { getFontMetadata, getFontDescription } from '../utils/fontParser';

const fontNames = ['FontA', 'FontB']; // TODO: List all font names

async function main() {
  for (const name of fontNames) {
    const meta = await getFontMetadata(name);
    const description = await getFontDescription(name);
    const s3Url = `https://${process.env.AWS_S3_BUCKET}.s3.amazonaws.com/fonts/${name}/${name}-Regular.ttf`;

    await prisma.font.upsert({
      where: { name },
      update: {},
      create: {
        name: meta.name,
        style: meta.style,
        stroke: meta.stroke,
        description,
        s3Url,
      },
    });
    console.log(`Ingested: ${name}`);
  }
  process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});