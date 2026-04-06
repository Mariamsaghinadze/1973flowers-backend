import { App, MongoService } from '@artisans/anita';
import 'dotenv/config';

async function main() {
    MongoService.setUrl(process.env.MONGO_URI!);

    const app = new App({
        cors: {},
        openApi: {
            info: {
                title: '1973Flowers-backend',
                version: '0.0.1'
            }
        },
        routers: []
    });

    await app.start(8000);
}

void main();
