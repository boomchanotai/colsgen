import { Container } from "@/components/common/container";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

const tiers = [
  {
    name: "Free Tier",
    id: "free-tier",
    href: "#",
    price: "฿0",
    description: "Start with our free tier and upgrade as you grow.",
    features: [
      "Generate up to 100 rows per session",
      "Use your own API key (100% private)",
      "Prompt per column",
      "Instant CSV export",
      "Client-side only",
    ],
    featured: false,
  },
  {
    name: "Pay as you go",
    id: "pay-as-you-go-tier",
    href: "#",
    price: "Starts ฿10",
    description: "For larger jobs, paid with credits. Flexible & scalable.",
    features: [
      "Run background jobs",
      "No need to keep your tab open",
      "No limit on rows",
      "Use powerful models (GPT-4, Claude, etc.)",
      "Starts at ฿10 for 50,000 tokens (≈ 2,000 rows with short prompts)",
      "No subscription required",
    ],
    featured: true,
  },
];

export const Pricing = () => {
  return (
    <Container className="py-8">
      <div className="text-center space-y-4">
        <h2 className="text-primary font-semibold">Pricing</h2>
        <p className="text-4xl font-semibold tracking-tight text-balance">
          Simple Pricing for Every Workflow
        </p>
        <p className="text-lg">
          Start free. Pay only when you need to process more data <br /> or
          unlock background processing.
        </p>
      </div>
      <div className="mx-auto mt-16 grid max-w-lg grid-cols-1 items-center gap-y-6 sm:mt-20 sm:gap-y-0 lg:max-w-4xl lg:grid-cols-2">
        {tiers.map((tier, tierIdx) => (
          <div
            key={tier.id}
            className={cn(
              tier.featured
                ? "relative bg-gray-900 shadow-2xl"
                : "bg-white/60 sm:mx-8 lg:mx-0",
              tier.featured
                ? ""
                : tierIdx === 0
                  ? "rounded-t-3xl sm:rounded-b-none lg:rounded-tr-none lg:rounded-bl-3xl"
                  : "sm:rounded-t-none lg:rounded-tr-3xl lg:rounded-bl-none",
              "rounded-3xl p-8 ring-1 ring-gray-900/10 sm:p-10",
            )}
          >
            <h3
              id={tier.id}
              className={cn(
                tier.featured ? "text-indigo-400" : "text-indigo-600",
                "text-base/7 font-semibold",
              )}
            >
              {tier.name}
            </h3>
            <p className="mt-4 flex items-baseline gap-x-2">
              <span
                className={cn(
                  tier.featured ? "text-white" : "text-gray-900",
                  "text-5xl font-semibold tracking-tight",
                )}
              >
                {tier.price}
              </span>
            </p>
            <p
              className={cn(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-6 text-base/7",
              )}
            >
              {tier.description}
            </p>
            <ul
              role="list"
              className={cn(
                tier.featured ? "text-gray-300" : "text-gray-600",
                "mt-8 space-y-3 text-sm/6 sm:mt-10",
              )}
            >
              {tier.features.map((feature) => (
                <li key={feature} className="flex gap-x-3">
                  <CheckIcon
                    aria-hidden="true"
                    className={cn(
                      tier.featured ? "text-indigo-400" : "text-indigo-600",
                      "h-6 w-5 flex-none",
                    )}
                  />
                  {feature}
                </li>
              ))}
            </ul>
            <a
              href={tier.href}
              aria-describedby={tier.id}
              className={cn(
                tier.featured
                  ? "bg-indigo-500 text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-indigo-500"
                  : "text-indigo-600 ring-1 ring-indigo-200 ring-inset hover:ring-indigo-300 focus-visible:outline-indigo-600",
                "mt-8 block rounded-md px-3.5 py-2.5 text-center text-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 sm:mt-10",
              )}
            >
              Get started today
            </a>
          </div>
        ))}
      </div>
    </Container>
  );
};
