import Link from "next/link";
import { AdminTopbar } from "@/components/admin/admin-topbar";

export const metadata = { title: "Admin — PasalMandu" };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-background-secondary">
      <header className="sticky top-0 z-40 border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 md:px-6">
          <Link href="/admin" className="font-display text-lg font-semibold text-foreground">
            Pasal<span className="text-accent">Mandu</span> <span className="text-foreground-secondary">Admin</span>
          </Link>
          <AdminTopbar />
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 md:px-6">{children}</main>
    </div>
  );
}
