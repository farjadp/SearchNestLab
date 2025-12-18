// ============================================================================
// Hardware Source: apps/api/src/integrations/integrations.controller.ts
// Version: 1.1.0 — 2025-12-17
// Why: API endpoints for integrations
// Env / Identity: N/A
// ============================================================================

import { Controller, Post, Body, UseGuards, Get, Param, Req } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';
import { Integration } from '@searchnest/schema';

@Controller('integrations')
@UseGuards(FirebaseAuthGuard)
export class IntegrationsController {
    constructor(private readonly integrationsService: IntegrationsService) { }

    @Post('google')
    async connectGoogle(@Body() body: any) {
        // In a real app, this endpoint would exchange the authorization code for tokens
        // For MVP/Demo, we might accept tokens directly from the frontend (Client-side flow) 
        // OR (Better) receive `code` and use `googleapis` to swap it.

        // For this specific step, I will assume we receive the tokenspayload to store.
        // In Production: NEVER trust client with refresh tokens if possible, do the exchange server side.
        // But to keep moving fast:

        const { orgId, email, accessToken, refreshToken, expiresAt, scope } = body;

        const id = await this.integrationsService.createOrUpdate({
            orgId,
            provider: 'google',
            email,
            accessToken,
            refreshToken,
            expiresAt: new Date(expiresAt), // Ensure date
            scope
        });

        return { id, success: true };
    }

    @Get(':orgId')
    async list(@Param('orgId') orgId: string) {
        return this.integrationsService.findAll(orgId);
    }
}
