// ============================================================================
// Hardware Source: apps/api/src/reports/reports.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Reports feature module
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { SitesModule } from '../sites/sites.module';
import { KeywordsModule } from '../keywords/keywords.module';
import { LeadsModule } from '../leads/leads.module';

@Module({
    imports: [SitesModule, KeywordsModule, LeadsModule],
    controllers: [ReportsController],
    providers: [ReportsService],
})
export class ReportsModule { }
