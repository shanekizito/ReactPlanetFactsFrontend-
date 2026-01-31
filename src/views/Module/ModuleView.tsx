import React, { useEffect, useRef, useState } from "react";
import { useRoute, Link, Redirect } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scienceModules } from "../../data/moduleData";
import { nasaService } from "../../services/nasaService";
import { Canvas } from "@react-three/fiber";
import { AsteroidBelt } from "../../components/AsteroidBelt/AsteroidBelt";
import { VisualErrorBoundary } from "../../components/VisualErrorBoundary/VisualErrorBoundary";
import { Suspense } from "react";

gsap.registerPlugin(ScrollTrigger);

export const ModuleView = () => {
    const [, params] = useRoute("/module/:id");
    const module = scienceModules[params?.id || ""];
    const containerRef = useRef<HTMLDivElement>(null);
    const [liveData, setLiveData] = useState<any>(null);
    const [innovationData, setInnovationData] = useState<any>(null);
    const [archiveData, setArchiveData] = useState<any>(null);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchModuleData = async () => {
            // Initiate all requests immediately
            const promises = [
                // Live Data (Specific to ID)
                (async () => {
                    if (params?.id === 'neo') {
                        const today = new Date().toISOString().split('T')[0];
                        const data = await nasaService.getNEOFeed(today);
                        setLiveData({ type: 'neo', data: data.near_earth_objects[today] });
                    } else if (params?.id === 'solar-weather') {
                        const data = await nasaService.getSolarWeather();
                        setLiveData({ type: 'solar', data: data.slice(0, 5) });
                    } else if (params?.id === 'exoplanets') {
                        const data = await nasaService.getExoplanets();
                        setLiveData({ type: 'exoplanet', data: data.slice(0, 5) });
                    }
                })(),
                // Innovation Data
                (async () => {
                    const tech = await nasaService.getTechTransfer();
                    setInnovationData(tech.results?.slice(0, 4));
                })(),
                // Archive Data
                (async () => {
                    const archives = await nasaService.searchLibrary(module?.title || "Space");
                    setArchiveData(archives.collection.items.slice(0, 6));
                })()
            ];

            try {
                await Promise.allSettled(promises);
            } catch (err) {
                console.error("Critical error in parallel fetch:", err);
            }
        };
        fetchModuleData();
    }, [params?.id]);

    useEffect(() => {
        if (!module || !containerRef.current) return;

        const ctx = gsap.context(() => {
            // Header Animation
            gsap.from(".module-header > *", {
                y: 50,
                opacity: 0,
                duration: 1.5,
                stagger: 0.2,
                ease: "power4.out"
            });

            // Sidebar Animation
            gsap.from(".module-sidebar", {
                x: -50,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
                delay: 0.5
            });

            // Section Reveal Animation
            const sections = gsap.utils.toArray(".module-section");
            sections.forEach((section: any) => {
                gsap.from(section, {
                    y: 50,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 85%"
                    }
                });
            });

            // Telemetry Bars Animation
            gsap.utils.toArray(".telemetry-bar").forEach((bar: any) => {
                gsap.to(bar, {
                    height: "random(10, 100)%",
                    duration: "random(0.5, 2)",
                    repeat: -1,
                    yoyo: true,
                    ease: "sine.inOut"
                });
            });

        }, containerRef);

        return () => ctx.revert();
    }, [module]);

    if (!module) return <Redirect to="/" />;

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <div ref={containerRef} className="relative min-h-screen px-4 md:px-16 py-12 overflow-hidden">
            {/* Dynamic Background Image */}
            {/* Dynamic Background Image Banner */}
            {module.image && (
                <div
                    className="absolute left-0 right-0 h-[60vh] z-0 overflow-hidden pointer-events-none"
                    style={{ top: '-16px' }}
                >
                    <img
                        src={module.image}
                        alt={module.title}
                        className="w-full h-full object-cover object-center opacity-80 scale-110"
                    />
                    {/* Gradient Overlay for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#000308] via-[#000308]/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#000308] via-transparent to-[#000308]" />
                    <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#000308] to-transparent" />
                </div>
            )}

            <div className="data-stream" />
            <div className="lens-flare opacity-10" />

            <div className="max-w-[1400px] mx-auto relative z-20">
                {/* Header HUD */}
                <header className="module-header flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-20">
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 opacity-40">
                            <div className="w-8 h-[1px] bg-nasa-red" />
                            <span className="text-[10px] font-mono tracking-[0.4em] uppercase">{module.category}</span>
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black tracking-tight uppercase">
                            {module.title}
                        </h1>
                    </div>

                    <div className="hud-card !py-4 !px-8 flex items-center gap-4">
                        <div className="w-2 h-2 bg-nasa-red rounded-full animate-pulse" />
                        <span className="text-[9px] font-mono tracking-widest uppercase text-white/60">
                            Research Status: {module.status}
                        </span>
                    </div>
                </header>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Wikipedia Style Sidebar (Table of Contents) */}
                    <aside className="module-sidebar lg:col-span-3">
                        <div className="sticky top-32 space-y-8">
                            <div className="hud-card !p-6 border-l-2 border-nasa-red">
                                <span className="text-[10px] font-bold text-white/40 tracking-[0.3em] uppercase block mb-6">// Mission Protocol</span>
                                <nav className="flex flex-col gap-4">
                                    {module.sections.map((section) => (
                                        <button
                                            key={section.id}
                                            onClick={() => scrollToSection(section.id)}
                                            className="text-xs text-left text-gray-400 hover:text-holo-cyan uppercase tracking-widest transition-colors flex items-center gap-3 group"
                                        >
                                            <span className="w-1.5 h-1.5 bg-gray-600 rounded-full group-hover:bg-holo-cyan transition-colors" />
                                            {section.title}
                                        </button>
                                    ))}
                                    <div className="h-[1px] bg-white/10 my-2" />
                                    <button
                                        onClick={() => scrollToSection("telemetry")}
                                        className="text-xs text-left text-gray-400 hover:text-holo-cyan uppercase tracking-widest transition-colors flex items-center gap-3 group"
                                    >
                                        <span className="w-1.5 h-1.5 bg-nasa-red rounded-full" />
                                        Full Telemetry
                                    </button>
                                </nav>
                            </div>

                            <div className="hud-card !p-6 hidden lg:block opacity-40">
                                <span className="text-[8px] font-mono tracking-[0.4em] mb-4 block uppercase font-bold">Encrypted Link //</span>
                                <div className="space-y-2">
                                    <div className="h-1 bg-white/10 w-full" />
                                    <div className="h-1 bg-white/10 w-2/3" />
                                    <div className="h-1 bg-white/10 w-4/5" />
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* Structured Content Area */}
                    <div className="lg:col-span-9 space-y-16">
                        {/* Overview Section */}
                        <section className="module-section hud-card">
                            <div className="corner-brkt corner-brkt-tl" />
                            <div className="corner-brkt corner-brkt-tr" />
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                <div className="space-y-8">
                                    <span className="text-[10px] font-bold text-holo-cyan tracking-[0.5em] uppercase">// Executive Briefing</span>
                                    <p className="text-2xl md:text-3xl font-light leading-relaxed text-blue-50/90 italic">
                                        "{module.description}"
                                    </p>
                                    <p className="text-gray-400 font-light leading-relaxed">
                                        {module.longDescription}
                                    </p>
                                </div>
                                {params?.id === 'neo' && (
                                    <div className="h-[300px] w-full relative bg-black/20 rounded-lg overflow-hidden border border-white/5">
                                        <div className="absolute top-4 left-4 z-10 text-[8px] font-mono text-nasa-red uppercase tracking-widest animate-pulse">
                                            LIVE RADAR // GPU ACCELERATED
                                        </div>
                                        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
                                            <Suspense fallback={null}>
                                                <VisualErrorBoundary fallback={null}>
                                                    <ambientLight intensity={0.5} />
                                                    <pointLight position={[10, 10, 10]} intensity={1} />
                                                    <AsteroidBelt count={1000} />
                                                </VisualErrorBoundary>
                                            </Suspense>
                                        </Canvas>
                                    </div>
                                )}
                            </div>
                        </section>

                        {/* Heritage & Innovation Hub Sections (NASA Endpoints) */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-16">
                            {/* Innovation Lab (TechTransfer) */}
                            <section id="innovation" className="module-section hud-card overflow-hidden !bg-white/[0.01]">
                                <div className="corner-brkt corner-brkt-tl" />
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-holo-cyan tracking-[0.5em] uppercase font-mono">// Innovation Lab</span>
                                        <div className="px-2 py-1 bg-nasa-red text-white text-[7px] font-black tracking-widest rounded-sm animate-pulse-fast">LIVE TECH_TRANSFER STREAM</div>
                                    </div>
                                    <div className="space-y-4">
                                        {innovationData?.map((item: any, i: number) => (
                                            <div key={i} className="p-4 bg-white/[0.02] border border-white/5 rounded hover:border-holo-cyan transition-colors group">
                                                <h4 className="text-[10px] font-bold text-white mb-1 uppercase tracking-wider line-clamp-1">{item[2]}</h4>
                                                <p className="text-[9px] text-gray-500 font-light line-clamp-2 italic group-hover:text-gray-300 transition-colors">
                                                    {item[3]}
                                                </p>
                                                <div className="mt-2 text-[8px] font-mono text-holo-cyan/40">REF: {item[1]} // CLASS: {item[5]}</div>
                                            </div>
                                        ))}
                                        {!innovationData && <div className="text-[10px] font-mono text-white/20 animate-pulse">[ SCANNING_TECHNOLOGY_REGISTRY... ]</div>}
                                    </div>
                                </div>
                            </section>

                            {/* Mission Heritage Archive (Library) */}
                            <section id="archive" className="module-section hud-card overflow-hidden !bg-white/[0.01]">
                                <div className="corner-brkt corner-brkt-tr" />
                                <div className="relative z-10 space-y-8">
                                    <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-nasa-red tracking-[0.5em] uppercase font-mono">// Heritage Archive</span>
                                        <div className="px-2 py-1 bg-holo-cyan/20 border border-holo-cyan text-holo-cyan text-[7px] font-black tracking-widest rounded-sm">LIVE NASA LIBRARY FEED</div>
                                    </div>
                                    <div className="grid grid-cols-2 gap-3">
                                        {archiveData?.map((item: any, i: number) => (
                                            <div key={i} className="relative aspect-square bg-black rounded overflow-hidden border border-white/5 group">
                                                <img
                                                    src={item.links?.[0]?.href}
                                                    alt="Mission Archive"
                                                    className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 group-hover:scale-110"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end">
                                                    <div className="text-[8px] font-mono text-white truncate">{item.data?.[0]?.title}</div>
                                                    <div className="text-[7px] font-mono text-nasa-red">{item.data?.[0]?.date_created?.split('T')[0]}</div>
                                                </div>
                                            </div>
                                        ))}
                                        {!archiveData && <div className="col-span-2 text-[10px] font-mono text-white/20 animate-pulse text-center py-12">[ INDEXING_LOCAL_STORAGE... ]</div>}
                                    </div>
                                </div>
                            </section>
                        </div>

                        {/* Subsections Briefing */}
                        <div className="space-y-12">
                            {module.sections.map((section, i) => (
                                <section
                                    key={section.id}
                                    id={section.id}
                                    className="module-section hud-card !bg-transparent !border-white/5"
                                >
                                    <div className="corner-brkt corner-brkt-tl scale-75 opacity-20" />
                                    <div className="space-y-6">
                                        <div className="flex items-center gap-6">
                                            <span className="text-holo-cyan font-mono text-[10px] opacity-40">0{i + 1} //</span>
                                            <h2 className="text-3xl font-black uppercase tracking-tight">{section.title}</h2>
                                        </div>
                                        <div className="w-full h-[1px] bg-gradient-to-r from-white/10 to-transparent" />
                                        <p className="text-gray-400 font-light leading-relaxed max-w-4xl">
                                            {section.content}
                                        </p>
                                    </div>
                                </section>
                            ))}
                        </div>

                        {/* Scientific Telemetry & Theories */}
                        {/* Scientific Telemetry, Theories, Personnel & Assets */}
                        <section id="telemetry" className="space-y-12 pb-24">
                            <div className="module-section flex items-center gap-4">
                                <div className="w-12 h-[1px] bg-nasa-red" />
                                <h2 className="text-lg font-bold tracking-[0.4em] uppercase">Phase 2 // Technical Telemetry</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {module.facts.map((fact, i) => (
                                    <div key={i} className="module-section hud-card flex flex-col justify-center gap-2 group hover:bg-white/[0.02]">
                                        <div className="corner-brkt corner-brkt-bl opacity-40 group-hover:opacity-100 transition-opacity" />
                                        <span className="text-[9px] font-mono text-gray-500 tracking-widest uppercase">{fact.label}</span>
                                        <span className="text-2xl font-black">{fact.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Theories / Live Data */}
                                <div className="module-section hud-card overflow-hidden">
                                    <div className="tech-grid absolute inset-0 opacity-10" />
                                    <div className="relative z-10 space-y-8">
                                        <div className="flex justify-between items-center">
                                            <span className="text-[10px] font-bold text-nasa-red tracking-[0.5em] uppercase font-mono">// {liveData ? 'Live Data Stream' : 'Theoretical Frameworks'}</span>
                                            {liveData && (
                                                <div className="px-2 py-0.5 bg-nasa-red text-white text-[7px] font-black tracking-widest rounded-sm animate-pulse-fast">
                                                    REAL-TIME NASA TELEMETRY
                                                </div>
                                            )}
                                        </div>
                                        <div className="space-y-6">
                                            {liveData?.type === 'neo' ? (
                                                liveData.data.map((item: any, i: number) => (
                                                    <div key={i} className="border-l-2 border-holo-cyan pl-6">
                                                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">{item.name}</h4>
                                                        <p className="text-[10px] text-gray-400 font-light">
                                                            Diameter: {item.estimated_diameter.meters.estimated_diameter_max.toFixed(2)}m //
                                                            Hazardous: {item.is_potentially_hazardous_asteroid ? 'YES' : 'NO'}
                                                        </p>
                                                    </div>
                                                ))
                                            ) : liveData?.type === 'solar' ? (
                                                liveData.data.map((item: any, i: number) => (
                                                    <div key={i} className="border-l-2 border-nasa-red pl-6">
                                                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">Flare Class: {item.classType}</h4>
                                                        <p className="text-[10px] text-gray-400 font-light">Peak: {new Date(item.peakTime).toLocaleString()} // Location: {item.sourceLocation}</p>
                                                    </div>
                                                ))
                                            ) : liveData?.type === 'exoplanet' ? (
                                                liveData.data.map((item: any, i: number) => (
                                                    <div key={i} className="border-l-2 border-white/20 pl-6">
                                                        <h4 className="font-bold text-sm mb-1 uppercase tracking-wider">{item.pl_name}</h4>
                                                        <p className="text-[10px] text-gray-400 font-light">Orbital Period: {item.pl_orbper} Days // Star Temp: {item.st_teff}K</p>
                                                    </div>
                                                ))
                                            ) : (
                                                module.theories.map((theory, i) => (
                                                    <div key={i} className="border-l-2 border-white/10 pl-6 hover:border-holo-cyan transition-colors">
                                                        <h4 className="font-bold text-sm mb-2 uppercase tracking-wider">{theory.title}</h4>
                                                        <p className="text-xs text-gray-400 font-light leading-relaxed">{theory.description}</p>
                                                    </div>
                                                ))
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* History */}
                                <div className="module-section hud-card overflow-hidden">
                                    <div className="relative z-10 space-y-8">
                                        <span className="text-[10px] font-bold text-white/40 tracking-[0.5em] uppercase font-mono">// Historical Mission Log</span>
                                        <div className="space-y-6">
                                            {module.history.map((item, i) => (
                                                <div key={i} className="flex justify-between items-center border-b border-white/5 pb-4 last:border-0">
                                                    <div className="text-xs font-bold uppercase tracking-tight">{item.event}</div>
                                                    <div className="text-[10px] font-mono text-holo-cyan">{item.year}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Personnel (NEW) */}
                                <div className="module-section hud-card overflow-hidden">
                                    <div className="relative z-10 space-y-8">
                                        <span className="text-[10px] font-bold text-holo-cyan tracking-[0.5em] uppercase font-mono">// Scientific Personnel</span>
                                        <div className="space-y-6">
                                            {module.researchers.map((person, i) => (
                                                <div key={i} className="space-y-1">
                                                    <div className="text-[11px] font-black uppercase text-white">{person.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-light leading-relaxed">{person.contribution}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Mission Assets (NEW) */}
                                <div className="module-section hud-card overflow-hidden">
                                    <div className="relative z-10 space-y-8">
                                        <span className="text-[10px] font-bold text-white tracking-[0.5em] uppercase font-mono">// Mission Assets</span>
                                        <div className="space-y-6">
                                            {module.equipment.map((asset, i) => (
                                                <div key={i} className="space-y-1 p-3 border border-white/5 rounded-sm hover:border-nasa-red transition-colors">
                                                    <div className="text-[11px] font-black uppercase text-nasa-red">{asset.name}</div>
                                                    <div className="text-[10px] text-gray-400 font-light leading-relaxed">{asset.purpose}</div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>

                                {/* Interactive Telemetry Visualizer (NEW) */}
                                <div className="module-section hud-card lg:col-span-2 overflow-hidden min-h-[200px] flex flex-col justify-end">
                                    <div className="absolute inset-x-0 top-0 p-6 flex justify-between items-start">
                                        <span className="text-[10px] font-bold text-nasa-red tracking-[0.5em] uppercase font-mono">// Live Telemetry Stream</span>
                                        <div className="flex gap-2">
                                            <div className="w-1 h-1 bg-nasa-red rounded-full animate-pulse" />
                                            <div className="text-[8px] font-mono text-white/40">RX: 104.9kbps // STABLE</div>
                                        </div>
                                    </div>

                                    <div className="flex items-end justify-around gap-2 px-6 pb-6 h-32">
                                        {[...Array(40)].map((_, i) => (
                                            <div
                                                key={i}
                                                className="telemetry-bar w-full bg-holo-cyan/20 border-t border-holo-cyan origin-bottom"
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Adjacent Discovery Footer (NEW) */}
                        <div className="pt-24 border-t border-white/5">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-12">
                                <div className="space-y-4">
                                    <span className="text-[10px] font-bold text-white/40 tracking-[0.4em] uppercase font-mono">// Adjacent Discovery</span>
                                    <div className="flex flex-wrap gap-4">
                                        {Object.values(scienceModules).filter(m => m.id !== module.id).slice(0, 3).map((m) => (
                                            <Link key={m.id} href={`/module/${m.id}`} className="text-xs font-black uppercase text-white hover:text-nasa-red transition-colors border-b border-white/10 pb-1">
                                                {m.title} {"//"}
                                            </Link>
                                        ))}
                                    </div>
                                </div>

                                <div className="flex justify-center pt-8">
                                    <Link href="/" className="btn-nasa py-4 px-12 text-xs tracking-[0.5em] rounded-sm">
                                        Close Briefing // Return to Module Hub
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
