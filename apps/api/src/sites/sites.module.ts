// ============================================================================
// Hardware Source: apps/api/src/sites/sites.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Module for sites feature
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { SitesService } from './sites.service';
import { SitesController } from './sites.controller';
import { ScannerModule } from '../scanner/scanner.module';

@Module({
    imports: [ScannerModule],
    controllers: [SitesController],
    providers: [SitesService],
    exports: [SitesService],
})
export class SitesModule { }
