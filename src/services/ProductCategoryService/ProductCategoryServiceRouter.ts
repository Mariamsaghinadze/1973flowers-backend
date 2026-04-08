import { Dependency, EmptyBody, Response, Router } from '@artisans/anita';

import {
    CreateProductCategoryDto,
    ProductCategoryDto,
    ProductCategoryListDto,
    UpdateProductCategoryDto
} from './schemas/ProductCategory';
import { ProductCategoryService } from './ProductCategoryService';

export const ProductCategoryServiceRouter = () => {
    const router = new Router();
    const service = Dependency.shared(ProductCategoryService);

    router.get('/productCategory', {
        responseBody: ProductCategoryListDto,
        async handler() {
            const productCategoryList = await service.getAll();
            return Response.Ok(productCategoryList);
        },
        operationId: 'getProductCategories'
    });

    router.get('/productCategory/:id', {
        responseBody: ProductCategoryDto,
        async handler(ctx) {
            const productCategory = await service.getById(ctx.params.id);
            return Response.Ok(productCategory);
        }
    });

    router.post('/productCategory', {
        requestBody: CreateProductCategoryDto,
        responseBody: ProductCategoryDto,
        async handler(ctx) {
            console.log('CATEGORY BODY:', ctx.req.body);
            const created = await service.create(ctx.req.body);
            console.log('CATEGORY CREATED:', created);
            return Response.Created(created);
        }
    });

    router.patch('/productCategory/:id', {
        requestBody: UpdateProductCategoryDto,
        responseBody: ProductCategoryDto,
        async handler(ctx) {
            const productCategory = await service.updateById(
                ctx.params.id,
                ctx.req.body
            );
            return Response.Ok(productCategory);
        }
    });

    router.delete('/productCategory/:id', {
        requestBody: EmptyBody,
        responseBody: ProductCategoryDto,
        async handler(ctx) {
            const productCategory = await service.deleteById(ctx.params.id);
            return Response.Ok(productCategory);
        }
    });

    return router;
};

//TODO add middlewares
