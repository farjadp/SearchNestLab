// ============================================================================
// Hardware Source: apps/api/src/billing/billing.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Billing feature module
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';

@Module({
    controllers: [BillingController],
    providers: [BillingService],
})
export class BillingModule { }
