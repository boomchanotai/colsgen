import React, { useEffect } from "react"

import { Sparkles } from "lucide-react"
import { motion, useCycle } from "motion/react"

export default function DotsCycle() {
  // useCycle helps us toggle among multiple states in a loop
  const [dots, cycleDots] = useCycle(".", "..", "...", "....", ".....")

  useEffect(() => {
    const interval = setInterval(() => {
      cycleDots()
    }, 500)

    return () => clearInterval(interval)
  }, [cycleDots])

  return (
    <motion.span
      className="flex flex-col items-center justify-center gap-2 font-semibold"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
    >
      <Sparkles className="text-primary size-12" />
      <p>Generating {dots}</p>
    </motion.span>
  )
}
