import sharp from 'sharp';
import shortHash from 'shorthash2';
import * as utils from './utils.js';
import * as sender from './sender.js';
import * as storage from './storage.js';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2MB
const AWS_S3_BUCKET_URL = Bun.env['AWS_S3_BUCKET_URL'];
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
}

export const upload = async req => {
    let formData;

    try {
        formData = await req.formData();
    } catch (error) {
        return utils.buildErrorResponse('Must upload a valid body data.');
    }

    const image = formData.get('image');
    const account = formData.get('account');
    const origin = formData.get('origin');
    const key = formData.get('key');
    const identifier = formData.get('identifier');

    if (!image || !(image instanceof File)) {
        return utils.buildErrorResponse('Must upload a valid image file.');
    }

    const {
        type: imageType,
        size: imageSize,
        name: imageName,
    } = image;

    if (!ACCEPTED_IMAGE_TYPES.includes(imageType)) {
        return utils.buildErrorResponse('Invalid image type.');
    }

    if (imageSize > MAX_IMAGE_SIZE) {
        return utils.buildErrorResponse('Image size too large');
    }

    const imageBuffer = await image.arrayBuffer();

    const sanitazedFileName = utils.extractFileName(imageName);
    const hash = shortHash(Date.now().toString());
    const convertedFileName = `${sanitazedFileName}-${hash}.webp`;
    const path = `${account}/${key}/${convertedFileName}`;
    const url = `${AWS_S3_BUCKET_URL}/${path}`;
    
    try {
        const { data, info } = await sharp(imageBuffer)
            .webp()
            .toBuffer({ resolveWithObject: true });

        try {
            await storage.upload(data, path);
        
            const body = JSON.stringify({
                url,
                origin,
                account,
                key,
                identifier,
                meta: {
                    fileName: convertedFileName,
                    type: info.format,
                    originalSize: imageSize,
                    size: info.size,
                    sizeDiff: `${utils.getReducedSize(imageSize, info.size)}%`,
                    width: info.width,
                    height: info.height,
                },      
            });
        
            sender.send('upload', body);
        
            return new Response(
                body,
                {
                    status: 200,
                    statusText: 'OK',
                    headers: {
                        ...CORS_HEADERS,
                        'Access-Control-Allow-Origin': '*',
                        'Content-Type': 'application/json',
                    },
                }
            );
        } catch (error) {
            return utils.buildErrorResponse('Error uploading image.', 500);
        }    
    } catch (error) {
        return utils.buildErrorResponse('Error converting image.', 500);
    }
};

export const move = async req => {
    return new Response(null);
};
