const port = process.env.PORT ?? 8000;
const host = process.env.HOST ?? `http://localhost:${port}`;

export default {
    port,
    host,
    mongoUri: process.env.MONGO_URI!,
    jwtSecret: process.env.JWT_SECRET!
} as const;
