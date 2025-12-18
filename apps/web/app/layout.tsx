// ============================================================================
// Hardware Source: apps/web/app/layout.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Root layout for the application
// Env / Identity: N/A
// ============================================================================

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "SearchNest Lab",
    description: "SEO for SMEs",
};

import { AuthProvider } from "@/src/contexts/AuthContext";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className} antialiased selection:bg-emerald-500/30`}>
                <AuthProvider>{children}</AuthProvider>
            </body>
        </html>
    );
}
