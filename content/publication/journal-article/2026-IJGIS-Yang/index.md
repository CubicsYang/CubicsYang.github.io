---
title: 'Vision2Slope: estimating urban road slopes with street view imagery'
authors:
- admin
- Zicheng Fan
- Hao Li
- Wufan Zhao
- Xin Yang
- Guoan Tang
- Filip Biljecki
date: '2026-04-01'
publishDate: '2026-04-01T00:00:00Z'
publication_types:
- article-journal
publication: '*International Journal of Geographical Information Science*'
abstract: >-
  Road slopes shape mobility patterns and drive the reliability of urban simulations. Yet in most cities,
  road-level slope information remains scarce. We introduce Vision2Slope, a framework that leverages panoramic
  street view imagery to estimate road slopes using computer vision techniques. The workflow consists
  of three steps: (i) projecting panoramic images into road-aligned views; (ii) semantic-prompted image
  deskewing to correct geometric distortion induced by camera orientation; and (iii) a two-level slope
  estimation strategy that extracts point- and segment-level slope and relief characteristics from road-edge
  geometry and iterative regression to reduce outliers. Using Google Street View images from San Francisco
  and New York City, the framework estimates slopes for over 60,000 locations and 17,000 street segments.
  Point- and segment-level MAEs are 0.81°/0.57° and 0.72°/0.78°, respectively, with segment relief errors
  of 1.70 and 1.66 m. Conditional bias analysis reveals the influence of street-level environmental features
  on estimation accuracy. The proposed framework significantly outperforms the omnipresent 30 m digital
  elevation models and maintains robustness under simulated changes in camera orientation and imaging
  conditions. As an open and scalable workflow, Vision2Slope emphasizes the potential of street view imagery
  for cost-effective, detailed urban road slope mapping, enriching foundational data for vertical-aware
  urban analytics.
summary: >-
  Road slope is a critical yet underrepresented variable in urban analysis. This study presents Vision2Slope,
  a scalable framework that uses panoramic street view imagery and computer vision to estimate road slopes
  at both point and segment levels. The method integrates view transformation, semantic-guided image correction,
  and robust regression to derive reliable slope and relief metrics. Tested on over 60,000 locations across
  San Francisco and New York City, it achieves high accuracy and significantly outperforms commonly used
  30 m DEMs. The results also highlight how street-level conditions affect estimation performance. Overall,
  Vision2Slope offers a cost-effective and globally applicable solution for generating high-resolution
  road slope data, supporting more accurate and vertical-aware urban analytics.
tags:
- Road slope
- Street view imagery
- Hilly city
- Computer vision
- 3D Urban analytics
featured: true
hugoblox:
  ids:
    doi: 10.1080/13658816.2026.2656269
links:
- type: pdf
  url: https://ual.sg/publication/2026-ijgis-vision-2-slope/2026-ijgis-vision-2-slope.pdf
- type: code
  url: https://github.com/CubicsYang/Vision2Slope
- type: poster
  url: /publication/journal-article/2026-ijgis-yang/vision2slope-poster-yang.jpg
image:
  caption: Vision2Slope framework overview.
  focal_point: ''
  preview_only: false
projects:
- vision2slope
---
