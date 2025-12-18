// ============================================================================
// Hardware Source: apps/api/src/consent/consent.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage Consent Logs
// Env / Identity: N/A
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Consent } from '@searchnest/schema';

@Injectable()
export class ConsentService {
    constructor(private readonly firebase: FirebaseService) { }

    async logConsent(siteId: string, data: Omit<Consent, 'id' | 'createdAt' | 'siteId'>) {
        const db = this.firebase.getFirestore();
        const ref = db.collection('sites').doc(siteId).collection('consents').doc();

        await ref.set({
            ...data,
            id: ref.id,
            siteId,
            createdAt: new Date(),
        });

        return ref.id;
    }
}
