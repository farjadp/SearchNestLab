"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Target, Globe, Shield } from "lucide-react";

export default function AboutPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] right-[10%] w-[50%] h-[50%] bg-purple-500/10 blur-[150px] rounded-full" />
                <div className="absolute bottom-[0%] left-[-10%] w-[40%] h-[40%] bg-lime-500/05 blur-[120px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            {/* Nav */}
            <nav className="fixed top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Back
                </Link>
            </nav>

            <main className="relative z-10 pt-40 px-6 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-none mb-12">
                        THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">EDGE</span> <br />
                        OF SEARCH.
                    </h1>

                    <p className="text-xl md:text-2xl text-zinc-400 leading-relaxed font-light mb-20 max-w-2xl">
                        We are not just an SEO tool. We are the intelligence layer for the next generation of growth agencies.
                        Existing at the intersection of neural networks, spatial design, and raw data extraction.
                    </p>

                    <div className="grid md:grid-cols-3 gap-8 mb-40">
                        {[
                            { icon: <Target className="text-lime-400" />, title: "Precision", desc: "No fluff metrics. Only data that moves revenue." },
                            { icon: <Globe className="text-blue-400" />, title: "Scale", desc: "Infrastructure built to handle millions of pages instantly." },
                            { icon: <Shield className="text-purple-400" />, title: "Sovereignty", desc: "Your data is yours. Encrypted, isolated, secure." }
                        ].map((item, i) => (
                            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl backdrop-blur-sm">
                                <div className="mb-6">{item.icon}</div>
                                <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                                <p className="text-sm text-zinc-500 leading-relaxed">{item.desc}</p>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col md:flex-row gap-20 items-center border-t border-white/10 pt-20">
                        <div className="flex-1">
                            <h2 className="text-4xl font-bold mb-6">Our Origin</h2>
                            <p className="text-zinc-500 leading-relaxed mb-6">
                                SearchNest was born from frustration. The SEO tools on the market were clunky, slow, and ugly. They were built for the web of 2010.
                            </p>
                            <p className="text-zinc-500 leading-relaxed">
                                We set out to build something that feels like a Ferrari. Fast, powerful, and beautiful. A tool that you actually want to use.
                            </p>
                        </div>
                        <div className="flex-1 w-full aspect-video bg-zinc-900 rounded-3xl border border-white/10 overflow-hidden relative group">
                            <div className="absolute inset-0 bg-gradient-to-br from-lime-400/20 to-transparent opacity-50" />
                        </div>
                    </div>

                </motion.div>
            </main>

            <footer className="relative z-10 py-20 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest">
                © 2025 SearchNest Labs
            </footer>
        </div>
    );
}
