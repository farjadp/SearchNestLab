// ============================================================================
// Hardware Source: apps/api/src/consent/consent.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Consent module
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { ConsentService } from './consent.service';

@Module({
    providers: [ConsentService],
    exports: [ConsentService],
})
export class ConsentModule { }
