// ============================================================================
// Hardware Source: apps/web/app/(auth)/layout.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Shared layout for authentication pages
// Env / Identity: N/A
// ============================================================================

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-zinc-950 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
            <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-500 opacity-20 blur-[100px]"></div>

            <div className="relative z-10 w-full max-w-md p-6">
                <div className="mb-8 text-center">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-emerald-400">
                        SearchNest
                    </h1>
                </div>

                {children}
            </div>
        </div>
    );
}
