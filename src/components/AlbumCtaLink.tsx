"use client";

import Link from "next/link";
import type { ComponentProps } from "react";
import { useAlbumSpread } from "@/components/AlbumSpreadContext";
import { withAlbumReturn } from "@/lib/albumNav";
import { unlockAlbumNav } from "@/lib/storage";

type Props = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
};

/** Link de CTA del álbum: agrega params para volver al mismo pliego. */
export function AlbumCtaLink({ href, onClick, ...rest }: Props) {
  const pliego = useAlbumSpread();
  return (
    <Link
      href={withAlbumReturn(href, pliego)}
      onClick={(e) => {
        unlockAlbumNav();
        onClick?.(e);
      }}
      {...rest}
    />
  );
}
