// ============================================================================
// Hardware Source: apps/web/app/sites/[id]/dashboard/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Main dashboard view
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { use } from "react";

import { Assistant } from "@/components/assistant";
import { useEffect, useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";

export default function DashboardPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const [site, setSite] = useState<any>(null);

    useEffect(() => {
        if (!user) return;
        const fetchSite = async () => {
            const token = await user.getIdToken();
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            try {
                const res = await fetch(`${apiUrl}/sites/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setSite(await res.json());
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchSite(); // Initial fetch
        const interval = setInterval(fetchSite, 3000); // Poll every 3s
        return () => clearInterval(interval);
    }, [id, user]);

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Dashboard</h2>
                <div className="text-sm text-zinc-400">
                    {site?.domain && <span className="bg-zinc-800 px-3 py-1 rounded-full">{site.domain}</span>}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Assistant Area */}
                <div className="lg:col-span-2">
                    {site?.domain ? (
                        <Assistant siteId={id} domain={site.domain} />
                    ) : (
                        <div className="h-[500px] bg-zinc-900/50 rounded-2xl flex items-center justify-center text-zinc-500">
                            Loading Assistant...
                        </div>
                    )}
                </div>

                {/* Quick Stats Sidebar */}
                <div className="space-y-6">
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                        <h3 className="text-zinc-400 text-sm font-medium mb-2">Index Health</h3>
                        <p className="text-3xl font-bold text-white">
                            {site?.status === 'verified' ? 'Active' : 'Pending'}
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                        <h3 className="text-zinc-400 text-sm font-medium mb-2">Next Step</h3>
                        <p className="text-lg text-emerald-400">
                            {site?.status === 'verified' ? 'Automated Scan' : 'Verify Site'}
                        </p>
                    </div>

                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
                        <h3 className="text-zinc-400 text-sm font-medium mb-2">Pages Crawled</h3>
                        <p className="text-3xl font-bold text-white">
                            {site?.totalPages || 0}
                        </p>
                        <p className="text-xs text-zinc-500 mt-1">
                            {site?.crawlStatus ? (
                                <span className="text-emerald-400 animate-pulse">{site.crawlStatus}</span>
                            ) : (
                                `Last scan: ${site?.lastScannedAt ? new Date(site.lastScannedAt).toLocaleDateString() : 'Never'}`
                            )}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
