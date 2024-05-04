import { z } from 'zod';
import {
    ALLOWED_EXTENSIONS,
} from './constants';

export const RequestSchema = z.object({
    image: z.instanceof(File),
    account: z.string(),
    origin: z.string(),
    key: z.string(),
    identifier: z.string(),
    outputFormat: z.string().refine((value) => ALLOWED_EXTENSIONS.includes(value), {
        message: 'Invalid output format',
    }).optional(),
    outputWidth: z.number().int().positive().optional(),
    outputHeight: z.number().int().positive().optional(),
});

export type RequestInput = z.infer<typeof RequestSchema>;

export const ValidatePayloadSchema = z.object({
    image: z.instanceof(File),
    outputFormat: z.string(),
    outputWidth: z.number().int().positive().optional(),
    outputHeight: z.number().int().positive().optional(),
});

export type ValidatePayloadInput = z.infer<typeof ValidatePayloadSchema>;

export type ProcessorInput = {
    width?: number;
    height?: number;
    format: string;
}
