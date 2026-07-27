"use client";

import { useVisitor } from "@/components/VisitorProvider";
import { motion } from "framer-motion";

export function HiddenMickey({ id, className = "" }: { id: string; className?: string }) {
  const { mickeyFinds, addMickey } = useVisitor();
  const found = mickeyFinds.includes(id);

  return (
    <motion.button
      type="button"
      aria-label="Mickey escondido"
      onClick={() => addMickey(id)}
      whileHover={{ scale: 1.2 }}
      whileTap={{ scale: 0.9 }}
      className={`absolute z-10 opacity-40 hover:opacity-100 transition ${className}`}
    >
      <span className="relative inline-block w-6 h-6 rounded-full bg-ink mickey-ears">
        {found ? "✓" : ""}
      </span>
    </motion.button>
  );
}
