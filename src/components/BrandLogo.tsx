"use client";

import Image from "next/image";
import { useState } from "react";
import type { Brand } from "@/types/trip";

export function BrandLogo({
  brand,
  size = 56,
}: Readonly<{
  brand: Brand;
  size?: number;
}>) {
  const [failed, setFailed] = useState(false);
  const showImage = Boolean(brand.logo) && !failed;
  const monogram = brand.monogram ?? brand.name.slice(0, 2).toUpperCase();

  return (
    <div
      className="relative flex items-center justify-center rounded-2xl bg-white border border-ink/8 shadow-sm overflow-hidden"
      style={{ width: size, height: size }}
    >
      {showImage ? (
        <Image
          src={brand.logo!}
          alt=""
          width={Math.round(size * 0.55)}
          height={Math.round(size * 0.55)}
          className="object-contain"
          unoptimized
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="font-display font-bold text-mk-blue/80 text-sm tracking-tight">
          {monogram}
        </span>
      )}
    </div>
  );
}
