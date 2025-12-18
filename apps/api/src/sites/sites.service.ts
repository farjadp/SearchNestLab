// ============================================================================
// Hardware Source: apps/api/src/sites/sites.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage Sites in Firestore
// Env / Identity: N/A
// ============================================================================

import { Injectable, NotFoundException } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { Site } from '@searchnest/schema';
import { ScannerService } from '../scanner/scanner.service';

@Injectable()
export class SitesService {
    constructor(
        private readonly firebase: FirebaseService,
        private readonly scanner: ScannerService
    ) { }

    async create(orgId: string, domain: string): Promise<string> {
        const db = this.firebase.getFirestore();
        const siteRef = db.collection('sites').doc();
        const now = new Date();

        // Basic URL validation normalization
        let normalizedDomain = domain.toLowerCase();
        if (!normalizedDomain.startsWith('http')) {
            normalizedDomain = `https://${normalizedDomain}`;
        }

        await siteRef.set({
            orgId,
            domain: normalizedDomain,
            status: 'pending',
            createdAt: now,
        });

        return siteRef.id;
    }

    async findAll(orgId: string) {
        const db = this.firebase.getFirestore();
        const snapshot = await db.collection('sites').where('orgId', '==', orgId).get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async findOne(id: string): Promise<Site | null> {
        const doc = await this.firebase.getFirestore().collection('sites').doc(id).get();
        if (!doc.exists) return null;
        return { id: doc.id, ...doc.data() } as Site;
    }

    async verify(id: string): Promise<boolean> {
        const site = await this.findOne(id);
        if (!site) throw new NotFoundException('Site not found');

        // Real verification logic
        try {
            const res = await fetch(site.domain);
            const html = await res.text();

            // Look for meta tag with content=siteId
            // Pattern: <meta name="searchnest-verification" content="SITE_ID">
            const regex = new RegExp(`<meta\\s+name=["']searchnest-verification["']\\s+content=["']${id}["']`, 'i');

            if (regex.test(html)) {
                const db = this.firebase.getFirestore();
                await db.collection('sites').doc(id).update({
                    status: 'verified',
                    verifiedAt: new Date(),
                });

                // Trigger crawl after verification
                // Limit 10 for Free Tier (MVP default)
                await this.scanner.addCrawlJob(id, site.domain, 10);
                return true;
            } else {
                return false;
            }
        } catch (e) {
            console.error(`Verification failed for ${site.domain}:`, e);
            return false;
        }
    }
    async verifyWidget(id: string): Promise<boolean> {
        const site = await this.findOne(id);
        if (!site) throw new NotFoundException('Site not found');

        try {
            const res = await fetch(site.domain);
            const html = await res.text();

            // Check for widget script
            // <script src="https://searchnest.io/widget.js" ...>
            const regex = /<script\s+[^>]*src=["']https:\/\/searchnest\.io\/widget\.js["'][^>]*>/i;

            if (regex.test(html)) {
                const db = this.firebase.getFirestore();
                await db.collection('sites').doc(id).update({
                    widgetVerifiedAt: new Date()
                });
                return true;
            }
            return false;
        } catch (e) {
            console.error(`Widget verification failed for ${site.domain}:`, e);
            return false;
        }
    }
}
