import { type output, z } from '@artisans/anita';
import { LocalizedHTMLValue, LocalizedValue } from '../../../lib/models';

export const ProductCategoryDto = z
    .object({
        id: z.string().min(1),
        name: LocalizedValue,
        shortDescription: LocalizedHTMLValue.optional()
    })
    .openapi('ProductCategoryDto');

export const ProductCategoryListDto = z
    .array(ProductCategoryDto)
    .openapi('ProductCategoriesDto');

export const CreateProductCategoryDto = ProductCategoryDto.omit({
    id: true
}).openapi('CreateProductCategoryDto');

export const UpdateProductCategoryDto = ProductCategoryDto.omit({
    id: true
})
    .partial()
    .openapi('UpdateProductCategoryDto');

export type ICreateProductCategoryDto = output<typeof CreateProductCategoryDto>;
export type IUpdateProductCategoryDto = output<typeof UpdateProductCategoryDto>;
