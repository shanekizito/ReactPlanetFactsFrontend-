import { ChangeEvent, useState, useEffect } from "react";
import { Redirect } from "wouter";
import { ImageChanger } from "../../components/ImageChanger/ImageChanger";
import { Loading } from "../../components/Loading/Loading";
import { PlanetFacts } from "../../components/PlanetFacts/PlanetFacts";
import { PlanetSphere } from "../../components/PlanetSphere/PlanetSphere";
import { useGetPlanet } from "../../hooks/useGetPlanet";
import { Option, OPTIONS } from "../../types/PlanetImageOptions";
import { PLANET, PLANETS } from "../../types/Planets";
import { nasaService } from "../../services/nasaService";
import { Canvas, useThree } from "@react-three/fiber";
import { VisualErrorBoundary } from "../../components/VisualErrorBoundary/VisualErrorBoundary";
import { Suspense } from "react";
import './planet.css'

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

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [camera]);

    return null;
};

interface Props {
    params: {
        planet: PLANET;
    };
}

export const Planet = ({ params: { planet } }: Props) => {
    const { loading, data, error } = useGetPlanet(planet);
    const [selectedOption, setSelectedOption] = useState<Option>(OPTIONS[0]);
    const [nasaData, setNasaData] = useState<any>(null);
    const [apodData, setApodData] = useState<any>(null);
    const [earthTextureUrl, setEarthTextureUrl] = useState<string | undefined>(undefined);
    const [earthRecon, setEarthRecon] = useState<any>(null);
    const [reconCoords, setReconCoords] = useState({ lat: 28.5721, lon: -80.648 }); // KSC Default

    useEffect(() => {
        const fetchNasaData = async () => {
            try {
                const apod = await nasaService.getAPOD();
                setApodData(apod);

                if (planet === 'earth') {
                    const eonet = await nasaService.getEONETEvents();
                    const epic = await nasaService.getEPICNatural();

                    if (epic && epic.length > 0) {
                        const latest = epic[0];
                        const date = latest.date.split(' ')[0].split('-');
                        const imageUrl = `https://epic.gsfc.nasa.gov/archive/natural/${date[0]}/${date[1]}/${date[2]}/png/${latest.image}.png`;
                        setEarthTextureUrl(imageUrl);
                    }
                    setNasaData({ eonet });
                } else if (planet === 'mars') {
                    const rover = await nasaService.getMarsRoverPhotos();
                    const weather = await nasaService.getMarsWeather();
                    setNasaData({ rover: rover.photos?.slice(0, 5), weather });
                }
            } catch (err) {
                console.error("Error fetching planetary NASA data:", err);
            }
        };
        fetchNasaData();

        if (planet === 'earth') {
            const fetchRecon = async () => {
                const assets = await nasaService.getEarthAssets(reconCoords.lat, reconCoords.lon);
                const imageUrl = await nasaService.getEarthImagery(reconCoords.lat, reconCoords.lon);
                setEarthRecon({ assets, imageUrl });
            };
            fetchRecon();
        }
    }, [planet, reconCoords]);

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

                            <div className="z-10 w-full h-full">
                                <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
                                    <ResponsiveCamera />
                                    <Suspense fallback={null}>
                                        <VisualErrorBoundary fallback={
                                            <PlanetSphere
                                                color={planetColor}
                                                atmosphereColor={planetColor}
                                                showAtmosphere={selectedOption.value !== 'internal'}
                                            />
                                        }>
                                            <PlanetSphere
                                                textureUrl={planet === 'earth' && earthTextureUrl ? earthTextureUrl : `/planets/${planet}.png`}
                                                color={planetColor}
                                                atmosphereColor={planetColor}
                                                showAtmosphere={selectedOption.value !== 'internal'}
                                            />
                                        </VisualErrorBoundary>
                                    </Suspense>
                                </Canvas>
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
                                <h1 className="text-7xl md:text-8xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-b from-white to-white/20 whitespace-nowrap">
                                    {planet.toUpperCase()}
                                </h1>
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
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <h3 className="text-[10px] text-holo-cyan tracking-[0.5em] uppercase">
                                    Core Telemetry
                                </h3>
                                <div className="px-2 py-0.5 bg-nasa-red text-white text-[7px] font-black tracking-widest rounded-sm animate-pulse-fast">
                                    LIVE API DATA
                                </div>
                            </div>
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
                            <div className="flex justify-between items-center pb-4 border-b border-white/5">
                                <h3 className="text-[10px] text-white/40 tracking-[0.5em] uppercase">
                                    Mission Logs
                                </h3>
                                <div className="px-2 py-0.5 bg-holo-cyan/20 border border-holo-cyan text-holo-cyan text-[7px] font-black tracking-widest rounded-sm">
                                    LIVE NASA FEED
                                </div>
                            </div>
                            <div className="space-y-4 pt-4 overflow-y-auto max-h-[250px] pr-2 custom-scrollbar">
                                {planet === 'earth' && nasaData?.eonet?.events ? (
                                    nasaData.eonet.events.slice(0, 10).map((event: any, i: number) => (
                                        <div key={i} className="border-l-2 border-holo-cyan/30 pl-4 py-1 hover:border-holo-cyan transition-colors group">
                                            <div className="text-holo-cyan font-mono text-xs mb-1">{event.categories?.[0]?.title} // LIVE</div>
                                            <p className="text-[10px] text-gray-500 group-hover:text-gray-300">{event.title}</p>
                                        </div>
                                    ))
                                ) : planet === 'mars' && nasaData?.rover ? (
                                    nasaData.rover.map((photo: any, i: number) => (
                                        <div key={i} className="border-l-2 border-nasa-red/30 pl-4 py-1 hover:border-nasa-red transition-colors group">
                                            <div className="text-nasa-red font-mono text-xs mb-1">{photo.camera.full_name} // SOL {photo.sol}</div>
                                            <p className="text-[10px] text-gray-500 group-hover:text-gray-300">Rover: {photo.rover.name} - Earth Date: {photo.earth_date}</p>
                                            <img src={photo.img_src} alt="Mars Rover" className="mt-2 w-full h-20 object-cover rounded-sm opacity-60 group-hover:opacity-100 transition-opacity" />
                                        </div>
                                    ))
                                ) : (
                                    data.exploration?.map((exp, i) => (
                                        <div key={i} className="border-l-2 border-white/10 pl-4 py-1 hover:border-nasa-red transition-colors group">
                                            <div className="text-nasa-red font-mono text-xs mb-1">{exp.year} // {exp.mission}</div>
                                            <p className="text-[10px] text-gray-500 group-hover:text-gray-300">{exp.description}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>

                        {/* Global NASA Intel (APOD) - High Visibility */}
                        <div className="hud-card lg:col-span-1 border-nasa-red/20 bg-nasa-red/[0.02]">
                            <div className="corner-brkt corner-brkt-tr" />
                            <div className="flex justify-between items-center pb-4 border-b border-white/5 mb-4">
                                <h3 className="text-[10px] text-nasa-red tracking-[0.5em] uppercase">
                                    Global Intelligence
                                </h3>
                                <div className="px-2 py-0.5 bg-nasa-red text-white text-[7px] font-black tracking-widest rounded-sm animate-pulse-fast">
                                    LIVE NASA FEED
                                </div>
                            </div>
                            {apodData ? (
                                <div className="space-y-4">
                                    <div className="relative aspect-video rounded overflow-hidden border border-white/10 group">
                                        <img src={apodData.url} alt="NASA APOD" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent p-3 flex flex-col justify-end">
                                            <div className="text-[9px] font-black text-white uppercase truncate">{apodData.title}</div>
                                        </div>
                                    </div>
                                    <p className="text-[9px] text-gray-400 font-light italic line-clamp-3">
                                        {apodData.explanation}
                                    </p>
                                    <div className="text-[7px] font-mono text-nasa-red/50 uppercase tracking-widest">
                                        PIPELINE: APOD_V1 // SOURCE: {apodData.copyright || 'NASA'}
                                    </div>
                                </div>
                            ) : (
                                <div className="text-[10px] font-mono text-white/20 animate-pulse text-center py-12">
                                    [ SYNCHRONIZING_GLOBAL_FEED... ]
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Earth Surface Intelligence Module */}
                    {planet === 'earth' && (
                        <div className="hud-card animate-fade-in [animation-delay:0.9s]">
                            <div className="corner-brkt corner-brkt-tl" />
                            <div className="corner-brkt corner-brkt-tr" />
                            <div className="flex flex-col lg:flex-row gap-12 items-center">
                                <div className="lg:w-1/2 space-y-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-1.5 h-1.5 bg-holo-cyan animate-ping" />
                                        <h3 className="text-xs text-holo-cyan tracking-[0.5em] uppercase font-mono">Satellite Reconnaissance // ACTIVE</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                                            <label className="text-[8px] text-gray-400 uppercase tracking-widest block mb-2">Target Latitude</label>
                                            <input
                                                type="number"
                                                value={reconCoords.lat}
                                                onChange={(e) => setReconCoords(prev => ({ ...prev, lat: parseFloat(e.target.value) }))}
                                                className="bg-transparent text-xl font-black w-full outline-none focus:text-holo-cyan transition-colors"
                                            />
                                        </div>
                                        <div className="p-4 bg-white/5 border border-white/10 rounded">
                                            <label className="text-[8px] text-gray-400 uppercase tracking-widest block mb-2">Target Longitude</label>
                                            <input
                                                type="number"
                                                value={reconCoords.lon}
                                                onChange={(e) => setReconCoords(prev => ({ ...prev, lon: parseFloat(e.target.value) }))}
                                                className="bg-transparent text-xl font-black w-full outline-none focus:text-holo-cyan transition-colors"
                                            />
                                        </div>
                                    </div>
                                    <div className="p-4 bg-holo-cyan/5 border border-holo-cyan/20 rounded-lg">
                                        <div className="text-[10px] text-holo-cyan font-mono mb-2 uppercase">Asset Metadata // {earthRecon?.assets?.id || 'FETCHING'}</div>
                                        <div className="text-[9px] text-gray-400 font-mono space-y-1">
                                            <div>DATE: {earthRecon?.assets?.date?.split('T')[0] || 'N/A'}</div>
                                            <div>SOURCE: {earthRecon?.assets?.service_version || 'N/A'}</div>
                                            <div>STATUS: STABLE_ORBIT</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="lg:w-1/2 w-full relative aspect-video bg-black rounded-lg overflow-hidden border border-white/10 group">
                                    {earthRecon?.imageUrl ? (
                                        <>
                                            <img src={earthRecon.imageUrl} alt="Satellite Imagery" className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            <div className="absolute inset-0 pointer-events-none border-[20px] border-black/20" />
                                            <div className="absolute top-4 left-4 text-[8px] font-mono text-white/40 uppercase">LIVE_FEED // SAT_RECON</div>
                                        </>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-white/20 font-mono text-xs animate-pulse">
                                            [ SEEKING_SATELLITE_LOCK ]
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
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
