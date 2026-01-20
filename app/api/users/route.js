import { sendSuccess, sendError } from "@/lib/responseHandler";

export async function GET() {
  try {
    const users = [
      { id: 1, name: "Alice" },
      { id: 2, name: "Bob" },
    ];

    return sendSuccess(users, "Users fetched successfully");
  } catch (error) {
    return sendError("Failed to fetch users", "USER_FETCH_ERROR", 500);
  }
}
