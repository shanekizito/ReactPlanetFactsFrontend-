import React, { useEffect, useRef } from "react";
import { Link } from "wouter";
import { Canvas, useThree } from "@react-three/fiber";

const ResponsiveCamera = () => {
    const { camera } = useThree();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                camera.position.set(0, 0, 6.5); // Further back on mobile
            } else if (width < 1024) {
                camera.position.set(0, 0, 5.5); // Tablet
            } else {
                camera.position.set(0, 0, 4); // Desktop
            }
            camera.updateProjectionMatrix();
        };

        handleResize(); // Initial set
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [camera]);

    return null;
};

// ... existing Home component ...

return (
    <div className="relative min-h-screen overflow-hidden">
        {/* Cinematic HUD Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-10">
            <div className="home-container">
                <div className="data-stream" />
                <div className="lens-flare opacity-20" />
            </div>
            <div className="corner-brkt corner-brkt-tl m-4 lg:m-12 scale-100 lg:scale-150 opacity-40" />
            <div className="corner-brkt corner-brkt-tr m-4 lg:m-12 scale-100 lg:scale-150 opacity-40" />
            <div className="corner-brkt corner-brkt-bl m-4 lg:m-12 scale-100 lg:scale-150 opacity-40" />
            <div className="corner-brkt corner-brkt-br m-4 lg:m-12 scale-100 lg:scale-150 opacity-40" />
        </div>

        <div className="max-w-[1400px] mx-auto px-6 pt-28 pb-12 lg:py-24 relative z-20">
            {/* Mission Control Hero */}
            <section ref={heroRef} className="min-h-[auto] lg:min-h-[80vh] flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-16">
                {/* 3D Planet Visualization */}
                <div className="hero-anim w-full lg:w-1/2 h-[350px] lg:h-[550px] relative order-1 lg:order-none">
                    <Canvas camera={{ position: [0, 0, 4], fov: 45 }}>
                        <ResponsiveCamera />
                        <PlanetSphere />
                    </Canvas>
                </div>

                {/* Hero Content */}
                <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-none">
                    <div className="hero-anim flex items-center justify-center lg:justify-start gap-4 opacity-30">
                        <div className="w-8 lg:w-12 h-[1px] bg-white/20" />
                        <span className="text-[9px] font-mono tracking-[0.4em] lg:tracking-[0.8em] uppercase text-white/40">Exploration Hub</span>
                        <div className="w-8 lg:w-12 h-[1px] bg-white/20" />
                    </div>

                    <h1 className="hero-anim text-5xl md:text-7xl lg:text-9xl font-black tracking-[-0.05em] leading-none text-white">
                        ORBITAL<span className="text-white/40">.</span>
                    </h1>

                    <p className="hero-anim text-sm md:text-base lg:text-lg font-light text-white/50 max-w-xl mx-auto lg:mx-0 tracking-wide px-4 lg:px-0">
                        Explore the cosmos through interactive scientific modules and real-time 3D visualizations.
                    </p>

                    <div className="hero-anim flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
                        <Link href="/planet/earth" className="btn-nasa active rounded-sm text-xs lg:text-sm py-4 px-10">
                            Begin Exploration
                        </Link>
                        <button className="btn-nasa rounded-sm text-xs lg:text-sm py-4 px-10 opacity-50 hover:opacity-100 transition-opacity">
                            Mission Archive
                        </button>
                    </div>
                </div>
            </section>

            {/* Learning Modules Grid */}
            <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {/* Section 01: Solar System */}
                <Link
                    href="/planet/earth"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 01 // Discovery</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Planetary Systems</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        In-depth telemetry and geological analysis of the eight major planets. Explore surface conditions, atmosphere composition, and orbital history.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 02: Cosmology */}
                <Link
                    href="/module/cosmology"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 02 // Origins</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Cosmology</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        Understanding the origin, evolution, and eventual fate of the universe. From big bang nucleosynthesis to large-scale structure formation.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 03: Physics */}
                <Link
                    href="/module/physics"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 03 // Mechanics</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Quantum Physics</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        The study of nature at the smallest scales: atomic and subatomic levels. Exploring entanglement, superposition, and wave-particle duality.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 04: Astrobiology */}
                <Link
                    href="/module/astrobiology"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 04 // Frontiers</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Astrobiology</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        The search for life beyond Earth. Investigating exoplanet habitability and the biochemical requirements for life in extreme environments.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 05: Galaxies */}
                <Link
                    href="/module/galaxies"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 05 // Structures</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Galactic Systems</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        Investigating the formation and dynamics of massive star systems. From the Milky Way to distant quasars and galaxy clusters.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 06: Black Holes */}
                <Link
                    href="/module/blackholes"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 06 // Singularity</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Black Holes</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        Exploring the most extreme regions of spacetime. Investigating event horizons, hawking radiation, and the physics of gravitational collapse.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 07: Exoplanets */}
                <Link
                    href="/module/exoplanets"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 07 // Worlds</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Exoplanetary Discovery</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        Cataloging confirmed worlds outside our star system. Analyzing transit data, atmospheric composition, and candidates for habitability.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 08: Dark Matter */}
                <Link
                    href="/module/darkmatter"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 08 // Dark Systems</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Dark Matter & Energy</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        Probing the invisible components of the cosmos. Analyzing gravitational lensing, lambda-CDM models, and accelerated cosmic expansion.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 09: String Theory */}
                <Link
                    href="/module/stringtheory"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 09 // M-Theory</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">String Theory</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        Investigating the fundamental building blocks of reality. Exploring 11 dimensions, supersymmetry, and the unification of physics.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 10: Stellar Evolution */}
                <Link
                    href="/module/stellar"
                    className="hud-card group block cursor-pointer hover:bg-white/[0.02] transition-all duration-300"
                    onMouseEnter={handleHover}
                    onMouseLeave={handleHoverExit}
                >
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">Module 10 // Engines</h3>
                    <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">Stellar Evolution</h2>
                    <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                        The life cycles of celestial bodies. From main sequence fusion to the spectacular deaths of supernovas and neutron stars.
                    </p>
                    <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                        Access Databases {"//"}
                    </div>
                </Link>

                {/* Section 11: Thermodynamics */}
                <div className="hud-card group opacity-50 cursor-not-allowed">
                    <div className="corner-brkt corner-brkt-tl" />
                    <h3 className="text-gray-500 text-[10px] mb-4 tracking-[0.4em] uppercase">Module 11 // Constants</h3>
                    <h2 className="text-3xl font-black mb-4">Thermodynamics</h2>
                    <p className="text-sm text-gray-600 font-light leading-relaxed mb-8">
                        The fundamental laws governing heat, energy, and work. Exploring entropy, absolute zero, and the energetic limits of the universe.
                    </p>
                    <div className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                        Signal Offline
                    </div>
                </div>
            </div>

            {/* Global Telemetry HUD */}
            <div className="fixed bottom-12 left-12 hidden lg:flex flex-col gap-2 opacity-20 pointer-events-none">
                <div className="text-[8px] font-mono tracking-widest">LAT: 28.5721° N</div>
                <div className="text-[8px] font-mono tracking-widest">LNG: 80.6480° W</div>
                <div className="w-32 h-[1px] bg-white" />
                <div className="text-[8px] font-mono tracking-widest">LOC: KENNEDY SPACE CENTER</div>
            </div>
        </div>
    </div>
);
};
