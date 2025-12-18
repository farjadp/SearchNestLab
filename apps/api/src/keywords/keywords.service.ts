// ============================================================================
// Hardware Source: apps/api/src/keywords/keywords.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage Keywords in Firestore
// Env / Identity: N/A
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Keyword } from '@searchnest/schema';

@Injectable()
export class KeywordsService {
    constructor(private readonly firebase: FirebaseService) { }

    async createMany(siteId: string, keywords: Partial<Keyword>[]) {
        const db = this.firebase.getFirestore();

        // 1. Fetch Latest Scan to perform Real Analysis
        const scanDoc = await db.collection('sites').doc(siteId).collection('scans').doc('latest').get();
        const scanData = scanDoc.exists ? scanDoc.data() : null;

        const batch = db.batch();
        const now = new Date();

        keywords.forEach(kw => {
            const term = kw.term?.toLowerCase() || '';

            // Real-time Analysis logic
            const analysis = {
                inTitle: scanData?.title?.toLowerCase().includes(term) || false,
                inDescription: scanData?.description?.toLowerCase().includes(term) || false,
                inH1: scanData?.h1?.toLowerCase().includes(term) || false,
            };

            const ref = db.collection('sites').doc(siteId).collection('keywords').doc();
            batch.set(ref, {
                ...kw,
                id: ref.id,
                siteId,
                analysis, // Save the check result
                updatedAt: now
            });
        });

        await batch.commit();
        return { count: keywords.length, scanned: !!scanData };
    }

    async findAll(siteId: string) {
        const db = this.firebase.getFirestore();
        const snapshot = await db.collection('sites').doc(siteId).collection('keywords').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }
}
