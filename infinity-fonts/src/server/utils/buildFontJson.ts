import s3 from "@/server/lib/s3"
import * as cheerio from 'cheerio';
import { config } from 'dotenv';


config();
const BUCKET = process.env.AWS_S3_BUCKET!;
   
export async function listFontNamesList1(): Promise<string[]> {
  
  const s3Result = await s3.listObjectsV2({
    Bucket: BUCKET,
    Prefix: 'fonts/',
  }).promise();

  const fontNames1 = s3Result.Contents?.map(fontZip =>
    fontZip.Key?.replace("fonts/", "").replace(".zip", "")
  ).filter(Boolean) as string[];

  return fontNames1;
}

export async function listFontNamesList2(): Promise<string[]> {

    const s3Result1 = await s3.listObjectsV2({
      Bucket: BUCKET,
      Prefix: 'fonts1/',
    }).promise();
  
    const fontNames2 = s3Result1.Contents?.map(fontZip =>
      fontZip.Key?.replace("fonts1/", "").replace(".zip", "")
    ).filter(Boolean) as string[];

    return fontNames2;
}



export async function checkFoldersMatching (folderName:string,folderName2:string, endwith:string, endwith2:string) {
    const s3Result1 = await s3.listObjectsV2({
    Bucket: BUCKET,
    Prefix: `${folderName}`,
  }).promise();

  const folder1Files = s3Result1.Contents?.map(fontZip =>
    fontZip.Key?.replace(`${folderName}`, "").replace(`${endwith}`, "")
  ).filter(Boolean) as string[];

  const s3Result2 = await s3.listObjectsV2({
    Bucket: BUCKET,
    Prefix: `${folderName2}`,
  }).promise();

  const folder2Files = s3Result2.Contents?.map(fontZip =>
    fontZip.Key?.replace(`${folderName2}`, "").replace(`${endwith2}`, "")
  ).filter(Boolean) as string[];

  const updated1 = folder1Files.map((fullPath)=>{
    return fullPath.replace(`${folderName}`,"")
  })

    const updated2 = folder2Files.map((fullPath)=>{
        return fullPath.replace(`${folderName2}`,"")
    })
  console.log("arrays have the same value and the same order ? : ", arraysEqual(updated1,updated2))
}

function arraysEqual(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((val, index) => val === b[index]);
}

export async function getMetaDataPerObj (fontName:string, folderNameMetadata:string, folderNameDesc: string,fontsFolder:string,fontsFolderPreview:string) {
    const pbObj = await s3.getObject({
    Bucket: BUCKET,
    Key: `${folderNameMetadata}${fontName}.pb`,
    }).promise(); 

    const descObj = await s3.getObject({
    Bucket: BUCKET,
    Key: `${folderNameDesc}${fontName}.html`,
    }).promise();

    const text = pbObj.Body!.toString('utf-8');
    const html = descObj.Body!.toString('utf-8');
    const $ = cheerio.load(html);

    const meta: Record<string, string> = {};
    for (const line of text.split('\n')) {
        const match = line.match(/^\s*([a-zA-Z0-9_]+)\s*:\s*"(.*)"\s*$/);
        if (match) {
        meta[match[1]] = match[2];
        }
    }

    return {
        name: fontName,
        style: meta.style || 'Unknown',
        catagory: meta.category || 'Uncategorized',
        description: $('p').text().trim(),
        createdAt: new Date().toISOString(),
        S3FontFolder:`${fontsFolder}`,
        S3FontFolderPreview: `${fontsFolderPreview}`
    };

}


export async function buildFontJson() {
  const fontNames1 = await listFontNamesList1();
  const fontNames2 = await listFontNamesList2();
  const results: any[] = [];

  for (const fontName of fontNames1) {
    try {
      const data = await getMetaDataPerObj(fontName,"font-metadatas/","font-descriptions/","fonts/","fonts-preview");
      results.push(data);
    } catch (err:any) {
      console.error(`Failed to process ${fontName}:`, err.message);
    }
  }


  for (const fontName of fontNames2) {
    try {
      const data = await getMetaDataPerObj(fontName,"font-metadatas1/","font-descriptions1/","fonts1","fonts-preview1/");
      results.push(data);
    } catch (err:any) {
      console.error(`Failed to process ${fontName}:`, err.message);
    }
  }
  console.log(results.length)
  return results;
}

