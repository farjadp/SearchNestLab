// ============================================================================
// Hardware Source: apps/api/src/firebase/firebase.module.ts
// Version: 1.1.0 — 2025-12-17
// Why: Firebase integration module
// Env / Identity: N/A
// ============================================================================

import { Module, Global } from '@nestjs/common';
import { FirebaseService } from './firebase.service';

@Global()
@Module({
    providers: [FirebaseService],
    exports: [FirebaseService],
})
export class FirebaseModule { }
