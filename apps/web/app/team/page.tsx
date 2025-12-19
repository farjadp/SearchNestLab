"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Github, Twitter, Linkedin } from "lucide-react";

const TEAM = [
    { name: "Farjad", role: "Founder & Architect", color: "bg-lime-400" },
    { name: "Sarah", role: "Head of Product", color: "bg-blue-400" },
    { name: "David", role: "Lead Engineer", color: "bg-purple-400" },
    { name: "Elena", role: "Design Director", color: "bg-orange-400" }
];

export default function TeamPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[20%] left-[20%] w-[60%] h-[60%] bg-blue-500/05 blur-[200px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <nav className="fixed top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Home
                </Link>
            </nav>

            <main className="relative z-10 pt-32 px-6 max-w-6xl mx-auto">
                <div className="text-center mb-32">
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">THE CREW</h1>
                    <p className="text-zinc-500 max-w-lg mx-auto">Builders, designers, and obsessives. Working from the shadows to light up your data.</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {TEAM.map((member, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative"
                        >
                            <div className="aspect-[3/4] bg-zinc-900 rounded-[2rem] border border-white/10 overflow-hidden relative mb-6 grayscale group-hover:grayscale-0 transition-all duration-500">
                                <div className={`absolute inset-0 opacity-20 group-hover:opacity-40 transition-opacity ${member.color}`} />
                                {/* Placeholder for avatar image */}
                                <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-black text-9xl opacity-20">
                                    {member.name[0]}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold">{member.name}</h3>
                            <p className="text-xs uppercase tracking-widest text-zinc-500 mb-4">{member.role}</p>
                            <div className="flex gap-4 opacity-0 group-hover:opacity-100 transition-opacity translate-y-2 group-hover:translate-y-0">
                                <Github size={16} className="text-zinc-500 hover:text-white cursor-pointer" />
                                <Twitter size={16} className="text-zinc-500 hover:text-white cursor-pointer" />
                                <Linkedin size={16} className="text-zinc-500 hover:text-white cursor-pointer" />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </main>
        </div>
    );
}
