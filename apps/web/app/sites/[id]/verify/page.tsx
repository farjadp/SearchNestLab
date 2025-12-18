// ============================================================================
// Hardware Source: apps/web/app/sites/[id]/verify/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Site verification steps
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { useState, use } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";

export default function VerifySitePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const { user } = useAuth();

    const handleVerify = async () => {
        if (!user) return;
        setLoading(true);

        try {
            const token = await user.getIdToken();
            // POST /sites/:id/verify
            const res = await fetch(`http://localhost:3001/sites/${id}/verify`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!res.ok) throw new Error('Verification failed');

            const data = await res.json();
            if (data.verified) {
                router.push(`/sites/${id}/dashboard`);
            } else {
                alert('Verification failed. Please check the meta tag.');
            }
        } catch (err) {
            console.error(err);
            alert('Verification error');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-zinc-950 p-6">
            <div className="w-full max-w-lg bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl">
                <h1 className="text-2xl font-bold text-white mb-2">Verify Ownership</h1>
                <p className="text-zinc-400 mb-6">
                    Add the following meta tag to the <code className="text-blue-400">&lt;head&gt;</code> of your site's home page.
                </p>

                <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 mb-6 font-mono text-sm text-zinc-300 break-all select-all cursor-text">
                    &lt;meta name="searchnest-verify" content="{id}" /&gt;
                </div>

                <div className="space-y-4">
                    <Button
                        onClick={handleVerify}
                        disabled={loading}
                        className="w-full"
                        size="lg"
                    >
                        {loading ? "Verifying..." : "I've added the tag, Verify"}
                    </Button>

                    <button
                        onClick={() => router.push(`/sites/${id}/dashboard`)}
                        className="w-full text-zinc-500 hover:text-zinc-400 text-sm"
                    >
                        Skip for now (Limited access)
                    </button>
                </div>
            </div>
        </div>
    );
}
