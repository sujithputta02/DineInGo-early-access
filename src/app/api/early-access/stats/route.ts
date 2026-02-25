import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EarlyAccess } from '@/models/EarlyAccess';

// Calculate tier based on referral count
function calculateTier(referralCount: number): 'bronze' | 'silver' | 'gold' | 'platinum' {
    if (referralCount >= 20) return 'platinum';
    if (referralCount >= 10) return 'gold';
    if (referralCount >= 5) return 'silver';
    return 'bronze';
}

// Get tier details
function getTierDetails(tier: string) {
    switch (tier) {
        case 'platinum':
            return {
                name: 'Platinum Stomper',
                color: '#E5E4E2', // Platinum color
                gradient: 'from-gray-300 to-gray-100',
                emoji: '💎',
                description: 'Dino bows to you!',
                nextTier: null,
                referralsNeeded: 0
            };
        case 'gold':
            return {
                name: 'Gold Stomper',
                color: '#FFD700', // Gold color
                gradient: 'from-yellow-400 to-yellow-200',
                emoji: '🥇',
                description: 'Dino is impressed!',
                nextTier: 'platinum',
                referralsNeeded: 20
            };
        case 'silver':
            return {
                name: 'Silver Stomper',
                color: '#C0C0C0', // Silver color
                gradient: 'from-gray-300 to-gray-100',
                emoji: '🥈',
                description: 'The ground is shaking!',
                nextTier: 'gold',
                referralsNeeded: 10
            };
        case 'bronze':
        default:
            return {
                name: 'Bronze Stomper',
                color: '#CD7F32', // Bronze color
                gradient: 'from-orange-600 to-orange-400',
                emoji: '🥉',
                description: 'You\'re making footprints!',
                nextTier: 'silver',
                referralsNeeded: 5
            };
    }
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const referralCode = searchParams.get('code');

        if (!referralCode) {
            return NextResponse.json(
                { success: false, message: 'Referral code is required' },
                { status: 400 }
            );
        }

        await connectDB();

        // Find the user
        const user = await EarlyAccess.findOne({ referralCode });
        if (!user) {
            return NextResponse.json(
                { success: false, message: 'Referral code not found' },
                { status: 404 }
            );
        }

        // Get tier details
        const tierDetails = getTierDetails(user.tier);
        
        // Calculate progress to next tier
        let progress = 0;
        let referralsToNextTier = 0;
        
        if (tierDetails.nextTier) {
            referralsToNextTier = tierDetails.referralsNeeded - user.referralCount;
            progress = Math.min(100, Math.max(0, (user.referralCount / tierDetails.referralsNeeded) * 100));
        } else {
            progress = 100; // Platinum is max tier
        }

        // Get leaderboard position (rank by priorityScore DESC - higher is better)
        const rank = await EarlyAccess.countDocuments({
            userType: user.userType,
            priorityScore: { $gt: user.priorityScore }
        }) + 1;

        // Get total users of same type
        const totalUsers = await EarlyAccess.countDocuments({ userType: user.userType });

        // Calculate spots moved up (positive number means moved up)
        const spotsMoved = Math.max(0, user.originalPosition - rank);

        return NextResponse.json({
            success: true,
            data: {
                referralCode: user.referralCode,
                email: user.email,
                userType: user.userType,
                referralCount: user.referralCount,
                tier: user.tier,
                tierDetails,
                priorityScore: user.priorityScore,
                originalPosition: user.originalPosition,
                currentRank: rank,
                totalUsers,
                spotsMoved,
                progress,
                referralsToNextTier,
                lastReferralAt: user.lastReferralAt,
                joinedAt: user.joinedAt
            }
        });

    } catch (error) {
        console.error('Stats API error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error' },
            { status: 500 }
        );
    }
}

export const dynamic = 'force-dynamic';