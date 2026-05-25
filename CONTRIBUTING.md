# Contributing

Thanks for helping keep this list useful. Quality matters more than quantity.

## The bar

A project belongs on this list if **all** of the following are true:

- **Open source**, or has a genuinely usable free local tier (no trial-only, no token caps that make it useless).
- **Local-first** — it actually runs on the user's own hardware. Cloud-hosted SaaS does not belong here, even if the company is friendly.
- **Actively maintained** — at least one substantive commit in the last six months, or marked clearly as stable/feature-complete.
- **Documented enough to install in under an hour** by a competent engineer with no prior knowledge of the project.
- **Substantively different** from existing entries in the same section. A near-clone of something already listed needs to explain what makes it worth a separate entry.

If a project on the list stops meeting the bar, open an issue with the [Report a broken or stale entry](../../issues/new?template=report-broken.yml) template.

## Entry format

```markdown
- [Project Name](https://link.to/project) — One-sentence description starting with a capital letter, ending with a period.
```

Rules:

- **One sentence, one line.** If you need two sentences, you're trying to sell. Cut it.
- **No marketing language.** No "revolutionary", "cutting-edge", "next-generation". State what it does.
- **Be concrete.** "Fast" is meaningless; "C++ inference engine, runs on CPU and CUDA" is useful.
- **Link to the canonical project page** — usually the GitHub repo. Project homepage is acceptable if the repo is hard to find from there.
- **Alphabetical-ish within a section is fine but not required.** Order by relevance / "what would a beginner want to see first" when it matters.

## Sections

If you think a new section is needed, open an issue first to discuss. The list works because sections are tight; adding a new one is a high bar.

## Style

- US English.
- Sentence case for section headers, not Title Case.
- No emoji in entry descriptions.
- Markdown links, not raw URLs.

## Pull request process

1. Fork and create a branch named for what you're adding: `add-tabby`, `update-ollama-link`, `remove-archived-x`.
2. Make the smallest change that adds the entry. One PR per project unless you're doing a clear sweep (e.g., re-sorting a section).
3. In the PR description, link to the project, and briefly justify how it clears the bar above.
4. CI runs link checks and markdown lint. Fix any failures before requesting review.

## Code of conduct

Be useful, be respectful. Disagreements about whether a project belongs are normal; personal attacks are not.

Reports of unacceptable behavior go to the repo issues with the appropriate label.
