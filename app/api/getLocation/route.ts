import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db.config";
import IftarLocation from "@/app/models/iftarLocation.model";
import { logApiCall } from "@/app/lib/logger";

const sendResponse = (status: number, message: string, data?: any) => {
  return NextResponse.json(
    { success: status < 400, message, data },
    { status }
  );
};

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(req.url);
    const district = searchParams.get("district");

    // Get today's start and end
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Build query for today's entries and optional district filter
    let query: any = {
      createdAt: {
        $gte: today,
        $lt: tomorrow,
      },
    };

    if (district) {
      query.district = district;
    }

    const locations = await IftarLocation.find(query).sort({ createdAt: -1 });

    if (!locations || locations.length === 0) {
      return sendResponse(
        404,
        "No Iftar locations found for today in this area."
      );
    }
    await logApiCall("/api/getLocation", "GET", district || undefined);
    return sendResponse(
      200,
      "Today's Iftar locations fetched successfully",
      locations
    );
  } catch (error) {
    console.error("Error fetching Iftar locations:", error);
    return sendResponse(500, "Internal Server Error");
  }
}
