import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';

export enum Language {
    en = 'en',
    ka = 'ka'
}

export const LanguageModel = z.enum(Language).openapi('LanguageModel');

//this model is temporary and is used to expose the models used in the services for the frontend to use

export const DanglingModels = z
    .object({
        LanguageModel
    })
    .openapi('DanglingModels', {
        description:
            'An object containing some models that might not be referred to directly but are useful to the client.'
    });

export const LocalizedValue = z
    .record(
        LanguageModel,
        z
            .string()
            .max(300)
            .optional()
            .nullable()
            .transform((val) => {
                if (!val) {
                    return val;
                }

                return sanitizeHtml(val, {
                    allowedTags: [],
                    allowedAttributes: {}
                });
            })
    )
    .openapi('LocalizedValue');

export const LocalizedHTMLValue = z
    .record(
        LanguageModel,
        z
            .string()
            .optional()
            .nullable()
            .transform((val) => {
                if (!val) {
                    return val;
                }

                return sanitizeHtml(val);
            })
    )
    .openapi('LocalizedHTMLValue');
