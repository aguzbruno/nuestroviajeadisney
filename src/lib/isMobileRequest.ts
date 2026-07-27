import { headers } from "next/headers";
import { userAgent } from "next/server";
import { flags } from "@/lib/flags";

/** Returns true when mobile/tablet access should be blocked. */
export async function isMobileBlocked(): Promise<boolean> {
  if (!flags.blockMobile) return false;

  const headersList = await headers();
  const { device } = userAgent({ headers: headersList });
  return device.type === "mobile" || device.type === "tablet";
}
