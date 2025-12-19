"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { ArrowLeft, Globe, Loader2, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import { createSitemap } from '@/src/actions/sitemap';
import { useAuth } from '@/src/contexts/AuthContext';

export default function AddSitePage() {
    const [url, setUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const router = useRouter();
    const { user } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        if (!user?.uid) {
            setError("You must be logged in to add a site.");
            setLoading(false);
            return;
        }

        try {
            // Validate URL
            let formattedUrl = url.trim();
            if (!formattedUrl.startsWith('http')) {
                formattedUrl = `https://${formattedUrl}`;
            }
            new URL(formattedUrl); // Will throw if invalid

            const result = await createSitemap(user.uid, formattedUrl);

            if (result.success) {
                router.push('/sites');
                router.refresh();
            }
        } catch (err: any) {
            setError(err.message || "Failed to add site");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div className="flex items-center gap-4">
                <Link href="/sites" className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400 hover:text-white">
                    <ArrowLeft size={20} />
                </Link>
                <div>
                    <h1 className="text-3xl font-bold text-white mb-2">Add New Site</h1>
                    <p className="text-zinc-400">Enter your website URL to start tracking</p>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/50 border border-zinc-800 rounded-2xl p-8"
            >
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="url" className="block text-sm font-medium text-zinc-300 mb-2">
                            Website URL
                        </label>
                        <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500">
                                <Globe size={20} />
                            </div>
                            <input
                                id="url"
                                type="url"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                                placeholder="https://example.com"
                                className="w-full bg-black/40 border border-zinc-700 rounded-xl py-4 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500/50 transition-all"
                                required
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                            <AlertCircle size={20} className="flex-shrink-0" />
                            <p className="text-sm">{error}</p>
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-lg font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/20 flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 size={24} className="animate-spin" />
                                Adding Site...
                            </>
                        ) : (
                            "Add Site"
                        )}
                    </button>

                    <p className="text-center text-xs text-zinc-500">
                        By adding a site, you verify that you own or manage this domain.
                    </p>
                </form>
            </motion.div>
        </div>
    );
}
