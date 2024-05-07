import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const AWS_REGION = process.env['AWS_REGION'];
const AWS_S3_BUCKET = process.env['AWS_S3_BUCKET'];

const client = new S3Client({
  region: AWS_REGION,
  endpoint: 'http://localhost:4566',
  forcePathStyle: true,
});

export const upload = async (file, fileName)  => {
  const params = {
    Body: file,
    Bucket: AWS_S3_BUCKET,
    Key: fileName,
  };
  const command = new PutObjectCommand(params);

  return client.send(command);
}