import React, { useEffect, useRef } from "react";
import { useRoute, Link, Redirect } from "wouter";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scienceModules } from "../../data/moduleData";

gsap.registerPlugin(ScrollTrigger);

export const ModuleView = () => {
    const [, params] = useRoute("/module/:id");
    const module = scienceModules[params?.id || ""];
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        window.scrollTo(0, 0);
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
        <div ref={containerRef} className="relative min-h-screen px-4 md:px-16 py-12">
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
                            <div className="space-y-8">
                                <span className="text-[10px] font-bold text-holo-cyan tracking-[0.5em] uppercase">// Executive Briefing</span>
                                <p className="text-2xl md:text-3xl font-light leading-relaxed text-blue-50/90 italic">
                                    "{module.description}"
                                </p>
                                <p className="text-gray-400 font-light leading-relaxed">
                                    {module.longDescription}
                                </p>
                            </div>
                        </section>

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
                                {/* Theories */}
                                <div className="module-section hud-card overflow-hidden">
                                    <div className="tech-grid absolute inset-0 opacity-10" />
                                    <div className="relative z-10 space-y-8">
                                        <span className="text-[10px] font-bold text-nasa-red tracking-[0.5em] uppercase font-mono">// Theoretical Frameworks</span>
                                        <div className="space-y-6">
                                            {module.theories.map((theory, i) => (
                                                <div key={i} className="border-l-2 border-white/10 pl-6 hover:border-holo-cyan transition-colors">
                                                    <h4 className="font-bold text-sm mb-2 uppercase tracking-wider">{theory.title}</h4>
                                                    <p className="text-xs text-gray-400 font-light leading-relaxed">{theory.description}</p>
                                                </div>
                                            ))}
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
