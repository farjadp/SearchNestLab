// ============================================================================
// Hardware Source: apps/api/src/billing/billing.service.ts
// Version: 1.1.0 — 2025-12-17
// Why: Manage Subscriptions
// Env / Identity: STRIPE_SECRET_KEY
// ============================================================================

import { Injectable } from '@nestjs/common';
import { FirebaseService } from '../firebase/firebase.service';

@Injectable()
export class BillingService {
    constructor(private readonly firebase: FirebaseService) { }
    async getSubscription(orgId: string) {
        const db = this.firebase.getFirestore();
        const doc = await db.collection('subscriptions').doc(orgId).get();

        if (doc.exists) {
            return doc.data();
        }

        // Default/Fallback subscription
        return {
            orgId,
            plan: 'starter',
            status: 'active',
            periodEnd: null,
            features: {
                keywords: 10,
                sites: 1,
                reports: false
            }
        };
    }

    async createCheckoutSession(orgId: string, priceId: string) {
        // Mock Stripe Checkout URL
        // In a real app, this would call stripe.checkout.sessions.create
        return {
            url: `https://checkout.stripe.com/test-session-mock?org=${orgId}&price=${priceId}`
        };
    }

    async handleWebhook(signature: string, payload: Buffer) {
        // Mock Webhook Verification
        console.log('Received Stripe Webhook:', signature);

        // Simulate event parsing
        const event = JSON.parse(payload.toString());
        console.log('Event Type:', event.type);

        if (event.type === 'checkout.session.completed') {
            const { orgId, plan } = event.data.object.metadata;
            const db = this.firebase.getFirestore();

            // Create subscription record
            await db.collection('subscriptions').doc(orgId).set({
                orgId,
                plan, // e.g., 'growth'
                status: 'active',
                periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
                updatedAt: new Date()
            });
            console.log(`Subscription activated for Org ${orgId}`);
        }

        return { received: true };
    }
}
