import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const AWS_REGION = Bun.env['AWS_REGION'];
const AWS_S3_BUCKET = Bun.env['AWS_S3_BUCKET'];
const AWS_ENDPOINT = Bun.env['AWS_ENDPOINT'];

const clientConfig = {
  region: AWS_REGION,
};

if (AWS_ENDPOINT) {
  clientConfig.endpoint = AWS_ENDPOINT;
  clientConfig.forcePathStyle = true;
}

const client = new S3Client(clientConfig);

export const upload = async (file, fileName)  => {
  const params = {
    Body: file,
    Bucket: AWS_S3_BUCKET,
    Key: fileName,
  };
  const command = new PutObjectCommand(params);

  return client.send(command);
}