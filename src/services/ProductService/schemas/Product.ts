import { type output, z } from '@artisans/anita';
import { LocalizedHTMLValue, LocalizedValue } from '../../../lib/models';

export const ProductDto = z
    .object({
        id: z.string(),
        name: LocalizedValue,
        sortOrder: z.number().int().positive(),
        categoryIds: z.array(z.string()),
        price: z.number(),
        description: LocalizedHTMLValue,
        images: z.string().array(),
        active: z.boolean()
    })
    .openapi('ProductDto');

export const ProductListDto = z.array(ProductDto).openapi('ProductsDto');

export const CreateProductDto = ProductDto.omit({
    id: true,
    active: true
}).openapi('CreateProductDto');

export const UpdateProductDto = ProductDto.omit({
    id: true
})
    .partial()
    .openapi('UpdateProductDto');

export const FindProductsByIdsDto = z
    .object({
        productIds: z.array(z.string())
    })
    .openapi('FindProductsByIdsDto');

export type ICreateProductDto = output<typeof CreateProductDto>;
export type IUpdateProductDto = output<typeof UpdateProductDto>;
export type IProductDto = output<typeof ProductDto>;
