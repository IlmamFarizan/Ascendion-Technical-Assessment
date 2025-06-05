import { NextRequest, NextResponse } from "next/server";
import { validateMfaCode } from "@/lib/mfa";

export async function POST(req: NextRequest) {
  const { username, code } = await req.json();

  if (!username || !code) {
    return NextResponse.json(
      { message: "username and code required" },
      { status: 400 }
    );
  }

  const result = validateMfaCode(username, code);

  return NextResponse.json(
    { message: result.message },
    { status: result.status }
  );
}
