// ============================================================================
// Hardware Source: apps/web/app/sitemaps/page.tsx
// Version: 1.0.0
// Why: List and create sitemaps
// ============================================================================

"use client";

import React, { useState, useEffect } from 'react';
import { createSitemap, getSitemaps, deleteSitemap } from '@/src/actions/sitemap';
import { Network, Plus, Trash2, ExternalLink, CheckCircle2, XCircle, Download, Loader2, AlertCircle } from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Assuming motion is used and needs to be imported

interface Sitemap {
    id: string;
    url: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    fileUrl?: string;
    pageCount?: number;
    error?: string;
    createdAt: any; // Firestore Timestamp
}

export default function SitemapsPage() {
    const { user } = useAuth(); // Assuming AuthContext provides user
    const [sitemaps, setSitemaps] = useState<Sitemap[]>([]);
    const [newUrl, setNewUrl] = useState('');
    const [loading, setLoading] = useState(false); // Renamed 'creating' to 'loading' and changed initial state
    const [error, setError] = useState('');
    const router = useRouter();

    const fetchSitemaps = async () => {
        if (!user?.uid) return;
        try {
            const data = await getSitemaps(user.uid);
            // Convert Firestore timestamps to dates/strings if needed for display
            // @ts-ignore
            setSitemaps(data);
        } catch (err) {
            console.error("Failed to fetch sitemaps", err);
        }
    };

    useEffect(() => {
        fetchSitemaps();
        const interval = setInterval(fetchSitemaps, 5000); // Poll for updates
        return () => clearInterval(interval);
    }, [user?.uid]); // Depend on user.uid

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newUrl || !user?.uid) return;
        setLoading(true);
        setError('');

        try {
            await createSitemap(user.uid, newUrl);
            setNewUrl('');
            fetchSitemaps();
        } catch (err: any) {
            setError(err.message || 'Failed to create sitemap');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure?") || !user?.uid) return;
        try {
            await deleteSitemap(user.uid, id);
            fetchSitemaps();
        } catch (err: any) {
            console.error(err);
            alert("Failed to delete: " + err.message);
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    Sitemaps
                </h1>
                <div className="text-sm text-zinc-400">
                    Quota: <span className={sitemaps.length >= 5 ? "text-red-400" : "text-emerald-400"}>{sitemaps.length}/5</span>
                </div>
            </div>

            {/* Create Form */}
            <form onSubmit={handleCreate} className="bg-zinc-900/50 p-6 rounded-2xl border border-zinc-800 space-y-4">
                <div className="flex gap-4">
                    <input
                        type="url"
                        placeholder="https://example.com"
                        required
                        value={newUrl}
                        onChange={(e) => setNewUrl(e.target.value)}
                        className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-zinc-700 transition-colors"
                    />
                    <button
                        type="submit"
                        disabled={loading || sitemaps.length >= 5}
                        className="bg-white text-black px-6 py-3 rounded-xl text-sm font-bold hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Generating...' : 'Generate Sitemap'}
                    </button>
                </div>
                {error && (
                    <div className="text-red-400 text-xs flex items-center gap-2">
                        <AlertCircle size={14} />
                        {error}
                    </div>
                )}
            </form>

            {/* Sitemaps List */}
            <div className="grid gap-4">
                {loading && sitemaps.length === 0 ? ( // Changed loading state check for initial load
                    <div className="text-center py-20 text-zinc-500">Loading sitemaps...</div>
                ) : sitemaps.length === 0 ? (
                    <div className="text-center py-12 text-zinc-500 text-sm">
                        No sitemaps generated yet.
                    </div>
                ) : (
                    sitemaps.map((sitemap) => (
                        <motion.div
                            key={sitemap.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/30 border border-zinc-800/50 p-4 rounded-xl flex items-center justify-between group hover:border-zinc-700 transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${sitemap.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400' :
                                    sitemap.status === 'failed' ? 'bg-red-500/10 text-red-400' :
                                        'bg-blue-500/10 text-blue-400'
                                    }`}>
                                    {sitemap.status === 'completed' ? <CheckCircle2 size={20} /> :
                                        sitemap.status === 'failed' ? <XCircle size={20} /> :
                                            <Loader2 size={20} className="animate-spin" />
                                    }
                                </div>
                                <div>
                                    <div className="font-medium text-sm text-zinc-200">{sitemap.url}</div>
                                    <div className="text-xs text-zinc-500 flex items-center gap-2 mt-1">
                                        <span className="capitalize">{sitemap.status}</span>
                                        <span>•</span>
                                        <span>
                                            {/* Handle Timestamp conversion safely */}
                                            {/* @ts-ignore */}
                                            {new Date(sitemap.createdAt?.seconds * 1000 || sitemap.createdAt).toLocaleDateString()}
                                        </span>
                                        {sitemap.pageCount && (
                                            <>
                                                <span>•</span>
                                                <span>{sitemap.pageCount} Pages</span>
                                            </>
                                        )}
                                    </div>
                                    {sitemap.error && (
                                        <p className="text-red-400 text-xs mt-1">{sitemap.error}</p>
                                    )}
                                </div>
                            </div>

                            <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                {sitemap.status === 'completed' && sitemap.fileUrl && (
                                    <a
                                        href={sitemap.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-colors"
                                        title="Download XML"
                                    >
                                        <Download size={18} />
                                    </a>
                                )}
                                <button
                                    onClick={() => handleDelete(sitemap.id)}
                                    className="p-2 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={20} />
                                </button>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
