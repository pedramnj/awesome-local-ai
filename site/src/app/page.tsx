import { SiteHeader } from "@/components/site-header";
import { Directory } from "@/components/directory";
import { categories, projects } from "@/lib/projects";

export default function Home() {
  return (
    <>
      <SiteHeader projectCount={projects.length} categoryCount={categories.length} />
      <Directory projects={projects} categories={categories} />
      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto max-w-7xl px-6 text-sm text-muted-foreground">
          <p>
            Source on{" "}
            <a
              href="https://github.com/pedramnj/awesome-local-ai"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              GitHub
            </a>
            . Released under{" "}
            <a
              href="https://github.com/pedramnj/awesome-local-ai/blob/main/LICENSE"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-foreground"
            >
              CC0
            </a>
            .
          </p>
        </div>
      </footer>
    </>
  );
}
