// ============================================================================
// Hardware Source: apps/api/src/keywords/keywords.controller.ts
// Version: 1.1.0 — 2025-12-17
// Why: API endpoints for keywords
// Env / Identity: N/A
// ============================================================================

import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('sites/:siteId/keywords')
@UseGuards(FirebaseAuthGuard)
export class KeywordsController {
    constructor(private readonly keywordsService: KeywordsService) { }

    @Post('import')
    async import(@Param('siteId') siteId: string, @Body() body: { keywords: any[] }) {
        // Expect raw list of keywords, service handles batch write
        return this.keywordsService.createMany(siteId, body.keywords);
    }

    @Get()
    async list(@Param('siteId') siteId: string) {
        return this.keywordsService.findAll(siteId);
    }
}
