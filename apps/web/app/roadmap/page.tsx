"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Rocket, Check, Clock, Sparkles } from "lucide-react";

const ROADMAP = {
    past: {
        title: "Where We Started",
        subtitle: "Q3 2024",
        items: [
            "Core crawler engine with distributed architecture",
            "Basic SEO audit functionality",
            "Keyword tracking foundation",
            "Firebase authentication & database setup"
        ]
    },
    present: {
        title: "Currently Active",
        subtitle: "Q4 2024 - Q1 2025",
        items: [
            "✅ Real-time sitemap generator with BullMQ queue processing",
            "✅ Multi-site dashboard with analytics",
            "✅ Issue detection & broken link finder",
            "✅ Keyword rank tracking across multiple search engines",
            "✅ Competitor analysis & SERP monitoring",
            "✅ Team collaboration & role-based access",
            "✅ White-label reporting for agencies",
            "✅ API access for custom integrations"
        ]
    },
    future: [
        {
            quarter: "Q2 2025",
            title: "AI-Powered Insights",
            items: [
                "GPT-4 content optimization suggestions",
                "Automated meta description generation",
                "Predictive ranking forecasts",
                "Semantic keyword clustering"
            ]
        },
        {
            quarter: "Q3 2025",
            title: "Enterprise Features",
            items: [
                "Advanced team workflows & approval systems",
                "Custom roles & granular permissions",
                "Dedicated infrastructure for large clients",
                "SLA guarantees & priority support"
            ]
        },
        {
            quarter: "Q4 2025",
            title: "Platform Expansion",
            items: [
                "WordPress & Shopify plugins",
                "Chrome extension for on-page analysis",
                "Mobile app (iOS & Android)",
                "Integrations with Google Analytics 4, Search Console, Ahrefs"
            ]
        }
    ]
};

export default function RoadmapPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Background */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[30%] w-[50%] h-[50%] bg-lime-500/05 blur-[200px] rounded-full" />
                <div className="absolute bottom-[20%] right-[30%] w-[40%] h-[40%] bg-blue-500/05 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <nav className="fixed top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Home
                </Link>
            </nav>

            <main className="relative z-10 pt-32 px-6 max-w-5xl mx-auto pb-20">

                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-lime-400/20 bg-lime-400/5 text-lime-400 text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        <Rocket size={12} /> Product Roadmap
                    </motion.div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">JOURNEY</span><br />CONTINUES.
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        From a simple crawler to the most advanced SEO platform. Here's where we've been, where we are, and where we're going.
                    </p>
                </div>

                {/* Timeline */}
                <div className="relative">
                    {/* Vertical Line */}
                    <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-lime-400 via-blue-400 to-purple-400 opacity-20" />

                    {/* Past */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-20 mb-16"
                    >
                        <div className="absolute left-0 w-16 h-16 rounded-full bg-zinc-900 border-2 border-lime-400 flex items-center justify-center">
                            <Clock className="text-lime-400" size={24} />
                        </div>
                        <div className="bg-[#050505] border border-white/10 rounded-2xl p-8">
                            <div className="text-xs uppercase tracking-widest text-lime-400 font-bold mb-2">{ROADMAP.past.subtitle}</div>
                            <h2 className="text-3xl font-black mb-6">{ROADMAP.past.title}</h2>
                            <ul className="space-y-3">
                                {ROADMAP.past.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-zinc-400">
                                        <div className="w-1.5 h-1.5 rounded-full bg-zinc-600 mt-2" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Present */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="relative pl-20 mb-16"
                    >
                        <div className="absolute left-0 w-16 h-16 rounded-full bg-lime-400 flex items-center justify-center animate-pulse">
                            <Sparkles className="text-black" size={24} />
                        </div>
                        <div className="bg-gradient-to-br from-lime-400/10 to-transparent border border-lime-400/30 rounded-2xl p-8">
                            <div className="text-xs uppercase tracking-widest text-lime-400 font-bold mb-2">{ROADMAP.present.subtitle}</div>
                            <h2 className="text-3xl font-black mb-2">{ROADMAP.present.title}</h2>
                            <p className="text-sm text-zinc-500 mb-6">Live in production, serving customers globally.</p>
                            <ul className="space-y-3">
                                {ROADMAP.present.items.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-white">
                                        <Check className="text-lime-400 flex-shrink-0 mt-0.5" size={16} />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Future */}
                    {ROADMAP.future.map((phase, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            className="relative pl-20 mb-16"
                        >
                            <div className="absolute left-0 w-16 h-16 rounded-full bg-zinc-900 border-2 border-blue-400 flex items-center justify-center">
                                <Rocket className="text-blue-400" size={24} />
                            </div>
                            <div className="bg-[#050505] border border-white/5 rounded-2xl p-8">
                                <div className="text-xs uppercase tracking-widest text-blue-400 font-bold mb-2">{phase.quarter}</div>
                                <h2 className="text-2xl font-black mb-6">{phase.title}</h2>
                                <ul className="space-y-3">
                                    {phase.items.map((item, j) => (
                                        <li key={j} className="flex items-start gap-3 text-zinc-500">
                                            <div className="w-1.5 h-1.5 rounded-full bg-blue-400/50 mt-2 flex-shrink-0" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center border-t border-white/5 pt-20">
                    <h3 className="text-2xl font-bold mb-4">Want to influence our roadmap?</h3>
                    <p className="text-zinc-500 mb-8">Join our private beta and get early access to new features.</p>
                    <Link href="/pricing" className="inline-block bg-lime-400 text-black px-8 py-4 rounded-full font-black uppercase text-sm hover:bg-lime-500 transition-colors">
                        Join Beta
                    </Link>
                </div>

            </main>
        </div>
    );
}
