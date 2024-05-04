import {
    ACCEPTED_IMAGE_TYPES,
    MAX_IMAGE_SIZE,
    ALLOWED_EXTENSIONS,
} from './constants.ts';

type IsPayloadInvalidInput = {
    image: any;
    outputFormat: string;
    outputWidth: number;
    outputHeight: number;
};

export function getInvalidPayloadErrorMessage(payload: IsPayloadInvalidInput): string | null {
    const {
        image,
        outputFormat,
        outputWidth,
        outputHeight,
    } = payload;

    if (!isFileTypeValid(image)) {
        return 'Must upload a valid image file.';
    }

    const {
        type: imageType,
        size: imageSize,
    } = image;

    if (!isImageTypeValid(imageType)) {
        return 'Invalid image type. The accepted values are "webp", "jpeg", "jpg", "png" and "avif".';
    }

    if (!isImageSizeValid(imageSize)) {
        return 'Image size too large. The max size is 2MB.';
    }

    if (outputFormat && !isExtensionValid(outputFormat)) {
        return 'Invalid output format. The accepted values are "webp", "jpeg", "jpg", "png" and "avif".';
    }

    if (outputWidth && isNaN(+outputWidth)) {
        return 'Invalid output width. The value should be a number.';
    }

    if (outputHeight && isNaN(+outputHeight)) {
        return 'Invalid output height. The value should be a number.';
    }

    return null;
}

function isFileTypeValid(file: any): boolean {
    return file && file instanceof File;
}

function isImageTypeValid(type: string): boolean {
    return ACCEPTED_IMAGE_TYPES.includes(type);
}

function isImageSizeValid(size: number): boolean {
    return size <= MAX_IMAGE_SIZE;
}

function isExtensionValid(ext: FormDataEntryValue): boolean {
    // typeof outputFormat !== 'string' || outputFormat in ALLOWED_EXTENSIONS
    if (typeof ext !== 'string') return false;
    console.log('🚀 ~ isExtensionValid ~ ext:', typeof ext);
    console.log('🚀 ~ isExtensionValid ~ ALLOWED_EXTENSIONS:', ALLOWED_EXTENSIONS);
    
    return ALLOWED_EXTENSIONS[ext as keyof typeof ALLOWED_EXTENSIONS] !== undefined;
}
