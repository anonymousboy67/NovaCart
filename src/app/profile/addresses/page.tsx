import { Metadata } from "next";
import { Plus, MapPin, PencilSimple, Trash } from "@phosphor-icons/react/ssr";
import { addresses } from "@/lib/data/user";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export const metadata: Metadata = { title: "Addresses — PasalMandu" };

export default function AddressesPage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Saved Addresses</h2>
        <Button size="sm">
          <Plus className="h-4 w-4" />
          Add New
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {addresses.map((address) => (
          <div key={address.id} className="flex flex-col gap-3 rounded-xl border border-border bg-card p-5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-light text-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                <span className="text-sm font-bold text-foreground">{address.label}</span>
              </div>
              {address.isDefault && <Badge variant="primary">Default</Badge>}
            </div>
            <div className="text-sm leading-relaxed text-foreground-secondary">
              <p className="font-medium text-foreground">{address.fullName}</p>
              <p>
                {address.line1}
                {address.line2 ? `, ${address.line2}` : ""}
              </p>
              <p>
                {address.city}, {address.state} {address.zip}
              </p>
              <p>{address.country}</p>
              <p className="mt-1">{address.phone}</p>
            </div>
            <div className="mt-1 flex items-center gap-2">
              <Button variant="outline" size="sm" className="flex-1">
                <PencilSimple className="h-3.5 w-3.5" />
                Edit
              </Button>
              <Button variant="ghost" size="sm" className="flex-1 text-error hover:bg-error/5">
                <Trash className="h-3.5 w-3.5" />
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
