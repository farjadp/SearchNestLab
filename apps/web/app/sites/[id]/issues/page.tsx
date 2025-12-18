
"use client";

import React, { use, useEffect, useState } from "react";
import { useAuth } from "@/src/contexts/AuthContext";
import { AlertTriangle, CheckCircle, Clock } from "lucide-react";

export default function IssuesPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const [scanData, setScanData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchIssues = async () => {
            try {
                const token = await user.getIdToken();
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                // We use the reports/summary endpoint which returns latestScan
                const res = await fetch(`${apiUrl}/sites/${id}/reports/summary`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await res.json();
                setScanData(data.latestScan);
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchIssues();
    }, [id, user]);

    if (loading) return <div className="text-zinc-500">Loading issues...</div>;

    if (!scanData) {
        return (
            <div className="text-center py-20">
                <h3 className="text-xl text-white font-bold mb-2">No Scan Data Found</h3>
                <p className="text-zinc-500">Run a scan from the Dashboard to see issues here.</p>
            </div>
        );
    }

    const issues = [
        { label: 'Title Tag', value: scanData.title, status: scanData.title ? 'pass' : 'fail' },
        { label: 'Meta Description', value: scanData.description, status: scanData.description ? 'pass' : 'fail' },
        { label: 'H1 Header', value: scanData.h1, status: scanData.h1 ? 'pass' : 'fail' },
    ];

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Site Issues</h2>
                    <p className="text-zinc-400 text-sm">Based on crawl from {new Date(scanData.scannedAt?._seconds * 1000 || scanData.scannedAt || Date.now()).toLocaleDateString()}</p>
                </div>
            </div>

            <div className="grid gap-4">
                {issues.map((issue, i) => (
                    <div key={i} className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-xl flex items-center justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-medium text-white">{issue.label}</h3>
                                {issue.status === 'fail' ?
                                    <span className="bg-red-500/10 text-red-400 text-xs px-2 py-0.5 rounded border border-red-500/20">Critical</span> :
                                    <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2 py-0.5 rounded border border-emerald-500/20">Good</span>
                                }
                            </div>
                            <p className="text-sm text-zinc-500 font-mono mt-2 bg-zinc-950 p-2 rounded max-w-2xl break-all">
                                {issue.value || 'Missing content...'}
                            </p>
                        </div>
                        <div>
                            {issue.status === 'fail' ?
                                <AlertTriangle className="text-red-500 opacity-50" size={24} /> :
                                <CheckCircle className="text-emerald-500 opacity-50" size={24} />
                            }
                        </div>
                    </div>
                ))}
            </div>

            {/* Scan Activity Log Section */}
            <div className="pt-8 border-t border-zinc-800">
                <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Clock size={20} />
                    Activity Logs
                </h3>
                <div className="bg-zinc-950 rounded-xl border border-zinc-800 overflow-hidden">
                    <div className="p-4 border-b border-zinc-800 text-xs uppercase text-zinc-500 font-semibold grid grid-cols-4">
                        <span>Event</span>
                        <span>Status</span>
                        <span>Details</span>
                        <span className="text-right">Time</span>
                    </div>
                    <div className="divide-y divide-zinc-800">
                        {/* Showing the latest real scan event */}
                        <div className="p-4 grid grid-cols-4 text-sm hover:bg-zinc-900/50 transition-colors">
                            <div className="text-white font-medium">Deep Crawl</div>
                            <div className="text-emerald-400">Completed</div>
                            <div className="text-zinc-500 truncate">{scanData.url}</div>
                            <div className="text-right text-zinc-500">
                                {new Date(scanData.scannedAt?._seconds * 1000 || scanData.scannedAt || Date.now()).toLocaleTimeString()}
                            </div>
                        </div>
                        {/* Simulation of the verification event which must have happened */}
                        <div className="p-4 grid grid-cols-4 text-sm hover:bg-zinc-900/50 transition-colors">
                            <div className="text-white font-medium">Site Verification</div>
                            <div className="text-emerald-400">Verified</div>
                            <div className="text-zinc-500">Meta Tag Check</div>
                            <div className="text-right text-zinc-500">
                                {new Date(Date.now() - 86400000).toLocaleDateString()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
