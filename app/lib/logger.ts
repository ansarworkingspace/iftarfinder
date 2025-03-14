import ApiLog from "../models/apiLog.model";

export async function logApiCall(
  endpoint: string,
  method: string,
  district?: string
) {
  try {
    await ApiLog.create({
      endpoint,
      method,
      district,
    });
  } catch (error) {
    console.error("Error logging API call:", error);
  }
}
