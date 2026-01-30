import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Float } from '@react-three/drei';
import { ParticleField } from '../ParticleField';
import * as THREE from 'three';


const StarField = () => {
    const ref = useRef<any>();
    const shootingStarRef = useRef<any>();

    // Generate random star positions with more density
    const sphere = useMemo(() => {
        const positions = new Float32Array(8000 * 3);
        for (let i = 0; i < 8000; i++) {
            const r = 2.5;
            const theta = 2 * Math.PI * Math.random();
            const phi = Math.acos(2 * Math.random() - 1);
            positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = r * Math.cos(phi);
        }
        return positions;
    }, []);

    useFrame((state, delta) => {
        if (ref.current) {
            ref.current.rotation.x -= delta / 15;
            ref.current.rotation.y -= delta / 20;

            // Mouse parallax effect
            const { x, y } = state.mouse;
            ref.current.rotation.x += y * 0.02;
            ref.current.rotation.y += x * 0.02;
        }

        // Animate shooting star
        if (shootingStarRef.current) {
            shootingStarRef.current.position.x += delta * 2;
            shootingStarRef.current.position.y -= delta * 1.5;

            if (shootingStarRef.current.position.x > 5) {
                shootingStarRef.current.position.x = -5;
                shootingStarRef.current.position.y = 3;
                shootingStarRef.current.position.z = Math.random() * 2 - 1;
            }
        }
    });

    return (
        <group rotation={[0, 0, Math.PI / 4]}>
            <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
                <PointMaterial
                    transparent
                    color="#ffffff"
                    size={0.004}
                    sizeAttenuation={true}
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                    opacity={0.8}
                />
            </Points>

            {/* Shooting star */}
            <mesh ref={shootingStarRef} position={[-5, 3, 0]}>
                <sphereGeometry args={[0.02, 8, 8]} />
                <meshBasicMaterial color="#00f2ff" />
            </mesh>
        </group>
    );
};

const Nebula = () => {
    const nebulaRef = useRef<any>();

    useFrame((state) => {
        if (nebulaRef.current) {
            nebulaRef.current.rotation.y = state.clock.elapsedTime * 0.05;
        }
    });

    return (
        <group ref={nebulaRef}>
            <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
                <mesh scale={[6, 6, 6]} position={[2, 1, -2]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial
                        color="#1e3a5f"
                        transparent
                        opacity={0.08}
                        side={THREE.BackSide}
                    />
                </mesh>
            </Float>

            <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6}>
                <mesh scale={[5, 5, 5]} position={[-2, -1, -1]}>
                    <sphereGeometry args={[1, 32, 32]} />
                    <meshBasicMaterial
                        color="#0a1929"
                        transparent
                        opacity={0.06}
                        side={THREE.BackSide}
                    />
                </mesh>
            </Float>
        </group>
    );
};

export const CosmicScene = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0">
            <Canvas camera={{ position: [0, 0, 1], fov: 75 }}>
                <color attach="background" args={['#000308']} />
                <ambientLight intensity={0.2} />
                <StarField />
                <Nebula />
                <ParticleField count={1000} color="#3b82f6" />
            </Canvas>
        </div>
    );
};
