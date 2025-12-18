// ============================================================================
// Hardware Source: apps/web/app/onboarding/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Create first organization
// Env / Identity: API_URL
// ============================================================================

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";
import { auth } from "@/src/lib/firebase";

export default function OnboardingPage() {
    const [orgName, setOrgName] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const handleCreateOrg = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        try {
            const token = await user.getIdToken();
            // Using local API for now, assume proxy or absolute URL in dev
            const res = await fetch('http://localhost:3001/orgs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ name: orgName })
            });

            if (!res.ok) throw new Error('Failed to create organization');

            const data = await res.json();
            // Redirect to Add Site page with the new Org ID
            router.push(`/sites/new?orgId=${data.id}`);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 p-6">
            <div className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl">
                <h1 className="text-3xl font-bold text-white mb-2">Let's get started</h1>
                <p className="text-zinc-400 mb-8">Create your first organization to manage your sites.</p>

                <form onSubmit={handleCreateOrg} className="space-y-6">
                    <Input
                        label="Organization Name"
                        value={orgName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setOrgName(e.target.value)}
                        placeholder="Acme Corp"
                        required
                    />

                    <Button
                        type="submit"
                        disabled={loading}
                        className="w-full"
                        size="lg"
                    >
                        {loading ? "Creating..." : "Create Workspace"}
                    </Button>
                </form>
            </div>
        </div>
    );
}
