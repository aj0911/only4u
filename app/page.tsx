import { AnimatedHearts } from "@/components/animated-hearts"
import { ProposalCard } from "@/components/proposal-card"

export default function Page() {
  return (
    <main className="relative min-h-dvh bg-love-gradient overflow-hidden flex flex-col justify-center items-center selection:bg-rose-200">
      {/* Warm Golden-hour Sunset Orb */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[380px] sm:w-[520px] h-[380px] sm:h-[520px] rounded-full blur-3xl opacity-70"
        style={{
          background: "radial-gradient(circle, rgba(254, 215, 170, 0.85) 0%, rgba(251, 113, 133, 0.45) 55%, transparent 75%)",
        }}
      />
      <AnimatedHearts />
      <section className="relative z-10 flex items-center justify-center min-h-dvh w-full p-4 py-8">
        <ProposalCard />
      </section>
    </main>
  )
}
