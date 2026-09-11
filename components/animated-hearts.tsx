"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

type FloatingItem = {
  id: number
  emoji: string
  left: string
  size: number
  delay: number
  duration: number
  rotate: number
  opacity: number
}

const EMOJIS = ["🌅", "🍕", "✨", "🧴", "💖", "🌇", "🍕", "✨"]

export function AnimatedHearts() {
  const items = useMemo<FloatingItem[]>(
    () =>
      Array.from({ length: 22 }).map((_, i) => ({
        id: i,
        emoji: EMOJIS[i % EMOJIS.length],
        left: `${(i * 4.5 + Math.random() * 5) % 96}%`,
        size: 20 + Math.round(Math.random() * 16),
        delay: Math.random() * 5,
        duration: 9 + Math.random() * 8,
        rotate: -15 + Math.random() * 30,
        opacity: 0.4 + Math.random() * 0.45,
      })),
    [],
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {items.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none will-change-transform"
          style={{
            left: h.left,
            fontSize: `${h.size}px`,
            filter: "drop-shadow(0 2px 8px rgba(255, 120, 50, 0.25))",
          }}
          initial={{ y: "110dvh", opacity: 0, rotate: h.rotate }}
          animate={{
            y: "-15dvh",
            opacity: h.opacity,
            rotate: h.rotate * 2,
          }}
          transition={{
            delay: h.delay,
            duration: h.duration,
            ease: "linear",
            repeat: Number.POSITIVE_INFINITY,
          }}
        >
          {h.emoji}
        </motion.span>
      ))}
    </div>
  )
}
