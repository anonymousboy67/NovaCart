"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { SignOut } from "@phosphor-icons/react/ssr";
import { Button } from "@/components/ui/button";

export function AdminTopbar() {
  const pathname = usePathname();
  const router = useRouter();

  if (pathname === "/admin/login") return null;

  const handleLogout = async () => {
    await fetch("/api/admin/login", { method: "DELETE" });
    router.push("/admin/login");
    router.refresh();
  };

  return (
    <div className="flex items-center gap-4">
      <Link href="/" className="text-sm font-medium text-foreground-secondary hover:text-foreground">
        View store
      </Link>
      <Button variant="outline" size="sm" onClick={handleLogout}>
        <SignOut className="h-4 w-4" />
        Log out
      </Button>
    </div>
  );
}
