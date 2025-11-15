"use client"

import { useCallback, useMemo, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

type Step = "initial" | "yes" | "nudge" | "evasive" | "finally-yes"

export function ProposalCard() {
  const [step, setStep] = useState<Step>("initial")
  const [noXY, setNoXY] = useState<{ x: number; y: number }>({ x: 0, y: 0 })
  const zoneRef = useRef<HTMLDivElement>(null)

  const title = useMemo(() => {
    switch (step) {
      case "initial":
        return "Ridhima, would you be my Girlfriend? 💖"
      case "nudge":
      case "evasive":
        return "Bnja naa yrr 😭"
      case "yes":
        return "Yay, Ridhima! You just made me the happiest person 💞"
      case "finally-yes":
        return "Hehe, Ridhima—knew you’d say yes eventually 😍💫"
    }
  }, [step])

  const fireConfetti = useCallback(async () => {
    try {
      const confetti = (await import("canvas-confetti")).default
      confetti({
        particleCount: 160,
        spread: 80,
        origin: { y: 0.7 },
        scalar: 0.8,
        ticks: 160,
        colors: ["#fb7185", "#ef4444", "#fca5a5", "#f43f5e"],
      })
      confetti({
        particleCount: 100,
        spread: 60,
        angle: 120,
        origin: { x: 0.1, y: 0.7 },
        scalar: 0.9,
        ticks: 160,
      })
      confetti({
        particleCount: 100,
        spread: 60,
        angle: 60,
        origin: { x: 0.9, y: 0.7 },
        scalar: 0.9,
        ticks: 160,
      })
    } catch {
      // no-op if confetti library isn't available
    }
  }, [])

  const handleYes = useCallback(async () => {
    setStep("yes")
    await fireConfetti()
  }, [fireConfetti])

  const goNudge = useCallback(() => setStep("nudge"), [])
  const goEvasive = useCallback(() => setStep("evasive"), [])

  const moveNoButton = useCallback(() => {
    if (!zoneRef.current) return
    const rect = zoneRef.current.getBoundingClientRect()
    // keep button within the zone with some margins
    const margin = 16
    const maxX = Math.max(0, rect.width - 120 - margin) // approx button width
    const maxY = Math.max(0, rect.height - 48 - margin) // approx button height
    const x = Math.round(Math.random() * maxX)
    const y = Math.round(Math.random() * maxY)
    setNoXY({ x, y })
  }, [])

  return (
    <div className="w-full max-w-md">
      <Card className="rounded-3xl shadow-lg border-0 bg-white/85 backdrop-blur-md">
        <CardContent className="p-6 md:p-8">
          <AnimatePresence mode="popLayout">
            <motion.h1
              key={title}
              className="text-center text-3xl md:text-4xl font-serif text-pretty"
              style={{ color: "var(--love-foreground)" }}
              initial={{ opacity: 0, y: 12, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.98 }}
              transition={{ duration: 0.35, ease: "easeOut" }}
            >
              {title}
            </motion.h1>
          </AnimatePresence>

          {/* Button Zone */}
          <div ref={zoneRef} className="relative mt-6 md:mt-8" style={{ minHeight: step === "evasive" ? 180 : 0 }}>
            {step === "initial" && (
              <div className="flex items-center justify-center gap-3 md:gap-4">
                <Button
                  onClick={handleYes}
                  className="glow-hover"
                  style={{
                    background: "var(--love-accent)",
                    color: "white",
                  }}
                  size="lg"
                >
                  {"Yes"}
                </Button>

                <Button
                  onClick={goNudge}
                  variant="secondary"
                  className="glow-hover"
                  style={{
                    background: "white",
                    color: "var(--love-foreground)",
                    boxShadow: "0 4px 14px -6px color-mix(in oklab, var(--love-accent) 25%, transparent)",
                  }}
                  size="lg"
                >
                  {"No"}
                </Button>
              </div>
            )}

            {step === "yes" && (
              <motion.p
                className="mt-4 text-center text-lg md:text-xl"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {"Sending you infinite hugs, laughs, and adventures, Ridhima! 🫶✨"}
              </motion.p>
            )}

            {(step === "nudge" || step === "evasive") && (
              <div className="relative">
                {step === "nudge" && (
                  <motion.p
                    className="text-center text-base md:text-lg mb-4"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {"Choose wisely 😌"}
                  </motion.p>
                )}

                <div className="relative h-[160px]">
                  {/* Okay button stays clickable */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-0">
                    <Button
                      onClick={() => setStep("finally-yes")}
                      className="glow-hover"
                      style={{
                        background: "var(--love-accent)",
                        color: "white",
                      }}
                      size="lg"
                    >
                      {"Okay 😅"}
                    </Button>
                  </div>

                  {/* Evasive No button */}
                  <AnimatePresence>
                    <motion.div
                      key="no-evasive"
                      className="absolute"
                      onMouseEnter={() => {
                        if (step === "nudge") goEvasive()
                        moveNoButton()
                      }}
                      onHoverStart={() => {
                        if (step === "nudge") goEvasive()
                        moveNoButton()
                      }}
                      animate={{
                        x: noXY.x,
                        y: noXY.y,
                        scale: 1,
                      }}
                      initial={{ x: 8, y: 8, scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    >
                      <Button
                        variant="secondary"
                        className="glow-hover"
                        style={{
                          background: "white",
                          color: "var(--love-foreground)",
                        }}
                        size="lg"
                        onClick={(e) => {
                          e.preventDefault()
                          // As a safety, still dodge on click attempts:
                          moveNoButton()
                        }}
                      >
                        {"No 😭"}
                      </Button>
                    </motion.div>
                  </AnimatePresence>
                </div>

                <motion.p
                  className="mt-4 text-center text-sm opacity-90"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: step === "evasive" ? 1 : 0.6, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {"You can’t escape me, Ridhima 😜💘"}
                </motion.p>
              </div>
            )}

            {step === "finally-yes" && (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="text-center"
              >
                <p className="text-base md:text-lg">
                  {"Couple forever activated, Ridhima! 🤝💫 Let’s make beautiful memories."}
                </p>
                <div className="mt-4 flex items-center justify-center gap-2">
                  <Button
                    onClick={handleYes}
                    className="glow-hover"
                    style={{ background: "var(--love-accent)", color: "white" }}
                  >
                    {"Confetti again!"}
                  </Button>
                  <Button
                    variant="secondary"
                    className="glow-hover"
                    onClick={() => setStep("initial")}
                    style={{ background: "white", color: "var(--love-foreground)" }}
                  >
                    {"Restart"}
                  </Button>
                </div>
              </motion.div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
