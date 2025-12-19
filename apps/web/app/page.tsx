// ============================================================================
// Hardware Source: apps/web/app/page.tsx
// Version: 8.0.0 — 2025-12-18
// Style: Spatial UI / Glass-Skeuomorphism / Neon-Minimalism
// ============================================================================

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
    Compass,
    Activity,
    Fingerprint,
    Radio,
    Box,
    ArrowUpRight,
    LayoutDashboard,
    Cpu
} from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Aurora Background Effect */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-lime-500/10 blur-[180px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-500/10 blur-[180px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            {/* Floating Header */}
            <header className="fixed top-6 inset-x-0 z-[100] max-w-5xl mx-auto px-4">
                <nav className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full px-8 py-4 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-sm font-black tracking-widest text-lime-400">SEARCHNEST</Link>
                        <div className="hidden md:flex gap-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                            <Link href="/features" className="hover:text-white transition-all">Features</Link>
                            <Link href="/product" className="hover:text-white transition-all">Product</Link>
                            <Link href="/roadmap" className="hover:text-white transition-all">Roadmap</Link>
                            <Link href="/pricing" className="hover:text-white transition-all">Pricing</Link>
                            <Link href="/about" className="hover:text-white transition-all">About</Link>
                            <Link href="/blog" className="hover:text-white transition-all">Blog</Link>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <Link href="/login" className="text-[10px] uppercase font-bold text-zinc-400 self-center hover:text-white">Access</Link>
                        <Link href="/pricing" className="bg-white text-black px-5 py-2 rounded-full text-[10px] font-black uppercase hover:bg-lime-400 transition-colors">Join Beta</Link>
                    </div>
                </nav>
            </header>

            <main className="relative z-10 pt-44 pb-40 px-6">

                {/* Hero Section: Spatial Concept */}
                <section className="max-w-6xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-lime-400/10 border border-lime-400/20 text-lime-400 text-[10px] font-black uppercase tracking-widest mb-12"
                    >
                        <Radio size={12} className="animate-pulse" /> OS v3.0 Early Access
                    </motion.div>

                    <h1 className="text-[12vw] md:text-[8vw] font-black tracking-tighter leading-[0.8] mb-12">
                        SEO IS <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20">REBORN.</span>
                    </h1>

                    <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-24">
                        <p className="max-w-xs text-left text-zinc-500 text-sm leading-relaxed border-l border-lime-400/50 pl-6">
                            SearchNest Intelligence. The first spatial SEO engine designed for hyper-growth agencies.
                        </p>
                        <Link href="/start">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                className="group relative px-12 py-6 bg-lime-400 text-black rounded-3xl font-black text-xl overflow-hidden shadow-[0_0_50px_-10px_rgba(163,230,53,0.5)]"
                            >
                                Launch Protocol
                                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 italic" />
                            </motion.button>
                        </Link>
                    </div>

                    {/* Interactive Feature Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
                        {[
                            { icon: <Compass />, label: "Navigation", path: "/engine/nav", color: "hover:bg-blue-500/10" },
                            { icon: <Activity />, label: "Telemetry", path: "/engine/stats", color: "hover:bg-lime-500/10" },
                            { icon: <Fingerprint />, label: "Identity", path: "/engine/auth", color: "hover:bg-purple-500/10" },
                            { icon: <Box />, label: "Modules", path: "/engine/addons", color: "hover:bg-orange-500/10" }
                        ].map((item, i) => (
                            <Link key={i} href={item.path} className="group">
                                <div className={`p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl flex flex-col items-center gap-6 transition-all duration-500 ${item.color} group-hover:-translate-y-2`}>
                                    <div className="text-zinc-400 group-hover:text-white transition-colors">{item.icon}</div>
                                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 group-hover:text-white">{item.label}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </section>

                {/* Floating Abstract Dashboard Section */}
                <section className="mt-40 max-w-7xl mx-auto">
                    <div className="relative group">
                        <div className="absolute -inset-1 bg-gradient-to-r from-lime-400/20 to-blue-400/20 rounded-[3rem] blur-2xl opacity-50" />
                        <div className="relative aspect-[21/9] rounded-[3rem] border border-white/10 bg-[#050505] p-2 overflow-hidden">
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
                            <div className="relative h-full flex items-center justify-around px-20">
                                <div className="space-y-4">
                                    <div className="h-2 w-32 bg-lime-400 rounded-full" />
                                    <div className="h-10 w-48 bg-white/5 rounded-2xl border border-white/10" />
                                </div>
                                <div className="w-px h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                                <div className="flex gap-4">
                                    <div className="w-16 h-16 rounded-full border border-lime-400/30 flex items-center justify-center text-lime-400">
                                        <Cpu />
                                    </div>
                                    <div className="w-16 h-16 rounded-full border border-white/10 flex items-center justify-center text-zinc-500">
                                        <LayoutDashboard />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* The Bottom Dock (Action Links) */}
            <div className="fixed bottom-8 inset-x-0 z-[100] flex justify-center px-6">
                <div className="bg-black/40 backdrop-blur-2xl border border-white/10 p-2 rounded-[2rem] flex items-center gap-1 shadow-2xl">
                    {[
                        { label: "Overview", href: "/internal/overview" },
                        { label: "Systems", href: "/internal/systems" },
                        { label: "Database", href: "/internal/db" },
                        { label: "Audit", href: "/internal/audit" },
                    ].map((link, i) => (
                        <Link key={i} href={link.href}>
                            <button className="px-6 py-3 rounded-[1.5rem] text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white hover:bg-white/5 transition-all">
                                {link.label}
                            </button>
                        </Link>
                    ))}
                    <div className="w-px h-6 bg-white/10 mx-2" />
                    <Link href="/help">
                        <button className="p-3 text-lime-400 hover:scale-110 transition-transform"><ArrowUpRight size={18} /></button>
                    </Link>
                </div>
            </div>

            <footer className="relative z-10 py-20 px-10 text-center border-t border-white/5">
                <div className="text-[10vw] font-black text-white/5 tracking-tighter mb-10">SEARCHNEST</div>
                <div className="flex justify-center gap-12 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">
                    <Link href="/about" className="hover:text-white transition-colors">About</Link>
                    <Link href="/team" className="hover:text-white transition-colors">Team</Link>
                    <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </footer>

        </div>
    );
}