import { Demo } from "./components/demo"
import { Features } from "./components/features"
import { Hero } from "./components/hero"

export const Home = () => {
  return (
    <div className="space-y-16">
      <Hero />
      <Features />
      {/* <Pricing /> */}
      <Demo />
    </div>
  )
}
