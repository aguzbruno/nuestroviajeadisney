"use client";

import { use } from "react";
import { getPark } from "@/data/parks";
import { notFound } from "next/navigation";
import { InteractiveParkMap } from "@/components/InteractiveParkMap";

export default function UniversalParkMapPage({
  params,
}: {
  params: Promise<{ parque: string }>;
}) {
  const { parque } = use(params);
  const park = getPark(parque);

  if (!park || park.resort !== "universal") notFound();

  return (
    <InteractiveParkMap park={park} backHref={`/universal/${park.slug}`} />
  );
}
