import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/db';
import { EarlyAccess } from '@/models/EarlyAccess';

export async function GET() {
    try {
        await connectDB();

        const foodies = await EarlyAccess.find({ userType: 'user' }).sort({ joinedAt: -1 }).select('-__v');
        const venues = await EarlyAccess.find({ userType: 'business' }).sort({ joinedAt: -1 }).select('-__v');

        return NextResponse.json({
            success: true,
            foodies: { count: foodies.length, entries: foodies },
            venues: { count: venues.length, entries: venues },
            total: foodies.length + venues.length,
        });
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Error fetching leads.' }, { status: 500 });
    }
}
