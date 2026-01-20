import { sendSuccess, sendError } from "@/lib/responseHandler";

export async function POST(req) {
  try {
    const body = await req.json();

    if (!body.title) {
      return sendError(
        "Missing required field: title",
        "VALIDATION_ERROR",
        400
      );
    }

    return sendSuccess(body, "Task created successfully", 201);
  } catch (error) {
    return sendError("Task creation failed", "TASK_ERROR", 500);
  }
}
