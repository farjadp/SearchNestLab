// ============================================================================
// Hardware Source: packages/ui/src/input.tsx
// Version: 1.1.0 — 2025-12-17
// Why: Premium Input
// Env / Identity: N/A
// ============================================================================

import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export const Input: React.FC<InputProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full space-y-2">
            {label && (
                <label className="block text-sm font-medium text-zinc-400">
                    {label}
                </label>
            )}
            <input
                className={`
                    w-full px-4 py-3 
                    bg-zinc-900/50 backdrop-blur-sm 
                    border border-zinc-800 
                    rounded-xl 
                    text-white placeholder:text-zinc-600
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50
                    hover:border-zinc-700
                    disabled:opacity-50 disabled:cursor-not-allowed
                    ${className}
                `}
                {...props}
            />
            {error && (
                <p className="text-sm text-red-400">{error}</p>
            )}
        </div>
    );
};
