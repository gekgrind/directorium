import { NextResponse } from "next/server";
import { getCurrentSharedAuthUser } from "@/lib/supabase/server";

export async function GET() {
  const user = await getCurrentSharedAuthUser();

  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  return NextResponse.json({ user });
}
