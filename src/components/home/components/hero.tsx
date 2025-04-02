import { Container } from "@/components/common/container";
import { Button } from "@/components/ui/button";

export const Hero = () => {
  return (
    <div className="relative">
      <Container className="py-8 space-y-12 ">
        <div className="space-y-2 text-center">
          <p className="font-medium text-xl">Generate 1,000 rows of </p>
          <h1 className="text-2xl font-semibold">
            <span className="text-transparent text-5xl bg-clip-text font-extrabold bg-gradient-to-br from-[#4158D0] via-[#C850C0] to-[#FFCC70]">
              AI content
            </span>{" "}
            <span className="text-nowrap">in seconds.</span>
          </h1>
          <p className="font-medium">
            Upload your CSV. Write your prompt. Export magic.
          </p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <Button size={"lg"} className="text-2xl h-auto py-3 px-12">
            Upload CSV
          </Button>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl"
        >
          <div
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
            className="mx-auto aspect-1155/678 w-[72.1875rem] bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-30"
          />
        </div>
      </Container>
    </div>
  );
};
