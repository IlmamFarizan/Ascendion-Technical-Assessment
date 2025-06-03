// app/api/verifyMfa/route.ts
import { NextRequest, NextResponse } from "next/server";

// In-memory stores for demo purposes
const mfaCodes = new Map<string, string>(); // username => code
const mfaAttempts = new Map<string, number>(); // username => attempt count
const MAX_ATTEMPTS = 3;

// Mock function to generate MFA code for user
export function generateMfaCode(username: string) {
  // For simplicity, generate a fixed code per username (in real case, use TOTP)
  // Example: last 6 chars of hash of username + secret + timestamp
  const hash = Buffer.from(username + "secret").toString("base64");
  console.log(hash.slice(0, 6).toUpperCase());
  return hash.slice(0, 6).toUpperCase();
}

// For demo: prepopulate mfaCodes on login or generate on demand
// You can call this function after successful login in your flow
export function setMfaCode(username: string) {
  const code = generateMfaCode(username);
  mfaCodes.set(username, code);
  mfaAttempts.set(username, 0); // reset attempts
  return code;
}

export async function POST(req: NextRequest) {
  const { username, code } = await req.json();

  if (!username || !code) {
    return NextResponse.json(
      { message: "username and code required" },
      { status: 400 }
    );
  }

  if (!mfaCodes.has(username)) {
    return NextResponse.json(
      { message: "No MFA code found for user. Please login again." },
      { status: 400 }
    );
  }

  const attempts = mfaAttempts.get(username) ?? 0;

  if (attempts >= MAX_ATTEMPTS) {
    return NextResponse.json(
      { message: "Maximum MFA attempts exceeded. Account locked." },
      { status: 403 }
    );
  }

  const expectedCode = mfaCodes.get(username);

  if (code.toUpperCase() === expectedCode) {
    // Success: clear MFA data
    mfaCodes.delete(username);
    mfaAttempts.delete(username);

    return NextResponse.json({ message: "MFA verified successfully" });
  } else {
    // Increment attempts
    mfaAttempts.set(username, attempts + 1);
    return NextResponse.json(
      {
        message: `Invalid MFA code. Attempts left: ${
          MAX_ATTEMPTS - attempts - 1
        }`,
      },
      { status: 401 }
    );
  }
}
