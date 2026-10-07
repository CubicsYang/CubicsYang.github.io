# Yang Chen's Homepage

Source of my academic homepage: <https://cubicsyang.github.io/>

Built with [Hugo](https://gohugo.io/) and the [Hugo Blox](https://hugoblox.com/) Academic CV template, and deployed to GitHub Pages by [`.github/workflows/publish.yaml`](.github/workflows/publish.yaml) on every push to `main`.

## Local preview

```bash
npm ci
hugo server
```

Requires Hugo extended (see `hugoblox.yaml` for the version used in CI), Go and Node.js.

## Where things live

| Content | Path |
| --- | --- |
| Profile, education, skills, awards | `content/authors/admin/_index.md` |
| Home page sections | `content/_index.md` |
| Publications (one folder each, with `cite.bib`) | `content/publication/` |
| News posts | `content/post/` |
| Projects | `content/project/` |
| CV (linked from the home page) | `static/uploads/resume.pdf` |

For a new publication, generate `cite.bib` from the DOI rather than copying it by hand:

```bash
curl -sLH "Accept: application/x-bibtex" https://doi.org/<DOI>
```

Template credits: [HugoBlox/theme-academic-cv](https://github.com/HugoBlox/theme-academic-cv) (MIT).
