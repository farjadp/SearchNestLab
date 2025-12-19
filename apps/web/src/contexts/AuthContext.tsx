// ============================================================================
// Hardware Source: apps/web/src/contexts/AuthContext.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Manage Firebase Auth state globally
// Env / Identity: N/A
// ============================================================================

"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db } from "@/src/lib/firebase";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";

interface UserProfile {
    uid: string;
    email: string;
    completedOnboarding: boolean;
}

interface AuthContextType {
    user: User | null;
    userProfile: UserProfile | null;
    loading: boolean;
    loginWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    userProfile: null,
    loading: true,
    loginWithGoogle: async () => { }
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setUser(user);
            if (user) {
                try {
                    // Fetch User Profile
                    const userRef = doc(db, "users", user.uid);
                    const userSnap = await getDoc(userRef);

                    if (userSnap.exists()) {
                        setUserProfile(userSnap.data() as UserProfile);
                    } else {
                        // New User - Create Profile
                        const newProfile: UserProfile = {
                            uid: user.uid,
                            email: user.email || "",
                            completedOnboarding: false
                        };
                        await setDoc(userRef, {
                            ...newProfile,
                            createdAt: serverTimestamp(),
                            lastLoginAt: serverTimestamp()
                        });
                        setUserProfile(newProfile);
                    }
                } catch (err) {
                    console.error("Auth Context: Failed to fetch/create user profile", err);
                    // Optionally set a global error state here if added to context
                }
            } else {
                setUserProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check Profile immediately to decide redirect
            const userRef = doc(db, "users", user.uid);
            const userSnap = await getDoc(userRef);
            let profile: UserProfile;

            if (userSnap.exists()) {
                // Update last login
                await setDoc(userRef, { lastLoginAt: serverTimestamp() }, { merge: true });
                profile = userSnap.data() as UserProfile;
            } else {
                profile = {
                    uid: user.uid,
                    email: user.email || "",
                    completedOnboarding: false
                };
                await setDoc(userRef, {
                    ...profile,
                    createdAt: serverTimestamp(),
                    lastLoginAt: serverTimestamp()
                });
            }

            if (profile.completedOnboarding) {
                router.push('/sites');
            } else {
                router.push('/onboarding');
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, userProfile, loading, loginWithGoogle }}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
