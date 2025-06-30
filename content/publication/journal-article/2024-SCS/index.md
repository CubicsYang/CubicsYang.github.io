---
title: "Refining urban morphology: An explainable machine learning method for estimating footprint-level building height"
authors:
- Yang Chen
- Wenjie Sun
- Ling Yang
- Xin Yang
- Xingyu Zhou
- Xin Li
- Sijin Li
- Guoan Tang
author_notes:

date: "2024-10-01T00:00:00Z"
doi: "10.1016/j.scs.2024.105635"

# Schedule page publish date (NOT publication's date).
publishDate: "2024-10-01T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: "*Sustainable Cities and Society*"
publication_short: ""

abstract: Fine-grained 3D buildings with diverse morphology are a cornerstone of urban physical structures and have profound implications for sustainable city development. However, accurately estimating building height at the footprint-level is a challenge. This study bridged this gap by using random forest models to integrate the elevation, geometry and shape attributes of individual buildings, further refining those with spatial aggregation. It considered over one million buildings across 10 large Chinese cities and trained two-types models that demonstrated commendable performance in city-specific (the mean absolute error (MAE) ranged from 3.43 m to 5.06 m) and combined (MAE = 4.68 m) models. Results revealed that the current dataset had a finer urban morphology compared with existing datasets and showed outstanding generalisability in method transfer and feature ablation tests. By incorporating Shapley values, we explored the features' global and local impacts. The explainable results demonstrated that building area was the most impactful feature, and the elevation-dimension features were particularly beneficial in estimating high-rise buildings. Using the fine-grained 3D buildings, we explored the connections between explicit morphology differences and implicit contexts in cities. Overall, our work is an endeavour to estimate footprint-level building height as fuel for refining urban morphology and enabling sustainable city studies.

# Summary. An optional shortened abstract.
summary: This study bridged this gap by using random forest models to integrate the elevation, geometry and shape attributes of individual buildings, further refining those with spatial aggregation.

tags:
- building height
- urban morphology
- explainable machine learning
featured: true

# links:
# - name: ""
#   url: ""
url_pdf: ''
url_code: 'https://github.com/CubicsYang/Footprint_Building_Height_Estimation'
url_dataset: 'https://www.geodata.cn/data/datadetails.html?dataguid=135869909769675&docId=151'
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Zoom-in of the building height estimation results'
  focal_point: ""
  preview_only: false

# Associated Projects (optional).
#   Associate this publication with one or more of your projects.
#   Simply enter your project's folder or file name without extension.
#   E.g. `internal-project` references `content/project/internal-project/index.md`.
#   Otherwise, set `projects: []`.
projects: []

# Slides (optional).
#   Associate this publication with Markdown slides.
#   Simply enter your slide deck's filename without extension.
#   E.g. `slides: "example"` references `content/slides/example/index.md`.
#   Otherwise, set `slides: ""`.
slides: “”
---

<!-- 
{{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
