import sharp from "sharp";
import shortHash from 'shorthash2';
import * as utils from "./utils.ts";
import { CORS_HEADERS } from './constants.ts';
import * as sender from "./sender.ts";
import * as storage from './storage.ts';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2MB
const AWS_S3_BUCKET_URL = Bun.env["AWS_S3_BUCKET_URL"];

export const upload = async (req: Request): Promise<Response> => {
    const formdata = await req.formData();
    const image = formdata.get('image');
    const account = formdata.get('account');
    const origin = formdata.get('origin');
    const key = formdata.get('key');
    const identifier = formdata.get('identifier');

    if (!image || !(image instanceof File)) {
        throw new Error('Must upload a valid image file.');
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
                    statusText: "OK",
                    headers: {
                        ...CORS_HEADERS,
                        'Access-Control-Allow-Origin': '*',
                        "Content-Type": "application/json",
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
