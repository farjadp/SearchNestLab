// ============================================================================
// Hardware Source: apps/api/src/reports/reports.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Aggregate data for reports
// Env / Identity: N/A
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';
import { SitesService } from '../sites/sites.service';
import { KeywordsService } from '../keywords/keywords.service';
import { LeadsService } from '../leads/leads.service';

@Injectable()
export class ReportsService {
    constructor(
        private readonly firebase: FirebaseService,
        private readonly sitesService: SitesService,
        private readonly keywordsService: KeywordsService,
        private readonly leadsService: LeadsService
    ) { }

    async generate(siteId: string) {
        // parallel fetch for performance
        const [site, keywords, leads] = await Promise.all([
            this.sitesService.findOne(siteId),
            this.keywordsService.findAll(siteId),
            this.leadsService.findAll(siteId)
        ]);

        if (!site) throw new Error('Site not found');

        const totalKeywords = keywords.length;
        const top3Keywords = keywords.filter((k: any) => k.position && k.position <= 3).length;
        const totalLeads = leads.length;
        const leadsLast30Days = leads.filter((l: any) => {
            const date = l.createdAt?.toDate ? l.createdAt.toDate() : new Date(l.createdAt);
            const diff = Date.now() - date.getTime();
            return diff < 30 * 24 * 60 * 60 * 1000;
        }).length;

        // Fetch Real Scan Data from Worker output
        const db = this.firebase.getFirestore();
        const scanRaw = await db.collection('sites').doc(siteId).collection('scans').doc('latest').get();
        const latestScan = scanRaw.exists ? scanRaw.data() : null;

        return {
            siteId: site.id,
            domain: site.domain,
            generatedAt: new Date(),
            metrics: {
                totalKeywords,
                top3Keywords,
                totalLeads,
                leadsLast30Days,
                healthScore: latestScan && latestScan.status === 200 ? 98 : 60,
            },
            latestScan,
            topKeywords: keywords.slice(0, 5),
            recentLeads: leads.slice(0, 5)
        };
    }
}
