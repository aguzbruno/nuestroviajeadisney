import type { EarlyEntryInfo } from "@/types/trip";

/** Chip de entrada temprana (Disney / Universal hotel). */
export function EarlyEntryChip({
  earlyEntry,
  compact,
  dark,
}: Readonly<{
  earlyEntry: EarlyEntryInfo;
  compact?: boolean;
  dark?: boolean;
}>) {
  return (
    <div
      className={`rounded-xl border ${
        dark
          ? "border-hhn-orange/50 bg-hhn-orange/20 text-white"
          : "border-gold/40 bg-gold/15 text-ink"
      } ${compact ? "px-2 py-1" : "px-3 py-2"}`}
      title={earlyEntry.detail}
    >
      <div
        className={`font-display font-bold ${
          dark ? "text-hhn-orange" : "text-mk-blue"
        } ${compact ? "text-[10px]" : "text-xs"}`}
      >
        ⏰ {earlyEntry.short}
        {!compact && (
          <span
            className={`font-mono font-semibold ml-1.5 ${
              dark ? "text-white/80" : "text-ink/70"
            }`}
          >
            {earlyEntry.approxTime}
          </span>
        )}
      </div>
      {!compact && (
        <p
          className={`text-[11px] mt-0.5 leading-snug ${
            dark ? "text-white/70" : "text-ink/65"
          }`}
        >
          {earlyEntry.detail}
        </p>
      )}
      {compact && (
        <p
          className={`text-[9px] leading-none mt-0.5 ${
            dark ? "text-white/65" : "text-ink/60"
          }`}
        >
          {earlyEntry.approxTime}
        </p>
      )}
    </div>
  );
}
