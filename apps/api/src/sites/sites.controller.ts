// ============================================================================
// Hardware Source: apps/api/src/sites/sites.controller.ts
// Version: 1.1.0 — 2025-12-17
// Why: API endpoints for sites
// Env / Identity: N/A
// ============================================================================

import { Controller, Post, Body, UseGuards, Req, Get, Param, NotFoundException } from '@nestjs/common';
import { SitesService } from './sites.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('sites')
@UseGuards(FirebaseAuthGuard)
export class SitesController {
    constructor(private readonly sitesService: SitesService) { }

    @Post()
    async create(@Req() req: any, @Body() body: { orgId: string; domain: string }) {
        // TODO: Verify user is member of orgId
        const siteId = await this.sitesService.create(body.orgId, body.domain);
        return { id: siteId };
    }

    @Get()
    async findAll(@Req() req: any) {
        // TODO: Filter by user's orgs or pass orgId in query
        // For now assuming we pass orgId in query or header, or just returning empty if not provided is safer
        // But for MVP, let's allow finding by orgId param
        return [];
    }

    @Get(':orgId/list')
    async listByOrg(@Param('orgId') orgId: string) {
        return this.sitesService.findAll(orgId);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const site = await this.sitesService.findOne(id);
        if (!site) throw new NotFoundException('Site not found');
        return site;
    }

    @Post(':id/verify')
    async verify(@Param('id') id: string) {
        const verified = await this.sitesService.verify(id);
        return { verified };
    }
    @Post(':id/verify-widget')
    async verifyWidget(@Param('id') id: string) {
        const verified = await this.sitesService.verifyWidget(id);
        return { verified };
    }
}
