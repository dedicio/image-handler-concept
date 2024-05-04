export const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
}

export const ACCEPTED_IMAGE_TYPES = [
    'image/jpeg', 
    'image/png', 
    'image/webp', 
    'image/avif'
];

export const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2MB

export const AWS_S3_BUCKET_URL = Bun.env['AWS_S3_BUCKET_URL'];

// export const ALLOWED_EXTENSIONS = [ 'webp', 'jpeg', 'png', 'avif' ] as const;

export enum ALLOWED_EXTENSIONS {
    'webp', 'jpeg', 'png', 'avif'
}