"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function ProductGallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);

  return (
    <div className="flex flex-col gap-3">
      <div className="relative aspect-square overflow-hidden rounded-xl bg-background-secondary">
        <Image
          key={active}
          src={images[active]}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover animate-fade-in"
        />
      </div>
      <div className="flex gap-3">
        {images.map((image, idx) => (
          <button
            key={image}
            onClick={() => setActive(idx)}
            className={cn(
              "relative aspect-square w-16 shrink-0 overflow-hidden rounded-lg border-2 transition-colors sm:w-20",
              active === idx ? "border-primary" : "border-transparent hover:border-border"
            )}
            aria-label={`View image ${idx + 1}`}
          >
            <Image src={image} alt="" fill sizes="80px" className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
