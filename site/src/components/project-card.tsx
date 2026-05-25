import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Project } from "@/lib/projects";
import { host } from "@/lib/projects";
import { ExternalLink } from "lucide-react";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="group h-full transition-colors hover:border-foreground/20">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center justify-between gap-3">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 decoration-foreground/40 truncate"
          >
            {project.name}
          </a>
          <ExternalLink
            className="size-3.5 shrink-0 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
            aria-hidden
          />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">{project.description}</p>
        <p className="text-xs font-mono text-muted-foreground/70">{host(project.url)}</p>
      </CardContent>
    </Card>
  );
}
