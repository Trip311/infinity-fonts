import {buildFontJson} from "@/server/utils/buildFontJson"
import { writeFileSync } from "fs";
import {join} from 'path';

async function main() {
    const fonts = await buildFontJson();

    const outputPath = join(__dirname, 'font-metadata.json');

    writeFileSync(outputPath, JSON.stringify(fonts, null, 2), 'utf-8');

    console.log(`✅ Saved ${fonts.length} fonts to ${outputPath}`);
    process.exit(0);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});