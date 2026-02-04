---
title: "A graph neural network for small-area estimation: integrating spatial regularisation, heterogeneous spatial units, and Bayesian inference"
authors:
- Pengyuan Liu
- Yang Chen
- Xiucheng Liang
- Hao Li
- Filip Biljecki
- Rudi Stouffs
author_notes:

date: "2025-12-29"
doi: "10.1080/10095020.2025.2452932"

# Schedule page publish date (NOT publication's date).
publishDate: "2025-12-29T00:00:00Z"
# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: "*International Journal of Geographical Information Science*"
publication_short: ""

abstract: Fine-resolution spatial analytics are essential for urban planning and policy-making, yet traditional small-area estimation often struggles with sparse, hierarchical, or imbalanced data. This paper introduces a Spatially Regularised Bayesian Heterogeneous Graph Neural Network (SR-BHGNN) that integrates multiple census tract levels within a unified framework. The model builds a heterogeneous graph where nodes represent spatial units at different scales, edges encode adjacency or membership, and Bayesian inference quantifies uncertainty in parameters and predictions. A spatial regularisation term, inspired by Tobler’s First Law of Geography, penalises large discrepancies between neighbouring nodes, reducing errors in imbalanced datasets and ensuring coherent local estimates. We evaluate SR-BHGNN through two London case studies, population estimation and PM 2.5 prediction, comparing it against random forests, single-level GNNs, and spatial hierarchical Bayesian estimation. SR-BHGNN achieves strong performance gains, with classification accuracies of 0.85 for population estimation and 0.81 for PM 2.5 prediction. Its Bayesian design produces posterior distributions that capture uncertainty, enabling policy-relevant insights into vulnerable neighbourhoods or priority intervention zones (e.g. low-emission areas). These results demonstrate that SR-BHGNN advances the state of the art in small-area estimation, offering a flexible, uncertainty-aware framework for diverse urban analytics applications.
# Summary. An optional shortened abstract.
summary: Lunar craters are important geomorphological features, that provide valuable insights into lunar morphology, geology, and impact processes. However, the current understanding of lunar craters of different sizes, especially smaller craters (diameter <5 km), is still incomplete. The lack of understanding of small lunar craters affects our understanding of the lunar surface and its geological history. Therefore, in this study, we propose a deep learning Crater Detection Algorithms (CDA), called Lunar Topographic Knowledge Attention U-Net (LTKAU-Net) that integrates a Digital Elevation Model (DEM) and topographic knowledge.

tags:
- Small-area estimation
- Graph neural networks
- Spatial regularisation
- Bayesian inference
- Tobler's First Law of Geography
- Uncertainty quantification
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: 'https://www.tandfonline.com/doi/full/10.1080/13658816.2025.2597971'
url_code: 'https://doi.org/10.6084/m9.figshare.29856452'
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: 'Overall framework of the proposed SR-BHGNN model for small-area estimation integrating spatial regularisation, heterogeneous spatial units, and Bayesian inference.'
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

<!-- {{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}} -->
<!-- 
{{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
