// ============================================================================
// Hardware Source: apps/api/src/users/users.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Module for users feature
// Env / Identity: N/A
// ============================================================================

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';

@Module({
    providers: [UsersService],
    exports: [UsersService],
})
export class UsersModule { }
