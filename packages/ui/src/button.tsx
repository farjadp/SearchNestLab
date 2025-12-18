// ============================================================================
// Hardware Source: packages/ui/src/button.tsx
// Version: 1.2.0 — 2025-12-17
// Why: Premium Button with cn support
// Env / Identity: N/A
// ============================================================================

import React from 'react';
import { cn } from './utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    ...props
}) => {
    return (
        <button
            className={cn(
                "inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed",
                {
                    "bg-gradient-to-r from-blue-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-emerald-500/20 hover:scale-[1.02] border border-transparent": variant === 'primary',
                    "bg-zinc-800 text-zinc-100 hover:bg-zinc-700 border border-zinc-700 shadow-sm hover:shadow-zinc-500/10": variant === 'secondary',
                    "border border-zinc-700 text-zinc-300 hover:text-white hover:border-zinc-500 hover:bg-zinc-800/30": variant === 'outline',
                    "text-zinc-400 hover:text-white hover:bg-zinc-800/50": variant === 'ghost',

                    "px-3 py-1.5 text-xs": size === 'sm',
                    "px-5 py-2.5 text-sm": size === 'md',
                    "px-8 py-4 text-base": size === 'lg',
                },
                className
            )}
            {...props}
        >
            {children}
        </button>
    );
};
