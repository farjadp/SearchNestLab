// ============================================================================
// Hardware Source: apps/worker/src/index.ts
// Version: 1.1.1 — 2025-12-17
// Why: Worker entry point for background jobs (Fixed Syntax)
// Env / Identity: REDIS_URL
// ============================================================================

import { Worker } from 'bullmq';
import IORedis from 'ioredis';
import * as admin from 'firebase-admin';

const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
const connection = new IORedis(redisUrl, { maxRetriesPerRequest: null });

console.log('Worker started on', redisUrl);

const worker = new Worker('scanner', async (job) => {
    console.log('Processing job', job.id, job.name, job.data);

    if (job.name === 'crawl') {
        const { siteId, url, limit = 10 } = job.data; // Default limit 10 for free tier if not passed
        console.log(`Starting recursive crawl for ${url} (Limit: ${limit})`);

        // Initialize Firestore
        if (!admin.apps.length) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const sa = require('../service-account.json');
                admin.initializeApp({
                    credential: admin.credential.cert(sa)
                });
            } catch (e) {
                console.error("Worker failed to load service-account.json");
                return;
            }
        }
        const db = admin.firestore();

        const visited = new Set<string>();
        const queue: string[] = [url];
        const pages: any[] = [];
        const domain = new URL(url).hostname;

        const cheerio = require('cheerio');

        while (queue.length > 0 && visited.size < limit) {
            const currentUrl = queue.shift()!;

            // Normalize URL (strip trailing slash for consistency)
            const normalizedUrl = currentUrl.replace(/\/$/, "");

            if (visited.has(normalizedUrl)) continue;
            visited.add(normalizedUrl);

            try {
                console.log(`Crawling (${visited.size}/${limit}): ${currentUrl}`);
                const res = await fetch(currentUrl);
                const html = await res.text();
                const $ = cheerio.load(html);

                // Extract Metadata
                const title = $('title').text() || '';
                const description = $('meta[name="description"]').attr('content') || '';
                const h1 = $('h1').first().text() || '';

                // Save Page Result
                const pageData = {
                    url: currentUrl,
                    title,
                    description,
                    h1,
                    status: res.status,
                    scannedAt: new Date()
                };

                // Use a hash or encoded URL for doc ID to avoid invalid chars
                const docId = Buffer.from(currentUrl).toString('base64').replace(/\//g, '_');
                await db.collection('sites').doc(siteId).collection('pages').doc(docId).set(pageData);

                pages.push(pageData);

                // Extract Internal Links
                $('a').each((_: any, element: any) => {
                    const href = $(element).attr('href');
                    if (href) {
                        try {
                            const absoluteUrl = new URL(href, currentUrl).href;
                            // Only crawl internal links on same domain
                            if (new URL(absoluteUrl).hostname === domain && !visited.has(absoluteUrl.replace(/\/$/, ""))) {
                                queue.push(absoluteUrl);
                            }
                        } catch (e) {
                            // Invalid URL, ignore
                        }
                    }
                });

            } catch (error: any) {
                console.error(`Failed to crawl ${currentUrl}: ${error.message}`);
                // Log failed page
                const docId = Buffer.from(currentUrl).toString('base64').replace(/\//g, '_');
                await db.collection('sites').doc(siteId).collection('pages').doc(docId).set({
                    url: currentUrl,
                    status: 500,
                    error: error.message,
                    scannedAt: new Date()
                });
            }

            // Report Progress
            await db.collection('sites').doc(siteId).update({
                totalPages: visited.size,
                lastScannedAt: new Date(),
                crawlStatus: `crawling (${visited.size}/${limit})`
            });

            // Be nice to the server
            await new Promise(r => setTimeout(r, 500));
        }

        // Save Summary
        await db.collection('sites').doc(siteId).collection('scans').doc('latest').set({
            url,
            totalPages: visited.size,
            // Save Homepage stats as the "Main" stats for the dashboard summary
            title: pages[0]?.title || '',
            description: pages[0]?.description || '',
            h1: pages[0]?.h1 || '',
            status: 200,
            scannedAt: new Date()
        });

        // Update site status
        await db.collection('sites').doc(siteId).update({
            lastScannedAt: new Date(),
            totalPages: visited.size,
            status: 'active'
        });
    }
    else if (job.name === 'generate-sitemap') {
        const { sitemapId, url, userId } = job.data;
        console.log(`Generating sitemap for ${url} (Sitemap ID: ${sitemapId})`);

        // Initialize Firestore
        if (!admin.apps.length) {
            try {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const sa = require('../service-account.json');
                admin.initializeApp({
                    credential: admin.credential.cert(sa),
                    storageBucket: "searchnest-lab.firebasestorage.app" // Ensure this is correct or passed via env in future
                });
            } catch (e) {
                console.error("Worker failed to load service-account.json");
                return;
            }
        }
        const db = admin.firestore();
        const bucket = admin.storage().bucket();

        // Update status to processing
        await db.collection('sitemaps').doc(sitemapId).update({
            status: 'processing',
            updatedAt: new Date()
        });

        try {
            const visited = new Set<string>();
            const queue: string[] = [url];
            const urls: string[] = [];
            const domain = new URL(url).hostname;
            const limit = 500; // Hard limit for sitemap generation for now

            const cheerio = require('cheerio');

            while (queue.length > 0 && visited.size < limit) {
                const currentUrl = queue.shift()!;
                const normalizedUrl = currentUrl.replace(/\/$/, "");

                if (visited.has(normalizedUrl)) continue;
                visited.add(normalizedUrl);
                urls.push(normalizedUrl);

                try {
                    const res = await fetch(currentUrl);
                    if (res.status !== 200) continue;

                    const html = await res.text();
                    const $ = cheerio.load(html);

                    $('a').each((_: any, element: any) => {
                        const href = $(element).attr('href');
                        if (href) {
                            try {
                                const absoluteUrl = new URL(href, currentUrl).href;
                                if (new URL(absoluteUrl).hostname === domain && !visited.has(absoluteUrl.replace(/\/$/, ""))) {
                                    queue.push(absoluteUrl);
                                }
                            } catch (e) {
                                // Invalid URL
                            }
                        }
                    });
                } catch (e) {
                    console.error(`Failed to crawl ${currentUrl} for sitemap`);
                }
                // Be nice to the server
                await new Promise(r => setTimeout(r, 200));
            }

            // Generate XML
            let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n`;
            urls.forEach(u => {
                xml += `  <url>\n    <loc>${u}</loc>\n    <lastmod>${new Date().toISOString()}</lastmod>\n  </url>\n`;
            });
            xml += `</urlset>`;

            // Upload to Storage
            const file = bucket.file(`sitemaps/${userId}/${sitemapId}.xml`);
            await file.save(xml, {
                contentType: 'application/xml',
                public: true
            });

            // Get Public URL
            // Note: In a real prod env, we might want signed URLs or make the bucket public. 
            // For now assuming we can make it public or use the media link.
            // Using getSignedUrl or publicUrl depends on bucket config. 
            // Let's try to get a signed URL for long expiry or just construct the public URL if public access is enabled.
            // Assuming standard firebase storage public access for simplicty or Signed URL.
            // Let's use a long-lived signed URL for simplicity in this "Lab" context.
            const [signedUrl] = await file.getSignedUrl({
                action: 'read',
                expires: '03-01-2500'
            });

            await db.collection('sitemaps').doc(sitemapId).update({
                status: 'completed',
                fileUrl: signedUrl,
                pageCount: urls.length,
                updatedAt: new Date()
            });

        } catch (error: any) {
            console.error(`Sitemap generation failed: ${error.message}`);
            await db.collection('sitemaps').doc(sitemapId).update({
                status: 'failed',
                error: error.message,
                updatedAt: new Date()
            });
        }
    }
}, { connection });

worker.on('completed', job => {
    console.log(`${job.id} has completed!`);
});

worker.on('failed', (job, err) => {
    console.log(`${job?.id} has failed with ${err.message}`);
});
