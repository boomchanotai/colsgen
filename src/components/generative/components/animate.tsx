import React, { useEffect } from "react";
import { motion, useCycle } from "motion/react";
import { Sparkles } from "lucide-react";

export default function DotsCycle() {
  // useCycle helps us toggle among multiple states in a loop
  const [dots, cycleDots] = useCycle(".", "..", "...", "....", ".....");

  useEffect(() => {
    const interval = setInterval(() => {
      cycleDots();
    }, 500);

    return () => clearInterval(interval);
  }, [cycleDots]);

  return (
    <motion.span
      className="font-semibold flex justify-center items-center flex-col gap-2"
      animate={{ opacity: [1, 0.5, 1] }}
      transition={{ duration: 0.7, repeat: Infinity, repeatType: "reverse" }}
    >
      <Sparkles className="size-12 text-primary" />
      <p>Generating {dots}</p>
    </motion.span>
  );
}
