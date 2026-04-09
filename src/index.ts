import { App, MongoService } from '@artisans/anita';
import 'dotenv/config';
import { ProductCategoryServiceRouter } from './services/ProductCategoryService';
import { ProductServiceRouter } from './services/ProductService/ProductServiceRouter';

async function main() {
    MongoService.setUrl(process.env.MONGO_URI!);
    const port = Number(process.env.PORT) || 8000;

    const app = new App({
        cors: {},
        openApi: {
            info: {
                title: '1973Flowers-backend',
                version: '0.0.1'
            }
        },
        routers: [ProductCategoryServiceRouter(), ProductServiceRouter()]
    });

    await app.start(port);
    console.log(`Server running on port ${port}`);
}

void main();
