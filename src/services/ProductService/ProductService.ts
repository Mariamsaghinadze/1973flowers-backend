import {
    InternalServerError,
    NotFoundError,
    RepositoryService,
    Service
} from '@artisans/anita';

import {
    ProductDto,
    type ICreateProductDto,
    type IUpdateProductDto
} from './schemas/Product';

export class ProductService extends Service {
    private repo = new RepositoryService('product', ProductDto);

    override async init() {
        this.logger.info('Ensuring DB index.');

        const index = await this.repo.createIndexes([
            {
                key: {
                    categoryIds: 1
                },
                unique: false,
                background: true
            },
            {
                key: {
                    name: 1
                },
                unique: true,
                background: true
            }
        ]);

        this.logger.info('service.createIndex()', {
            index
        });
    }

    getAll() {
        return this.repo.find({}, { sort: { sortOrder: 1 } });
    }

    async findByIds(ids: string[]) {
        return await this.repo.find({
            id: ids
        });
    }

    async findActiveProductsByIds(ids: string[]) {
        return await this.repo.find({
            id: ids,
            active: true
        });
    }

    async getById(id: string) {
        const product = await this.repo.findById(id);

        if (product === null) {
            throw new NotFoundError(`The product with id ${id} was not found`);
        }

        return product;
    }

    async create(body: ICreateProductDto) {
        const result = await this.repo.create({
            ...body,
            active: true
        });

        if (!result) {
            throw new InternalServerError('The product could not be created');
        }

        return result;
    }

    async updateById(id: string, body: IUpdateProductDto) {
        const result = await this.repo.updateById(id, body);

        if (!result) {
            throw new NotFoundError(
                `The product with id ${id} was not found or could not be updated`
            );
        }

        return result;
    }

    async deleteById(id: string) {
        const product = await this.repo.deleteById(id);

        if (product === null) {
            throw new NotFoundError(`The product with id ${id} was not found`);
        }

        return product;
    }
}
