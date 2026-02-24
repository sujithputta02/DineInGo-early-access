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

export async function POST(req: NextRequest) {
    try {
        const { email, userType, referralCode: usedCode } = await req.json();

        if (!email || !['user', 'business'].includes(userType)) {
            return NextResponse.json(
                { success: false, message: 'Valid email and userType are required.' },
                { status: 400 }
            );
        }

        await connectDB();

        // Check for duplicate — same email + same userType
        const existing = await EarlyAccess.findOne({ email: email.toLowerCase(), userType });
        if (existing) {
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
            return NextResponse.json(
                { success: false, message: 'Could not generate a unique code. Please try again.' },
                { status: 500 }
            );
        }

        // Validate the referredBy code exists (if provided)
        let referredBy: string | null = null;
        if (usedCode) {
            const referrer = await EarlyAccess.findOne({ referralCode: usedCode.toUpperCase() });
            if (referrer) referredBy = usedCode.toUpperCase();
        }

        // Get position (count of same userType before this one)
        const position = (await EarlyAccess.countDocuments({ userType })) + 1;

        // Save to DB
        await EarlyAccess.create({
            email: email.toLowerCase().trim(),
            userType,
            referralCode,
            referredBy,
        });

        console.log(`✅ New signup: ${email} (${userType}) | code: ${referralCode} | ref: ${referredBy ?? 'direct'} | position: #${position}`);

        // Get base URL from environment (works with or without domain)
        const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:6173';

        // Send welcome email — separate template per userType
        try {
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
            console.log(`📧 Welcome email sent to ${email} (${userType})`);
        } catch (emailError) {
            // Don't fail the signup if email fails — log and continue
            console.error('⚠️ Email send failed (signup still succeeded):', emailError);
        }

        return NextResponse.json({ success: true, referralCode }, { status: 201 });

    } catch (error) {
        console.error('Early access join error:', error);
        return NextResponse.json(
            { success: false, message: 'Server error. Please try again.' },
            { status: 500 }
        );
    }
}
