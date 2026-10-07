---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

design:
  # Default section spacing
  spacing: "6rem"

sections:
  - block: resume-biography-3
    content:
      # Choose a user profile to display (a folder name within `content/authors/`)
      username: admin
      text: ""
      # Show a call-to-action button under your biography? (optional)
      button:
        text: Download CV
        url: /uploads/resume.pdf
    design:
      css_class: dark
      background:
        color: black
        image:
          # Add your image background to `assets/media/`.
          filename: stacked-peaks-dark.svg
          filters:
            brightness: 1.0
          size: cover
          position: center
          parallax: false
  - block: markdown
    content:
      title: '📚 My Research'
      subtitle: ''
      text: |-
        I'm a PhD candidate in the Digital Terrain Analytics team at Nanjing Normal University. From November 2024 to November 2025, I was a visiting scholar at the [Urban Analytics Lab](https://ual.sg), National University of Singapore. My research focuses on the intersection of Geography, Computer Science, and Urban Science.

        I apply a range of qualitative and quantitative methods to comprehensively investigate the urban issues and artificial landscape.
        
        Please reach out to collaborate 😃

        One hour coding a day, keep the bugs away. 🐞
    design:
      columns: '1'
  - block: collection
    id: papers
    content:
      title: Featured Publications
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: article-grid
      columns: 1
  - block: collection
    content:
      title: Recent Publications
      text: "[See all publications →](/publications/)"
      count: 5
      filters:
        folders:
          - publication
        exclude_featured: true
    design:
      view: citation
  - block: collection
    id: news
    content:
      title: Recent News
      text: "[See all news →](/post/)"
      count: 3
      filters:
        folders:
          - post
    design:
      view: date-title-summary
---
