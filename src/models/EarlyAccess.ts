import mongoose, { Document, Schema } from 'mongoose';

export interface IEarlyAccess extends Document {
    email: string;
    userType: 'user' | 'business';
    referralCode: string;   // Their unique code to share: e.g. DINO-A4X2
    referredBy: string | null; // Referral code of the person who invited them
    joinedAt: Date;
}

const EarlyAccessSchema = new Schema<IEarlyAccess>({
    email: { type: String, required: true, lowercase: true, trim: true },
    userType: { type: String, enum: ['user', 'business'], required: true },
    referralCode: { type: String, required: true, unique: true },
    referredBy: { type: String, default: null },
    joinedAt: { type: Date, default: Date.now },
});

EarlyAccessSchema.index({ email: 1, userType: 1 }, { unique: true });

export const EarlyAccess =
    mongoose.models.EarlyAccess ||
    mongoose.model<IEarlyAccess>('EarlyAccess', EarlyAccessSchema);
