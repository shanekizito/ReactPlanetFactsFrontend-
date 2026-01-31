# ORBITAL 🌌

### An Immersive, Real-Time Scientific Visualization Platform Powered by NASA Open APIs

---

Perfect — this structure is already solid and very **serious-engineer-coded**. Orbital does not reinvent its architecture; instead, it **maps the NASA Immersive Universe specification directly into the existing React + Vite + R3F foundation**, enriching each route and component with real scientific data, high‑fidelity 3D visualization, and modern UI patterns.

This document serves as a **single, unified technical README** describing how NASA Open APIs power Orbital end‑to‑end.

---

# ORBITAL — NASA Data Integration & Experience Mapping

Orbital is a modern, high‑performance web platform that transforms live NASA datasets into interactive, cinematic, and scientifically grounded 3D experiences. Rather than presenting space data as dashboards or galleries, Orbital visualizes real telemetry as **explorable environments**.

Orbital functions as:

* A flagship **frontend + WebGL engineering showcase**
* A real‑time **scientific visualization platform**
* A portfolio‑defining project suitable for senior‑level roles

---

## 1️⃣ Global Data Layer (Cross‑Cutting Concern)

Before pages, scenes, or UI, Orbital relies on a **unified NASA data access layer**. All external data flows through a single client abstraction.

const NASA_BASE = 'https://api.nasa.gov'
export const NASA_KEY = import.meta.env.VITE_NASA_API_KEY=Lncy9Vbhg9vrNVntL5YRLYPptF29MxtVME7wovHU


export async function nasaFetch(path: string) {
  const res = await fetch(`${NASA_BASE}${path}&api_key=${NASA_KEY}`)
  if (!res.ok) throw new Error('NASA API Error')
  return res.json()
}
```

This client is used by:

* Planetary telemetry
* Homepage hero visuals
* Scientific modules
* Ambient background data

This guarantees consistency, typed responses, and future‑proofing for caching or rate‑limit strategies.

---

## 2️⃣ Navigation (Global)

### Purpose

Navigation in Orbital is **dataset‑driven**, not page‑driven.

### Integrated NASA Awareness

* Dynamic planetary links derived from internal config and enriched with NASA metadata
* Active scientific modules highlighted when live data is available

### UX Behavior

* Subtle orbital hover animations
* Active routes visually “lock into orbit”

No direct NASA calls are made here — instead, navigation reflects **data availability across the platform**.

---

## 3️⃣ Homepage (`/`) — NASA‑Powered Mission Control

The homepage acts as Orbital’s **mission control entry point**.

### Hero Section (Split Screen)

#### Left: 3D Planetary Sphere

Component: `PlanetSphere`

**NASA APIs Used**

* EPIC — real‑time Earth imagery
* APOD — environment lighting & visual context

##### EPIC Request

```
GET https://api.nasa.gov/EPIC/api/natural?api_key=KEY
```

##### Texture Construction

```
https://epic.gsfc.nasa.gov/archive/natural/{YYYY}/{MM}/{DD}/png/{image}.png
```

**Usage**

* EPIC imagery mapped to a high‑resolution sphere
* Earth rotation synced to UTC time
* Cloud layer shader animated independently

---

#### Right: Telemetry & Mission Metadata

**NASA API Used**

```
GET https://api.nasa.gov/planetary/apod?hd=true&api_key=KEY
```

**Displayed Fields**

* `title` → mission headline
* `explanation` → scientific context
* Media attribution
* Date‑based rotation (changes daily)

This ensures the homepage is **never static**.

---

### Modules Grid (11 Scientific Domains)

Each module card maps to a **specific NASA dataset or composite dataset**.

| Module             | NASA API               | Status |
| ------------------ | ---------------------- | ------ |
| Earth Live         | EPIC + EONET           | Active |
| Near‑Earth Objects | NeoWs                  | Active |
| Mars Control       | Rover Photos + InSight | Active |
| Exoplanets         | Exoplanet Archive      | Active |
| Solar Weather      | DONKI                  | Active |
| Space Media        | Image & Video Library  | Active |
| Climate Events     | EONET                  | Active |
| Tech Transfer      | TechTransfer           | Active |
| Cosmology          | External datasets      | Active |
| Quantum Physics    | Simulated              | Active |
| Deep Archive       | —                      | Locked |

---

## 4️⃣ Planetary View (`/planet/:id`)

### Purpose

This route provides **data‑accurate planetary telemetry**, not decorative visuals.

### Experience Layout

* Persistent `PlanetSphere` centerpiece
* Floating HUD telemetry panels anchored to viewport
* Scroll input controls camera orbit

---

### NASA Data Integration

#### Earth

* EPIC surface imagery
* EONET live natural events

```
GET https://eonet.gsfc.nasa.gov/api/v3/events?status=open
```

**Visualization**

* Events rendered as animated surface pins
* Color‑coded by category (fire, storm, volcano)

---

#### Mars

**Mars Rover Photos**

```
GET https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=KEY
```

**InSight Weather**

```
GET https://api.nasa.gov/insight_weather/?feedtype=json&ver=1.0&api_key=KEY
```

**Usage**

* Rover photo coordinates mapped onto Mars globe
* Weather data displayed as live HUD telemetry
* Temperature and pressure influence surface shader tint

---

### PlanetSphere Enhancements

* Planet‑specific atmosphere shaders
* Axial tilt influences light direction
* Orbital history rendered as ghost trails

---

## 5️⃣ Scientific Modules (`/module/:id`)

Scientific modules are **deep‑focus research environments**, each centered on a single dataset or phenomenon.

---

### Near‑Earth Object Module

**NASA API**

```
GET https://api.nasa.gov/neo/rest/v1/feed?start_date=YYYY-MM-DD&api_key=KEY
```

**Data Mapping**

* `estimated_diameter` → asteroid scale
* `close_approach_data` → orbital arc
* `is_potentially_hazardous_asteroid` → emissive color state

**Visualization**

* Thousands of asteroids rendered via GPU instancing
* Timeline scrubber drives orbital simulation
* Hazardous objects pulse subtly

---

### Exoplanet Explorer

**API**

```
https://exoplanetarchive.ipac.caltech.edu/TAP/sync
?query=select+pl_name,pl_rade,pl_orbper,st_teff+from+ps
&format=json
```

**Usage**

* Procedurally generated star systems
* Orbital radius derived from `pl_orbper`
* Habitable zone shading based on stellar temperature

---

### Solar Weather Module

**DONKI API**

```
GET https://api.nasa.gov/DONKI/FLR?startDate=YYYY-MM-DD&api_key=KEY
```

**Usage**

* Animated solar flares
* Earth magnetosphere distortion
* Time‑based playback of events

---

## 6️⃣ Performance Strategy (Critical)

Orbital treats performance as a first‑class feature:

* GPU instancing for large object counts
* Level‑of‑detail switching
* Texture streaming
* Adaptive pixel ratio based on FPS
* Scene lazy‑loading per route

Orbital should **never feel heavy**, even with constant 3D rendering.

---

## 7️⃣ What Orbital Becomes

Orbital is no longer:

> “a cool website with NASA APIs”

It becomes:

> **A real‑time scientific visualization platform disguised as a website.**

This makes Orbital:

* Recruiter bait 🧲
* Conference‑demo ready
* Portfolio‑defining
* Expandable into education or SaaS products

---

### Status

Orbital is under active development. New datasets, visual systems, and simulations are continuously being integrated.

---

**ORBITAL**
*A universe rendered from real data.*
