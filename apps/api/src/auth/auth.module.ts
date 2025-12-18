// ============================================================================
// Hardware Source: apps/api/src/auth/auth.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Auth module
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Module({
    providers: [FirebaseAuthGuard],
    exports: [FirebaseAuthGuard],
})
export class AuthModule { }
