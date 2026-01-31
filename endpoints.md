# Orbital — NASA API Endpoints Reference

This document lists **all NASA public APIs used by Orbital**, with a **clear description of what each endpoint does**, how it fits into the product, and the role it plays in the overall interactive and 3D-driven experience.

The goal of this file is to serve as:

* A **single source of truth** for data integration
* A **technical reference** for contributors
* A **clear signal of intentional API usage** (not novelty usage)

---

## 1. Astronomy Picture of the Day (APOD)

**Base URL**
`https://api.nasa.gov/planetary/apod`

**Purpose in Orbital**
Provides high-quality, curated astronomical imagery and explanations used for:

* Homepage hero visuals
* Daily rotating background environments
* Contextual storytelling overlays

**Core Function**
Delivers a single authoritative image or video per day, paired with scientific explanation text.

**Key Data Used**

* Media URL (image or video)
* Title
* Explanation
* Date
* Copyright (when available)

---

## 2. Planetary Earth Imagery (EPIC)

**Base URL**
`https://api.nasa.gov/EPIC/api/natural`

**Purpose in Orbital**
Used for Earth-specific visualization modes and real-time planetary monitoring views.

**Core Function**
Provides daily images of Earth captured by the DSCOVR spacecraft.

**Key Data Used**

* Image identifiers
* Timestamped Earth imagery
* Metadata for camera angle and position

---

## 3. Earth Assets API

**Base URL**
`https://api.nasa.gov/planetary/earth/assets`

**Purpose in Orbital**
Enables geospatial exploration and Earth surface inspection modules.

**Core Function**
Returns imagery metadata for specific latitude/longitude coordinates.

**Key Data Used**

* Image availability dates
* Satellite source identifiers
* Geographic coordinates

---

## 4. Earth Imagery API

**Base URL**
`https://api.nasa.gov/planetary/earth/imagery`

**Purpose in Orbital**
Used for interactive Earth surface visualizations and zoom-based exploration layers.

**Core Function**
Fetches satellite imagery for a specific location on Earth.

**Key Data Used**

* Image tiles
* Date-specific captures
* Cloud score (when available)

---

## 5. Near Earth Object Web Service (NeoWs)

**Base URL**
`https://api.nasa.gov/neo/rest/v1`

**Purpose in Orbital**
Powers asteroid tracking, orbital simulations, and threat visualization modules.

**Core Function**
Provides data on near-Earth asteroids, including size, velocity, and proximity.

**Key Data Used**

* Orbital parameters
* Estimated diameter
* Close approach data
* Relative velocity
* Hazard classification

---

## 6. Mars Rover Photos API

**Base URL**
`https://api.nasa.gov/mars-photos/api/v1/rovers`

**Purpose in Orbital**
Used for Mars exploration modules and surface-level visual storytelling.

**Core Function**
Returns images captured by Mars rovers (Curiosity, Perseverance, Opportunity, Spirit).

**Key Data Used**

* Camera identifiers
* Rover metadata
* Sol and Earth date
* High-resolution surface imagery

---

## 7. NASA Image and Video Library

**Base URL**
`https://images-api.nasa.gov`

**Purpose in Orbital**
Serves as the primary historical and archival media source.

**Core Function**
Searches and retrieves NASA’s vast public archive of images, videos, and audio files.

**Key Data Used**

* Media URLs
* Asset descriptions
* Keywords and mission tags
* Metadata for licensing and attribution

---

## 8. TechTransfer API

**Base URL**
`https://api.nasa.gov/techtransfer`

**Purpose in Orbital**
Powers the technology and innovation modules.

**Core Function**
Provides access to NASA patents, software, and technology spinoffs.

**Key Data Used**

* Patent titles
* Technology categories
* Abstracts and use cases
* Release and availability status

---

## 9. Exoplanet Archive API

**Base URL**
`https://exoplanetarchive.ipac.caltech.edu/TAP/sync`

**Purpose in Orbital**
Used for deep-space and exoplanet discovery modules.

**Core Function**
Provides structured astronomical datasets on confirmed exoplanets.

**Key Data Used**

* Orbital periods
* Planet radius and mass
* Host star properties
* Discovery methods

---

## 10. DONKI (Space Weather Database)

**Base URL**
`https://api.nasa.gov/DONKI`

**Purpose in Orbital**
Drives real-time solar activity and space weather visualizations.

**Core Function**
Provides data on solar flares, coronal mass ejections, and geomagnetic storms.

**Key Data Used**

* Event timestamps
* Solar flare classification
* CME trajectory data
* Impact probabilities

---

## 11. NASA EONET (Earth Observatory Natural Event Tracker)

**Base URL**
`https://eonet.gsfc.nasa.gov/api/v3/events`

**Purpose in Orbital**
Used for global Earth event tracking and visualization layers.

**Core Function**
Tracks real-time natural events such as wildfires, storms, and volcanic activity.

**Key Data Used**

* Event categories
* Geographic coordinates
* Temporal event data
* Source references

---

## Authentication

All endpoints use a NASA API key:

* Development: `DEMO_KEY`
* Production: User-provided API key stored via environment variables

Requests are routed through a dedicated API service layer with caching, rate-limit protection, and graceful degradation.

---

## Summary

Orbital intentionally integrates **nearly the full NASA public API ecosystem**, mapping each dataset to a **specific visual, scientific, or interactive function**. Every endpoint serves a clear experiential purpose — supporting Orbital’s goal of transforming raw scientific data into an immersive, real-time exploratory interface.
