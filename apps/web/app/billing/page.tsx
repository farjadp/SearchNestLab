// ============================================================================
// Hardware Source: apps/web/app/billing/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Manage subscriptions
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { useState } from "react";
import { Button } from "@searchnest/ui";
import { useAuth } from "@/src/contexts/AuthContext";

export default function BillingPage() {
    const [loading, setLoading] = useState(false);
    const { user } = useAuth();
    // In a real app, we'd fetch the user's org. For this MVP, we might mock it or assume context.
    // Let's assume we can get it or just pass a placeholder if not in a site context.
    // Since this page is /billing, it might be global.
    const orgId = "ORG_123"; // TODO: Fetch from actual user context

    const handleSubscribe = async (priceId: string) => {
        if (!user) return;
        setLoading(true);
        try {
            const token = await user.getIdToken();
            const res = await fetch(`http://localhost:3001/orgs/${orgId}/billing/checkout`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ priceId })
            });
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (e) {
            console.error(e);
            alert('Failed to start checkout');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 p-6 flex flex-col items-center">
            <div className="w-full max-w-4xl space-y-10">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold text-white">Prans & Pricing</h1>
                    <p className="text-zinc-400">Simple, transparent pricing for growing agencies.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white">Starter</h3>
                            <p className="text-zinc-400 text-sm">For solo consultants</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$29</span>
                            <span className="text-zinc-500">/mo</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> 3 Sites
                            </li>
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> 500 Keywords
                            </li>
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> Basic Reports
                            </li>
                        </ul>
                        <Button onClick={() => handleSubscribe('price_starter')} disabled={loading} className="w-full transition-transform hover:scale-105">
                            Choose Starter
                        </Button>
                    </div>

                    <div className="p-6 bg-zinc-900/50 border border-blue-500/20 rounded-2xl flex flex-col relative overflow-hidden transform hover:scale-105 transition-all duration-300 shadow-xl shadow-blue-900/10">
                        <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs px-3 py-1 rounded-bl-lg font-medium">POPULAR</div>
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white">Growth</h3>
                            <p className="text-zinc-400 text-sm">For small agencies</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$79</span>
                            <span className="text-zinc-500">/mo</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> 15 Sites
                            </li>
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> 2,500 Keywords
                            </li>
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> White-label Reports
                            </li>
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> Lead Widget
                            </li>
                        </ul>
                        <Button onClick={() => handleSubscribe('price_growth')} disabled={loading} variant="primary" className="w-full bg-blue-600 hover:bg-blue-500">
                            Choose Growth
                        </Button>
                    </div>

                    <div className="p-6 bg-zinc-900/50 border border-zinc-800 rounded-2xl flex flex-col">
                        <div className="mb-4">
                            <h3 className="text-xl font-bold text-white">Agency</h3>
                            <p className="text-zinc-400 text-sm">For scaling operations</p>
                        </div>
                        <div className="mb-6">
                            <span className="text-4xl font-bold text-white">$199</span>
                            <span className="text-zinc-500">/mo</span>
                        </div>
                        <ul className="space-y-3 mb-8 flex-1">
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> Unlimited Sites
                            </li>
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> 10,000 Keywords
                            </li>
                            <li className="flex items-center text-sm text-zinc-300">
                                <span className="text-emerald-400 mr-2">✓</span> API Access
                            </li>
                        </ul>
                        <Button onClick={() => handleSubscribe('price_agency')} disabled={loading} variant="outline" className="w-full transition-transform hover:scale-105">
                            Contact Sales
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
