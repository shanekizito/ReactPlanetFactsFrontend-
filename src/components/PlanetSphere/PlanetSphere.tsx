import React, { useRef, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface PlanetSphereProps {
    textureUrl?: string;
    showAtmosphere?: boolean;
    color?: string;
    emissive?: string;
    rotationSpeed?: number;
    atmosphereColor?: string;
}

export const PlanetSphere = ({
    textureUrl,
    showAtmosphere = true,
    color = "#1a2f4a",
    emissive = "#0d1b2a",
    rotationSpeed = 0.08,
    atmosphereColor = "#4a90e2"
}: PlanetSphereProps) => {
    const planetRef = useRef<THREE.Mesh>(null);
    const atmosphereRef = useRef<THREE.Mesh>(null);
    const cloudsRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    // Optimized texture loading with CORS fix and performance enhancements
    const texture = textureUrl ? useLoader(THREE.TextureLoader, textureUrl, (loader) => {
        loader.setCrossOrigin('anonymous');
    }) : null;

    // Optimize texture for faster rendering
    if (texture) {
        texture.minFilter = THREE.LinearMipmapLinearFilter;
        texture.magFilter = THREE.LinearFilter;
        texture.anisotropy = 4; // Reduced from max for better performance
        texture.generateMipmaps = true;
    }

    // Custom shader material for atmospheric glow with fresnel effect
    const atmosphereMaterial = useMemo(() => {
        return new THREE.ShaderMaterial({
            uniforms: {
                c: { value: 0.4 },
                p: { value: 3.5 },
                glowColor: { value: new THREE.Color(atmosphereColor) },
                viewVector: { value: new THREE.Vector3() }
            },
            vertexShader: `
                uniform vec3 viewVector;
                varying float intensity;
                void main() {
                    vec3 vNormal = normalize(normalMatrix * normal);
                    vec3 vNormel = normalize(normalMatrix * viewVector);
                    intensity = pow(0.6 - dot(vNormal, vNormel), 3.0);
                    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform vec3 glowColor;
                varying float intensity;
                void main() {
                    vec3 glow = glowColor * intensity;
                    gl_FragColor = vec4(glow, intensity * 0.8);
                }
            `,
            side: THREE.BackSide,
            blending: THREE.AdditiveBlending,
            transparent: true
        });
    }, []);

    useFrame((state, delta) => {
        // Rotate planet
        if (planetRef.current) {
            planetRef.current.rotation.y += delta * rotationSpeed;
        }

        // Slower cloud rotation
        if (cloudsRef.current) {
            cloudsRef.current.rotation.y += delta * (rotationSpeed * 1.5);
            cloudsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.02;
        }

        // Update atmosphere fresnel
        if (atmosphereRef.current && state.camera) {
            const material = atmosphereRef.current.material as THREE.ShaderMaterial;
            if (material.uniforms) {
                material.uniforms.viewVector.value = new THREE.Vector3()
                    .subVectors(state.camera.position, atmosphereRef.current.position);
            }
        }
    });

    return (
        <group>
            {/* Main planet body with advanced material */}
            <Sphere ref={planetRef} args={[5.0, 128, 128]}>
                <meshStandardMaterial
                    map={texture}
                    color={texture ? "#ffffff" : color}
                    metalness={0.2}
                    roughness={0.7}
                    emissive={emissive}
                    emissiveIntensity={0.15}
                    envMapIntensity={0.5}
                />
            </Sphere>

            {/* Dynamic cloud layer with subtle distortion */}
            <Sphere ref={cloudsRef} args={[5.06, 64, 64]}>
                <MeshDistortMaterial
                    color="#ffffff"
                    transparent
                    opacity={0.12}
                    distort={0.05}
                    speed={1.5}
                    roughness={1}
                />
            </Sphere>

            {/* Atmospheric glow with custom shader (fresnel effect) */}
            {showAtmosphere && (
                <>
                    <Sphere ref={atmosphereRef} args={[5.5, 64, 64]} material={atmosphereMaterial} />

                    {/* Subtle outer glow ring */}
                    <Sphere ref={glowRef} args={[5.65, 32, 32]}>
                        <meshBasicMaterial
                            color={atmosphereColor}
                            transparent
                            opacity={0.04}
                            side={THREE.BackSide}
                        />
                    </Sphere>
                </>
            )}

            {/* Professional lighting setup */}
            <ambientLight intensity={0.3} color="#b8d4ff" />

            {/* Key light (sun) */}
            <directionalLight
                position={[5, 2, 4]}
                intensity={2.5}
                color="#ffffff"
                castShadow
            />

            {/* Rim light for depth */}
            <pointLight
                position={[-4, 1, -3]}
                intensity={0.8}
                color="#4a90e2"
                distance={10}
            />

            {/* Fill light */}
            <pointLight
                position={[0, -3, 2]}
                intensity={0.4}
                color="#7ba7d6"
            />
        </group>
    );
};
