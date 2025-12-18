// ============================================================================
// Hardware Source: apps/api/src/reports/reports.controller.ts
// Version: 1.1.0 — 2025-12-17
// Why: API endpoints for reports
// Env / Identity: N/A
// ============================================================================

import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { FirebaseAuthGuard } from '../auth/firebase-auth.guard';

@Controller('sites/:siteId/reports')
@UseGuards(FirebaseAuthGuard)
export class ReportsController {
    constructor(private readonly reportsService: ReportsService) { }

    @Get('summary')
    async getSummary(@Param('siteId') siteId: string) {
        return this.reportsService.generate(siteId);
    }
}
