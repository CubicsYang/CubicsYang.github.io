---
title: "An Automatic Approach to Extracting Large-Scale Three-Dimensional Road Networks Using Open-Source Data"
authors:
- Yang, Chen 
- Xin, Yang
- Ling, Yang
- Jiayu, Feng

author_notes:

date: "2022-11-14T00:00:00Z"
doi: "10.3390/rs14225746"

# Schedule page publish date (NOT publication's date).
publishDate: "2022-11-14T00:00:00Z"

# Publication type.
# Accepts a single type but formatted as a YAML list (for Hugo requirements).
# Enter a publication type from the CSL standard.
publication_types: ["article-journal"]

# Publication name and optional abbreviated publication name.
publication: "*Remote Sensing, 14(22)*"
publication_short: ""

abstract: 3D road networks are amongst the indispensable elements of a smart city, which has been explored in various ways. However, researchers still faces challenges extracting 3D networks on a large scale. The global digital surface models (DSMs) with relatively high spatial resolution make it possible to extract 3D road networks. Nevertheless, the complete and accurate elevation of road networks cannot be obtained directly because of the limitation in sensors on the DSM production platform. Thus, we proposed a novel approach to extract large-scale 3D road networks, integrating terrain correction and road engineering rule constraint, by using the Advanced Land Observing Satellite World 3D-30 m DSM, OpenStreetMap and FABDEM. The simplification and terrain correction algorithm were applied to remove most of the edges with excessive grades and reduced the negative impact of the built-up environment in DSM on the extraction accuracy. Moreover, the tunnel parts of the 3D road networks were refined based on road engineering standards. Nanjing of China, Aalborg of Denmark and Los Angeles of the United States are selected as study areas. Using 3D road networks from unmanned aerial vehicle photogrammetry, light detection and ranging and Google Earth as references, we validated the road elevation accuracy of our method and obtained an overall root-mean-square error of 3.80 m and a mean absolute error of 1.94 m. The 3D topology of interchanges with different radii was reconstructed completely. Overall, our work is an endeavour to utilise multiple open-source data to extract large-scale 3D road networks and benefits future research related to smart city reconstruction and 3D urban analysis.

# Summary. An optional shortened abstract.
summary:  We proposed a novel approach to extract large-scale 3D road networks, integrating terrain correction and road engineering rule constraint, by using the Advanced Land Observing Satellite World 3D-30 m DSM, OpenStreetMap and FABDEM.

tags:
- 3D road network
- terrain correction
- road engineering rule
- smart city
- open-source data
- 3D urban analysis
 
featured: false

# links:
# - name: ""
#   url: ""
url_pdf: ''
url_code: 'https://github.com/CubicsYang/Road_Elevation_DSM'
url_dataset: ''
url_poster: ''
url_project: ''
url_slides: ''
url_source: ''
url_video: ''

# Featured image
# To use, add an image named `featured.jpg/png` to your page's folder. 
image:
  caption: ''
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

{{% callout note %}}
Click the *Cite* button above to demo the feature to enable visitors to import publication metadata into their reference management software.
{{% /callout %}}
<!-- 
{{% callout note %}}
Create your slides in Markdown - click the *Slides* button to check out the example.
{{% /callout %}}

Add the publication's **full text** or **supplementary notes** here. You can use rich formatting such as including [code, math, and images](https://docs.hugoblox.com/content/writing-markdown-latex/). -->
