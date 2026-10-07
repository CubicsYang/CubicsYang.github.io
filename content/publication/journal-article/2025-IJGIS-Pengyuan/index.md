---
title: 'A graph neural network for small-area estimation: integrating spatial regularisation, heterogeneous
  spatial units, and Bayesian inference'
authors:
- Pengyuan Liu
- admin
- Xiucheng Liang
- Hao Li
- Filip Biljecki
- Rudi Stouffs
date: '2025-12-29'
publishDate: '2025-12-29T00:00:00Z'
publication_types:
- article-journal
publication: '*International Journal of Geographical Information Science*, 40(7), 2358-2396'
abstract: >-
  Fine-resolution spatial analytics are essential for urban planning and policy-making, yet traditional
  small-area estimation often struggles with sparse, hierarchical, or imbalanced data. This paper introduces
  a Spatially Regularised Bayesian Heterogeneous Graph Neural Network (SR-BHGNN) that integrates multiple
  census tract levels within a unified framework. The model builds a heterogeneous graph where nodes represent
  spatial units at different scales, edges encode adjacency or membership, and Bayesian inference quantifies
  uncertainty in parameters and predictions. A spatial regularisation term, inspired by Tobler’s First
  Law of Geography, penalises large discrepancies between neighbouring nodes, reducing errors in imbalanced
  datasets and ensuring coherent local estimates. We evaluate SR-BHGNN through two London case studies,
  population estimation and PM 2.5 prediction, comparing it against random forests, single-level GNNs,
  and spatial hierarchical Bayesian estimation. SR-BHGNN achieves strong performance gains, with classification
  accuracies of 0.85 for population estimation and 0.81 for PM 2.5 prediction. Its Bayesian design produces
  posterior distributions that capture uncertainty, enabling policy-relevant insights into vulnerable
  neighbourhoods or priority intervention zones (e.g. low-emission areas). These results demonstrate that
  SR-BHGNN advances the state of the art in small-area estimation, offering a flexible, uncertainty-aware
  framework for diverse urban analytics applications.
summary: >-
  Lunar craters are important geomorphological features, that provide valuable insights into lunar morphology,
  geology, and impact processes. However, the current understanding of lunar craters of different sizes,
  especially smaller craters (diameter <5 km), is still incomplete. The lack of understanding of small
  lunar craters affects our understanding of the lunar surface and its geological history. Therefore,
  in this study, we propose a deep learning Crater Detection Algorithms (CDA), called Lunar Topographic
  Knowledge Attention U-Net (LTKAU-Net) that integrates a Digital Elevation Model (DEM) and topographic
  knowledge.
tags:
- Small-area estimation
- Graph neural networks
- Spatial regularisation
- Bayesian inference
- Tobler's First Law of Geography
- Uncertainty quantification
featured: false
hugoblox:
  ids:
    doi: 10.1080/13658816.2025.2597971
links:
- type: code
  url: https://doi.org/10.6084/m9.figshare.29856452
image:
  caption: Overall framework of the proposed SR-BHGNN model for small-area estimation integrating spatial
    regularisation, heterogeneous spatial units, and Bayesian inference.
  focal_point: ''
  preview_only: false
---
