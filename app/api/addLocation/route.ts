import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/app/lib/db.config";
import IftarLocation from "@/app/models/iftarLocation.model";
import { logApiCall } from "@/app/lib/logger";

const sendResponse = (status: number, message: string, data?: any) => {
  return NextResponse.json(
    {
      success: status < 400,
      message,
      data,
    },
    { status }
  );
};

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  try {
    await connectToDatabase();
    const body = await req.json();

    // Basic validation
    if (
      !body.name ||
      !body.location ||
      !body.district ||
      !body.mapLink ||
      !body.foodItems
    ) {
      return sendResponse(400, "All fields are required");
    }

    // Create new location
    const newLocation = new IftarLocation({
      name: body.name.trim(),
      location: body.location.trim(),
      district: body.district,
      mapLink: body.mapLink.trim(),
      foodItems: body.foodItems,
    });

    const savedLocation = await newLocation.save();

    await logApiCall("/api/addLocation", "POST", body.district);

    return sendResponse(
      201,
      "Iftar location added successfully",
      savedLocation
    );
  } catch (error: any) {
    console.error("Error adding location:", error);
    if (error.code === 11000) {
      return sendResponse(409, "This location already exists");
    }
    return sendResponse(500, error.message || "Internal Server Error");
  }
}
