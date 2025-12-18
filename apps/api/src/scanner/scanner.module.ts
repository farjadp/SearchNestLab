// ============================================================================
// Hardware Source: apps/api/src/scanner/scanner.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Module for scanner feature
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { ScannerService } from './scanner.service';

@Module({
    providers: [ScannerService],
    exports: [ScannerService],
})
export class ScannerModule { }
