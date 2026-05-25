"use client";

import { useDeferredValue, useMemo, useState } from "react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ProjectCard } from "@/components/project-card";
import type { Category, Project } from "@/lib/projects";

interface DirectoryProps {
  projects: Project[];
  categories: Category[];
}

export function Directory({ projects, categories }: DirectoryProps) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [activeCategories, setActiveCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (slug: string) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(slug)) next.delete(slug);
      else next.add(slug);
      return next;
    });
  };

  const reset = () => {
    setQuery("");
    setActiveCategories(new Set());
  };

  const filtered = useMemo(() => {
    const q = deferredQuery.trim().toLowerCase();
    return projects.filter((p) => {
      if (activeCategories.size > 0 && !activeCategories.has(p.category)) return false;
      if (!q) return true;
      return (
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    });
  }, [projects, activeCategories, deferredQuery]);

  const grouped = useMemo(() => {
    const map = new Map<string, Project[]>();
    for (const p of filtered) {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category)!.push(p);
    }
    return map;
  }, [filtered]);

  const categoryCounts = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of projects) {
      counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return counts;
  }, [projects]);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10 grid grid-cols-1 lg:grid-cols-[260px_1fr] gap-8">
      <aside className="lg:sticky lg:top-6 lg:self-start space-y-6">
        <div className="space-y-2">
          <label htmlFor="search" className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            Search
          </label>
          <Input
            id="search"
            type="search"
            placeholder="Try 'ollama', 'whisper', 'rag'…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Categories
            </span>
            {(activeCategories.size > 0 || query) && (
              <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs" onClick={reset}>
                Reset
              </Button>
            )}
          </div>
          <ScrollArea className="h-[60vh] pr-2">
            <ul className="space-y-1.5">
              {categories.map((cat) => {
                const id = `cat-${cat.slug}`;
                const active = activeCategories.has(cat.slug);
                return (
                  <li key={cat.slug} className="flex items-center gap-2.5">
                    <Checkbox
                      id={id}
                      checked={active}
                      onCheckedChange={() => toggleCategory(cat.slug)}
                    />
                    <label
                      htmlFor={id}
                      className="flex flex-1 items-center justify-between text-sm cursor-pointer leading-tight"
                    >
                      <span className={active ? "font-medium" : ""}>{cat.name}</span>
                      <span className="text-xs text-muted-foreground tabular-nums">
                        {categoryCounts.get(cat.slug) ?? 0}
                      </span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </ScrollArea>
        </div>
      </aside>

      <main className="min-w-0">
        <div className="mb-6 flex items-baseline justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-medium text-foreground tabular-nums">{filtered.length}</span> of{" "}
            <span className="tabular-nums">{projects.length}</span> projects
            {activeCategories.size > 0 && (
              <>
                {" "}in{" "}
                <Badge variant="outline" className="ml-1 font-normal">
                  {activeCategories.size} {activeCategories.size === 1 ? "category" : "categories"}
                </Badge>
              </>
            )}
          </p>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-lg border border-dashed border-border p-12 text-center">
            <p className="text-sm text-muted-foreground">No projects match the current filters.</p>
            <Button variant="outline" className="mt-4" onClick={reset}>
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="space-y-12">
            {categories
              .filter((cat) => grouped.has(cat.slug))
              .map((cat) => {
                const list = grouped.get(cat.slug)!;
                return (
                  <section key={cat.slug} id={cat.slug} className="scroll-mt-6">
                    <div className="mb-4 flex items-baseline gap-3">
                      <h2 className="text-lg font-semibold tracking-tight">{cat.name}</h2>
                      <Badge variant="secondary" className="font-mono text-xs">
                        {list.length}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                      {list.map((p) => (
                        <ProjectCard key={p.slug} project={p} />
                      ))}
                    </div>
                  </section>
                );
              })}
          </div>
        )}
      </main>
    </div>
  );
}
