import s3 from '../lib/s3';
import { config } from 'dotenv';

config();
const BUCKET = process.env.NEXT_PUBLIC_AWS_S3_BUCKET!;

export async function GetAllIconsFromS3() {
  try {
    const result = await s3
      .listObjectsV2({
        Bucket: BUCKET,
        Prefix: 'icons/', 
      })
      .promise();

    const icons =
      result.Contents?.map((item) =>
        s3.getSignedUrl('getObject', {
          Bucket: BUCKET,
          Key: item.Key!,
          Expires: 300, // URL expires in 5 minutes
        })
      ) || [];

    return icons;
  } catch (error) {
    console.error('Error listing icons from S3:', error);
    throw error;
  }
}