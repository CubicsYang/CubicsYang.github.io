---
title: "Vision2Slope: estimating urban road slopes with street view imagery"
authors:
- admin
- Zicheng Fan
- Hao Li
- Wufan Zhao
- Xin Yang
- Guoan Tang
- Filip Biljecki

author_notes:

date: "2026-04-01"
doi: "10.1080/13658816.2026.2640612"
  
# Schedule page publish date (NOT publication's date).
publishDate: "2026-04-01T00:00:00Z"
# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: "*International Journal of Geographical Information Science*"
publication_short: ""

abstract: Road slopes shape mobility patterns and drive the reliability of urban simulations. Yet in most cities, road-level slope information remains scarce. We introduce Vision2Slope, a framework that leverages panoramic street view imagery to estimate road slopes using computer vision techniques. The workflow consists of three steps: (i) projecting panoramic images into road-aligned views; (ii) semantic-prompted image deskewing to correct geometric distortion induced by camera orientation; and (iii) a two-level slope estimation strategy that extracts point- and segment-level slope and relief characteristics from road-edge geometry and iterative regression to reduce outliers. Using Google Street View images from San Francisco and New York City, the framework estimates slopes for over 60,000 locations and 17,000 street segments. Point- and segment-level MAEs are 0.81°/0.57° and 0.72°/0.78°, respectively, with segment relief errors of 1.70 and 1.66 m. Conditional bias analysis reveals the influence of street-level environmental features on estimation accuracy. The proposed framework significantly outperforms the omnipresent 30 m digital elevation models and maintains robustness under simulated changes in camera orientation and imaging conditions. As an open and scalable workflow, Vision2Slope emphasizes the potential of street view imagery for cost-effective, detailed urban road slope mapping, enriching foundational data for vertical-aware urban analytics.
# Summary. An optional shortened abstract.
summary: Road slope is a critical yet underrepresented variable in urban analysis. This study presents Vision2Slope, a scalable framework that uses panoramic street view imagery and computer vision to estimate road slopes at both point and segment levels. The method integrates view transformation, semantic-guided image correction, and robust regression to derive reliable slope and relief metrics. Tested on over 60,000 locations across San Francisco and New York City, it achieves high accuracy and significantly outperforms commonly used 30 m DEMs. The results also highlight how street-level conditions affect estimation performance. Overall, Vision2Slope offers a cost-effective and globally applicable solution for generating high-resolution road slope data, supporting more accurate and vertical-aware urban analytics.

tags:
- Road slope
- Street view imagery
- Hilly city
- Computer vision
- 3D Urban analytics

featured: True

# links:
# - name: ""
#   url: ""
url_pdf: 'https://ual.sg/publication/2026-ijgis-vision-2-slope/2026-ijgis-vision-2-slope.pdf'
url_code: 'https://github.com/CubicsYang/Vision2Slope'
url_dataset: ''
url_poster: 'vision2slope-poster-yang.jpg'
url_project: 'https://github.com/CubicsYang/Vision2Slope'
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Vision2Slope framework overview.'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: [vision2slope]

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: “”
---

<!-- {{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}} -->
<!-- 
{{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
