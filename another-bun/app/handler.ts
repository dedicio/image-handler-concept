import shortHash from 'shorthash2';
import type { RequestInput, ProcessorInput } from './types.ts';
import { RequestSchema } from './types.ts';
import * as utils from './utils.ts';
import { DEFAULT_EXTENSION, AWS_S3_BUCKET_URL } from './constants.ts';
import * as processor from './processor.ts';

export const upload = async (req: Request): Promise<Response> => {
    const formData = await req.formData();

    const payload = RequestSchema.safeParse(Object.fromEntries(formData.entries()));

    if (!payload.success) {
        const {
            message,
            path,
        } = payload.error.issues[0];
        return utils.buildErrorResponse(
            `Error on [${path.join(', ')}]: ${message}`
        );
    }

    const {
        image,
        account,
        origin,
        key,
        identifier,
        outputFormat,
        outputWidth,
        outputHeight,
    } = payload.data as RequestInput;

    const ext = outputFormat || DEFAULT_EXTENSION;

    const hasInvalidPayload = utils.validadePayload({
        image,
        outputFormat: ext,
        outputWidth,
        outputHeight,
    });

    if (hasInvalidPayload) {
        return utils.buildErrorResponse(hasInvalidPayload.message, hasInvalidPayload.code);
    }

    const {
        type: imageType,
        size: imageSize,
        name: imageName,
    } = image;

    
    const imageBuffer = await image.arrayBuffer();

    const sanitazedFileName = utils.extractFileName(imageName);
    const hash = shortHash(Date.now().toString());
    const convertedFileName = `${sanitazedFileName}-${hash}.${ext}`;
    const path = `${account}/${key}/${convertedFileName}`;
    const url = `${AWS_S3_BUCKET_URL}/${path}`;

    const outputOptions: ProcessorInput = {
        format: ext,
        width: outputWidth,
        height: outputHeight,
    }
    const { data, info } = await processor.build(imageBuffer, outputOptions);

    return utils.buildErrorResponse('Not implemented', 501);
}

export const move = async (req: Request): Promise<Response> => {
    return utils.buildErrorResponse('Not implemented', 501);
}
