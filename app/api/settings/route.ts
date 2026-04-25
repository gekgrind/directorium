import { NextResponse } from "next/server";
import {
  getAuthenticatedSupabaseUserId,
  getOrCreateUserSettings,
  upsertUserSettings,
} from "@/lib/supabase/server";

export async function GET() {
  try {
    const userId = await getAuthenticatedSupabaseUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const settings = await getOrCreateUserSettings(userId);
    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to load settings.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const userId = await getAuthenticatedSupabaseUserId();

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = (await request.json()) as unknown;
    const settings = await upsertUserSettings(userId, body);

    return NextResponse.json({ settings });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to save settings.",
      },
      { status: 500 },
    );
  }
}
