"use client";

import { motion } from "motion/react";

type InlineAnimationProps = {
  name: string;
};

function BouncingBall() {
  return (
    <span className="mx-1 inline-flex h-8 w-8 items-end overflow-hidden align-middle">
      <motion.span
        className="inline-block h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_rgba(103,232,249,0.8)]"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 0.9, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

function PulseDot() {
  return (
    <span className="mx-1 inline-flex h-8 w-8 items-center justify-center align-middle">
      <motion.span
        className="inline-block h-3 w-3 rounded-full bg-fuchsia-300"
        animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
      />
    </span>
  );
}

export function InlineAnimation({ name }: InlineAnimationProps) {
  switch (name) {
    case "bounce-ball":
      return <BouncingBall />;
    case "pulse-dot":
      return <PulseDot />;
    default:
      return (
        <span className="mx-1 rounded bg-slate-800 px-2 py-1 text-xs text-slate-300">
          animation:{name}
        </span>
      );
  }
}
