// ============================================================================
// Hardware Source: apps/web/app/(auth)/signup/page.tsx
// Version: 1.1.0 — 2025-12-17
// Why: User Sign Up
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { useState } from "react";
import Link from "next/link";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "@/src/lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { Button, Input } from "@searchnest/ui";

export default function SignUpPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSignUp = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await updateProfile(user, { displayName: name });

            // Initial user document in Firestore
            await setDoc(doc(db, "users", user.uid), {
                email: user.email,
                name: name,
                createdAt: new Date(),
            });

            router.push("/onboarding");
        } catch (err: any) {
            setError(err.message || "Failed to create account");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-xl">
            <h2 className="text-2xl font-semibold text-white mb-6 text-center">Create Account</h2>

            <form onSubmit={handleSignUp} className="space-y-4">
                <Input
                    label="Full Name"
                    type="text"
                    value={name}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                    placeholder="John Doe"
                    required
                />

                <Input
                    label="Email"
                    type="email"
                    value={email}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    required
                />

                <Input
                    label="Password"
                    type="password"
                    value={password}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    required
                />

                {error && (
                    <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                        {error}
                    </div>
                )}

                <Button
                    type="submit"
                    disabled={loading}
                    className="w-full"
                    size="lg"
                >
                    {loading ? "Creating Account..." : "Sign Up"}
                </Button>
            </form>

            <div className="mt-6 text-center text-sm text-zinc-400">
                Already have an account?{" "}
                <Link href="/signin" className="text-blue-400 hover:text-blue-300 font-medium">
                    Sign in
                </Link>
            </div>
        </div>
    );
}
