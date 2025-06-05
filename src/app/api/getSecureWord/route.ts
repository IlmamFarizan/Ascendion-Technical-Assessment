import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import secureStore from "@/lib/secureStore";

export async function POST(req: NextRequest) {
  const { username } = await req.json();
  if (!username)
    return NextResponse.json({ message: "Username required" }, { status: 400 });

  const now = Date.now();

  // Clean expired entries
  for (const [user, { issuedAt }] of secureStore.entries()) {
    if (now - issuedAt > 60000) {
      secureStore.delete(user);
    }
  }

  const lastRequest = secureStore.get(username);

  if (lastRequest && now - lastRequest.issuedAt < 10000) {
    return NextResponse.json(
      { message: "Rate limit: wait 10 seconds" },
      { status: 429 }
    );
  }

  const secureWord = crypto
    .createHmac(
      "sha256",
      username + now.toString() + (process.env.SECRET || "default-secret")
    )
    .digest("hex")
    .slice(0, 8);

  secureStore.set(username, { username, secureWord, issuedAt: now });

  return NextResponse.json({ secureWord });
}
