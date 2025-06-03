"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [secureWord, setSecureWord] = useState("");
  const [timer, setTimer] = useState(0);
  const router = useRouter();

  // Countdown effect for secure word expiration
  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          setSecureWord("");
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/getSecureWord", {
      method: "POST",
      body: JSON.stringify({ username }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("secureWordData", JSON.stringify(data));
      setSecureWord(data.secureWord);
      setTimer(60); // start 60 second countdown
    } else {
      alert(data.message);
    }
  };

  const handleNext = () => {
    router.push(
      `/login/password?username=${username}&secureWord=${secureWord}`
    );
  };

  return (
    <main className="p-4 pt-8 max-w-sm mx-auto">
      <h1 className="text-xl font-bold mb-4">Login</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-3"
        />
        <Button type="submit" className="w-full">
          Generate Secure Word
        </Button>
      </form>

      {secureWord && (
        <div className="mt-4 border border-yellow-400 bg-yellow-50 p-3 rounded text-sm">
          <p>
            <strong>Secure Word:</strong> {secureWord}
          </p>
          <p className="text-yellow-700">
            ⚠️ This code will expire in {timer} second{timer !== 1 ? "s" : ""}.
          </p>
          <Button onClick={handleNext} className="mt-3 w-full">
            Next
          </Button>
        </div>
      )}
    </main>
  );
}
