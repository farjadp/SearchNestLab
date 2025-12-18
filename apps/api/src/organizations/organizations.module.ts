// ============================================================================
// Hardware Source: apps/api/src/organizations/organizations.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Module for organization feature
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { OrganizationsService } from './organizations.service';
import { OrganizationsController } from './organizations.controller';

@Module({
    controllers: [OrganizationsController],
    providers: [OrganizationsService],
    exports: [OrganizationsService],
})
export class OrganizationsModule { }
