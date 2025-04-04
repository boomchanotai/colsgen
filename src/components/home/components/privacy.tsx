export const Privacy = () => {
  return (
    <section className="bg-muted/40 py-16">
      <div className="container mx-auto max-w-3xl space-y-6 px-8 text-center md:px-0">
        <h2 className="text-3xl font-bold tracking-tight">
          Privacy First. Always.
        </h2>
        <p className="text-muted-foreground text-lg">
          Your data, your prompts, and your API key never touch our servers.
          Everything runs 100% in your browser.
        </p>

        <div className="grid grid-cols-1 gap-6 pt-8 text-left sm:grid-cols-2">
          <div className="bg-background rounded-lg p-6 shadow">
            <h3 className="text-primary mb-1 text-lg font-semibold">
              Runs Client-Side
            </h3>
            <p className="text-muted-foreground text-sm">
              All AI processing happens in your browser. We never store or see
              your data.
            </p>
          </div>

          <div className="bg-background rounded-lg p-6 shadow">
            <h3 className="text-primary mb-1 text-lg font-semibold">
              Use Your Own API Key
            </h3>
            <p className="text-muted-foreground text-sm">
              Bring your Gemini or OpenAI key. You stay in control of costs,
              models, and limits.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
