import { type Icon } from "@phosphor-icons/react";
import { cn } from "@/lib/utils";

interface EmptyStateProps {
  icon: Icon;
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({ icon: Icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border px-6 py-20 text-center",
        className
      )}
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-background-secondary">
        <Icon className="h-6 w-6 text-foreground-secondary" />
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-bold text-foreground">{title}</h3>
        {description && (
          <p className="max-w-sm text-sm text-foreground-secondary">{description}</p>
        )}
      </div>
      {action}
    </div>
  );
}
