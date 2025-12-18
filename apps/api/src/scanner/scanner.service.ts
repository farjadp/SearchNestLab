// ============================================================================
// Hardware Source: apps/api/src/scanner/scanner.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage crawling jobs
// Env / Identity: REDIS_URL
// ============================================================================

import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';

@Injectable()
export class ScannerService {
    private queue: Queue;

    constructor() {
        this.queue = new Queue('scanner', {
            connection: {
                url: process.env.REDIS_URL || 'redis://localhost:6379',
            },
        });
    }

    async addCrawlJob(siteId: string, url: string, limit: number = 10) {
        await this.queue.add('crawl', { siteId, url, limit });
    }
}
