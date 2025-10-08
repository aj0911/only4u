"use client"

import { motion } from "framer-motion"
import { useMemo } from "react"

type Heart = {
  id: number
  left: string
  size: number
  delay: number
  duration: number
  rotate: number
  opacity: number
}

export function AnimatedHearts() {
  const hearts = useMemo<Heart[]>(
    () =>
      Array.from({ length: 16 }).map((_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: 18 + Math.round(Math.random() * 14),
        delay: Math.random() * 4,
        duration: 8 + Math.random() * 8,
        rotate: -10 + Math.random() * 20,
        opacity: 0.35 + Math.random() * 0.35,
      })),
    [],
  )

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0">
      {hearts.map((h) => (
        <motion.span
          key={h.id}
          className="absolute select-none"
          style={{
            left: h.left,
            fontSize: h.size,
            color: "rgba(255, 255, 255, 0.85)",
            textShadow: "0 2px 6px rgba(0,0,0,0.15)",
          }}
          initial={{ y: "110%", opacity: 0, rotate: h.rotate }}
          animate={{
            y: "-10%",
            opacity: h.opacity,
            rotate: h.rotate,
          }}
          transition={{
            delay: h.delay,
            duration: h.duration,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "mirror",
          }}
        >
          {"💖"}
        </motion.span>
      ))}
    </div>
  )
}
