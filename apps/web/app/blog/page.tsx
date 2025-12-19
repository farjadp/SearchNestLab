"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Tag } from "lucide-react";

const POSTS = [
    {
        category: "Engineering",
        title: "Reverse Engineering the Google Core Update",
        date: "Dec 12, 2025",
        readTime: "8 min read",
        excerpt: "How we detected the signal shift before the major SEO tools did, and what it means for programmatic SEO.",
        tags: ["Algorithm", "Data Science"]
    },
    {
        category: "Case Study",
        title: "Scaling from 0 to 1M Visitors in 90 Days",
        date: "Nov 28, 2025",
        readTime: "12 min read",
        excerpt: "The exact architectural blueprint we used to deploy 50k pages with zero indexation bloat.",
        tags: ["Growth", "Architecture"]
    },
    {
        category: "Protocol",
        title: "Introducing: SearchNest Version 3.0",
        date: "Nov 15, 2025",
        readTime: "5 min read",
        excerpt: "Spatial interface, neural processing nodes, and the death of the spreadsheet.",
        tags: ["Product", "Release"]
    }
];

export default function BlogPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] right-[30%] w-[60%] h-[60%] bg-pink-500/05 blur-[200px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <nav className="fixed top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Home
                </Link>
            </nav>

            <main className="relative z-10 pt-40 px-6 max-w-5xl mx-auto">

                <div className="mb-24">
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8">SIGNAL<span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-transparent">_NOISE</span></h1>
                    <p className="text-zinc-500 text-xl max-w-2xl">
                        Transmission log from the SearchNest engineering team. Deep dives into search algorithms, distributed systems, and dark-mode aesthetics.
                    </p>
                </div>

                <div className="grid gap-12">
                    {POSTS.map((post, i) => (
                        <motion.article
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-[#050505] p-8 md:p-12 rounded-[2rem] border border-white/5 hover:border-lime-400/30 transition-all duration-500"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                                <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-zinc-500">
                                    <span className="text-lime-400">{post.category}</span>
                                    <span>•</span>
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.readTime}</span>
                                </div>
                                <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity text-lime-400">
                                    <ArrowUpRight size={24} />
                                </div>
                            </div>

                            <h2 className="text-3xl md:text-5xl font-bold mb-6 group-hover:text-lime-400 transition-colors cursor-pointer leading-tight">
                                {post.title}
                            </h2>

                            <p className="text-zinc-400 text-lg leading-relaxed mb-8 max-w-3xl">
                                {post.excerpt}
                            </p>

                            <div className="flex gap-3">
                                {post.tags.map((tag, j) => (
                                    <div key={j} className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase tracking-widest text-zinc-500">
                                        <Tag size={10} /> {tag}
                                    </div>
                                ))}
                            </div>

                        </motion.article>
                    ))}
                </div>

            </main>

            <footer className="relative z-10 py-20 text-center border-t border-white/5 mt-20">
                <div className="inline-block px-6 py-3 border border-white/10 rounded-full text-zinc-500 text-xs font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer">
                    Load More Transmissions
                </div>
            </footer>
        </div>
    );
}
