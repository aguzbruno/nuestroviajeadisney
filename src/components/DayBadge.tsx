import type { ItineraryDay } from "@/types/trip";

/** Badge de día — variante distinta si el día está partido en varias hojas. */
export function DayBadge({
  day,
  size = "md",
}: {
  day: ItineraryDay;
  size?: "sm" | "md";
}) {
  const shared = day.sharedPart;
  const pad = size === "sm" ? "px-2 py-1.5" : "px-2.5 py-1.5";
  const daySize = size === "sm" ? "text-xs" : "text-sm";

  if (shared) {
    return (
      <div
        className={`rounded-xl bg-white/95 shadow flex flex-col items-center justify-center ${pad} min-w-[4.25rem]`}
      >
        <span className="text-[8px] uppercase tracking-[0.14em] font-semibold text-gold leading-none">
          Compartido
        </span>
        <span
          className={`font-display font-bold text-mk-blue ${daySize} leading-tight mt-0.5 whitespace-nowrap`}
        >
          DÍA {day.day} · {shared.index}/{shared.total}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl bg-white/95 shadow flex items-center justify-center font-display font-bold text-mk-blue ${pad} ${daySize} min-w-12 whitespace-nowrap`}
    >
      DÍA {day.day}
    </div>
  );
}
