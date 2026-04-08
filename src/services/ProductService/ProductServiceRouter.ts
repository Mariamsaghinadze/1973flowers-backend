import { Dependency, EmptyBody, Response, Router } from '@artisans/anita';

import { ProductService } from './ProductService';
import {
    CreateProductDto,
    FindProductsByIdsDto,
    ProductDto,
    ProductListDto,
    UpdateProductDto
} from './schemas/Product';

export const ProductServiceRouter = () => {
    const router = new Router();
    const service = Dependency.shared(ProductService);

    router.get('/product', {
        responseBody: ProductListDto,
        async handler() {
            const serviceList = await service.getAll();
            return Response.Ok(serviceList);
        },
        operationId: 'getProducts'
    });

    router.get('/product/:id', {
        responseBody: ProductDto,
        async handler(ctx) {
            const productById = await service.getById(ctx.params.id);
            return Response.Ok(productById);
        }
    });

    router.post('/product/findByIds', {
        requestBody: FindProductsByIdsDto,
        responseBody: ProductListDto,
        async handler(ctx) {
            const products = await service.findByIds(ctx.req.body.productIds);
            return Response.Ok(products);
        },
        operationId: 'findProductsByIds'
    });

    router.post('/product', {
        requestBody: CreateProductDto,
        responseBody: ProductDto,
        async handler(ctx) {
            const productCreated = await service.create(ctx.req.body);
            return Response.Created(productCreated);
        }
    });

    router.patch('/product/:id', {
        requestBody: UpdateProductDto,
        responseBody: ProductDto,
        async handler(ctx) {
            const productUpdated = await service.updateById(
                ctx.params.id,
                ctx.req.body
            );
            return Response.Ok(productUpdated);
        }
    });

    router.delete('/product/:id', {
        requestBody: EmptyBody,
        responseBody: ProductDto,
        async handler(ctx) {
            const productDeleted = await service.deleteById(ctx.params.id);
            return Response.Ok(productDeleted);
        }
    });

    return router;
};

//TODO add middlewares
