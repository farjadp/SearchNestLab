"use client";

import React from "react";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    AlertTriangle,
    KeyRound,
    Settings,
    FileText,
    Users,
    Zap,
    Network
} from "lucide-react";

export default function GuidePage() {
    const features = [
        {
            title: "Dashboard",
            icon: LayoutDashboard,
            description: "Your mission control. View high-level metrics across all your sites, including health scores, crawl status, and recent activity."
        },
        {
            title: "Issues",
            icon: AlertTriangle,
            description: "Deep dive into technical SEO problems. We categorize issues by severity (Critical, Warning, Notice) so you can prioritize fixes."
        },
        {
            title: "Keywords",
            icon: KeyRound,
            description: "Track your rankings. Monitor keyword performance, search volume, and difficulty to refine your content strategy."
        },
        {
            title: "Optimization",
            icon: Zap,
            description: "AI-powered suggestions. Get actionable advice on how to improve specific pages for better visibility and engagement."
        },
        {
            title: "Sitemaps",
            icon: Network,
            description: "Generate and manage XML sitemaps. Create up to 5 sitemaps per user to help search engines discover your content."
        },
        {
            title: "Reports",
            icon: FileText,
            description: "Export data. Generate PDF or CSV reports to share progress with team members or clients."
        },
        {
            title: "Leads",
            icon: Users,
            description: "Manage potential clients. If you use our lead generation widgets, this is where you track inquiries."
        },
        {
            title: "Settings",
            icon: Settings,
            description: "Configure your site. Manage crawl settings, notifications, and integrations."
        }
    ];

    return (
        <div className="space-y-8">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-2"
            >
                <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-zinc-400">
                    Portal Guide
                </h1>
                <p className="text-zinc-400">
                    A quick overview of the tools available in your SearchNest portal.
                </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {features.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="bg-zinc-900/50 border border-zinc-800 p-6 rounded-2xl hover:bg-zinc-900/80 hover:border-zinc-700 transition-all group"
                        >
                            <div className="w-12 h-12 bg-zinc-800/50 rounded-xl flex items-center justify-center mb-4 group-hover:bg-emerald-500/10 group-hover:text-emerald-400 transition-colors text-zinc-400">
                                <Icon size={24} />
                            </div>
                            <h3 className="text-lg font-semibold text-zinc-100 mb-2">
                                {feature.title}
                            </h3>
                            <p className="text-sm text-zinc-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </motion.div>
                    );
                })}
            </div>
        </div>
    );
}
