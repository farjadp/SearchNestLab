// ============================================================================
// Hardware Source: apps/api/src/integrations/integrations.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Module for integrations feature
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { IntegrationsService } from './integrations.service';
import { IntegrationsController } from './integrations.controller';

@Module({
    controllers: [IntegrationsController],
    providers: [IntegrationsService],
    exports: [IntegrationsService],
})
export class IntegrationsModule { }
