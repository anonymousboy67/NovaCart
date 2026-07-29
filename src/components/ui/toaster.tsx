"use client";

import { Toaster as Sonner } from "sonner";

export function Toaster() {
  return (
    <Sonner
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "!bg-card !border !border-border !shadow-md !rounded-lg !text-foreground !font-sans",
          title: "!text-sm !font-semibold",
          description: "!text-foreground-secondary",
          actionButton: "!bg-accent !text-white",
          success: "!text-success",
        },
      }}
    />
  );
}
