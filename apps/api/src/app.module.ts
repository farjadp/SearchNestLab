// ============================================================================
// Hardware Source: apps/api/src/app.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Main application module
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { FirebaseModule } from './firebase/firebase.module';
import { OrganizationsModule } from './organizations/organizations.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SitesModule } from './sites/sites.module';
import { IntegrationsModule } from './integrations/integrations.module';
import { KeywordsModule } from './keywords/keywords.module';
import { LeadsModule } from './leads/leads.module';
import { ConsentModule } from './consent/consent.module';
import { ReportsModule } from './reports/reports.module';
import { BillingModule } from './billing/billing.module';

@Module({
    imports: [FirebaseModule, OrganizationsModule, UsersModule, AuthModule, SitesModule, IntegrationsModule, KeywordsModule, LeadsModule, ConsentModule, ReportsModule, BillingModule],
    controllers: [],
    providers: [],
})
export class AppModule { }
