import mongoose, { Document, Schema } from 'mongoose';

export interface IEarlyAccess extends Document {
    email: string;
    userType: 'user' | 'business';
    referralCode: string;   // Their unique code to share: e.g. DINO-A4X2
    referredBy: string | null; // Referral code of the person who invited them
    referralCount: number;  // How many people used their code
    tier: 'bronze' | 'silver' | 'gold' | 'platinum';
    priorityScore: number;  // Calculated: original position - tier boost - (referralCount * 2)
    originalPosition: number; // Their position when they signed up
    joinedAt: Date;
    lastReferralAt: Date | null;
}

const EarlyAccessSchema = new Schema<IEarlyAccess>({
    email: { type: String, required: true, lowercase: true, trim: true },
    userType: { type: String, enum: ['user', 'business'], required: true },
    referralCode: { type: String, required: true, unique: true },
    referredBy: { type: String, default: null },
    referralCount: { type: Number, default: 0 },
    tier: { type: String, enum: ['bronze', 'silver', 'gold', 'platinum'], default: 'bronze' },
    priorityScore: { type: Number, default: 0 },
    originalPosition: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
    lastReferralAt: { type: Date, default: null },
});

EarlyAccessSchema.index({ email: 1, userType: 1 }, { unique: true });
EarlyAccessSchema.index({ priorityScore: 1 }); // For sorting by priority
EarlyAccessSchema.index({ tier: 1 }); // For leaderboards

export const EarlyAccess =
    mongoose.models.EarlyAccess ||
    mongoose.model<IEarlyAccess>('EarlyAccess', EarlyAccessSchema);
