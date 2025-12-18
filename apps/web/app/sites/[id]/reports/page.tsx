// ============================================================================
// Hardware Source: apps/web/app/sites/[id]/reports/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: View generated reports
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { use, useState, useEffect } from "react";
import { Button } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";

export default function ReportsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function load() {
            if (!user) return;
            try {
                const token = await user.getIdToken();
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const res = await fetch(`${apiUrl}/sites/${id}/reports/summary`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setData(await res.json());
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        }
        load();
    }, [user, id]);

    if (loading) return <div className="p-10 text-center text-zinc-500">Generating Report...</div>;
    if (!data) return <div className="p-10 text-center text-red-400">Failed to load report.</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Monthly SEO Report</h2>
                    <p className="text-zinc-400 text-sm">Generated on {new Date(data.generatedAt).toLocaleDateString()}</p>
                </div>
                <Button onClick={() => window.print()} variant="outline">
                    Export PDF
                </Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Health Score</h3>
                    <p className="text-3xl font-bold text-emerald-400">{data.metrics.healthScore}%</p>
                </div>
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Keywords</h3>
                    <p className="text-3xl font-bold text-white">{data.metrics.totalKeywords}</p>
                </div>
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Top 3 Rank</h3>
                    <p className="text-3xl font-bold text-blue-400">{data.metrics.top3Keywords}</p>
                </div>
                <div className="bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h3 className="text-sm text-zinc-500 uppercase tracking-wider mb-1">Leads (30d)</h3>
                    <p className="text-3xl font-bold text-purple-400">{data.metrics.leadsLast30Days}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 bg-zinc-950/30">
                        <h3 className="font-semibold text-white">Top Performing Keywords</h3>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-3">
                            {data.topKeywords.map((kw: any) => (
                                <li key={kw.id || kw.term} className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-300">{kw.term}</span>
                                    <span className="font-bold text-white">#{kw.position}</span>
                                </li>
                            ))}
                            {data.topKeywords.length === 0 && <p className="text-zinc-500 text-sm">No keywords data.</p>}
                        </ul>
                    </div>
                </div>

                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 bg-zinc-950/30">
                        <h3 className="font-semibold text-white">Recent Leads</h3>
                    </div>
                    <div className="p-4">
                        <ul className="space-y-3">
                            {data.recentLeads.map((lead: any) => (
                                <li key={lead.id} className="flex justify-between items-center text-sm">
                                    <span className="text-zinc-300">{lead.email}</span>
                                    <span className="text-zinc-500 text-xs">{new Date(lead.createdAt).toLocaleDateString()}</span>
                                </li>
                            ))}
                            {data.recentLeads.length === 0 && <p className="text-zinc-500 text-sm">No leads captured yet.</p>}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
