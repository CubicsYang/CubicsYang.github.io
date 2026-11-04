---
title: 'Experience'
date: 2023-10-24
type: landing

design:
  spacing: '5rem'

# Note: `username` refers to the user's folder name in `content/authors/`

# Page sections
sections:
  - block: resume-experience
    content:
      username: admin
    design:
      # Hugo date format
      date_format: 'January 2006'
      # Education or Experience section first?
      is_education_first: false
  # Custom block (layouts/_partials/hbx/blocks/resume-presentations/block.html);
  # the list itself lives under `presentations:` in content/authors/admin/_index.md.
  - block: resume-presentations
    content:
      title: Presentations
      username: admin
    design:
      date_format: 'Jan 2006'
  - block: resume-skills
    content:
      title: Skills & Hobbies
      username: admin
    design:
      show_skill_percentage: false
  - block: resume-awards
    content:
      title: Awards
      username: admin
    design:
      date_format: '2006'
  - block: resume-languages
    content:
      title: Languages
      username: admin
---
