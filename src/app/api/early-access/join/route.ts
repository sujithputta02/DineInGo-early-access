import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EarlyAccess } from '@/models/EarlyAccess';
import { sendEmail } from '@/lib/email';
import { getUserWelcomeEmail } from '@/lib/emailTemplates/userWelcome';
import { getBusinessWelcomeEmail } from '@/lib/emailTemplates/businessWelcome';

// Generate a truly unique referral code: DINO-XXXXXX (6 random chars)
// Using crypto.randomBytes for cryptographically secure randomness
// 32-char alphabet → 32^6 ≈ 1.07B combinations, essentially collision-free
function generateReferralCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = 'DINO-';
    
    // Use crypto for better randomness (Node.js built-in)
    const crypto = require('crypto');
    const randomBytes = crypto.randomBytes(6);
    
    // Convert random bytes to chars from our alphabet
    for (let i = 0; i < 6; i++) {
        const index = randomBytes[i] % chars.length;
        code += chars[index];
    }
    
    return code;
}

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

// Update referrer's stats when someone uses their code
async function updateReferrerStats(referralCode: string) {
    try {
        const referrer = await EarlyAccess.findOne({ referralCode });
        if (!referrer) return;

        // Update referral count
        const newReferralCount = (referrer.referralCount || 0) + 1;
        
        // Calculate new tier
        const newTier = calculateTier(newReferralCount);
        
        // Calculate new priority score
        const tierBoost = getTierBoost(newTier);
        const continuousBonus = newReferralCount * 2; // +2 points per referral
        const newPriorityScore = referrer.originalPosition - tierBoost - continuousBonus;

        // Update referrer
        await EarlyAccess.updateOne(
            { referralCode },
            {
                referralCount: newReferralCount,
                tier: newTier,
                priorityScore: newPriorityScore,
                lastReferralAt: new Date()
            }
        );

        console.log(`✅ Updated referrer ${referralCode}: ${newReferralCount} refs → ${newTier} tier → priority: ${newPriorityScore}`);
    } catch (error) {
        console.error('❌ Error updating referrer stats:', error);
    }
}

// Mark this route as dynamic to prevent static generation at build time
export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
    try {
        const { email, userType, referralCode: usedCode } = await req.json();

        console.log('📥 Signup request:', { email, userType, usedCode });

        if (!email || !['user', 'business'].includes(userType)) {
            return NextResponse.json(
                { success: false, message: 'Valid email and userType are required.' },
                { status: 400 }
            );
        }

        console.log('🔌 Connecting to database...');
        await connectDB();
        console.log('✅ Database connected');

        // Check for duplicate — same email + same userType
        const existing = await EarlyAccess.findOne({ email: email.toLowerCase(), userType });
        if (existing) {
            console.log('⚠️ Duplicate signup:', email);
            return NextResponse.json({
                success: true,
                message: "You're already on the list! Dino is guarding your spot 🦖",
                referralCode: existing.referralCode,
            });
        }

        // Generate a unique referral code (retry up to 10 times for absolute safety)
        let referralCode = '';
        for (let attempt = 0; attempt < 10; attempt++) {
            const candidate = generateReferralCode();
            const taken = await EarlyAccess.findOne({ referralCode: candidate });
            if (!taken) {
                referralCode = candidate;
                break;
            }
        }

        if (!referralCode) {
            console.error('❌ Could not generate unique referral code');
            return NextResponse.json(
                { success: false, message: 'Could not generate a unique code. Please try again.' },
                { status: 500 }
            );
        }

        console.log('🎫 Generated referral code:', referralCode);

        // Validate the referredBy code exists (if provided)
        let referredBy: string | null = null;
        if (usedCode) {
            const referrer = await EarlyAccess.findOne({ referralCode: usedCode.toUpperCase() });
            if (referrer) referredBy = usedCode.toUpperCase();
        }

        // Get position (count of same userType before this one)
        const position = (await EarlyAccess.countDocuments({ userType })) + 1;

        // Calculate initial priority score (just position for now)
        const priorityScore = position;

        // Save to DB
        await EarlyAccess.create({
            email: email.toLowerCase().trim(),
            userType,
            referralCode,
            referredBy,
            originalPosition: position,
            priorityScore,
            tier: 'bronze',
            referralCount: 0,
        });

        // If this person was referred, update the referrer's stats
        if (referredBy) {
            await updateReferrerStats(referredBy);
        }

        console.log(`✅ Saved to DB: ${email} (${userType}) | code: ${referralCode} | position: #${position}`);

        // Get base URL from environment (works with or without domain)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:6173';

        // Send welcome email — separate template per userType
        try {
            console.log('📧 Sending email to:', email);
            if (userType === 'user') {
                await sendEmail(
                    email,
                    `🦖 You're on the DineInGo List! Your code: ${referralCode}`,
                    getUserWelcomeEmail(referralCode, position, baseUrl)
                );
            } else {
                await sendEmail(
                    email,
                    `🏛️ Your Venue is Reserved on DineInGo! Code: ${referralCode}`,
                    getBusinessWelcomeEmail(referralCode, position, baseUrl)
                );
            }
            console.log(`✅ Email sent successfully to ${email}`);
        } catch (emailError: any) {
            // Don't fail the signup if email fails — log and continue
            console.error('⚠️ Email send failed (signup still succeeded):', emailError?.message || emailError);
        }

        return NextResponse.json({ success: true, referralCode }, { status: 201 });

    } catch (error: any) {
        console.error('❌ Early access join error:', error);
        console.error('Error details:', {
            message: error?.message,
            stack: error?.stack,
            name: error?.name
        });
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again.' },
            { status: 500 }
        );
    }
}
