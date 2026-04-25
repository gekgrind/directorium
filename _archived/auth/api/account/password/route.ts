import { NextResponse } from "next/server";

import {
  PasswordUpdateProviderError,
  updatePasswordWithProvider,
} from "./auth-provider";
import { validatePasswordUpdateInput } from "@/app/settings/password/password-policy";

type PasswordUpdateRequest = {
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
};

export async function POST(request: Request) {
  let parsedBody: PasswordUpdateRequest;

  try {
    parsedBody = (await request.json()) as PasswordUpdateRequest;
  } catch {
    return NextResponse.json({ message: "Invalid request body." }, { status: 400 });
  }

  const currentPassword = parsedBody.currentPassword ?? "";
  const newPassword = parsedBody.newPassword ?? "";
  const confirmPassword = parsedBody.confirmPassword ?? "";

  const validationError = validatePasswordUpdateInput({
    currentPassword,
    newPassword,
    confirmPassword,
  });

  if (validationError) {
    return NextResponse.json({ message: validationError }, { status: 400 });
  }

  try {
    await updatePasswordWithProvider({ currentPassword, newPassword });
    return NextResponse.json({ message: "Password updated successfully." });
  } catch (error) {
    if (error instanceof PasswordUpdateProviderError) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { message: "Unable to update password right now. Please try again." },
      { status: 500 },
    );
  }
}
