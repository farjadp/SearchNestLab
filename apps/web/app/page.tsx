// ============================================================================
// Hardware Source: apps/web/app/page.tsx
// Version: 5.0.0 — 2025-12-17
// Style: Dark Gold Cinematic / Actionable Premium
// ============================================================================

"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, Globe, Shield, Database, ArrowUpRight, Search } from "lucide-react";

export default function Home() {
    const fadeInUp = {
        initial: { opacity: 0, y: 30 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as const }
    };

    return (
        <div className="min-h-screen bg-[#0A0A0A] text-[#E2E2E2] selection:bg-[#C5A358]/30 overflow-x-hidden">

            {/* Dynamic Background Overlay */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,#1A1A1A,transparent)]" />
                <div className="absolute top-[20%] left-[-10%] w-[500px] h-[500px] bg-[#C5A358]/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.02]" />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto">
                <div className="flex items-center gap-12">
                    <div className="text-xl font-bold tracking-[0.2em] text-white">
                        SEARCHNEST<span className="text-[#C5A358]">.</span>
                    </div>
                    <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest text-zinc-500 font-medium">
                        <Link href="#" className="hover:text-[#C5A358] transition-colors">Platform</Link>
                        <Link href="#" className="hover:text-[#C5A358] transition-colors">Intelligence</Link>
                        <Link href="#" className="hover:text-[#C5A358] transition-colors">Reports</Link>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <button className="text-zinc-400 hover:text-white transition-colors">
                        <Search size={20} />
                    </button>
                    <Link href="/signup" className="hidden sm:block text-[11px] font-bold uppercase tracking-widest px-6 py-2.5 bg-gradient-to-r from-[#C5A358] to-[#E5C378] text-black rounded-full shadow-[0_10px_20px_-10px_rgba(197,163,88,0.4)] hover:scale-105 transition-transform">
                        Start Journey
                    </Link>
                </div>
            </nav>

            <main className="relative z-10">

                {/* Hero Section */}
                <section className="relative pt-20 pb-32 px-6 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
                    <div className="flex-1 space-y-8">
                        <motion.div {...fadeInUp} className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-[#C5A358]/20 bg-[#C5A358]/5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#C5A358] animate-ping" />
                            <span className="text-[10px] uppercase tracking-[0.2em] text-[#C5A358] font-bold">The Gold Standard in SEO</span>
                        </motion.div>

                        <motion.h1
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, delay: 0.2 }}
                            className="text-5xl md:text-8xl font-serif font-light leading-[1.1] text-white"
                        >
                            Harness <br />
                            <span className="italic font-normal text-[#C5A358]">The Data</span> Universe.
                        </motion.h1>

                        <motion.p {...fadeInUp} transition={{ delay: 0.4 }} className="max-w-xl text-lg text-zinc-400 font-light leading-relaxed">
                            Uncover insights, connect the dots, and drive exponential growth with SearchNest. Engineered for the world's most ambitious agencies.
                        </motion.p>

                        <motion.div {...fadeInUp} transition={{ delay: 0.6 }} className="flex flex-wrap gap-4 pt-4">
                            <button className="px-8 py-4 bg-[#C5A358] text-black font-bold rounded-xl hover:bg-[#E5C378] transition-all shadow-xl flex items-center gap-2">
                                Start Trial <ArrowUpRight size={18} />
                            </button>
                            <button className="px-8 py-4 bg-transparent border border-zinc-800 text-white font-bold rounded-xl hover:bg-zinc-900 transition-all">
                                Learn More
                            </button>
                        </motion.div>
                    </div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1.5 }}
                        className="flex-1 relative"
                    >
                        {/* Abstract Visual Element */}
                        <div className="relative w-full aspect-square flex items-center justify-center">
                            <div className="absolute inset-0 bg-gradient-to-tr from-[#C5A358]/10 to-transparent rounded-full blur-3xl" />
                            <div className="relative z-10 grid grid-cols-2 gap-4 p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[3rem] shadow-2xl overflow-hidden group">
                                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A358]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                                {/* Mock UI Elements */}
                                <div className="col-span-2 h-32 bg-zinc-800/50 rounded-2xl border border-white/5" />
                                <div className="h-40 bg-[#C5A358]/10 rounded-2xl border border-[#C5A358]/20 flex flex-col justify-end p-4">
                                    <div className="w-10 h-10 rounded-full bg-[#C5A358] mb-4" />
                                    <div className="h-2 w-12 bg-[#C5A358] rounded" />
                                </div>
                                <div className="h-40 bg-zinc-800/50 rounded-2xl border border-white/5" />
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* Global Impact Section */}
                <section className="bg-zinc-900/20 py-32 border-y border-zinc-900/50 backdrop-blur-sm">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <div className="order-2 lg:order-1 flex justify-center">
                            <div className="relative w-80 h-80">
                                <div className="absolute inset-0 bg-[#C5A358]/20 rounded-full blur-[80px]" />
                                <Globe className="w-full h-full text-[#C5A358] opacity-80 stroke-[0.5]" />
                            </div>
                        </div>
                        <div className="order-1 lg:order-2 space-y-6">
                            <h2 className="text-4xl md:text-5xl font-serif text-white italic">Global Reach, <br /><span className="not-italic text-zinc-300">Local Impact.</span></h2>
                            <p className="text-zinc-500 leading-relaxed">Our advanced SEO infrastructure connects you to the thoughts of customers globally, while optimizing for the nuances of local markets.</p>
                            <button className="group flex items-center gap-3 text-[#C5A358] font-bold tracking-widest text-xs uppercase pt-4">
                                Explore World View <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </section>

                {/* Features Bento */}
                <section className="py-32 px-6 max-w-7xl mx-auto">
                    <h3 className="text-3xl font-serif text-white mb-16 text-center">Engineered for <span className="text-[#C5A358] italic">Excellence.</span></h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { icon: <Database />, title: "Unified Data Layer", desc: "All your SEO data in one place. Say goodbye to spreadsheets." },
                            { icon: <ArrowUpRight />, title: "Predictive Analytics", desc: "Stop reacting. Start predicting with our trend-forecasting engine." },
                            { icon: <Shield />, title: "Fortified Privacy", desc: "Built with PIPEDA & CASL standards to ensure your data is secure." },
                        ].map((feature, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                className="p-10 rounded-[2.5rem] bg-[#0F0F0F] border border-zinc-900 hover:border-[#C5A358]/30 transition-all duration-500 group"
                            >
                                <div className="w-12 h-12 rounded-xl bg-[#C5A358]/10 flex items-center justify-center text-[#C5A358] mb-8 group-hover:bg-[#C5A358] group-hover:text-black transition-colors">
                                    {feature.icon}
                                </div>
                                <h4 className="text-xl font-bold text-white mb-4">{feature.title}</h4>
                                <p className="text-zinc-500 text-sm leading-relaxed">{feature.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </section>

            </main>

            {/* Footer */}
            <footer className="relative z-10 pt-32 pb-12 px-8 border-t border-zinc-900">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="text-lg font-black tracking-widest text-white">SEARCHNEST<span className="text-[#C5A358]">.</span></div>
                    <p className="text-zinc-600 text-[10px] uppercase tracking-widest">© 2025 SearchNest Lab. Designed for the 1%.</p>
                    <div className="flex gap-8 text-zinc-500 text-xs uppercase tracking-tighter">
                        <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
                        <Link href="#" className="hover:text-white transition-colors">Terms</Link>
                        <Link href="#" className="hover:text-white transition-colors">Twitter</Link>
                    </div>
                </div>
            </footer>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;1,700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>
        </div>
    );
}