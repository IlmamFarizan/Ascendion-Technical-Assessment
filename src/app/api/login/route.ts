import { NextRequest, NextResponse } from "next/server";
import secureStore from "@/lib/secureStore";
import { setMfaCode } from "@/lib/mfa";

export async function POST(req: NextRequest) {
  const { username, hashedPassword, secureWord } = await req.json();

  if (!username || !hashedPassword || !secureWord) {
    return NextResponse.json(
      { message: "username, hashedPassword and secureWord are required" },
      { status: 400 }
    );
  }

  const record = secureStore.get(username);
  const now = Date.now();

  if (!record) {
    return NextResponse.json(
      { message: "Secure word not found. Request a new one." },
      { status: 400 }
    );
  }

  // Check expiration (60 seconds)
  if (now - record.issuedAt > 60000) {
    secureStore.delete(username);
    return NextResponse.json(
      { message: "Secure word expired. Request a new one." },
      { status: 400 }
    );
  }

  // Check secure word matches
  if (record.secureWord !== secureWord) {
    return NextResponse.json(
      { message: "Invalid secure word." },
      { status: 400 }
    );
  }

  // For example, just accept any non-empty password:
  if (hashedPassword.length === 0) {
    return NextResponse.json({ message: "Invalid password." }, { status: 400 });
  }

  // On successful login, clear secure word to prevent reuse
  secureStore.delete(username);

  // Generate and return MFA code
  const mfaCode = setMfaCode(username);

  // Return a mock JWT token or session token
  const mockToken = "mock-jwt-token";

  return NextResponse.json({
    token: mockToken,
    mfaCode, // ✅ Include MFA code for debugging/demo
  });
}
