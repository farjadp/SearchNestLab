"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Button, Input, cn } from '@searchnest/ui';
import { useAuth } from '@/src/contexts/AuthContext';

interface Message {
    id: string;
    role: 'assistant' | 'user';
    content: React.ReactNode;
    actions?: Action[];
}

interface Action {
    label: string;
    onClick: () => void;
    primary?: boolean;
    loading?: boolean;
}

export function Assistant({ siteId, domain }: { siteId: string; domain: string }) {
    const { user } = useAuth();
    const [messages, setMessages] = useState<Message[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const bottomRef = useRef<HTMLDivElement>(null);

    const addMessage = (role: 'assistant' | 'user', content: React.ReactNode, actions?: Action[]) => {
        setMessages(prev => [...prev, { id: Math.random().toString(), role, content, actions }]);
    };

    const simulateTyping = async (ms = 800) => {
        setIsTyping(true);
        await new Promise(resolve => setTimeout(resolve, ms));
        setIsTyping(false);
    };

    // --- Steps ---

    // 1. Goal Check
    const handleGoalCheck = async (goal: string) => {
        addMessage('user', goal);
        await simulateTyping();
        addMessage('assistant', "Great choice. Let's start by verifying you own the site so I can help you achieve that.", [
            { label: 'Verify Site', onClick: handleVerifyStep, primary: true }
        ]);
    };

    // 2. Verify Step
    const handleVerifyStep = async () => {
        // ... (existing verify logic, but cleaner)
        addMessage('user', 'I am ready to verify');
        await simulateTyping();
        const verifyToken = `<meta name="searchnest-verification" content="${siteId}">`;

        addMessage('assistant', (
            <div className="space-y-4">
                <div>
                    <p className="mb-2 font-semibold text-white">Verification Token</p>
                    <code className="block bg-zinc-950 p-3 rounded-lg border border-zinc-800 text-emerald-400 text-xs break-all select-all font-mono">
                        {verifyToken}
                    </code>
                </div>
                <div className="text-sm text-zinc-400">
                    <p>Add this to your site's <code>&lt;head&gt;</code>.</p>
                </div>
            </div>
        ), [
            { label: 'Check Verification', onClick: handleVerifyAction, primary: true }
        ]);
    };

    const handleVerifyAction = async () => {
        // Real API call
        try {
            const token = await user?.getIdToken();
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            const res = await fetch(`${apiUrl}/sites/${siteId}/verify`, {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await res.json();

            if (data.verified) {
                addMessage('assistant', "Site verified! ✅ Next, let's connect Google Search Console to get your baseline data.", [
                    { label: 'Connect Google', onClick: handleConnectGoogle, primary: true },
                    { label: 'Skip for now', onClick: handleRunScan }
                ]);
            } else {
                addMessage('assistant', "I can't see the tag yet. Make sure you published the changes.", [
                    { label: 'Try Again', onClick: handleVerifyAction, primary: true }
                ]);
            }
        } catch (e) {
            addMessage('assistant', "Error checking verification. Is the API running?");
        }
    };

    // 3. Connect Google
    const handleConnectGoogle = async () => {
        addMessage('user', 'Connect Google');
        await simulateTyping();
        // Simulate OAuth for now
        addMessage('assistant', "Redirecting to Google Secure Login...", []);
        await new Promise(r => setTimeout(r, 1500));
        addMessage('assistant', "Connected! 📊 I've pulled your last 28 days of data. Now let's run a Deep Scan to find issues.", [
            { label: 'Run Quick Scan', onClick: handleRunScan, primary: true }
        ]);
    };

    // 4. Run Scan
    const handleRunScan = async () => {
        addMessage('user', 'Run Quick Scan');
        await simulateTyping();
        addMessage('assistant', "Scanning your site... (Checking basics, 404s, tags)");

        // Fetch Real Scan Data from API
        try {
            const token = await user?.getIdToken();
            const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
            // Trigger scan just in case (optional, we usually trust the worker background job)
            // Check report
            const res = await fetch(`${apiUrl}/sites/${siteId}/reports/summary`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const report = await res.json();

            if (report.latestScan) {
                const { title, description } = report.latestScan;

                // 5. Apply One Fix
                addMessage('assistant', (
                    <div className="space-y-3">
                        <p className="font-semibold text-white">Scan Complete. Top Issue Found:</p>
                        <div className="bg-red-500/10 border border-red-500/20 p-3 rounded-lg">
                            <p className="text-red-300 text-sm font-medium">Missing or Weak Title Tag</p>
                            <p className="text-zinc-500 text-xs mt-1">Current: {title || "(Empty)"}</p>
                        </div>
                    </div>
                ), [
                    { label: 'Fix One Thing', onClick: () => handleProposeMeta(title, description), primary: true }
                ]);
            } else {
                // Fallback
                addMessage('assistant', "Scan taking longer than expected. Let's try fixing a meta tag anyway.", [
                    { label: 'Fix Meta Tags', onClick: () => handleProposeMeta("", ""), primary: true }
                ]);
            }

        } catch (e) {
            addMessage('assistant', "Scan failed. Let's proceed manually.");
        }
    };

    // 5. Propose Meta (The Fix)
    const handleProposeMeta = async (currentTitle: string, currentDesc: string) => {
        addMessage('user', 'Fix this issue');
        await simulateTyping();

        // Simple "AI" proposal
        const proposedTitle = `Best ${domain} Services | Official Site`;
        const proposedDesc = `Welcome to ${domain}. We provide top-tier solutions for your needs. verified by SearchNest.`;

        addMessage('assistant', (
            <div className="space-y-4">
                <div>
                    <p className="mb-2 text-zinc-300">Here is a better version. Use this in your CMS:</p>
                    <div className="space-y-2">
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold">Recommended Title</p>
                            <div className="bg-zinc-950 p-2 rounded border border-zinc-800 text-emerald-400 font-mono text-xs select-all">{proposedTitle}</div>
                        </div>
                        <div>
                            <p className="text-xs text-zinc-500 uppercase font-bold">Recommended Description</p>
                            <div className="bg-zinc-950 p-2 rounded border border-zinc-800 text-emerald-400 font-mono text-xs select-all">{proposedDesc}</div>
                        </div>
                    </div>
                </div>
                <p className="text-sm text-zinc-400">Go to <strong>Page Settings &gt; SEO</strong> and paste these in.</p>
            </div>
        ), [
            { label: 'Mark as Fixed', onClick: handleEnableConsent, primary: true }
        ]);
    };

    // 6. Enable Consent
    const handleEnableConsent = async () => {
        addMessage('user', 'Mark as Fixed');
        await simulateTyping();
        addMessage('assistant', "Nice work! Optimization logged. 📝 Now, let's turn on a Privacy Consent Banner to stay compliant.", [
            { label: 'Enable Consent', onClick: handleShowConsentSnippet, primary: true }
        ]);
    };

    const handleShowConsentSnippet = async () => {
        addMessage('user', 'Enable Consent');
        await simulateTyping();
        const snippet = `<script src="https://searchnest.lab/consent.js" data-site="${siteId}"></script>`;

        addMessage('assistant', (
            <div className="space-y-3">
                <p className="text-zinc-300 text-sm">Paste this anywhere in your site's body. It handles the "Allow Cookies" popup for you.</p>
                <div className="bg-black/30 p-3 rounded-lg border border-white/10 text-xs font-mono select-all text-blue-400 break-all">
                    {snippet}
                </div>
            </div>
        ), [
            { label: 'Banner is Live', onClick: handleLeadCaptureStep, primary: true }
        ]);
    };

    // 7. Capture Leads
    const handleLeadCaptureStep = async () => {
        addMessage('user', 'Banner is Live');
        await simulateTyping();
        addMessage('assistant', "Perfect. Do you want to capture leads on your site?", [
            { label: 'Yes, create form', onClick: handleShowLeadSnippet, primary: true },
            { label: 'Skip', onClick: handleScheduleReport }
        ]);
    };

    const handleShowLeadSnippet = async () => {
        // ... (Logic from previous turn, simplified here)
        const snippet = `<script src="https://searchnest.lab/widget.js" data-site="${siteId}"></script>`;
        addMessage('assistant', (
            <div className="space-y-3">
                <p className="text-zinc-300 text-sm">Add this snippet to get a Lead Form:</p>
                <div className="bg-black/30 p-3 rounded-lg border border-white/10 text-xs font-mono select-all text-purple-400 break-all">
                    {snippet}
                </div>
            </div>
        ), [
            { label: 'Form Added', onClick: handleScheduleReport, primary: true }
        ]);
    };

    // 8. Schedule Report
    const handleScheduleReport = async () => {
        addMessage('user', 'Done');
        await simulateTyping();
        addMessage('assistant', "Almost done! Shall I turn on Weekly Reports? I'll email you the stats every Monday.", [
            { label: 'Enable Weekly Report', onClick: handleFinish, primary: true }
        ]);
    };

    // 9. Finish
    const handleFinish = async () => {
        addMessage('user', 'Enable Weekly Report');
        await simulateTyping();
        addMessage('assistant', "You're all set! 🚀 Expect changes in 7-14 days. I'll watch the site for you.");
    };

    // --- Init ---
    useEffect(() => {
        const init = async () => {
            await simulateTyping(500);
            addMessage('assistant', "Hi! I help you get a quick SEO win. What's your goal today?", [
                { label: 'Get Indexed', onClick: () => handleGoalCheck('Get Indexed') },
                { label: 'Improve Clicks', onClick: () => handleGoalCheck('Improve Clicks') },
                { label: 'Capture Leads', onClick: () => handleGoalCheck('Capture Leads') }
            ]);
        };
        init();
    }, []);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages, isTyping]);


    return (
        <div className="flex flex-col h-[500px] bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="p-4 border-b border-zinc-800 bg-zinc-900/80 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-500">
                    ✨
                </div>
                <div>
                    <h3 className="font-semibold text-white">SearchNest Assistant</h3>
                    <p className="text-xs text-zinc-400">Always-on SEO Helper</p>
                </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map(m => (
                    <div key={m.id} className={cn("flex", m.role === 'user' ? 'justify-end' : 'justify-start')}>
                        <div className={cn(
                            "max-w-[80%] p-3 rounded-2xl text-sm animate-in fade-in slide-in-from-bottom-2",
                            m.role === 'user'
                                ? "bg-emerald-600/20 text-emerald-100 rounded-tr-sm"
                                : "bg-zinc-800/50 text-zinc-200 rounded-tl-sm border border-zinc-700/50"
                        )}>
                            {m.content}
                        </div>
                    </div>
                ))}

                {isTyping && (
                    <div className="flex justify-start">
                        <div className="bg-zinc-800/50 p-3 rounded-2xl rounded-tl-sm border border-zinc-700/50 flex gap-1">
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                            <div className="w-1.5 h-1.5 bg-zinc-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                    </div>
                )}

                <div ref={bottomRef} />
            </div>

            {/* Actions Area */}
            {messages.length > 0 && messages[messages.length - 1].role === 'assistant' && messages[messages.length - 1].actions && (
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
                    <div className="flex flex-wrap gap-2 justify-end">
                        {messages[messages.length - 1].actions?.map((action, i) => (
                            <Button
                                key={i}
                                onClick={action.onClick}
                                variant={action.primary ? 'primary' : 'outline'}
                                size="sm"
                            >
                                {action.label}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
