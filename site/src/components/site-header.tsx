import { Badge } from "@/components/ui/badge";

export function SiteHeader({ projectCount, categoryCount }: { projectCount: number; categoryCount: number }) {
  return (
    <header className="border-b border-border/60">
      <div className="mx-auto max-w-7xl px-6 py-12 sm:py-16">
        <div className="flex items-center gap-3 mb-4">
          <Badge variant="outline" className="font-mono text-xs">
            v1
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {projectCount} projects · {categoryCount} categories
          </Badge>
        </div>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight">
          Awesome Local AI
        </h1>
        <p className="mt-4 max-w-2xl text-base sm:text-lg text-muted-foreground leading-relaxed">
          A curated directory of tools, frameworks, and models for running AI locally — on your own
          hardware, on your own server. No cloud required. No data leaving your network.
        </p>
        <div className="mt-6 flex flex-wrap gap-2 text-sm">
          <a
            href="https://github.com/pedramnj/awesome-local-ai"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 hover:bg-accent transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://github.com/pedramnj/awesome-local-ai/blob/main/docs/hardware-guide.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 hover:bg-accent transition-colors"
          >
            Hardware Guide
          </a>
          <a
            href="https://github.com/pedramnj/awesome-local-ai/blob/main/CONTRIBUTING.md"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-1.5 hover:bg-accent transition-colors"
          >
            Contribute
          </a>
        </div>
      </div>
    </header>
  );
}
