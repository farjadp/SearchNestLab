// ============================================================================
// Hardware Source: apps/api/src/leads/leads.controller.ts
// Version: 1.1.0 — 2025-12-17
// Why: API endpoints for leads
// Env / Identity: N/A
// ============================================================================

import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('sites/:siteId/leads')
export class LeadsController {
    constructor(private readonly leadsService: LeadsService) { }

    // Public endpoint for widget to submit leads
    // TODO: Add different guard for widget API key validation if needed, or allow CORS from site domain
    @Post()
    async create(@Param('siteId') siteId: string, @Body() body: any) {
        // Basic validation
        if (!body.email) return { error: 'Email required' };

        const id = await this.leadsService.create(siteId, {
            email: body.email,
            sourceUrl: body.sourceUrl
        });
        return { id, success: true };
    }

    // Protected endpoint for dashboard
    @Get()
    @UseGuards(FirebaseAuthGuard)
    async list(@Param('siteId') siteId: string) {
        return this.leadsService.findAll(siteId);
    }
}
