"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useAlbumSpread } from "@/components/AlbumSpreadContext";
import { withAlbumReturn } from "@/lib/albumNav";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/** Link de CTA del álbum: agrega params para volver al mismo pliego. */
export function AlbumCtaLink({ href, ...rest }: Props) {
  const pliego = useAlbumSpread();
  return <Link href={withAlbumReturn(href, pliego)} {...rest} />;
}
