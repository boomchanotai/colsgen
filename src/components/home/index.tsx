import { Container } from "../common/container"
import { Demo } from "./components/demo"
import { Hero } from "./components/hero"
import { Privacy } from "./components/privacy"
import { Steps } from "./components/steps"

export const Home = () => {
  return (
    <div className="space-y-16 py-8">
      <Hero />
      <Container>
        <div className="mx-auto w-full md:w-3/4">
          <iframe
            className="aspect-video w-full"
            src="https://www.youtube.com/embed/RjQiMhi-yGk?si=kNknjVVpHVjivmQv"
            title="YouTube video player"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        </div>
      </Container>
      <Steps />
      <Privacy />
      <Demo />
    </div>
  )
}
