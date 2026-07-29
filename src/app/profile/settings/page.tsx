import { Metadata } from "next";
import { currentUser } from "@/lib/data/user";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

export const metadata: Metadata = { title: "Settings — NovaCart" };

export default function SettingsPage() {
  return (
    <div className="flex flex-col gap-8">
      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-5 text-base font-bold text-foreground">Personal Information</h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground-secondary">Full Name</label>
            <Input defaultValue={currentUser.name} />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground-secondary">Email Address</label>
            <Input defaultValue={currentUser.email} type="email" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground-secondary">Phone Number</label>
            <Input defaultValue="+977 98-1234-5678" type="tel" />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-foreground-secondary">Date of Birth</label>
            <Input type="date" />
          </div>
        </div>
        <Button className="mt-5">Save Changes</Button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <h2 className="mb-5 text-base font-bold text-foreground">Notifications</h2>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3">
            <Checkbox defaultChecked />
            <span className="text-sm text-foreground">Order updates and shipping alerts</span>
          </label>
          <label className="flex items-center gap-3">
            <Checkbox defaultChecked />
            <span className="text-sm text-foreground">Price drops on wishlist items</span>
          </label>
          <label className="flex items-center gap-3">
            <Checkbox />
            <span className="text-sm text-foreground">Marketing emails and promotions</span>
          </label>
        </div>
      </div>

      <div className="rounded-xl border border-error/30 bg-card p-6">
        <h2 className="mb-2 text-base font-bold text-foreground">Delete Account</h2>
        <p className="mb-4 text-sm text-foreground-secondary">
          Permanently delete your NovaCart account and all associated data. This action cannot be undone.
        </p>
        <Button variant="destructive" size="sm">Delete Account</Button>
      </div>
    </div>
  );
}
