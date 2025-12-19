"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Cpu, Network, Zap, Lock, Layers, Search } from "lucide-react";

export default function ProductPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-full h-[50%] bg-gradient-to-t from-purple-900/10 to-transparent" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <nav className="fixed top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Home
                </Link>
            </nav>

            <main className="relative z-10 pt-40 px-6">

                {/* Header */}
                <div className="max-w-6xl mx-auto mb-40">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[12vw] font-black tracking-tighter leading-[0.8] mb-12"
                    >
                        THE <br /> <span className="italic text-zinc-700">ENGINE.</span>
                    </motion.h1>
                    <div className="grid md:grid-cols-2 gap-12">
                        <p className="text-2xl text-zinc-400 font-light leading-relaxed">
                            SearchNest is a distributed intelligence layer. We don't just "crawl" websites. We map their semantic DNA and project it into a spatial database for instant analysis.
                        </p>
                        <div className="flex gap-4 items-start">
                            <div className="p-4 bg-lime-400/10 rounded-2xl border border-lime-400/20 text-lime-400">
                                <Cpu size={32} />
                            </div>
                            <div>
                                <h4 className="font-bold text-white mb-2">Neural Processing</h4>
                                <p className="text-zinc-500 text-sm">Every page is analyzed by a localized LLM to extract intent, sentiment, and entity relationships.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Feature Strip */}
                <div className="border-y border-white/5 bg-white/5 backdrop-blur-sm py-20 mb-40">
                    <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-20">
                        {[
                            { icon: <Network />, title: "Distributed Nodes", desc: "Our crawler runs on a decentralized edge network, making it impossible to block." },
                            { icon: <Zap />, title: "Real-Time Indexing", desc: "Changes are reflected in your dashboard within milliseconds of detection." },
                            { icon: <Lock />, title: "Enterprise Grade", desc: "SOC2 compliant infrastructure with end-to-end encryption for all client data." }
                        ].map((f, i) => (
                            <div key={i} className="space-y-6">
                                <div className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-zinc-400">
                                    {f.icon}
                                </div>
                                <h3 className="text-2xl font-bold">{f.title}</h3>
                                <p className="text-zinc-500 leading-relaxed">{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Interface Showcase */}
                <div className="max-w-7xl mx-auto px-6 mb-40">
                    <div className="flex flex-col md:flex-row gap-20 items-center">
                        <div className="flex-1 space-y-8">
                            <div className="inline-block px-4 py-1 rounded-full border border-blue-400/30 text-blue-400 text-xs font-bold uppercase tracking-widest">
                                Version 3.0
                            </div>
                            <h2 className="text-5xl font-black tracking-tighter">VISIBLE <br /><span className="text-zinc-600">INTUITION.</span></h2>
                            <p className="text-zinc-400 leading-relaxed">
                                We killed the spreadsheet. Our spatial interface lets you navigate your SEO strategy like a military commander. See the terrain, spot the threats, and deploy resources with a single click.
                            </p>
                            <ul className="space-y-4 cursor-default">
                                {["Visual Link Graphs", "Competitor Heatmaps", "SERP Turbulence Radar"].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4 group">
                                        <div className="w-8 h-px bg-zinc-700 group-hover:bg-lime-400 group-hover:w-12 transition-all" />
                                        <span className="text-zinc-500 group-hover:text-white transition-colors uppercase tracking-widest text-xs font-bold">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="flex-1 relative group">
                            <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full group-hover:bg-lime-500/10 transition-colors duration-1000" />
                            <div className="relative aspect-square bg-[#050505] rounded-[3rem] border border-white/10 p-2 shadow-2xl overflow-hidden">
                                <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

                                {/* Abstract UI Elements */}
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-zinc-900 rounded-full border border-white/10 flex items-center justify-center animate-pulse">
                                    <Search className="text-zinc-600" />
                                </div>

                                {[0, 1, 2, 3].map(i => (
                                    <div key={i} className="absolute w-12 h-12 bg-zinc-900 rounded-xl border border-white/10"
                                        style={{
                                            top: `${20 + Math.random() * 60}%`,
                                            left: `${20 + Math.random() * 60}%`,
                                            animation: `float ${3 + i}s infinite ease-in-out`
                                        }}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </main>

            <footer className="relative z-10 py-20 text-center border-t border-white/5">
                <div className="text-[10vw] font-black text-white/5 tracking-tighter">SEARCHNEST</div>
            </footer>

            <style jsx global>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
          100% { transform: translateY(0px); }
        }
      `}</style>
        </div>
    );
}
