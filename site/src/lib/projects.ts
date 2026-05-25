import data from "@/data/projects.json";

export interface Project {
  slug: string;
  name: string;
  url: string;
  description: string;
  category: string;
  subcategory: string | null;
}

export interface Category {
  slug: string;
  name: string;
  order: number;
}

export interface ProjectIndex {
  generatedAt: string;
  categories: Category[];
  projects: Project[];
}

const typed = data as ProjectIndex;

export const projects: Project[] = typed.projects;
export const categories: Category[] = typed.categories;
export const generatedAt = typed.generatedAt;

export function projectsByCategory(): Map<string, Project[]> {
  const map = new Map<string, Project[]>();
  for (const cat of categories) {
    map.set(cat.slug, []);
  }
  for (const p of projects) {
    const bucket = map.get(p.category);
    if (bucket) bucket.push(p);
  }
  return map;
}

export function host(url: string): string {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return url;
  }
}
