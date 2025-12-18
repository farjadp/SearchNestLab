// ============================================================================
// Hardware Source: apps/api/src/integrations/integrations.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage Google OAuth Integrations
// Env / Identity: N/A
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Integration } from '@searchnest/schema';

@Injectable()
export class IntegrationsService {
    constructor(private readonly firebase: FirebaseService) { }

    async createOrUpdate(data: Omit<Integration, 'id' | 'createdAt' | 'updatedAt'>) {
        const db = this.firebase.getFirestore();
        const collection = db.collection('integrations');

        // Check if integration already exists for this org/site/provider/email
        // Ideally we want 1 active token set per unique provider-email combo in an org
        const query = collection
            .where('orgId', '==', data.orgId)
            .where('provider', '==', data.provider)
            .where('email', '==', data.email);

        if (data.siteId) {
            // If site scoped, add that filter
            // Note: Firestore requires composite index for multiple equality filters sometimes
            // For MVP, we might just query by orgId and filter in code if volume is low, but let's try specificity
        }

        const snapshot = await query.get();

        const now = new Date();

        if (!snapshot.empty) {
            // Update existing
            const doc = snapshot.docs[0];
            await doc.ref.update({
                accessToken: data.accessToken,
                refreshToken: data.refreshToken, // Only update if provided
                expiresAt: data.expiresAt,
                scope: data.scope,
                updatedAt: now,
            });
            return doc.id;
        } else {
            // Create new
            const ref = collection.doc();
            await ref.set({
                ...data,
                createdAt: now,
                updatedAt: now,
            });
            return ref.id;
        }
    }

    async findAll(orgId: string) {
        const db = this.firebase.getFirestore();
        const snapshot = await db.collection('integrations').where('orgId', '==', orgId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
