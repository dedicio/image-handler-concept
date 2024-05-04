import sharp from 'sharp';
import type { OutputInfo } from 'sharp';
import { ALLOWED_EXTENSIONS } from './constants.ts';

// type AllowedExtensions = typeof ALLOWED_EXTENSIONS[number];

type ProcessInput = {
    format: string;
    width: number;
    height: number;
};

type ProcessOutput = {
    data: Buffer;
    info: OutputInfo;
};

export const process = async (
    image: Buffer | ArrayBuffer,
    options: ProcessInput,
): Promise<ProcessOutput> => {
    const {
        format,
        width,
        height,
    } = options;
    
    const sharpImage = sharp(image);

    const toExt = Object.values(ALLOWED_EXTENSIONS).includes(format)
        ? format
        : 'webp';
    
    let result: any = sharpImage[toExt]();
    
    if (width || height) {
        result = result.resize({
            width,
            height,
        });
    }

    const { data, info } = await result.toBuffer({ resolveWithObject: true });

    return {
        data,
        info,
    };
}