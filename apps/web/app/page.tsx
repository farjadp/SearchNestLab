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
  Cpu,
  Zap,
  Shield,
  BarChart3,
  Globe,
  ChevronRight
} from "lucide-react";



export default function Home() {

    const fadeInUp = {
      initial: { opacity: 0, y: 20 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true },
      transition: { duration: 0.6 }
    };
    
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
                        <Link href="/signin" className="text-[10px] uppercase font-bold text-zinc-400 self-center hover:text-white">Access</Link>
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

        {/* 5. Fixed & Enhanced Dashboard Section */}
        <section className="mt-32 md:mt-48 max-w-7xl mx-auto">
            <div className="relative group px-4">
                <div className="absolute -inset-4 bg-gradient-to-r from-lime-400/10 via-blue-500/10 to-purple-500/10 rounded-[3rem] blur-3xl opacity-50 transition-opacity duration-1000" />

                <div className="relative min-h-[450px] md:aspect-[21/9] rounded-[2.5rem] md:rounded-[3.5rem] border border-white/10 bg-[#050505] p-1 overflow-hidden shadow-2xl">
                    {/* Grid Background */}
                    <div className="absolute inset-0 opacity-10" 
                         style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '30px 30px' }} />

                    <div className="relative h-full w-full flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-12 gap-12">
                        
                        {/* Left Side: Stats */}
                        <div className="w-full md:w-auto space-y-8 z-10 text-left">
                            <div className="space-y-3">
                                <div className="flex items-center gap-2">
                                    <div className="h-1.5 w-1.5 rounded-full bg-lime-400 animate-pulse" />
                                    <span className="text-[10px] font-black tracking-[0.3em] uppercase text-zinc-500">Live Telemetry</span>
                                </div>
                                <div className="h-[2px] w-24 bg-gradient-to-r from-lime-400 to-transparent" />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                    <div className="text-zinc-500 text-[8px] uppercase font-bold mb-1 tracking-widest">Accuracy</div>
                                    <div className="text-2xl font-mono text-white font-black">99.9%</div>
                                </div>
                                <div className="bg-white/5 border border-white/10 p-5 rounded-2xl backdrop-blur-md">
                                    <div className="text-zinc-500 text-[8px] uppercase font-bold mb-1 tracking-widest">Latency</div>
                                    <div className="text-2xl font-mono text-lime-400 font-black">18ms</div>
                                </div>
                            </div>

                            <div className="h-14 w-full md:w-72 bg-white/5 rounded-2xl border border-white/10 flex items-center px-4 gap-4">
                                <div className="flex gap-1">
                                    {[1,2,3,4,5].map(i => <div key={i} className="w-1 h-3 bg-lime-400/40 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.1}s` }} />)}
                                </div>
                                <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest leading-none">Scanning 10,000 Nodes/sec</span>
                            </div>
                        </div>

                        {/* Middle: Visual Divider */}
                        <div className="hidden md:block w-px h-48 bg-gradient-to-b from-transparent via-white/10 to-transparent" />

                        {/* Right Side: Interactive Nodes */}
                        <div className="relative flex flex-wrap justify-center gap-6 md:gap-10 z-10">
                            {[
                                { icon: <Cpu size={24} />, label: "Engine", color: "text-lime-400", border: "border-lime-400/30", path: "/platform/engine" },
                                { icon: <BarChart3 size={24} />, label: "Analyze", color: "text-blue-400", border: "border-blue-400/30", path: "/platform/analytics" },
                                { icon: <Shield size={24} />, label: "Secure", color: "text-purple-400", border: "border-purple-400/30", path: "/legal/security" }
                            ].map((node, idx) => (
                                <Link key={idx} href={node.path} className="flex flex-col items-center gap-3 group/node">
                                    <motion.div 
                                        whileHover={{ y: -5, scale: 1.1 }}
                                        className={`w-16 h-16 md:w-20 md:h-20 rounded-full border ${node.border} bg-white/5 flex items-center justify-center ${node.color} shadow-lg backdrop-blur-xl transition-all group-hover/node:bg-white/10`}
                                    >
                                        {node.icon}
                                    </motion.div>
                                    <span className="text-[9px] font-black uppercase tracking-widest text-zinc-500 group-hover/node:text-white">{node.label}</span>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        {/* 6. Global Reach Section */}
        <section className="mt-40 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
            <motion.div {...fadeInUp} className="space-y-8 text-left">
                <h2 className="text-5xl md:text-7xl font-black tracking-tighter leading-none">GLOBAL <br/><span className="text-lime-400">IMPACT.</span></h2>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-md">Our neural network processes search intent across 140 countries, delivering insights in milliseconds.</p>
                <Link href="/platform/network" className="inline-flex items-center gap-3 text-xs font-black uppercase tracking-[0.3em] text-white hover:text-lime-400 transition-colors group">
                  Explore Network <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </motion.div>
            <div className="relative aspect-square flex items-center justify-center">
                <div className="absolute inset-0 bg-lime-400/5 blur-[120px] rounded-full" />
                <Globe size={200} className="text-white/10 animate-[spin_60s_linear_infinite]" />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-32 h-32 border border-lime-400/20 rounded-full animate-ping" />
                </div>
            </div>
        </section>

      </main>

      {/* 7. The Bottom Dock (Action Links) */}
      <div className="fixed bottom-8 inset-x-0 z-[100] flex justify-center px-6">
        <motion.div 
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          className="bg-black/60 backdrop-blur-2xl border border-white/10 p-2 rounded-[2.5rem] flex items-center gap-1 shadow-2xl"
        >
          {[
            { label: "Overview", href: "/platform/overview" },
            { label: "Pricing", href: "/pricing" },
            { label: "Docs", href: "/docs" },
            { label: "Support", href: "/support" },
          ].map((link, i) => (
            <Link key={i} href={link.href}>
              <button className="px-5 md:px-7 py-3 rounded-[1.8rem] text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/5 transition-all">
                {link.label}
              </button>
            </Link>
          ))}
          <div className="w-px h-6 bg-white/10 mx-2" />
          <Link href="/help">
            <button className="p-3 text-lime-400 hover:scale-110 transition-transform"><ArrowUpRight size={18} /></button>
          </Link>
        </motion.div>
      </div>

      {/* 8. Footer */}
      <footer className="relative z-10 py-32 px-10 text-center border-t border-white/5 bg-[#010101]">
        <div className="text-[12vw] font-black text-white/[0.03] tracking-tighter mb-16 select-none uppercase">SEARCHNEST</div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-5xl mx-auto mb-20 text-left">
            <div className="space-y-4">
                <h4 className="text-[10px] font-black text-lime-400 uppercase tracking-widest">Platform</h4>
                <div className="flex flex-col gap-2 text-xs text-zinc-500 font-bold">
                    <Link href="/platform/engine" className="hover:text-white transition-colors">Crawl Engine</Link>
                    <Link href="/platform/telemetry" className="hover:text-white transition-colors">Telemetry</Link>
                </div>
            </div>
            <div className="space-y-4">
                <h4 className="text-[10px] font-black text-lime-400 uppercase tracking-widest">Company</h4>
                <div className="flex flex-col gap-2 text-xs text-zinc-500 font-bold">
                    <Link href="/about" className="hover:text-white transition-colors">About Lab</Link>
                    <Link href="/careers" className="hover:text-white transition-colors">Careers</Link>
                </div>
            </div>
            <div className="space-y-4">
                <h4 className="text-[10px] font-black text-lime-400 uppercase tracking-widest">Legal</h4>
                <div className="flex flex-col gap-2 text-xs text-zinc-500 font-bold">
                    <Link href="/legal/privacy" className="hover:text-white transition-colors">Privacy</Link>
                    <Link href="/legal/terms" className="hover:text-white transition-colors">Terms</Link>
                </div>
            </div>
            <div className="space-y-4 text-right">
                <div className="text-xs font-black text-white">EST. 2025</div>
                <div className="text-[10px] text-zinc-600 font-bold uppercase tracking-widest">SearchNest Labs Canada</div>
            </div>
        </div>
      </footer>
      </div>
  );
}