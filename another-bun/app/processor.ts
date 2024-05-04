import sharp from 'sharp';
import type { ProcessorInput } from './types.ts';

export async function build(image: ArrayBuffer, options: ProcessorInput) {
    return sharp(image)
        .resize({
            width: options.width,
            height: options.height,
            fit: 'cover',
        })
        .toFormat(options.format)
        .toBuffer({ resolveWithObject: true });
}