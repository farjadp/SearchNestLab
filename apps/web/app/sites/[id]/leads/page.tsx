
"use client";

import React, { use, useEffect, useState } from "react";
import { Button } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";
import { Users, Mail, Download } from "lucide-react";

export default function LeadsPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { user } = useAuth();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) return;
        const fetchLeads = async () => {
            try {
                const token = await user.getIdToken();
                const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
                const res = await fetch(`${apiUrl}/sites/${id}/leads`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                if (res.ok) {
                    setLeads(await res.json());
                }
            } catch (e) {
                console.error(e);
            } finally {
                setLoading(false);
            }
        };
        fetchLeads();
    }, [id, user]);

    if (loading) return <div className="text-zinc-500">Loading leads...</div>;

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold text-white">Leads <span className="text-zinc-500 text-lg font-normal ml-2">{leads.length}</span></h2>
                    <p className="text-zinc-400 text-sm">Potential customers captured from your site.</p>
                </div>
                <Button variant="outline" onClick={() => alert('CSV Export coming soon!')}>
                    <Download size={16} className="mr-2" />
                    Export CSV
                </Button>
            </div>

            {leads.length === 0 ? (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-12 text-center">
                    <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="text-zinc-500" size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">No leads yet</h3>
                    <p className="text-zinc-400 max-w-md mx-auto mb-6">
                        Add the lead capture widget to your site to start collecting emails from interested visitors.
                    </p>
                    <Button onClick={() => window.open(`/sites/${id}/dashboard`, '_self')}>
                        Go to Dashboard to Setup Widget
                    </Button>
                </div>
            ) : (
                <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl overflow-hidden">
                    <table className="w-full text-left text-sm text-zinc-400">
                        <thead className="bg-zinc-950/50 text-xs uppercase font-medium text-zinc-500 border-b border-zinc-800">
                            <tr>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Source Page</th>
                                <th className="px-6 py-4 text-right">Captured At</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors">
                                    <td className="px-6 py-4 font-medium text-white flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-400 border border-purple-500/20">
                                            <Mail size={14} />
                                        </div>
                                        {lead.email}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="bg-zinc-950 border border-zinc-800 px-2 py-1 rounded text-xs">
                                            {lead.sourceUrl || 'Home Page'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        {new Date(lead.createdAt._seconds * 1000 || lead.createdAt).toLocaleDateString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
}
