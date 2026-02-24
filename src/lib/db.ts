import mongoose from 'mongoose';

// Serverless-safe cached connection
let cached = (global as any).mongoose as { conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null };

if (!cached) {
    (global as any).mongoose = { conn: null, promise: null };
    cached = (global as any).mongoose;
}

export async function connectDB() {
    // Check for MONGODB_URI at runtime, not at build time
    const MONGODB_URI = process.env.MONGODB_URI;
    
    if (!MONGODB_URI) {
        throw new Error('Please define MONGODB_URI environment variable');
    }

    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false }).then((m) => m);
    }

    cached.conn = await cached.promise;
    return cached.conn;
}
