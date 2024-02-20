import sharp from "sharp";
import * as utils from "./utils.ts";
import * as broker from "./broker.ts";
import { CORS_HEADERS } from './constants.ts';

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];
const MAX_IMAGE_SIZE = 1024 * 1024 * 2; // 2MB

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
    } = image;

    if (!ACCEPTED_IMAGE_TYPES.includes(imageType)) {
        throw new Error("Invalid image type");
    }

    if (imageSize > MAX_IMAGE_SIZE) {
        throw new Error("Image size too large");
    }

    const sanitazedFileName = utils.extractFileName(image);
    const convertedFileName = `${sanitazedFileName}.webp`;
    const imageBuffer = await image.arrayBuffer();
    
    const { data, info } = await sharp(imageBuffer)
        .webp()
        .toBuffer({ resolveWithObject: true });

    await Bun.write(convertedFileName, data);

    const body = JSON.stringify({
        fileName: convertedFileName,
        width: info.width,
        height: info.height,
        size: info.size,
        reduceSize: `${utils.getReducedSize(imageSize, info.size)}%`,
        type: info.format,
        url: `http://localhost:4000/${convertedFileName}`,
        account,
        origin,
        key,
        identifier,        
    });

    // broker.send(`upload.${origin}.${key}`, body);

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
};

export const move = async (req: Request): Promise<Response> => {
    return new Response(null);
};
