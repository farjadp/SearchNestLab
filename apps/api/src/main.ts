// ============================================================================
// Hardware Source: apps/api/src/main.ts
// Version: 1.1.0 — 2025-12-17
// Why: Application entry point
// Env / Identity: PORT
// ============================================================================

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors(); // Enable CORS for localhost:3000
    // Using a default port if env var is missing
    const port = process.env.PORT || 3001;
    await app.listen(port);
    console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
