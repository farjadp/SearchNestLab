// ============================================================================
// Hardware Source: apps/web/app/sites/new/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Add new site form
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button, Input } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";
import { Suspense } from "react";

function AddSiteForm() {
    const [domain, setDomain] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const searchParams = useSearchParams();
    const orgId = searchParams.get('orgId');
    const { user } = useAuth();

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user || !orgId) return;
        setLoading(true);

        try {
            const token = await user.getIdToken();
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';

            const res = await fetch(`${apiUrl}/sites`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    orgId: orgId,
                    domain
                })
            });

            if (!res.ok) throw new Error('Failed to create site');
            const data = await res.json();
            router.push(`/sites/${data.id}/dashboard`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (!orgId) {
        return <div className="text-white">Error: No Organization ID provided.</div>;
    }

    return (
        <div className="w-full max-w-md bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl">
            <h1 className="text-2xl font-bold text-white mb-2">Add your website</h1>
            <p className="text-zinc-400 mb-6">Enter the domain you want to track.</p>

            <form onSubmit={handleCreate} className="space-y-6">
                <Input
                    label="Domain URL"
                    value={domain}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDomain(e.target.value)}
                    placeholder="example.com"
                    required
                />

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="lg"
                >
                    {loading ? "Adding Site..." : "Start SEO Journey 🚀"}
                </Button>
            </form>
        </div>
    );
}

export default function AddSitePage() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
            <Suspense fallback={<div className="text-zinc-500">Loading...</div>}>
                <AddSiteForm />
            </Suspense>
        </div>
    );
}
