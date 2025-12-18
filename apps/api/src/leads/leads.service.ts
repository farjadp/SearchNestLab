// ============================================================================
// Hardware Source: apps/api/src/leads/leads.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage Leads in Firestore
// Env / Identity: N/A
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Lead } from '@searchnest/schema';

@Injectable()
export class LeadsService {
    constructor(private readonly firebase: FirebaseService) { }

    async create(siteId: string, data: Partial<Lead>) {
        const db = this.firebase.getFirestore();
        const ref = db.collection('sites').doc(siteId).collection('leads').doc();
        const now = new Date();

        await ref.set({
            ...data,
            id: ref.id,
            siteId,
            status: 'new',
            createdAt: now,
        });

        return ref.id;
    }

    async findAll(siteId: string) {
        const db = this.firebase.getFirestore();
        const snapshot = await db.collection('sites').doc(siteId).collection('leads').orderBy('createdAt', 'desc').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
