// ============================================================================
// Hardware Source: apps/web/app/sites/[id]/optimize/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Widget configuration
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { use, useState } from "react";
import { Button } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";

export default function OptimizePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [copied, setCopied] = useState(false);

    const scriptTag = `<script src="https://searchnest.io/widget.js" data-site-id="${id}" defer></script>`;

    const [verifying, setVerifying] = useState(false);
    const [verified, setVerified] = useState(false);
    const { user } = useAuth();

    React.useEffect(() => {
        if (!user) return;
        const checkStatus = async () => {
            try {
                const token = await user.getIdToken();
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sites/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    const site = await res.json();
                    if (site.widgetVerifiedAt) {
                        setVerified(true);
                    }
                }
            } catch (e) {
                console.error(e);
            }
        };
        checkStatus();
    }, [id, user]);


    const handleCopy = () => {
        navigator.clipboard.writeText(scriptTag);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleVerify = async () => {
        if (!user) return;
        setVerifying(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sites/${id}/verify-widget`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();
            if (data.verified) {
                setVerified(true);
            } else {
                alert('Widget script not found. Please ensure it is in the <head>.');
            }
        } catch (e) {
            console.error(e);
            alert('Verification failed');
        } finally {
            setVerifying(false);
        }
    };

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold text-white mb-2">Consent & Lead Widget</h2>
                <p className="text-zinc-400">
                    One script to handle cookie consent (PIPEDA compliant) and capture high-intent leads.
                </p>
            </div>

            <div className="p-8 bg-zinc-900/50 border border-zinc-800 rounded-xl space-y-6">
                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Installation</h3>
                    <p className="text-sm text-zinc-400">
                        Copy and paste this snippet into the <code className="text-blue-400">&lt;head&gt;</code> of your website.
                    </p>

                    <div className="relative group">
                        <div className="bg-zinc-950 p-4 rounded-lg border border-zinc-800 font-mono text-sm text-zinc-300 break-all">
                            {scriptTag}
                        </div>
                        <div className="absolute right-2 top-2">
                            <Button size="sm" onClick={handleCopy}>
                                {copied ? "Copied!" : "Copy"}
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-zinc-800 w-full" />

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">Preview & Verification</h3>
                    <div className="p-6 border border-dashed border-zinc-700 rounded-lg flex flex-col items-center justify-center bg-zinc-950/30 h-48 space-y-4">
                        {verified ? (
                            <div className="text-center">
                                <span className="text-emerald-400 text-3xl">✓</span>
                                <p className="text-emerald-400 font-bold mt-2">Widget Active</p>
                                <p className="text-zinc-500 text-sm">Data is being collected.</p>
                            </div>
                        ) : (
                            <>
                                <p className="text-zinc-500 italic">Widget not detected yet</p>
                                <Button onClick={handleVerify} disabled={verifying} variant="outline" size="sm">
                                    {verifying ? "Scanning..." : "Verify Installation"}
                                </Button>
                            </>
                        )}
                    </div>
                </div>

                <div className="h-px bg-zinc-800 w-full" />

                <div className="space-y-4">
                    <h3 className="text-lg font-medium text-white">How it works</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800">
                            <h4 className="font-bold text-white mb-1">1. Visitors Arrive</h4>
                            <p className="text-xs text-zinc-400">The script loads a non-intrusive cookie banner.</p>
                        </div>
                        <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800">
                            <h4 className="font-bold text-white mb-1">2. Consent Logged</h4>
                            <p className="text-xs text-zinc-400">Choices are saved securely to the <span className="text-blue-400">Reports</span> tab.</p>
                        </div>
                        <div className="p-4 bg-zinc-900/30 rounded-lg border border-zinc-800">
                            <h4 className="font-bold text-white mb-1">3. Leads Captured</h4>
                            <p className="text-xs text-zinc-400">Form submissions appear instantly in the <span className="text-emerald-400">Leads</span> tab.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
