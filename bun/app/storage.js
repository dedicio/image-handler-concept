import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const {
  AWS_REGION,
  AWS_S3_BUCKET,
  AWS_LOCAL_ENDPOINT,
} = Bun.env;

const clientConfig = {
  region: AWS_REGION,
};

if (AWS_LOCAL_ENDPOINT) {
  clientConfig.endpoint = AWS_LOCAL_ENDPOINT;
  clientConfig.forcePathStyle = true;
  clientConfig.credentials = {
    accessKeyId: Bun.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: Bun.env.AWS_SECRET_ACCESS_KEY
  };
}

const client = new S3Client(clientConfig);

export const upload = async (file, fileName) => {
  const params = {
    Body: file,
    Bucket: AWS_S3_BUCKET,
    Key: fileName,
  };
  const command = new PutObjectCommand(params);

  return client.send(command);
}