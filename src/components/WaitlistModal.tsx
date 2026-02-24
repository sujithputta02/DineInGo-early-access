"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, Building2, Send, CheckCircle2, ArrowRight, Copy, Check, Share2, BarChart3 } from 'lucide-react';
import ReferralDashboard from './ReferralDashboard';

interface WaitlistModalProps {
    isOpen: boolean;
    onClose: () => void;
}

type Step = 'selection' | 'email' | 'success';
type UserType = 'user' | 'business' | null;

const WaitlistModal: React.FC<WaitlistModalProps> = ({ isOpen, onClose }) => {
    const [step, setStep] = useState<Step>('selection');
    const [userType, setUserType] = useState<UserType>(null);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [referralCode, setReferralCode] = useState(''); // Their generated code
    const [inboundRef, setInboundRef] = useState('');    // Code they came in with
    const [copied, setCopied] = useState(false);
    const [isSharing, setIsSharing] = useState(false);
    const [showDashboard, setShowDashboard] = useState(false);

    // Read ?ref= from URL on mount
    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const ref = params.get('ref');
        if (ref) setInboundRef(ref.toUpperCase());
    }, []);

    const resetModal = () => {
        setStep('selection');
        setUserType(null);
        setEmail('');
        setLoading(false);
        setReferralCode('');
        setCopied(false);
    };

    const handleClose = () => {
        onClose();
        setTimeout(resetModal, 300);
    };

    const handleSelect = (type: UserType) => {
        setUserType(type);
        setStep('email');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setLoading(true);
        try {
            const response = await fetch('/api/early-access/join', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, userType, referralCode: inboundRef || undefined }),
            });

            const data = await response.json();

            if (data.success) {
                setReferralCode(data.referralCode || '');
                setStep('success');
            } else {
                alert(data.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            console.error('Error joining early access:', error);
            alert('Unable to connect. Please try again shortly.');
        } finally {
            setLoading(false);
        }
    };

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}?ref=${referralCode}`
        : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // Fallback
            const ta = document.createElement('textarea');
            ta.value = shareUrl;
            document.body.appendChild(ta);
            ta.select();
            document.execCommand('copy');
            document.body.removeChild(ta);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <>
            <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={handleClose}
                        className="absolute inset-0 bg-premium-black/60 backdrop-blur-md"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-2xl bg-white rounded-[40px] shadow-2xl overflow-hidden"
                    >
                        {/* Close Button */}
                        <button
                            onClick={handleClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                        >
                            <X className="w-6 h-6 text-premium-black/40" />
                        </button>

                        <div className="p-8 md:p-12">
                            <AnimatePresence mode="wait">
                                {/* ── STEP 1: Selection ── */}
                                {step === 'selection' && (
                                    <motion.div
                                        key="selection"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center space-y-2">
                                            <h2 className="text-4xl md:text-5xl font-black text-premium-black tracking-tight">
                                                Join the <span className="text-gradient-emerald italic">Feast.</span>
                                            </h2>
                                            <p className="text-premium-black/50 font-medium">Which path are you taking?</p>
                                            {inboundRef && (
                                                <p className="text-xs text-emerald-600 font-bold tracking-widest uppercase">
                                                    🦖 Referred by {inboundRef}
                                                </p>
                                            )}
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <button
                                                onClick={() => handleSelect('user')}
                                                className="group relative p-8 bg-emerald-50 rounded-[32px] border-2 border-transparent hover:border-emerald-200 transition-all text-left overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                                                <Users className="w-12 h-12 text-emerald-500 mb-6 group-hover:scale-110 transition-transform" />
                                                <h3 className="text-2xl font-black text-premium-black mb-2">I'm a Foodie</h3>
                                                <p className="text-premium-black/40 font-medium text-sm">Discover and book the best venues with AI curation.</p>
                                            </button>

                                            <button
                                                onClick={() => handleSelect('business')}
                                                className="group relative p-8 bg-gold/5 rounded-[32px] border-2 border-transparent hover:border-gold/20 transition-all text-left overflow-hidden"
                                            >
                                                <div className="absolute top-0 right-0 w-32 h-32 bg-gold/5 rounded-full translate-x-1/2 -translate-y-1/2" />
                                                <Building2 className="w-12 h-12 text-gold mb-6 group-hover:scale-110 transition-transform" />
                                                <h3 className="text-2xl font-black text-premium-black mb-2">I'm a Venue</h3>
                                                <p className="text-premium-black/40 font-medium text-sm">Scale your guest flow and manage your floor in 3D.</p>
                                            </button>
                                        </div>
                                    </motion.div>
                                )}

                                {/* ── STEP 2: Email ── */}
                                {step === 'email' && (
                                    <motion.div
                                        key="email"
                                        initial={{ x: 20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        exit={{ x: -20, opacity: 0 }}
                                        className="space-y-8"
                                    >
                                        <div className="text-center space-y-2">
                                            <button
                                                onClick={() => setStep('selection')}
                                                className="text-emerald-600 font-black text-xs uppercase tracking-widest hover:underline"
                                            >
                                                ← Change Selection
                                            </button>
                                            <h2 className="text-4xl md:text-5xl font-black text-premium-black tracking-tight">
                                                Nearly <span className="text-emerald-500 italic">There!</span>
                                            </h2>
                                            <p className="text-premium-black/50 font-medium">
                                                Enter your email to secure your spot for the {userType === 'user' ? 'Foodie' : 'Venue'} early access.
                                            </p>
                                        </div>

                                        <form onSubmit={handleSubmit} className="space-y-4">
                                            <div className="relative">
                                                <input
                                                    type="email"
                                                    required
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    placeholder="yourname@email.com"
                                                    className="w-full px-8 py-6 bg-gray-50 border-2 border-transparent focus:border-emerald-200 outline-none rounded-2xl text-lg font-medium transition-all"
                                                />
                                            </div>
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="w-full py-6 bg-premium-black text-white rounded-2xl font-black text-xl hover:bg-premium-black/90 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                                            >
                                                {loading ? (
                                                    <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin" />
                                                ) : (
                                                    <>Reserve My Access <Send className="w-5 h-5" /></>
                                                )}
                                            </button>
                                        </form>
                                    </motion.div>
                                )}

                                {/* ── STEP 3: Success + Referral Code ── */}
                                {step === 'success' && (
                                    <motion.div
                                        key="success"
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        className="text-center space-y-6 py-6"
                                    >
                                        <div className="flex justify-center">
                                            <div className="relative">
                                                <motion.div
                                                    animate={{ scale: [1, 1.1, 1] }}
                                                    transition={{ duration: 2, repeat: Infinity }}
                                                    className="w-28 h-28 bg-emerald-100 rounded-full flex items-center justify-center"
                                                >
                                                    <CheckCircle2 className="w-14 h-14 text-emerald-500" />
                                                </motion.div>
                                                <motion.div
                                                    animate={{ y: [0, -10, 0], rotate: [0, 5, -5, 0] }}
                                                    transition={{ duration: 3, repeat: Infinity }}
                                                    className="absolute -top-4 -right-4 w-14 h-14"
                                                >
                                                    <img src="/images/Dino Icon.svg" alt="Dino" className="w-full h-full object-contain" />
                                                </motion.div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h2 className="text-4xl md:text-5xl font-black text-premium-black tracking-tight">
                                                You're on the <span className="text-emerald-500 italic">List!</span>
                                            </h2>
                                            <p className="text-premium-black/50 font-medium max-w-sm mx-auto leading-relaxed">
                                                RAWR! Dino is guarding your spot. We'll reach out as soon as the doors open.
                                            </p>
                                        </div>

                                        {/* Referral Code Section */}
                                        {referralCode && (
                                            <motion.div
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.3 }}
                                                className="bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-6 space-y-4"
                                            >
                                                <div className="space-y-1">
                                                    <p className="text-xs font-black uppercase tracking-widest text-emerald-600">
                                                        🦖 Your Stomp Code
                                                    </p>
                                                    <p className="text-3xl font-black text-premium-black tracking-widest">
                                                        {referralCode}
                                                    </p>
                                                    <p className="text-premium-black/40 text-sm font-medium">
                                                        Share this with friends to move up the priority list
                                                    </p>
                                                </div>

                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={handleCopy}
                                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-premium-black text-white rounded-xl font-bold text-sm hover:bg-premium-black/90 transition-all"
                                                    >
                                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                        {copied ? 'Copied!' : 'Copy Link'}
                                                    </button>
                                                    {typeof navigator !== 'undefined' && navigator.share && (
                                                        <button
                                                            onClick={async () => {
                                                                if (isSharing) return;
                                                                setIsSharing(true);
                                                                try {
                                                                    await navigator.share({ title: 'Join DineInGo Early Access', url: shareUrl });
                                                                } catch {
                                                                    // User cancelled or share failed — not an error
                                                                } finally {
                                                                    setIsSharing(false);
                                                                }
                                                            }}
                                                            disabled={isSharing}
                                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-emerald-500 text-white rounded-xl font-bold text-sm hover:bg-emerald-600 transition-all disabled:opacity-50"
                                                        >
                                                            <Share2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </motion.div>
                                        )}

                                        {/* Survey CTA - Only for Users */}
                                        {userType === 'user' && (
                                            <motion.div
                                                initial={{ y: 10, opacity: 0 }}
                                                animate={{ y: 0, opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                                className="bg-white border-2 border-emerald-100 rounded-[24px] p-6 space-y-4 shadow-lg"
                                            >
                                                <div className="flex items-start gap-4">
                                                    <div className="w-14 h-14 bg-emerald-100 rounded-[20px] flex items-center justify-center shrink-0">
                                                        <span className="text-2xl">📋</span>
                                                    </div>
                                                    <div className="space-y-2 flex-1">
                                                        <h4 className="text-xl font-black text-premium-black">Help Shape DineInGo!</h4>
                                                        <p className="text-sm text-premium-black/50 font-medium leading-relaxed">
                                                            Take our quick 1-2 minute survey. Your feedback helps us enhance DineInGo to better serve you.
                                                        </p>
                                                    </div>
                                                </div>
                                                <a
                                                    href="https://tally.so/r/gD0ZLK"
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-emerald-500 to-teal-400 text-white rounded-[16px] font-black text-base hover:shadow-xl hover:shadow-emerald-500/30 transition-all"
                                                >
                                                    <span>Take Survey Now</span>
                                                    <ArrowRight className="w-5 h-5" />
                                                </a>
                                            </motion.div>
                                        )}

                                        <div className="flex flex-col gap-4">
                                            <button
                                                onClick={() => setShowDashboard(true)}
                                                className="w-full flex items-center justify-center gap-3 py-5 bg-emerald-500 text-white rounded-[20px] font-black text-base shadow-xl shadow-emerald-500/20 hover:bg-emerald-600 hover:shadow-2xl hover:shadow-emerald-500/30 transition-all"
                                            >
                                                <BarChart3 className="w-5 h-5" />
                                                View Your Stomp Stats
                                            </button>
                                            <button
                                                onClick={handleClose}
                                                className="inline-flex items-center justify-center gap-2 font-bold text-premium-black/40 hover:text-premium-black transition-colors text-sm"
                                            >
                                                Back to Landing <ArrowRight className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>

            {/* Referral Dashboard */}
            {referralCode && (
                <ReferralDashboard
                    isOpen={showDashboard}
                    onClose={() => setShowDashboard(false)}
                    referralCode={referralCode}
                />
            )}
        </>
    );
};

export default WaitlistModal;
