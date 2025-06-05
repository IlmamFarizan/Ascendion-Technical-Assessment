"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function MfaPage() {
  const username = useSearchParams().get("username") || "";
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const res = await fetch("/api/verifyMfa", {
      method: "POST",
      body: JSON.stringify({ username, code }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    if (res.ok) {
      localStorage.setItem("token", "mock-jwt-token");
      setError(""); // clear previous error if any
      router.push("/dashboard");
    } else {
      setError(data.message || "MFA verification failed. Please try again.");
    }
  }

  return (
    <main className="max-w-sm mx-auto p-4 pt-8 space-y-4">
      <h1 className="text-xl font-bold">Multi-Factor Authentication</h1>

      {error && (
        <Alert variant="destructive">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          maxLength={6}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter 6-digit code"
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="6-digit authentication code"
          required
        />
        <Button type="submit" size="lg" className="w-full">
          Verify
        </Button>
      </form>
    </main>
  );
}
