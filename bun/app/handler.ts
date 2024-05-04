import shortHash from 'shorthash2';
import {
    CORS_HEADERS,
    AWS_S3_BUCKET_URL,
    ALLOWED_EXTENSIONS,
} from './constants.ts';
import * as utils from './utils.ts';
import * as sender from './sender.ts';
import * as storage from './storage.ts';
import * as process from './process.ts';
import * as validator from './validator.ts';

type PayloadInput = {
    image: File,
    account: string,
    origin: string,
    key: string,
    identifier: string,
    outputFormat: string,
    outputWidth: number,
    outputHeight: number,
}

export const upload = async (req: Request): Promise<Response> => {
    const formData = await req.formData();
    // const image = formData.get('image');
    // const account = formData.get('account');
    // const origin = formData.get('origin');
    // const key = formData.get('key');
    // const identifier = formData.get('identifier');
    // const outputFormat = formData.get('toFormat');
    // const outputWidth = formData.get('toWidth');
    // const outputHeight = formData.get('toHeight');

    const payload = Object.fromEntries(formData.entries()) as any as PayloadInput;

    const {
        image,
        account,
        origin,
        key,
        identifier,
        outputFormat,
        outputWidth,
        outputHeight,
    } = payload;

    const invalidPayloadErrorMessage  = validator.getInvalidPayloadErrorMessage({
        image: image,
        outputFormat: outputFormat,
        outputWidth: outputWidth,
        outputHeight: outputHeight,
    });

    if (invalidPayloadErrorMessage) {
        return utils.buildErrorResponse(invalidPayloadErrorMessage);
    }

    const {
        type: imageType,
        size: imageSize,
        name: imageName,
    } = image;

    const ext = outputFormat;
    const imageBuffer = await image.arrayBuffer();

    const sanitazedFileName = utils.extractFileName(imageName);
    const hash = shortHash(Date.now().toString());
    const convertedFileName = `${sanitazedFileName}-${hash}.${ext}`;
    const path = `${account}/${key}/${convertedFileName}`;
    const url = `${AWS_S3_BUCKET_URL}/${path}`;
    
    try {
        const outputOptions = {
            format: ext,
            width: outputWidth,
            height: outputHeight,
        }
        const { data, info } = await process.process(imageBuffer, outputOptions);

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
