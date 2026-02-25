"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Trophy, TrendingUp, Copy, Check, Share2, ChevronRight, Star, Zap, Target, Award, Crown, Sparkles, ArrowUpRight, Users as UsersIcon } from 'lucide-react';

interface ReferralDashboardProps {
    isOpen: boolean;
    onClose: () => void;
    referralCode: string;
}

interface TierData {
    name: string;
    color: string;
    gradient: string;
    emoji: string;
    description: string;
    nextTier: string | null;
    referralsNeeded: number;
}

interface StatsData {
    referralCode: string;
    email: string;
    userType: string;
    referralCount: number;
    tier: string;
    tierDetails: TierData;
    priorityScore: number;
    originalPosition: number;
    currentRank: number;
    totalUsers: number;
    spotsMoved: number;
    progress: number;
    referralsToNextTier: number;
    lastReferralAt: string | null;
    joinedAt: string;
}

const ReferralDashboard: React.FC<ReferralDashboardProps> = ({ isOpen, onClose, referralCode }) => {
    const [stats, setStats] = useState<StatsData | null>(null);
    const [loading, setLoading] = useState(true);
    const [copied, setCopied] = useState(false);
    const [isSharing, setIsSharing] = useState(false);

    const shareUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${window.location.pathname}?ref=${referralCode}`
        : '';

    useEffect(() => {
        if (isOpen && referralCode) {
            fetchStats();
        }
    }, [isOpen, referralCode]);

    const fetchStats = async () => {
        setLoading(true);
        try {
            const response = await fetch(`/api/early-access/stats?code=${referralCode}`);
            const data = await response.json();
            if (data.success) {
                setStats(data.data);
            }
        } catch (error) {
            console.error('Error fetching stats:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
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

    const handleShare = async () => {
        if (isSharing) return;
        setIsSharing(true);
        try {
            await navigator.share({ 
                title: 'Join DineInGo Early Access', 
                text: `Use my code ${referralCode} to join DineInGo early access and move up the priority list! 🦖`,
                url: shareUrl 
            });
        } catch {
            // User cancelled or share failed
        } finally {
            setIsSharing(false);
        }
    };

    const getTierIcon = (tier: string) => {
        switch (tier) {
            case 'platinum': return <Crown className="w-6 h-6" />;
            case 'gold': return <Award className="w-6 h-6" />;
            case 'silver': return <Star className="w-6 h-6" />;
            case 'bronze': return <Trophy className="w-6 h-6" />;
            default: return <Trophy className="w-6 h-6" />;
        }
    };

    const getTierGradient = (tier: string) => {
        switch (tier) {
            case 'platinum': return 'from-gray-300 via-gray-200 to-gray-100';
            case 'gold': return 'from-yellow-400 via-yellow-300 to-yellow-200';
            case 'silver': return 'from-gray-300 via-gray-200 to-gray-100';
            case 'bronze': return 'from-orange-600 via-orange-500 to-orange-400';
            default: return 'from-emerald-500 to-emerald-300';
        }
    };

    const getTierTextColor = (tier: string) => {
        switch (tier) {
            case 'platinum': return 'text-gray-700';
            case 'gold': return 'text-yellow-700';
            case 'silver': return 'text-gray-700';
            case 'bronze': return 'text-orange-700';
            default: return 'text-emerald-700';
        }
    };

    const getTierBgColor = (tier: string) => {
        switch (tier) {
            case 'platinum': return 'bg-gray-50';
            case 'gold': return 'bg-yellow-50';
            case 'silver': return 'bg-gray-50';
            case 'bronze': return 'bg-orange-50';
            default: return 'bg-emerald-50';
        }
    };

    const getTierBorderColor = (tier: string) => {
        switch (tier) {
            case 'platinum': return 'border-gray-200';
            case 'gold': return 'border-yellow-200';
            case 'silver': return 'border-gray-200';
            case 'bronze': return 'border-orange-200';
            default: return 'border-emerald-200';
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[200] flex items-center justify-center px-4">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-premium-black/70 backdrop-blur-lg"
                    />

                    {/* Modal Container */}
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-4xl bg-white rounded-[40px] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-6 right-6 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                        >
                            <X className="w-6 h-6 text-premium-black/40" />
                        </button>

                        <div className="p-8 md:p-12">
                            {loading ? (
                                <div className="flex flex-col items-center justify-center py-20 space-y-4">
                                    <div className="w-16 h-16 border-4 border-emerald-200 border-t-emerald-500 rounded-full animate-spin" />
                                    <p className="text-premium-black/40 font-medium">Loading your stomp stats...</p>
                                </div>
                            ) : stats ? (
                                <div className="space-y-10">
                                    {/* Header */}
                                    <div className="text-center space-y-4">
                                        <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full font-black text-xs uppercase tracking-widest">
                                            <Sparkles className="w-4 h-4" /> Your Stomp Dashboard
                                        </div>
                                        <h2 className="text-4xl md:text-5xl font-black text-premium-black tracking-tight">
                                            Keep <span className="text-gradient-emerald italic">Stomping!</span>
                                        </h2>
                                        <p className="text-premium-black/50 font-medium max-w-lg mx-auto">
                                            Every friend you bring moves you closer to the front of the line.
                                        </p>
                                    </div>

                                    {/* Tier Card */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 }}
                                        className={`relative rounded-[32px] p-8 border-2 ${getTierBorderColor(stats.tier)} ${getTierBgColor(stats.tier)} overflow-hidden`}
                                    >
                                        <div className="absolute top-0 right-0 w-64 h-64 opacity-10">
                                            <div className={`absolute inset-0 bg-gradient-to-br ${getTierGradient(stats.tier)} rounded-full blur-3xl`} />
                                        </div>
                                        
                                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                                            <div className="flex items-center gap-6">
                                                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${getTierGradient(stats.tier)} flex items-center justify-center shadow-lg`}>
                                                    <div className="text-4xl">{stats.tierDetails.emoji}</div>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex items-center gap-2">
                                                        {getTierIcon(stats.tier)}
                                                        <span className={`text-xs font-black uppercase tracking-widest ${getTierTextColor(stats.tier)}`}>
                                                            {stats.tierDetails.name}
                                                        </span>
                                                    </div>
                                                    <h3 className={`text-3xl font-black ${getTierTextColor(stats.tier)}`}>
                                                        {stats.tierDetails.description}
                                                    </h3>
                                                    <p className="text-premium-black/40 font-medium">
                                                        {stats.tier === 'platinum' 
                                                            ? "You've reached the highest tier! Dino bows to you. 🦖"
                                                            : `${stats.referralsToNextTier} more referrals to reach ${stats.tierDetails.nextTier}`
                                                        }
                                                    </p>
                                                </div>
                                            </div>
                                            
                                            {/* Progress Bar */}
                                            {stats.tier !== 'platinum' && (
                                                <div className="w-full md:w-64 space-y-3">
                                                    <div className="flex justify-between text-sm font-bold">
                                                        <span className="text-premium-black/60">Progress to {stats.tierDetails.nextTier}</span>
                                                        <span className="text-premium-black">{stats.progress.toFixed(0)}%</span>
                                                    </div>
                                                    <div className="h-3 bg-white/50 rounded-full overflow-hidden">
                                                        <motion.div
                                                            initial={{ width: 0 }}
                                                            animate={{ width: `${stats.progress}%` }}
                                                            transition={{ duration: 1, ease: "easeOut" }}
                                                            className={`h-full bg-gradient-to-r ${getTierGradient(stats.tier)} rounded-full`}
                                                        />
                                                    </div>
                                                    <div className="text-center text-xs font-bold text-premium-black/40">
                                                        {stats.referralCount} / {stats.tierDetails.referralsNeeded} referrals
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Stats Grid */}
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                        {/* Position Card */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.2 }}
                                            className="bg-white p-6 rounded-[24px] border border-premium-black/5 shadow-lg space-y-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                                                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-premium-black/40">Your Position</p>
                                                    <h4 className="text-3xl font-black text-premium-black">#{stats.currentRank}</h4>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-premium-black/40">Original</span>
                                                    <span className="font-bold text-premium-black">#{stats.originalPosition}</span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-premium-black/40">Spots Moved</span>
                                                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                                                        <ArrowUpRight className="w-4 h-4" /> {stats.spotsMoved}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-premium-black/40">Total Waitlist</span>
                                                    <span className="font-bold text-premium-black">{stats.totalUsers}</span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Referrals Card */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.3 }}
                                            className="bg-white p-6 rounded-[24px] border border-premium-black/5 shadow-lg space-y-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-gold/10 flex items-center justify-center">
                                                    <UsersIcon className="w-6 h-6 text-gold" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-premium-black/40">Referrals</p>
                                                    <h4 className="text-3xl font-black text-premium-black">{stats.referralCount}</h4>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-premium-black/40">Priority Boost</span>
                                                    <span className="font-bold text-emerald-600">
                                                        +{stats.spotsMoved} spots
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <span className="text-sm text-premium-black/40">Last Referral</span>
                                                    <span className="font-bold text-premium-black">
                                                        {stats.lastReferralAt 
                                                            ? new Date(stats.lastReferralAt).toLocaleDateString('en-US', {
                                                                month: 'short',
                                                                day: 'numeric',
                                                                year: 'numeric',
                                                                hour: '2-digit',
                                                                minute: '2-digit'
                                                            })
                                                            : 'None yet'
                                                        }
                                                    </span>
                                                </div>
                                            </div>
                                        </motion.div>

                                        {/* Share Card */}
                                        <motion.div
                                            initial={{ y: 20, opacity: 0 }}
                                            animate={{ y: 0, opacity: 1 }}
                                            transition={{ delay: 0.4 }}
                                            className="bg-gradient-to-br from-emerald-500 to-teal-400 p-6 rounded-[24px] shadow-lg space-y-4"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                                    <Zap className="w-6 h-6 text-white" />
                                                </div>
                                                <div>
                                                    <p className="text-xs font-black uppercase tracking-widest text-white/80">Your Code</p>
                                                    <h4 className="text-3xl font-black text-white tracking-widest">{stats.referralCode}</h4>
                                                </div>
                                            </div>
                                            <div className="space-y-3">
                                                <div className="bg-white/10 rounded-xl p-3">
                                                    <p className="text-white/90 text-sm font-medium break-all">{shareUrl}</p>
                                                </div>
                                                <div className="flex gap-3">
                                                    <button
                                                        onClick={handleCopy}
                                                        className="flex-1 flex items-center justify-center gap-2 py-3 bg-white text-emerald-600 rounded-xl font-bold text-sm hover:bg-white/90 transition-all"
                                                    >
                                                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                        {copied ? 'Copied!' : 'Copy Link'}
                                                    </button>
                                                    {typeof navigator !== 'undefined' && typeof navigator.share === 'function' && (
                                                        <button
                                                            onClick={handleShare}
                                                            disabled={isSharing}
                                                            className="flex items-center justify-center gap-2 px-4 py-3 bg-white/20 text-white rounded-xl font-bold text-sm hover:bg-white/30 transition-all disabled:opacity-50"
                                                        >
                                                            <Share2 className="w-4 h-4" />
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </motion.div>
                                    </div>

                                    {/* Tier Benefits */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-premium-black/5 rounded-[32px] p-8 space-y-6"
                                    >
                                        <div className="flex items-center gap-3">
                                            <Target className="w-6 h-6 text-emerald-500" />
                                            <h3 className="text-2xl font-black text-premium-black">Tier Benefits</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                            {[
                                                { tier: 'Bronze', refs: '1-4', boost: '+10 spots', color: 'border-orange-200', emoji: '🥉' },
                                                { tier: 'Silver', refs: '5-9', boost: '+25 spots', color: 'border-gray-200', emoji: '🥈' },
                                                { tier: 'Gold', refs: '10-19', boost: '+50 spots', color: 'border-yellow-200', emoji: '🥇' },
                                                { tier: 'Platinum', refs: '20+', boost: '+100 spots', color: 'border-gray-300', emoji: '💎' },
                                            ].map((tierInfo, i) => (
                                                <div key={i} className={`p-4 rounded-2xl border-2 ${tierInfo.color} ${stats.tier.toLowerCase() === tierInfo.tier.toLowerCase() ? 'bg-white shadow-lg' : 'bg-white/50'}`}>
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-2xl">{tierInfo.emoji}</span>
                                                        {stats.tier.toLowerCase() === tierInfo.tier.toLowerCase() && (
                                                            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
                                                        )}
                                                    </div>
                                                    <h4 className="font-black text-premium-black">{tierInfo.tier}</h4>
                                                    <p className="text-xs text-premium-black/40 font-medium">{tierInfo.refs} referrals</p>
                                                    <p className="text-sm font-bold text-emerald-600 mt-2">{tierInfo.boost}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>

                                    {/* CTA */}
                                    <motion.div
                                        initial={{ y: 20, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{ delay: 0.6 }}
                                        className="text-center space-y-4"
                                    >
                                        <p className="text-premium-black/50 font-medium">
                                            Every friend you bring moves you up the priority list. Share your code and watch your position improve!
                                        </p>
                                        <button
                                            onClick={onClose}
                                            className="inline-flex items-center gap-2 font-black text-premium-black/40 hover:text-premium-black transition-colors text-sm"
                                        >
                                            Back to Landing <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="text-center py-20 space-y-4">
                                    <div className="w-20 h-20 mx-auto bg-emerald-50 rounded-full flex items-center justify-center">
                                        <X className="w-10 h-10 text-emerald-500" />
                                    </div>
                                    <h3 className="text-2xl font-black text-premium-black">Unable to load stats</h3>
                                    <p className="text-premium-black/40 font-medium">Please try again later or contact support.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default ReferralDashboard;