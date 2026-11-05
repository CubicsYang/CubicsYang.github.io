---
title: 'Pop-HSTM: a multi-scale coupled framework for dynamic population modeling'
authors:
- Dehao Li
- Sijin Li
- Haiping Zhang
- Nuozhou Shen
- admin
- Guoan Tang
date: '2026-11-04'
publishDate: '2026-11-04T00:00:00Z'
publication_types:
- article-journal
publication: '*International Journal of Geographical Information Science*'
abstract: >-
  Predicting fine-grained population distributions over time remains challenging because observational
  proxies are heterogeneous and indirect, and human mobility involves coupled spatial and temporal processes.
  Existing methods often insufficiently represent multi-scale spatial constraints, especially the interaction
  between large-scale urban structures and local neighborhood processes. To address this gap, this study
  proposes Pop-HSTM, a global-local coupled deep learning framework for dynamic population prediction.
  Pop-HSTM integrates local spatial interaction learning, temporal dependency modeling, and cross-scale
  spatial fusion to jointly represent neighborhood-level interactions and broader mobility patterns. Using
  mobile phone data and multi-source geospatial covariates in Beijing, Pop-HSTM outperforms selected
  state-of-the-art baselines, reducing prediction errors by approximately 20–40%. It also maintains stable
  performance under extended prediction horizons of up to 96 h and limited historical observations. The
  results suggest that explicitly coupling global spatial structure with local interactions can improve
  fine-grained dynamic population modeling and provide a useful framework for spatiotemporal prediction
  in GIS.
summary: >-
  Pop-HSTM is a global-local coupled deep learning framework for dynamic population prediction that
  combines local spatial interaction learning, ConvLSTM and Temporal Transformer modeling, and cross-scale
  spatial fusion. Tested with mobile phone data and multi-source geospatial covariates in Beijing, it cuts
  prediction errors by about 20–40% against state-of-the-art baselines and stays stable for prediction
  horizons of up to 96 h.
tags:
- Dynamic population
- Spatiotemporal prediction
- Deep learning
- Neighborhood interactions
featured: false
hugoblox:
  ids:
    doi: 10.1080/13658816.2026.2756585
links:
- type: code
  url: https://doi.org/10.6084/m9.figshare.32399223
image:
  caption: Overall framework of Pop-HSTM for dynamic population prediction.
  focal_point: ''
  preview_only: false
---
