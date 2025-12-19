"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Zap, Crown, Box } from "lucide-react";

const PLANS = [
    {
        name: "Protocol",
        price: "$49",
        desc: "For solo architects and indie hackers.",
        icon: <Box size={24} />,
        features: ["5 Sitemaps / Mo", "Basic Analytics", "7-Day History", "Community Support"],
        color: "border-zinc-800",
        btn: "bg-zinc-900 border border-zinc-700 hover:bg-zinc-800 text-white"
    },
    {
        name: "Syndicate",
        price: "$199",
        desc: "For growing agencies and networks.",
        icon: <Zap size={24} />,
        features: ["50 Sitemaps / Mo", "Real-time Indexing", "Competitor Watch", "Priority Support", "API Access"],
        popular: true,
        color: "border-lime-400 shadow-[0_0_50px_-20px_rgba(163,230,53,0.3)]",
        btn: "bg-lime-400 text-black hover:bg-lime-500 font-bold"
    },
    {
        name: "Sovereign",
        price: "Custom",
        desc: "For global enterprises and state actors.",
        icon: <Crown size={24} />,
        features: ["Unlimited Volume", "Private Nodes", "SLA Guarantee", "Dedicated Engineer", "Custom Integrations"],
        color: "border-zinc-800",
        btn: "bg-white text-black hover:bg-zinc-200"
    }
];

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-lime-500/05 blur-[200px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <nav className="fixed top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Home
                </Link>
            </nav>

            <main className="relative z-10 pt-40 px-6 max-w-7xl mx-auto">

                <div className="text-center mb-20">
                    <div className="inline-block px-4 py-2 rounded-full border border-lime-400/20 bg-lime-400/5 text-lime-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        Access Protocol
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">CHOOSE YOUR <br className="md:hidden" /> <span className="text-zinc-500">WEAPON.</span></h1>
                    <p className="text-zinc-400 max-w-lg mx-auto">Scale your SEO infrastructure with the precision of a scalpel and the power of a nuclear reactor.</p>
                </div>

                <div className="grid lg:grid-cols-3 gap-8 items-start">
                    {PLANS.map((plan, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className={`relative bg-[#080808] p-10 rounded-[2.5rem] border ${plan.color} flex flex-col gap-8 group hover:-translate-y-2 transition-transform duration-500`}
                        >
                            {plan.popular && (
                                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-lime-400 text-black text-[10px] font-black uppercase tracking-widest rounded-full">
                                    Most Deployed
                                </div>
                            )}

                            <div className="space-y-2">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-zinc-900 border border-white/10 text-white mb-4 ${plan.popular ? 'text-lime-400 border-lime-400/20' : ''}`}>
                                    {plan.icon}
                                </div>
                                <h3 className="text-xl font-bold">{plan.name}</h3>
                                <div className="text-4xl font-black tracking-tighter">{plan.price}</div>
                                <p className="text-xs text-zinc-500 font-medium">{plan.desc}</p>
                            </div>

                            <div className="w-full h-px bg-white/5" />

                            <ul className="space-y-4 flex-1">
                                {plan.features.map((feature, j) => (
                                    <li key={j} className="flex items-center gap-3 text-sm text-zinc-400">
                                        <div className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center text-lime-400">
                                            <Check size={10} strokeWidth={4} />
                                        </div>
                                        {feature}
                                    </li>
                                ))}
                            </ul>

                            <button className={`w-full py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${plan.btn}`}>
                                Select Plan
                            </button>

                        </motion.div>
                    ))}
                </div>

            </main>

            <footer className="relative z-10 py-20 text-center text-zinc-600 text-[10px] font-bold uppercase tracking-widest mt-20">
                All prices in USD. No lengthy contracts. Cancel anytime.
            </footer>
        </div>
    );
}
