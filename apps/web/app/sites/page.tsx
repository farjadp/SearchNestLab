"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Globe, Calendar, Activity, ExternalLink, Trash2, Loader2 } from 'lucide-react';
import { useAuth } from '@/src/contexts/AuthContext';
import { getSitemaps, deleteSitemap } from '@/src/actions/sitemap';
import { motion } from 'framer-motion';

interface Site {
    id: string;
    url: string;
    status: string;
    createdAt: string;
}

export default function SitesPage() {
    const { user } = useAuth();
    const [sites, setSites] = useState<Site[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchSites = async () => {
        if (!user?.uid) return;
        try {
            const data = await getSitemaps(user.uid);
            // @ts-ignore
            setSites(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSites();
    }, [user?.uid]);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-emerald-500" size={32} />
            </div>
        );
    }

    // Empty State
    if (sites.length === 0) {
        return (
            <div className="space-y-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-white mb-2">All Sites</h1>
                        <p className="text-zinc-400">Manage and monitor all your websites from one dashboard</p>
                    </div>
                    <Link href="/sites/add">
                        <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-emerald-500/20">
                            <Plus size={18} />
                            Add New Site
                        </button>
                    </Link>
                </div>

                <div className="border-2 border-dashed border-zinc-800 rounded-2xl p-16 text-center">
                    <div className="max-w-md mx-auto space-y-6">
                        <div className="w-20 h-20 mx-auto rounded-full bg-zinc-900 flex items-center justify-center border border-zinc-800">
                            <Globe className="text-zinc-600" size={40} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-white mb-2">No sites yet</h3>
                            <p className="text-zinc-500">
                                Start by adding your first website to track SEO performance, monitor rankings, and generate sitemaps.
                            </p>
                        </div>
                        <Link href="/sites/add">
                            <button className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all">
                                <Plus size={18} />
                                Add Your First Site
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">All Sites</h1>
                    <p className="text-zinc-400">You are tracking {sites.length} website{sites.length !== 1 ? 's' : ''}</p>
                </div>
                <Link href="/sites/add">
                    <button className="flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-medium transition-all shadow-lg hover:shadow-emerald-500/20">
                        <Plus size={18} />
                        Add New Site
                    </button>
                </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sites.map((site) => (
                    <motion.div
                        key={site.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-all group"
                    >
                        <div className="flex items-start justify-between mb-6">
                            <div className="w-12 h-12 rounded-xl bg-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 transition-colors">
                                <Globe size={24} />
                            </div>
                            <div className="px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                                Active
                            </div>
                        </div>

                        <h3 className="text-xl font-bold text-white mb-1 truncate">{new URL(site.url).hostname}</h3>
                        <a href={site.url} target="_blank" rel="noopener noreferrer" className="text-sm text-zinc-500 hover:text-emerald-400 flex items-center gap-1 mb-6 transition-colors">
                            {site.url} <ExternalLink size={12} />
                        </a>

                        <div className="grid grid-cols-2 gap-4 pt-6 border-t border-zinc-800/50">
                            <div>
                                <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Added</div>
                                <div className="text-sm text-white font-medium">
                                    {new Date(site.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div>
                                <div className="text-xs text-zinc-500 uppercase font-bold tracking-wider mb-1">Status</div>
                                <div className="text-sm text-white font-medium capitalize">
                                    {site.status}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
