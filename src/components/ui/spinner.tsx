import { CircleNotch } from "@phosphor-icons/react/ssr";
import { cn } from "@/lib/utils";

export function Spinner({ className }: { className?: string }) {
  return <CircleNotch className={cn("h-4 w-4 animate-spin text-primary", className)} />;
}
