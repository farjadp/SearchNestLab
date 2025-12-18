// ============================================================================
// Hardware Source: apps/api/src/organizations/organizations.controller.ts
// Version: 1.1.0 — 2025-12-17
// Why: API endpoints for organizations
// Env / Identity: N/A
// ============================================================================

import { Controller, Post, Body, UseGuards, Req, Get, Param, NotFoundException } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('orgs')
@UseGuards(FirebaseAuthGuard)
export class OrganizationsController {
    constructor(private readonly orgsService: OrganizationsService) { }

    @Post()
    async create(@Req() req: any, @Body('name') name: string) {
        // User is attached to req by the guard
        const userId = req.user.uid;
        const orgId = await this.orgsService.create(userId, name);
        return { id: orgId };
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const org = await this.orgsService.findOne(id);
        if (!org) throw new NotFoundException('Organization not found');
        return org;
    }
}
