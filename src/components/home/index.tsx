import { Demo } from "./components/demo"
import { Hero } from "./components/hero"
import { Privacy } from "./components/privacy"
import { Steps } from "./components/steps"

export const Home = () => {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <Steps />
      <Privacy />
      <Demo />
    </div>
  )
}
