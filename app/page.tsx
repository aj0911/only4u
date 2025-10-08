import { AnimatedHearts } from "@/components/animated-hearts"
import { ProposalCard } from "@/components/proposal-card"

export default function Page() {
  return (
    <main className="relative min-h-dvh bg-love-gradient overflow-hidden">
      <AnimatedHearts />
      <section className="relative z-10 flex items-center justify-center min-h-dvh p-4">
        <ProposalCard />
      </section>
    </main>
  )
}
