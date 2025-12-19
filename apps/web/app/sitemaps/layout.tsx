// ============================================================================
// Hardware Source: apps/web/app/sitemaps/layout.tsx
// Version: 1.0.0
// Why: Layout for the Sitemaps tool
// ============================================================================

"use client";

import React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Network,
    LogOut,
    Plus,
    BookOpen
} from "lucide-react";
import { useAuth } from "@/src/contexts/AuthContext";
import { auth } from "@/src/lib/firebase";
import { signOut } from "firebase/auth";

export default function SitemapsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useAuth();

    const handleLogout = async () => {
        await signOut(auth);
        router.push('/');
    };

    const links = [
        { href: `/sites`, label: "All Sites", icon: LayoutDashboard },
        { href: `/sitemaps`, label: "Sitemap Generator", icon: Network },
        { href: `/guide`, label: "Guide", icon: BookOpen },
    ];

    return (
        <div className="min-h-screen bg-zinc-950 flex text-zinc-100 font-sans">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-800 bg-zinc-900/30 backdrop-blur-xl flex flex-col">
                <div className="p-6 border-b border-zinc-800">
                    <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        SearchNest
                    </h1>
                </div>

                <nav className="flex-1 p-4 space-y-2">
                    {links.map((link) => {
                        const isActive = pathname.startsWith(link.href);
                        const Icon = link.icon;
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${isActive
                                    ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                                    : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/50 hover:pl-5"
                                    }`}
                            >
                                <Icon size={18} className={isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-300"} />
                                {link.label}
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-zinc-800 bg-zinc-900/20">
                    <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-zinc-800/50 border border-zinc-700/50">
                        <div className="flex items-center gap-3 overflow-hidden">
                            <div className="w-8 h-8 min-w-[32px] rounded-full bg-gradient-to-tr from-purple-500 to-blue-500 flex items-center justify-center text-xs font-bold text-white uppercase">
                                {user?.email?.[0] || 'U'}
                            </div>
                            <div className="truncate">
                                <div className="text-xs font-medium text-white truncate max-w-[100px]" title={user?.email || ''}>
                                    {user?.email || 'User'}
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-700/50 rounded-lg transition-colors"
                            title="Log Out"
                        >
                            <LogOut size={14} />
                        </button>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-auto">
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
