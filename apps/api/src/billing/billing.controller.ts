// ============================================================================
// Hardware Source: apps/api/src/billing/billing.controller.ts
// Version: 1.1.0 — 2025-12-17
// Why: API endpoints for billing
// Env / Identity: N/A
// ============================================================================

import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { BillingService } from './billing.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('orgs/:orgId/billing')
@UseGuards(FirebaseAuthGuard)
export class BillingController {
    constructor(private readonly billingService: BillingService) { }

    @Get()
    async getSubscription(@Param('orgId') orgId: string) {
        return this.billingService.getSubscription(orgId);
    }

    @Post('checkout')
    async createCheckout(@Param('orgId') orgId: string, @Body() body: { priceId: string }) {
        return this.billingService.createCheckoutSession(orgId, body.priceId);
    }

    @Post('webhook')
    async handleWebhook(@Body() body: any) {
        // In reality, this needs raw body for signature verification
        // For MVP mock, we just pass the body as payload
        return this.billingService.handleWebhook('mock-signature', Buffer.from(JSON.stringify(body)));
    }
}
