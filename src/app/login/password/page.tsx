"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import sha256 from "crypto-js/sha256";
import { Button } from "@/components/ui/button";

export default function PasswordPage() {
  const search = useSearchParams();
  const username = search.get("username") || "";
  const secureWord = search.get("secureWord") || "";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!password) {
      setError("Password is required.");
      return;
    }

    const hashedPassword = sha256(password).toString();

    const res = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username, secureWord, hashedPassword }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
    if (res.ok) {
      localStorage.setItem("token", data.token);
      router.push(`/login/mfa?username=${encodeURIComponent(username)}`);
    } else {
      setError("Login failed. Please check your credentials.");
    }
  }

  return (
    <main className="max-w-sm mx-auto p-4 pt-8">
      <h1 className="text-xl font-bold mb-6">Enter Password</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Password"
          required
          autoFocus
        />
        {error && <p className="text-sm text-red-600">{error}</p>}

        <Button type="submit" size="lg" className="w-full">
          Login
        </Button>
      </form>
    </main>
  );
}
