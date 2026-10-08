---
# Leave the homepage title empty to use the site title
title: ""
date: 2022-10-24
type: landing

sections:
  # Custom hero (layouts/_partials/hbx/blocks/bio-hero/block.html).
  # The biography text itself lives in `content/authors/admin/_index.md`.
  - block: bio-hero
    content:
      username: admin
      eyebrow: About me
      headline: 'Measuring the third dimension: of cities, and of the land beneath them.'
      button:
        text: Download CV
        url: /uploads/resume.pdf
      directions:
        - name: 3D Urban Analytics
          icon: building-office-2
          text: Cities grow upward, yet most urban analysis stays flat. I estimate building heights footprint by footprint, read road slopes from street view imagery, and measure accessibility floor by floor in the *vertical* 15-minute city.
          papers:
            - label: Footprint-level building heights
              venue: SCS 2024
              page: publication/journal-article/2024-SCS
            - label: 'Vision2Slope: road slopes from street view'
              venue: IJGIS 2026
              page: publication/journal-article/2026-IJGIS-Yang
            - label: The vertical 15-minute city
              venue: Cities 2025
              page: publication/journal-article/2025-CITIES
        - name: Geomorphometry
          icon: globe-asia-australia
          text: I read landforms from DEMs, from single basins to the whole globe, and map how people reshape the land surface, from terraces and check dams on the Loess Plateau to global relief classes, dune fields and alluvial fans.
          papers:
            - label: Anthropogenic landforms of the Loess Plateau
              venue: Geomorphology 2025
              page: publication/journal-article/2025-Geomor-Yang
            - label: A global relief typology at 1 arcsec
              venue: ESSD 2025
              page: publication/journal-article/2025-ESSD
    design:
      # `hero-terrain` mounts the animated terrain/city background (assets/js/hero-terrain.js)
      css_class: dark hero-terrain
      background:
        color: '#02050e'
      spacing:
        padding: ['0', '0', '0', '0']
  - block: collection
    id: papers
    content:
      title: Selected Publications
      text: "[See all publications →](/publications/)"
      filters:
        folders:
          - publication
        featured_only: true
    design:
      view: paper-card
      spacing:
        padding: ['4rem', '0', '2rem', '0']
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
      view: news-list
      spacing:
        padding: ['2rem', '0', '4rem', '0']
---
