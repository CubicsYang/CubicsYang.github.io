---
title: 'Refining urban morphology: An explainable machine learning method for estimating footprint-level
  building height'
authors:
- admin
- Wenjie Sun
- Ling Yang
- Xin Yang
- Xingyu Zhou
- Xin Li
- Sijin Li
- Guoan Tang
date: '2024-10-01T00:00:00Z'
publishDate: '2024-10-01T00:00:00Z'
publication_types:
- article-journal
publication: '*Sustainable Cities and Society*, 112, 105635'
abstract: >-
  Fine-grained 3D buildings with diverse morphology are a cornerstone of urban physical structures and
  have profound implications for sustainable city development. However, accurately estimating building
  height at the footprint-level is a challenge. This study bridged this gap by using random forest models
  to integrate the elevation, geometry and shape attributes of individual buildings, further refining
  those with spatial aggregation. It considered over one million buildings across 10 large Chinese cities
  and trained two-types models that demonstrated commendable performance in city-specific (the mean absolute
  error (MAE) ranged from 3.43 m to 5.06 m) and combined (MAE = 4.68 m) models. Results revealed that
  the current dataset had a finer urban morphology compared with existing datasets and showed outstanding
  generalisability in method transfer and feature ablation tests. By incorporating Shapley values, we
  explored the features' global and local impacts. The explainable results demonstrated that building
  area was the most impactful feature, and the elevation-dimension features were particularly beneficial
  in estimating high-rise buildings. Using the fine-grained 3D buildings, we explored the connections
  between explicit morphology differences and implicit contexts in cities. Overall, our work is an endeavour
  to estimate footprint-level building height as fuel for refining urban morphology and enabling sustainable
  city studies.
summary: >-
  This study bridged this gap by using random forest models to integrate the elevation, geometry and shape
  attributes of individual buildings, further refining those with spatial aggregation.
tags:
- building height
- urban morphology
- explainable machine learning
featured: true
hugoblox:
  ids:
    doi: 10.1016/j.scs.2024.105635
links:
- type: code
  url: https://github.com/CubicsYang/Footprint_Building_Height_Estimation
- type: dataset
  url: https://www.geodata.cn/data/datadetails.html?dataguid=135869909769675&docId=151
image:
  caption: Zoom-in of the building height estimation results
  focal_point: ''
  preview_only: false
---
