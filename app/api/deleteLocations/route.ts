import { NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db.config";
import IftarLocation from "@/app/models/iftarLocation.model";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    await connectToDatabase();

    // Get today's start time
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check for any data that's not from today
    const oldDataCount = await IftarLocation.countDocuments({
      createdAt: { $lt: today }
    });

    // Delete all data not from today
    if (oldDataCount > 0) {
      const result = await IftarLocation.deleteMany({
        createdAt: { $lt: today }
      });
      return NextResponse.json({
        success: true,
        message: `Cleaned up ${result.deletedCount} old locations`,
      });
    }

    return NextResponse.json({
      success: true,
      message: "No old data to clean up",
    });
  } catch (error) {
    console.error("Error in cleanup:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Cleanup failed",
      },
      { status: 500 }
    );
  }
}
