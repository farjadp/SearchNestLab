// ============================================================================
// Hardware Source: apps/api/src/organizations/organizations.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage organizations in Firestore
// Env / Identity: N/A
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Organization } from '@searchnest/schema';

@Injectable()
export class OrganizationsService {
    constructor(private readonly firebase: FirebaseService) { }

    async create(userId: string, name: string): Promise<string> {
        const db = this.firebase.getFirestore();
        const orgRef = db.collection('organizations').doc();
        const now = new Date();

        await db.runTransaction(async (t) => {
            t.set(orgRef, {
                name,
                plan: 'starter',
                createdAt: now,
            });

            // Add user as owner
            const memberRef = orgRef.collection('members').doc(userId);
            t.set(memberRef, {
                userId,
                role: 'owner',
                joinedAt: now,
            });
        });

        return orgRef.id;
    }

    async findOne(id: string) {
        const doc = await this.firebase.getFirestore().collection('organizations').doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() };
    }
}
