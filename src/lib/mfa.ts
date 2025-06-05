const mfaCodes = new Map<string, string>();
const mfaAttempts = new Map<string, number>();
const MAX_ATTEMPTS = 3;

// Generate code based on username and secret
export function generateMfaCode(secret: string): string {
  const hash = Buffer.from(secret + "secret").toString("base64");
  return hash.slice(0, 6).toUpperCase();
}

// Store code and reset attempts
export function setMfaCode(username: string): string {
  const code = generateMfaCode(process.env.SECRET || "default-secret");
  mfaCodes.set(username, code);
  mfaAttempts.set(username, 0);
  return code;
}

// Validate MFA code
export function verifyMfa(username: string, inputCode: string) {
  if (!mfaCodes.has(username)) {
    return {
      success: false,
      status: 400,
      message: "No MFA code found for user. Please login again.",
    };
  }

  const attempts = mfaAttempts.get(username) ?? 0;

  if (attempts >= MAX_ATTEMPTS) {
    return {
      success: false,
      status: 403,
      message: "Maximum MFA attempts exceeded. Account locked.",
    };
  }

  const expectedCode = mfaCodes.get(username);

  if (inputCode.toUpperCase() === expectedCode) {
    mfaCodes.delete(username);
    mfaAttempts.delete(username);
    return { success: true, status: 200, message: "MFA verified successfully" };
  } else {
    mfaAttempts.set(username, attempts + 1);
    return {
      success: false,
      status: 401,
      message: `Invalid MFA code. Attempts left: ${
        MAX_ATTEMPTS - attempts - 1
      }`,
    };
  }
}
