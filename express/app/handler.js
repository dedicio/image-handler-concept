import sharp from 'sharp';
import shortHash from 'shorthash2';
import * as utils from './utils.js';
import * as sender from './sender.js';
import * as storage from './storage.js';

const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2MB
const AWS_S3_BUCKET_URL = process.env['AWS_S3_BUCKET_URL'];
const CORS_HEADERS = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
    'Access-Control-Allow-Headers': 'Content-Type',
}

export const upload = async req => {
    if (!req.body) {
        return utils.buildErrorResponse('Must upload a valid body data.');
    }

    const { file: image } = req;
    const {
        key,
        account,
        identifier,
        origin,
    } = req.body;

    if (!image || !(image.buffer instanceof Buffer)) {
        return utils.buildErrorResponse('Must upload a valid image file.');
    }


    if (!key || !account) {
        return utils.buildErrorResponse('Must provide key and account values.');
    }

    const {
        mimetype: imageType,
        size: imageSize,
        originalname: imageName,
    } = image;

    if (!ACCEPTED_IMAGE_TYPES.includes(imageType)) {
        return utils.buildErrorResponse('Invalid image type.');
    }

    if (imageSize > MAX_IMAGE_SIZE) {
        return utils.buildErrorResponse('Image size too large');
    }

    const sanitazedFileName = utils.extractFileName(imageName);
    const hash = shortHash(Date.now().toString());
    const convertedFileName = `${sanitazedFileName}-${hash}.webp`;
    const path = `${account}/${key}/${convertedFileName}`;
    const url = `${AWS_S3_BUCKET_URL}/${path}`;

    try {
        const { data, info } = await sharp(image.buffer)
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

// export const move = async (req: Request): Promise<Response> => {
//     return new Response(null);
// };
