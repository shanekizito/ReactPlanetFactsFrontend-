import React, { useState, useEffect, useRef } from 'react';
import { useProgress } from '@react-three/drei';
import gsap from 'gsap';

export const Preloader = ({ children }: { children: React.ReactNode }) => {
    const { progress, active } = useProgress();
    const [isFinished, setIsFinished] = useState(false);
    const [displayedProgress, setDisplayedProgress] = useState(0);
    const overlayRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Smooth out the progress display
        const interval = setInterval(() => {
            setDisplayedProgress(prev => {
                if (prev < progress) return Math.min(prev + 1, progress);
                return prev;
            });
        }, 30);
        return () => clearInterval(interval);
    }, [progress]);

    useEffect(() => {
        if (!active && displayedProgress >= 100) {
            const timer = setTimeout(() => {
                gsap.to(overlayRef.current, {
                    opacity: 0,
                    duration: 1.5,
                    ease: "power2.inOut",
                    onComplete: () => setIsFinished(true)
                });
            }, 1000);
            return () => clearTimeout(timer);
        }
    }, [active, displayedProgress]);

    return (
        <>
            {!isFinished && (
                <div
                    ref={overlayRef}
                    className="fixed inset-0 z-[9999] bg-[#000308] flex flex-col items-center justify-center font-mono overflow-hidden"
                >
                    {/* Technical HUD Overlay for Preloader */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none">
                        <div className="h-full w-full bg-tech-grid" />
                    </div>

                    <div className="relative z-10 flex flex-col items-center gap-12 w-full max-w-md px-12">
                        {/* Mission Identity */}
                        <div className="text-center space-y-2">
                            <h1 className="text-2xl font-black tracking-[0.8em] text-white">ORBITAL</h1>
                            <p className="text-[9px] text-holo-cyan/60 tracking-[0.4em] uppercase">Phase 01 // Deep Space Initialization</p>
                        </div>

                        {/* Percentage Loader */}
                        <div className="w-full space-y-4">
                            <div className="flex justify-between items-end">
                                <div className="text-[10px] text-white/40 tracking-widest uppercase">
                                    {displayedProgress < 100 ? "Syncing Assets..." : "System Mission Ready"}
                                </div>
                                <div className="text-3xl font-black italic text-white leading-none">
                                    {Math.floor(displayedProgress)}%
                                </div>
                            </div>
                            <div className="h-1.5 w-full bg-white/5 relative overflow-hidden rounded-full">
                                <div
                                    ref={barRef}
                                    className="absolute top-0 left-0 h-full bg-holo-cyan transition-all duration-300 ease-out"
                                    style={{ width: `${displayedProgress}%` }}
                                />
                            </div>
                        </div>

                        {/* Technical Meta Logs */}
                        <div className="w-full text-[8px] text-white/20 uppercase tracking-widest space-y-1 font-mono">
                            <div>&gt; MEMORY_ALLOC: COMPLETED</div>
                            <div>&gt; KERNEL_LOAD: [ OK ]</div>
                            <div>&gt; HUD_MATERIAL: GLAS-M_V4</div>
                            <div>&gt; SAT_RECON: STABLE</div>
                        </div>
                    </div>

                    {/* Aesthetic Corners for Preloader */}
                    <span className="absolute top-12 left-12 w-8 h-8 border-t-2 border-l-2 border-holo-cyan/30" />
                    <span className="absolute top-12 right-12 w-8 h-8 border-t-2 border-r-2 border-holo-cyan/30" />
                    <span className="absolute bottom-12 left-12 w-8 h-8 border-b-2 border-l-2 border-holo-cyan/30" />
                    <span className="absolute bottom-12 right-12 w-8 h-8 border-b-2 border-r-2 border-holo-cyan/30" />
                </div>
            )}
            <div style={{ visibility: isFinished ? 'visible' : 'hidden' }}>
                {children}
            </div>
        </>
    );
};
