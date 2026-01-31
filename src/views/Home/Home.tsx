import React, { useEffect, useRef, useState, Suspense } from "react";
import { Link } from "wouter";
import { Canvas, useThree } from "@react-three/fiber";
import { PlanetSphere } from "../../components/PlanetSphere/PlanetSphere";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { nasaService } from "../../services/nasaService";
import { VisualErrorBoundary } from "../../components/VisualErrorBoundary/VisualErrorBoundary";
import { scienceModules } from "../../data/moduleData";
import "./home.css";

gsap.registerPlugin(ScrollTrigger);

const ResponsiveCamera = () => {
    const { camera } = useThree();

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 768) {
                camera.position.set(0, 0, 16); // Mobile
            } else if (width < 1024) {
                camera.position.set(0, 0, 15); // Tablet
            } else {
                camera.position.set(0, 0, 14); // Desktop
            }
            camera.updateProjectionMatrix();
        };

        handleResize(); // Initial set
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [camera]);

    return null;
};

export const Home = () => {
    const heroRef = useRef(null);
    const gridRef = useRef(null);
    const [apodData, setApodData] = useState<any>(null);

    useEffect(() => {
        const fetchNasaData = async () => {
            try {
                // Fetch APOD
                const apod = await nasaService.getAPOD();
                setApodData(apod);
            } catch (error) {
                console.error("Error fetching NASA data:", error);
            }
        };
        fetchNasaData();
    }, []);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Hero Animation
            gsap.from(".hero-anim", {
                y: 50,
                opacity: 0,
                duration: 1.2,
                stagger: 0.2,
                ease: "power3.out",
                delay: 0.5
            });

            // Corner Brackets Animation
            gsap.from(".corner-brkt", {
                scale: 0,
                opacity: 0,
                duration: 1,
                stagger: 0.1,
                ease: "expo.out",
                delay: 0.2
            });
        });

        return () => ctx.revert();
    }, []);

    const handleHover = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        gsap.to(target, {
            scale: 1.02,
            duration: 0.3,
            ease: "power2.out"
        });
    };

    const handleHoverExit = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.currentTarget;
        gsap.to(target, {
            scale: 1,
            duration: 0.3,
            ease: "power2.out"
        });
    };

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
                        <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
                            <ResponsiveCamera />
                            <Suspense fallback={null}>
                                <VisualErrorBoundary fallback={<PlanetSphere />}>
                                    <PlanetSphere
                                        textureUrl="/sun.jpg"
                                        color="#FDB813"
                                        emissive="#bd3b00"
                                        atmosphereColor="#ff4500"
                                    />
                                </VisualErrorBoundary>
                            </Suspense>
                        </Canvas>
                    </div>

                    {/* Hero Content */}
                    <div className="w-full lg:w-1/2 space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-none">
                        <div className="hero-anim flex items-center justify-center lg:justify-start gap-4">
                            <div className="w-8 lg:w-12 h-[1px] bg-nasa-red/50" />
                            <div className="px-3 py-1 bg-nasa-red text-white text-[8px] font-black tracking-[0.3em] rounded-sm animate-pulse-fast">
                                LIVE NASA DATA STREAM // ACTIVE
                            </div>
                            <div className="w-8 lg:w-12 h-[1px] bg-nasa-red/50" />
                        </div>

                        <h1 className="hero-anim text-5xl md:text-7xl lg:text-9xl font-black tracking-[-0.05em] leading-none text-white">
                            {apodData?.title ? apodData.title.split(' ')[0].toUpperCase() : 'ORBITAL'}<span className="text-white/40">.</span>
                        </h1>

                        <p className="hero-anim text-sm md:text-base lg:text-lg font-light text-white/50 max-w-xl mx-auto lg:mx-0 tracking-wide px-4 lg:px-0">
                            {apodData?.explanation
                                ? apodData.explanation.split('.').slice(0, 2).join('.') + '.'
                                : 'Explore the cosmos through interactive scientific modules and real-time 3D visualizations.'}
                        </p>

                        {apodData?.copyright && (
                            <div className="hero-anim flex items-center gap-3 text-[9px] font-mono text-holo-cyan uppercase tracking-[0.2em] border border-holo-cyan/20 p-3 bg-holo-cyan/5 rounded-sm">
                                <div className="w-1.5 h-1.5 bg-holo-cyan rounded-full animate-pulse" />
                                <span>SOURCE: {apodData.copyright} // NASA APOD PIPELINE RECON</span>
                            </div>
                        )}

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
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-12 pb-24">
                    {/* Dynamic Module Cards */}
                    {Object.values(scienceModules).map((module, index) => (
                        <Link
                            key={module.id}
                            href={`/module/${module.id}`}
                            className="module-card group relative block cursor-pointer bg-black/40 border border-white/10 hover:border-holo-cyan/50 transition-colors duration-300 overflow-hidden"
                            onMouseEnter={handleHover}
                            onMouseLeave={handleHoverExit}
                        >
                            {/* Card Background Image - Stable & Visible */}
                            {module.image && (
                                <div className="absolute inset-0 z-0 opacity-50">
                                    <img
                                        src={module.image}
                                        alt={module.title}
                                        className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent" />
                                </div>
                            )}

                            <div className="relative z-10">
                                <div className="corner-brkt corner-brkt-tl" />
                                <h3 className="text-holo-cyan text-[10px] mb-4 tracking-[0.4em] uppercase opacity-60">
                                    {module.category}
                                </h3>
                                <h2 className="text-3xl font-black mb-4 group-hover:text-white transition-colors break-words">
                                    {module.title}
                                </h2>
                                <p className="text-xs text-gray-400 font-light leading-relaxed mb-6">
                                    {module.description}
                                </p>
                                <div className="text-[9px] font-semibold tracking-wider text-white/30 group-hover:text-white/60 uppercase transition-colors">
                                    Access Databases {"//"}
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* Section 11: Thermodynamics (Offline) */}
                    <div className="module-card group opacity-50 cursor-not-allowed relative overflow-hidden bg-black/40 border border-white/10">
                        <div className="relative z-10">
                            <div className="corner-brkt corner-brkt-tl" />
                            <h3 className="text-gray-500 text-[10px] mb-4 tracking-[0.4em] uppercase">Section 11 // Constants</h3>
                            <h2 className="text-2xl md:text-3xl font-black mb-4">Thermodynamics</h2>
                            <p className="text-sm text-gray-600 font-light leading-relaxed mb-8">
                                The fundamental laws governing heat, energy, and work. Exploring entropy, absolute zero, and the energetic limits of the universe.
                            </p>
                            <div className="text-[10px] font-bold tracking-widest text-gray-600 uppercase">
                                Signal Offline
                            </div>
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
