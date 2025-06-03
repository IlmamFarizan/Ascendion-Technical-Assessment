"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

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

    if (res.ok) {
      localStorage.setItem("token", "mock-jwt-token");
      router.push("/dashboard");
    } else {
      setError("MFA verification failed. Please try again.");
    }
  }

  return (
    <main className="max-w-sm mx-auto p-4 pt-8">
      <h1 className="text-xl font-bold mb-6">Multi-Factor Authentication</h1>
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
        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" size="lg" className="w-full">
          Verify
        </Button>
      </form>
    </main>
  );
}
