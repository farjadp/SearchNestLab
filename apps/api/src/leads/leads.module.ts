// ============================================================================
// Hardware Source: apps/api/src/leads/leads.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Leads feature module
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';

@Module({
    controllers: [LeadsController],
    providers: [LeadsService],
    exports: [LeadsService],
})
export class LeadsModule { }
