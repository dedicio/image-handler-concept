import {
    MAX_IMAGE_SIZE,
    ALLOWER_FILER_TYPES,
    ALLOWED_EXTENSIONS,
} from './constants';
import type { ValidatePayloadInput } from './types';

export function extractFileName(imageName: string): String {
    const fileName = imageName.split('.').slice(0, -1).join('.');
    return fileName.replace(/[^a-z0-9]/gi, '-').toLowerCase();
}

export function getReducedSize(originalSize:number, finalSize: number): string {
    const diff = finalSize / originalSize;
    return ((1 - diff) * 100).toFixed(2);
}

export function buildErrorResponse(message: string, code?: number): Response {
    return new Response(message, { status: code || 400 });
}



export function validadePayload(payload: ValidatePayloadInput) {
    const {
        image,
        outputFormat,
        outputWidth,
        outputHeight,
    } = payload as ValidatePayloadInput;

    const {
        size,
        type,
    } = image;

    if (size > MAX_IMAGE_SIZE) {
        return {
            message: 'Image is too large. Max size is 2MB',
            code: 413
        };
    }

    if (!ALLOWER_FILER_TYPES.includes(type)) {
        return {
            message: 'Invalid image type',
            code: 415,
        };
    }

    if (outputWidth && outputWidth > 3840) {
        return {
            message: 'Invalid output width',
            code: 400,
        };
    }

    if (outputHeight && outputHeight > 3840) {
        return {
            message: 'Invalid output height',
            code: 400,
        };
    }

    if (!ALLOWED_EXTENSIONS.includes(outputFormat)) {
        return {
            message: 'Invalid output format',
            code: 400,
        };
    }

    return null;
}
