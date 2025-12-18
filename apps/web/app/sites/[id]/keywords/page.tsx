// ============================================================================
// Hardware Source: apps/web/app/sites/[id]/keywords/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Keywords data table
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { use, useState, useEffect } from "react";
import { Button } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";

export default function KeywordsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [keywords, setKeywords] = useState<any[]>([]);

    const fetchKeywords = async () => {
        if (!user) return;
        setLoading(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch(`http://localhost:3001/sites/${id}/keywords`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (res.ok) {
                const data = await res.json();
                setKeywords(data);
            }
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchKeywords();
    }, [user, id]);

    const handleImport = async (newKeywords: any[]) => {
        if (!user) return;
        setLoading(true);
        try {
            const token = await user.getIdToken();
            await fetch(`http://localhost:3001/sites/${id}/keywords/import`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ keywords: newKeywords })
            });

            fetchKeywords();
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-white">Keywords</h2>
            </div>

            <div className="flex gap-4">
                <div className="flex-1 bg-zinc-900/50 p-6 rounded-xl border border-zinc-800">
                    <h3 className="text-white font-medium mb-4">Add Target Keywords</h3>
                    <form onSubmit={(e) => {
                        e.preventDefault();
                        const terms = (document.getElementById('kw-input') as HTMLTextAreaElement).value.split('\n').filter(t => t.trim());
                        if (terms.length) handleImport(terms.map(t => ({ term: t.trim(), cluster: 'manual' })));
                        (e.target as HTMLFormElement).reset();
                    }} className="space-y-4">
                        <textarea
                            id="kw-input"
                            className="w-full h-32 bg-zinc-950 border border-zinc-700 rounded-lg p-3 text-sm text-white focus:outline-none focus:border-emerald-500 transition-colors"
                            placeholder="Enter keywords (one per line)...&#10;e.g. startup visa&#10;canada immigration"
                        />
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Analyzing..." : "Analyze Keywords"}
                        </Button>
                    </form>
                </div>
            </div>

            <div className="overflow-x-auto border border-zinc-800 rounded-xl bg-zinc-900/50">
                <table className="w-full text-left text-sm text-zinc-400">
                    <thead className="bg-zinc-950/50 text-xs uppercase font-medium text-zinc-500 border-b border-zinc-800">
                        <tr>
                            <th className="px-6 py-4">Keyword</th>
                            <th className="px-6 py-4 text-center">Found in Title?</th>
                            <th className="px-6 py-4 text-center">Found in Description?</th>
                            <th className="px-6 py-4 text-center">Found in H1?</th>
                            <th className="px-6 py-4">Status</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                        {keywords.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-8 text-center text-zinc-600">
                                    No keywords tracked yet. Add some above to check your content.
                                </td>
                            </tr>
                        ) : (
                            keywords.map((kw) => (
                                <tr key={kw.id || kw.term} className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-zinc-200">{kw.term}</td>

                                    <td className="px-6 py-4 text-center">
                                        {kw.analysis?.inTitle ?
                                            <span className="text-emerald-400">✅ Yes</span> :
                                            <span className="text-red-400/50">Missing</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {kw.analysis?.inDescription ?
                                            <span className="text-emerald-400">✅ Yes</span> :
                                            <span className="text-red-400/50">Missing</span>
                                        }
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {kw.analysis?.inH1 ?
                                            <span className="text-emerald-400">✅ Yes</span> :
                                            <span className="text-red-400/50">Missing</span>
                                        }
                                    </td>

                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-zinc-800 text-zinc-400">
                                            Tracked
                                        </span>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
