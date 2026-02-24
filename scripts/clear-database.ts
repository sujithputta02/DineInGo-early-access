/**
 * Script to clear all early access data from MongoDB
 * Run with: npx tsx scripts/clear-database.ts
 */

import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import * as path from 'path';

// Load environment variables
dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('❌ Error: MONGODB_URI not found in .env.local');
  process.exit(1);
}

// Define the EarlyAccess schema
const earlyAccessSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  userType: { type: String, enum: ['user', 'business'], required: true },
  referralCode: { type: String, unique: true, required: true },
  referredBy: { type: String, default: null },
  referralCount: { type: Number, default: 0 },
  tier: { type: String, default: 'none' },
  priorityScore: { type: Number, default: 0 },
  originalPosition: { type: Number, required: true },
  lastReferralAt: { type: Date, default: null },
  joinedAt: { type: Date, default: Date.now },
});

const EarlyAccess = mongoose.models.EarlyAccess || mongoose.model('EarlyAccess', earlyAccessSchema);

async function clearDatabase() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    // Count existing records
    const count = await EarlyAccess.countDocuments();
    console.log(`📊 Found ${count} early access records`);

    if (count === 0) {
      console.log('✨ Database is already empty!');
      await mongoose.disconnect();
      return;
    }

    // Ask for confirmation
    console.log('\n⚠️  WARNING: This will delete ALL early access data!');
    console.log('   This action cannot be undone.\n');

    // Delete all records
    console.log('🗑️  Deleting all records...');
    const result = await EarlyAccess.deleteMany({});
    console.log(`✅ Successfully deleted ${result.deletedCount} records`);

    // Verify deletion
    const remainingCount = await EarlyAccess.countDocuments();
    console.log(`📊 Remaining records: ${remainingCount}`);

    if (remainingCount === 0) {
      console.log('\n🎉 Database cleared successfully!');
      console.log('   You can now start fresh with new signups.');
    } else {
      console.log('\n⚠️  Warning: Some records may still remain');
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (error) {
    console.error('❌ Error clearing database:', error);
    process.exit(1);
  }
}

// Run the script
clearDatabase();
