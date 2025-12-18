// ============================================================================
// Hardware Source: packages/schema/src/index.ts
// Version: 1.1.0 — 2025-12-17
// Why: Export shared Zod schemas
// Env / Identity: N/A
// ============================================================================

import { z } from 'zod';

export const UserSchema = z.object({
    id: z.string(),
    email: z.string().email(),
    name: z.string().optional(),
    createdAt: z.date().optional(),
});

export const OrganizationSchema = z.object({
    id: z.string(),
    name: z.string().min(1),
    plan: z.enum(['starter', 'pro', 'plus']),
    createdAt: z.date(),
});

export const MemberSchema = z.object({
    userId: z.string(),
    role: z.enum(['owner', 'admin', 'member']),
    joinedAt: z.date(),
});

export const SiteSchema = z.object({
    id: z.string(),
    orgId: z.string(),
    domain: z.string().url(),
    status: z.enum(['pending', 'verified', 'scanned', 'error']),
    verifiedAt: z.date().optional(),
    lastScannedAt: z.date().optional(),
    createdAt: z.date(),
});

export const IntegrationSchema = z.object({
    id: z.string(),
    orgId: z.string(),
    siteId: z.string().optional(), // If scoped to a site
    provider: z.enum(['google']),
    accessToken: z.string(),
    refreshToken: z.string().optional(),
    expiresAt: z.date(),
    scope: z.string().optional(),
    email: z.string().email(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const KeywordSchema = z.object({
    id: z.string(),
    siteId: z.string(),
    term: z.string(),
    volume: z.number().nullable(),
    difficulty: z.number().nullable(), // KD 0-100
    position: z.number().nullable(), // Current rank
    url: z.string().nullable(), // Ranking URL
    cluster: z.string().nullable(), // Cluster name/ID
    intent: z.enum(['informational', 'navigational', 'commercial', 'transactional']).nullable(),
    updatedAt: z.date(),
});


export const LeadSchema = z.object({
    id: z.string(),
    siteId: z.string(),
    email: z.string().email(),
    sourceUrl: z.string().url().optional(),
    status: z.enum(['new', 'contacted', 'converted', 'archived']),
    createdAt: z.date(),
});

export const ConsentSchema = z.object({
    id: z.string(),
    siteId: z.string(),
    anonymousId: z.string(),
    action: z.enum(['accepted', 'rejected', 'partial']),
    categories: z.array(z.string()), // ['analytics', 'marketing']
    ipHash: z.string(), // Privacy-first: store hash only
    userAgent: z.string(),
    createdAt: z.date(),
});

export type User = z.infer<typeof UserSchema>;
export type Organization = z.infer<typeof OrganizationSchema>;
export type Member = z.infer<typeof MemberSchema>;
export type Site = z.infer<typeof SiteSchema>;
export type Integration = z.infer<typeof IntegrationSchema>;
export type Keyword = z.infer<typeof KeywordSchema>;
export type Lead = z.infer<typeof LeadSchema>;
export type Consent = z.infer<typeof ConsentSchema>;
