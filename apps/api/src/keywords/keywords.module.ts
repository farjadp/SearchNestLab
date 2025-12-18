// ============================================================================
// Hardware Source: apps/api/src/keywords/keywords.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Keywords feature module
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { KeywordsService } from './keywords.service';
import { KeywordsController } from './keywords.controller';

@Module({
    controllers: [KeywordsController],
    providers: [KeywordsService],
    exports: [KeywordsService],
})
export class KeywordsModule { }
