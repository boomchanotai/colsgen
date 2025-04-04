import { Container } from "@/components/common/container"

import AugTable from "./aug-table"

export const Demo = () => {
  return (
    <Container className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-12">
        <div className="flex flex-col justify-center gap-4">
          <h2 className="text-primary text-xl font-bold">
            Write one prompt. Generate results for every row.
          </h2>
          <p className="text-sm">
            Use {"{{ column }}"} variables to reference your CSV data. As you
            type, the AI fills in new content across the table instantly — no
            code, no setup.
          </p>
        </div>
        <div>
          <AugTable />
        </div>
      </div>
    </Container>
  )
}
