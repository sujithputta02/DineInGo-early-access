import * as dotenv from 'dotenv';
import { connectDB } from '../src/lib/db';
import { EarlyAccess } from '../src/models/EarlyAccess';

// Load environment variables
dotenv.config({ path: '.env.local' });

// Calculate tier based on referral count
function calculateTier(referralCount: number): 'bronze' | 'silver' | 'gold' | 'platinum' {
    if (referralCount >= 20) return 'platinum';
    if (referralCount >= 10) return 'gold';
    if (referralCount >= 5) return 'silver';
    return 'bronze';
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

async function fixPriorityScores() {
    try {
        console.log('🔌 Connecting to database...');
        await connectDB();
        console.log('✅ Connected');

        // Get all users
        const users = await EarlyAccess.find({});
        console.log(`📊 Found ${users.length} users to update`);

        let updated = 0;
        for (const user of users) {
            // Recalculate tier
            const correctTier = calculateTier(user.referralCount);
            
            // Recalculate priority score (HIGHER is better)
            const tierBoost = getTierBoost(correctTier);
            const continuousBonus = user.referralCount * 2;
            const correctPriorityScore = tierBoost + continuousBonus;

            // Update if different
            if (user.tier !== correctTier || user.priorityScore !== correctPriorityScore) {
                await EarlyAccess.updateOne(
                    { _id: user._id },
                    {
                        tier: correctTier,
                        priorityScore: correctPriorityScore
                    }
                );
                
                console.log(`✅ Updated ${user.email}:`);
                console.log(`   Referrals: ${user.referralCount}`);
                console.log(`   Tier: ${user.tier} → ${correctTier}`);
                console.log(`   Priority: ${user.priorityScore} → ${correctPriorityScore}`);
                updated++;
            }
        }

        console.log(`\n🎉 Migration complete! Updated ${updated} out of ${users.length} users.`);
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error);
        process.exit(1);
    }
}

fixPriorityScores();
