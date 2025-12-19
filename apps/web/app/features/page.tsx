"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, Search, BarChart3, Zap, FileText, Users, Network, Settings, KeyRound, AlertTriangle, Target, Globe, Cpu, Lock, Layers } from "lucide-react";

const FEATURES = [
    {
        category: "Core Analysis",
        icon: <Search className="text-lime-400" />,
        items: [
            { name: "Real-Time SEO Crawling", desc: "Distributed edge network crawler that analyzes your entire site structure instantly" },
            { name: "Technical SEO Audit", desc: "Comprehensive analysis of meta tags, headers, schema markup, and core web vitals" },
            { name: "Competitor Intelligence", desc: "Track and analyze competitor rankings, keywords, and backlink strategies" },
            { name: "SERP Position Tracking", desc: "Monitor your rankings across multiple search engines and locations" }
        ]
    },
    {
        category: "Keywords & Content",
        icon: <KeyRound className="text-blue-400" />,
        items: [
            { name: "Keyword Research", desc: "AI-powered keyword discovery with search volume, difficulty, and opportunity scores" },
            { name: "Content Gap Analysis", desc: "Identify missing content opportunities based on competitor analysis" },
            { name: "Intent Mapping", desc: "Classify keywords by search intent (informational, transactional, navigational)" },
            { name: "Long-Tail Discovery", desc: "Uncover high-converting long-tail keyword opportunities" }
        ]
    },
    {
        category: "Technical Tools",
        icon: <Cpu className="text-purple-400" />,
        items: [
            { name: "Sitemap Generator", desc: "Auto-generate and submit XML sitemaps with priority and frequency settings" },
            { name: "Robots.txt Validator", desc: "Analyze and optimize your robots.txt configuration" },
            { name: "Structured Data Testing", desc: "Validate schema markup and rich snippets for SERP enhancement" },
            { name: "Mobile-First Analysis", desc: "Ensure your site meets mobile usability standards" }
        ]
    },
    {
        category: "Performance & Speed",
        icon: <Zap className="text-orange-400" />,
        items: [
            { name: "Page Speed Insights", desc: "Measure and optimize Core Web Vitals (LCP, FID, CLS)" },
            { name: "Resource Optimization", desc: "Identify oversized images, scripts, and CSS for compression" },
            { name: "Render Path Analysis", desc: "Visualize critical rendering path and eliminate bottlenecks" },
            { name: "CDN Recommendations", desc: "Get actionable suggestions for content delivery optimization" }
        ]
    },
    {
        category: "Issues & Alerts",
        icon: <AlertTriangle className="text-red-400" />,
        items: [
            { name: "Broken Link Detection", desc: "Find and fix 404 errors, redirect chains, and orphaned pages" },
            { name: "Duplicate Content Finder", desc: "Identify canonical issues and duplicate meta descriptions" },
            { name: "Security Monitoring", desc: "Detect mixed content, insecure resources, and SSL certificate issues" },
            { name: "Real-Time Alerts", desc: "Get instant notifications for critical SEO issues" }
        ]
    },
    {
        category: "Backlinks & Authority",
        icon: <Network className="text-green-400" />,
        items: [
            { name: "Backlink Profile Analysis", desc: "Track referring domains, anchor text distribution, and link quality" },
            { name: "Toxic Link Detection", desc: "Identify and disavow spammy or harmful backlinks" },
            { name: "Link Building Opportunities", desc: "Discover high-authority sites for outreach campaigns" },
            { name: "Domain Authority Tracking", desc: "Monitor your site's authority score over time" }
        ]
    },
    {
        category: "Reports & Analytics",
        icon: <BarChart3 className="text-cyan-400" />,
        items: [
            { name: "Custom Dashboards", desc: "Build personalized dashboards with drag-and-drop widgets" },
            { name: "Automated Reports", desc: "Schedule and export PDF/CSV reports for stakeholders" },
            { name: "Traffic Attribution", desc: "Understand which SEO efforts drive the most organic traffic" },
            { name: "ROI Calculator", desc: "Measure the financial impact of your SEO campaigns" }
        ]
    },
    {
        category: "Team & Workflow",
        icon: <Users className="text-pink-400" />,
        items: [
            { name: "Multi-User Access", desc: "Role-based permissions for team members and clients" },
            { name: "Task Management", desc: "Assign, track, and resolve SEO tasks with built-in collaboration" },
            { name: "White-Label Reporting", desc: "Brand reports with your agency logo and colors" },
            { name: "API Access", desc: "Integrate SearchNest data into your existing tools and workflows" }
        ]
    }
];

export default function FeaturesPage() {
    return (
        <div className="min-h-screen bg-[#020202] text-white selection:bg-lime-400 selection:text-black font-sans overflow-x-hidden">

            {/* Background Ambience */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[10%] left-[20%] w-[60%] h-[60%] bg-lime-500/05 blur-[200px] rounded-full" />
                <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-purple-500/05 blur-[150px] rounded-full" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
            </div>

            <nav className="fixed top-8 left-8 z-50">
                <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors text-xs font-bold uppercase tracking-widest">
                    <ArrowLeft size={14} /> Home
                </Link>
            </nav>

            <main className="relative z-10 pt-32 px-6 max-w-7xl mx-auto pb-20">

                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-block px-4 py-2 rounded-full border border-lime-400/20 bg-lime-400/5 text-lime-400 text-[10px] font-black uppercase tracking-widest mb-6"
                    >
                        Full Platform Capabilities
                    </motion.div>
                    <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-6">
                        EVERY <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-400">TOOL</span><br />YOU NEED.
                    </h1>
                    <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                        SearchNest consolidates 50+ SEO tools into a single, blazing-fast platform. No more juggling subscriptions.
                    </p>
                </div>

                <div className="space-y-16">
                    {FEATURES.map((category, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                                    {category.icon}
                                </div>
                                <h2 className="text-3xl font-black tracking-tight">{category.category}</h2>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                {category.items.map((feature, j) => (
                                    <div
                                        key={j}
                                        className="bg-[#050505] border border-white/5 rounded-2xl p-6 hover:border-lime-400/30 transition-all duration-300 group"
                                    >
                                        <h3 className="text-lg font-bold mb-2 group-hover:text-lime-400 transition-colors">{feature.name}</h3>
                                        <p className="text-sm text-zinc-500 leading-relaxed">{feature.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-20 text-center border-t border-white/5 pt-20">
                    <h3 className="text-2xl font-bold mb-4">Ready to dominate search?</h3>
                    <Link href="/pricing" className="inline-block bg-lime-400 text-black px-8 py-4 rounded-full font-black uppercase text-sm hover:bg-lime-500 transition-colors">
                        View Pricing
                    </Link>
                </div>

            </main>
        </div>
    );
}
