import {
    InternalServerError,
    NotFoundError,
    RepositoryService,
    Service
} from '@artisans/anita';

import {
    ProductCategoryDto,
    type ICreateProductCategoryDto,
    type IUpdateProductCategoryDto
} from './schemas/ProductCategory';

export class ProductCategoryService extends Service {
    private repo = new RepositoryService('productCategory', ProductCategoryDto);

    getAll() {
        return this.repo.all();
    }

    async getById(id: string) {
        const productCategory = await this.repo.findById(id);

        if (productCategory === null) {
            throw new NotFoundError(
                `The productCategory with id ${id} was not found`
            );
        }

        return productCategory;
    }

    async create(body: ICreateProductCategoryDto) {
        const result = await this.repo.create(body);

        if (!result) {
            throw new InternalServerError(
                'The productCategory could not be created'
            );
        }

        return result;
    }

    async updateById(id: string, body: IUpdateProductCategoryDto) {
        const result = await this.repo.updateById(id, body);

        if (!result) {
            throw new NotFoundError(
                `The productCategory with id ${id} was not found or could not be updated`
            );
        }

        return result;
    }

    async deleteById(id: string) {
        const productCategory = await this.repo.deleteById(id);

        if (productCategory === null) {
            throw new NotFoundError(
                `The productCategory with id ${id} was not found`
            );
        }

        return productCategory;
    }
}
