import { ChangeEvent, useState } from "react";
import { Redirect } from "wouter";
import { ImageChanger } from "../../components/ImageChanger/ImageChanger";
import { Loading } from "../../components/Loading/Loading";
import { PlanetFacts } from "../../components/PlanetFacts/PlanetFacts";
import { PlanetImage } from "../../components/PlanetImage/PlanetImage";
import { useGetPlanet } from "../../hooks/useGetPlanet";
import { Option, OPTIONS } from "../../types/PlanetImageOptions";
import { PLANET, PLANETS } from "../../types/Planets";
import './planet.css'

interface Props {
    params: {
        planet: PLANET;
    };
}

export const Planet = ({ params: { planet } }: Props) => {
    const { loading, data, error } = useGetPlanet(planet);
    const [selectedOption, setSelectedOption] = useState<Option>(OPTIONS[0]);

    const handleChange = (e: ChangeEvent) => {
        const option = OPTIONS.find(
            (option) => option.value === (e.target as HTMLInputElement).value
        )!;
        setSelectedOption(option);
    };

    const planetColor = `var(--${planet})`;

    return (
        <div className="relative min-h-screen px-4 md:px-16 py-12" style={{ "--planet-color": planetColor } as any}>
            <div className="lens-flare" />

            {!PLANETS.includes(planet) && <Redirect to="/" />}
            {loading && <Loading />}

            {data && (
                <div className="max-w-[1400px] mx-auto space-y-20 relative z-20">
                    {/* Balanced Mission Control Hero */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

                        <div className="relative flex items-center justify-center min-h-[500px] lg:min-h-[600px] bg-tech-grid rounded-3xl group">
                            <div className="corner-brkt corner-brkt-tl" />
                            <div className="corner-brkt corner-brkt-tr" />
                            <div className="corner-brkt corner-brkt-bl" />
                            <div className="corner-brkt corner-brkt-br" />

                            <div className="planet-glow-technical" />

                            <div className="absolute top-6 left-8 flex gap-4 opacity-30 text-[8px] font-mono tracking-widest">
                                <span>COORD // {planet.toUpperCase()}</span>
                                <span>MAG: 1.0x</span>
                            </div>

                            <div className="animate-float z-10">
                                <PlanetImage planet={planet} type={selectedOption.value} />
                            </div>

                            {/* Precise Radar HUD */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-10">
                                <div className="w-[80%] aspect-square border border-dashed border-white/20 rounded-full animate-spin-slow" />
                                <div className="absolute w-[60%] aspect-square border border-white/10 rounded-full" />
                                <div className="absolute w-[2px] h-[90%] bg-gradient-to-b from-transparent via-white/20 to-transparent animate-pulse" />
                            </div>
                        </div>

                        <div className="space-y-12">
                            <div className="space-y-4 animate-fade-in-up">
                                <div className="flex items-center gap-3 opacity-40">
                                    <div className="w-2 h-2 bg-nasa-red rounded-full animate-pulse" />
                                    <span className="text-[10px] font-mono tracking-[0.5em] uppercase">Status: Verifying Surface Geometry</span>
                                </div>
                                <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 whitespace-nowrap">
                                    {data.englishName.toUpperCase()}
                                </span>
                            </div>

                            <div className="hud-card animate-fade-in [animation-delay:0.3s]">
                                <div className="corner-brkt corner-brkt-tl" />
                                <div className="corner-brkt corner-brkt-br" />
                                <p className="text-base leading-relaxed text-blue-50/80 font-light italic">
                                    {data.description}
                                </p>
                            </div>

                            <div className="animate-fade-in [animation-delay:0.6s]">
                                <ImageChanger
                                    options={OPTIONS}
                                    current={selectedOption.value}
                                    color={planetColor}
                                    handleChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Unified Data Instrumentation */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="hud-card space-y-6">
                            <div className="corner-brkt corner-brkt-tl" />
                            <h3 className="text-[10px] text-holo-cyan tracking-[0.5em] pb-4 border-b border-white/5 uppercase">
                                Core Telemetry
                            </h3>
                            <PlanetFacts facts={data} />
                        </div>

                        <div className="hud-card relative group">
                            <div className="corner-brkt corner-brkt-tr" />
                            <h3 className="text-[10px] text-nasa-red tracking-[0.5em] pb-4 border-b border-white/5 uppercase flex justify-between">
                                <span>Geology</span>
                                <span className="opacity-50">#STRATA-01</span>
                            </h3>
                            <p className="text-sm font-light leading-relaxed text-gray-400 group-hover:text-blue-100 transition-colors">
                                {data.geology}
                            </p>
                            <div className="flex gap-6 mt-8 pt-6 border-t border-white/5">
                                <div>
                                    <div className="text-[8px] text-gray-500 uppercase tracking-tighter mb-1">Moons</div>
                                    <div className="text-2xl font-black">{data.moons}</div>
                                </div>
                                <div>
                                    <div className="text-[8px] text-gray-500 uppercase tracking-tighter mb-1">Gravity</div>
                                    <div className="text-2xl font-black">{data.gravity}G</div>
                                </div>
                            </div>
                        </div>

                        <div className="hud-card">
                            <div className="corner-brkt corner-brkt-bl" />
                            <h3 className="text-[10px] text-white/40 tracking-[0.5em] pb-4 border-b border-white/5 uppercase">
                                Mission Logs
                            </h3>
                            <div className="space-y-4 pt-4 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                                {data.exploration?.map((exp, i) => (
                                    <div key={i} className="border-l-2 border-white/10 pl-4 py-1 hover:border-nasa-red transition-colors group">
                                        <div className="text-nasa-red font-mono text-xs mb-1">{exp.year} // {exp.mission}</div>
                                        <p className="text-[10px] text-gray-500 group-hover:text-gray-300">{exp.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {error && (
                <div className="holo-border bg-nasa-red bg-opacity-5 p-12 text-center max-w-xl mx-auto mt-20">
                    <h2 className="text-nasa-red mb-4 tracking-[0.5em]">Network Failure</h2>
                    <pre className="text-xs text-gray-400 overflow-auto">{JSON.stringify(error, null, "\t")}</pre>
                </div>
            )}
        </div>
    );
};
