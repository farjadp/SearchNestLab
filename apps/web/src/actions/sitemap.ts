"use strict";
"use server";

import { adminDb } from "../lib/firebase-admin";
import { redis } from "../lib/redis";
import { Queue } from "bullmq";

const queue = new Queue('scanner', { connection: redis });

async function getDb() {
    if (!adminDb) {
        throw new Error("Firebase Admin not initialized. Check server logs.");
    }
    return adminDb;
}

export async function createSitemap(userId: string, url: string) {
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const db = await getDb();

    // Check quota
    const sitemapsSnapshot = await db.collection('sitemaps')
        .where('userId', '==', userId)
        .count()
        .get();

    if (sitemapsSnapshot.data().count >= 5) {
        throw new Error("Sitemap quota exceeded (max 5)");
    }

    // Create Sitemap Record
    const sitemapRef = adminDb.collection('sitemaps').doc();
    const sitemapId = sitemapRef.id;

    await sitemapRef.set({
        id: sitemapId,
        userId,
        url,
        status: 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
    });

    // Add job to queue
    await queue.add('generate-sitemap', {
        sitemapId,
        url,
        userId
    });

    return { success: true, sitemapId };
}

export async function getSitemaps(userId: string) {
    if (!userId) {
        return [];
    }

    const snapshot = await adminDb.collection('sitemaps')
        .where('userId', '==', userId)
        .orderBy('createdAt', 'desc')
        .get();

    return snapshot.docs.map((doc: any) => {
        const data = doc.data();
        return {
            ...data,
            createdAt: data.createdAt?.toDate?.().toISOString() || data.createdAt,
            updatedAt: data.updatedAt?.toDate?.().toISOString() || data.updatedAt
        };
    });
}

export async function deleteSitemap(userId: string, sitemapId: string) {
    if (!userId) {
        throw new Error("Unauthorized");
    }

    const sitemapRef = adminDb.collection('sitemaps').doc(sitemapId);
    const doc = await sitemapRef.get();

    if (!doc.exists) {
        throw new Error("Sitemap not found");
    }

    if (doc.data()?.userId !== userId) {
        throw new Error("Unauthorized");
    }

    await sitemapRef.delete();
    return { success: true };
}
