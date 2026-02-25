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

// Calculate launch reward based on tier (not position - to avoid business losses)
function calculateLaunchReward(tier: string, referralCount: number): { discount: number; description: string; badge: string } {
    switch (tier) {
        case 'platinum':
            return { 
                discount: 20, 
                description: '20% OFF your first booking', 
                badge: '💎 Platinum Founder' 
            };
        case 'gold':
            return { 
                discount: 15, 
                description: '15% OFF your first booking', 
                badge: '🥇 Gold Founder' 
            };
        case 'silver':
            return { 
                discount: 10, 
                description: '10% OFF your first booking', 
                badge: '🥈 Silver Founder' 
            };
        case 'bronze':
        default:
            return { 
                discount: 5, 
                description: '5% OFF your first booking', 
                badge: '🥉 Bronze Founder' 
            };
    }
}

// Calculate tier boost points
function getTierBoost(tier: string): number {
    switch (tier) {
        case 'platinum': return 100;
        case 'gold': return 50;
        case 'silver': return 25;
        case 'bronze': return 10;
        default: return 0;
    }
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

        // Calculate REAL referral count dynamically (counts actual users who used this code)
        const actualReferralCount = await EarlyAccess.countDocuments({ 
            referredBy: user.referralCode 
        });

        // Recalculate tier based on actual count
        const actualTier = calculateTier(actualReferralCount);
        
        // Recalculate priority score based on actual count
        const tierBoost = getTierBoost(actualTier);
        const continuousBonus = actualReferralCount * 2;
        const actualPriorityScore = tierBoost + continuousBonus;

        // Update user if counts are different (sync database with reality)
        if (actualReferralCount !== user.referralCount || actualTier !== user.tier || actualPriorityScore !== user.priorityScore) {
            await EarlyAccess.updateOne(
                { referralCode },
                {
                    referralCount: actualReferralCount,
                    tier: actualTier,
                    priorityScore: actualPriorityScore
                }
            );
            console.log(`🔄 Synced stats for ${user.email}: ${actualReferralCount} refs, ${actualTier} tier, ${actualPriorityScore} priority`);
        }

        // Get tier details based on actual tier
        const tierDetails = getTierDetails(actualTier);
        
        // Calculate progress to next tier (using actual count)
        let progress = 0;
        let referralsToNextTier = 0;
        let targetScore = 0; // Score needed to reach next tier
        
        if (tierDetails.nextTier) {
            referralsToNextTier = tierDetails.referralsNeeded - actualReferralCount;
            progress = Math.min(100, Math.max(0, (actualReferralCount / tierDetails.referralsNeeded) * 100));
            
            // Calculate target score for next tier
            const nextTierDetails = getTierDetails(tierDetails.nextTier);
            const nextTierBoost = getTierBoost(tierDetails.nextTier);
            targetScore = nextTierBoost + (tierDetails.referralsNeeded * 2);
        } else {
            progress = 100; // Platinum is max tier
            targetScore = actualPriorityScore; // Already at max
        }

        // Get leaderboard position (rank by priorityScore DESC - higher is better)
        const rank = await EarlyAccess.countDocuments({
            userType: user.userType,
            priorityScore: { $gt: actualPriorityScore }
        }) + 1;

        // Get total users of same type
        const totalUsers = await EarlyAccess.countDocuments({ userType: user.userType });

        // Calculate spots moved up (positive number means moved up)
        const spotsMoved = Math.max(0, user.originalPosition - rank);

        // Calculate launch reward based on actual tier (not position)
        const launchReward = calculateLaunchReward(actualTier, actualReferralCount);

        return NextResponse.json({
            success: true,
            data: {
                referralCode: user.referralCode,
                email: user.email,
                userType: user.userType,
                referralCount: actualReferralCount,
                tier: actualTier,
                tierDetails,
                priorityScore: actualPriorityScore,
                targetScore,
                originalPosition: user.originalPosition,
                currentRank: rank,
                totalUsers,
                spotsMoved,
                progress,
                referralsToNextTier,
                lastReferralAt: user.lastReferralAt,
                joinedAt: user.joinedAt,
                launchReward
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