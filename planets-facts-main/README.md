# ORBITAL - Space Exploration Hub

A stunning, interactive space exploration platform featuring professional 3D visualizations, scientific modules, and real-time cosmic effects.

![ORBITAL](https://img.shields.io/badge/Status-Active-success)
![React](https://img.shields.io/badge/React-18-blue)
![Three.js](https://img.shields.io/badge/Three.js-3D-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

### 🌍 Interactive 3D Planet
- Professional-grade planet visualization with custom GLSL shaders
- Fresnel atmospheric glow effects
- Dynamic cloud layer with subtle distortion
- Real-time rotation and lighting
- 3-point lighting setup (key, rim, fill)

### 🌌 Cosmic Background
- **8,000 stars** with mouse parallax interaction
- Animated shooting stars/meteors
- Vibrant nebula clouds with floating animation
- **1,000 interactive particles** responding to mouse movement
- Additive blending for realistic glow effects

### 📚 Scientific Modules
10 comprehensive modules covering:
- Planetary Systems
- Cosmology
- Quantum Physics
- Astrobiology
- Galactic Systems
- Black Holes
- Exoplanetary Discovery
- Dark Matter & Energy
- String Theory
- Stellar Evolution

### 🎨 Premium UI/UX
- Clean, professional typography
- Subtle hover animations
- Gradient text effects
- Responsive design (mobile, tablet, desktop)
- Optimized text wrapping (no word-breaking)
- HUD-style technical overlays

## 🚀 Tech Stack

- **Frontend**: React 18, TypeScript
- **3D Graphics**: Three.js, @react-three/fiber, @react-three/drei
- **Animations**: GSAP
- **Styling**: Tailwind CSS, Custom CSS
- **Build Tool**: Vite
- **Routing**: Wouter

## 📦 Installation

Clone the repository:
```bash
git clone https://github.com/shanekizito/ReactPlanetFactsFrontend-.git
cd planets-facts-main
```

Install dependencies:
```bash
npm install --legacy-peer-deps
```

Run development server:
```bash
npm run dev
```

Build for production:
```bash
npm run build
```

## 🎯 Project Structure

```
src/
├── components/
│   ├── CosmicScene/      # 8000 stars, nebulas, shooting stars
│   ├── PlanetSphere/     # Professional 3D planet with shaders
│   ├── ParticleField/    # Interactive particle system
│   └── Navbar/           # Navigation component
├── views/
│   ├── Home/             # Landing page with hero & modules
│   ├── Module/           # Scientific module detail pages
│   └── Planet/           # Planet information pages
├── data/
│   ├── planetsData.ts    # Planet information
│   └── moduleData.ts     # Scientific module content
└── styles/
    └── index.css         # Global styles & utilities
```

## 🌟 Key Highlights

### Advanced 3D Techniques
- **Custom GLSL Shaders**: Fresnel effect for atmospheric glow
- **View-dependent Lighting**: Real-time camera position updates
- **Layered Architecture**: Core sphere, clouds, atmosphere, outer glow
- **High Polygon Count**: 128 segments for smooth appearance
- **MeshDistortMaterial**: Animated cloud layer

### Performance Optimizations
- Efficient particle rendering with PointMaterial
- Frustum culling disabled for consistent star rendering
- Additive blending for performance-friendly glows
- Optimized re-renders with React.memo and useMemo

### Typography & Readability
- No word-breaking (`word-break: keep-all`)
- Optimized letter spacing and line height
- Responsive font sizes
- Improved text wrapping

## 🎨 Design Philosophy

ORBITAL combines scientific accuracy with stunning visual design:
- **Professional**: Clean, modern interface suitable for educational use
- **Interactive**: Mouse parallax, hover effects, 3D interactions
- **Informative**: Rich content with detailed scientific information
- **Performant**: Smooth 60fps animations and transitions

## 📱 Browser Support

- Chrome/Edge (recommended)
- Firefox
- Safari
- Requires WebGL support for 3D features

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Original concept inspired by FrontEnd Mentor challenge
- 3D techniques based on industry-standard practices
- Scientific content curated from reputable sources

---

**Built with ❤️ and Three.js**
