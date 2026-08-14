"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AdminLoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      setError("Incorrect password");
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="flex w-full max-w-sm flex-col gap-5 rounded-xl border border-border bg-card p-8"
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-light text-primary">
            <Lock className="h-5 w-5" weight="duotone" />
          </div>
          <h1 className="text-lg font-bold text-foreground">Admin Login</h1>
          <p className="text-sm text-foreground-secondary">Enter the admin password to continue.</p>
        </div>

        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoFocus
          required
        />

        {error && <p className="text-sm text-error">{error}</p>}

        <Button type="submit" size="lg" disabled={loading}>
          {loading ? "Checking..." : "Log In"}
        </Button>
      </form>
    </div>
  );
}
