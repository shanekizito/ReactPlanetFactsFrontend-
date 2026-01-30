import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface ParticleFieldProps {
    count?: number;
    color?: string;
}

export const ParticleField: React.FC<ParticleFieldProps> = ({
    count = 3000,
    color = '#00f2ff'
}) => {
    const ref = useRef<any>();
    const mouse = useRef({ x: 0, y: 0 });

    // Generate particle positions
    const particles = useMemo(() => {
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            // Random position in a cube
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;

            // Random color variation
            const colorObj = new THREE.Color(color);
            colorObj.offsetHSL(0, 0, Math.random() * 0.3 - 0.15);
            colors[i * 3] = colorObj.r;
            colors[i * 3 + 1] = colorObj.g;
            colors[i * 3 + 2] = colorObj.b;
        }

        return { positions, colors };
    }, [count, color]);

    useFrame((state) => {
        if (ref.current) {
            // Gentle rotation
            ref.current.rotation.y = state.clock.elapsedTime * 0.05;
            ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.2;

            // Mouse interaction
            const { x, y } = state.mouse;
            mouse.current.x = x;
            mouse.current.y = y;

            // Apply mouse influence
            ref.current.rotation.x += y * 0.01;
            ref.current.rotation.y += x * 0.01;
        }
    });

    return (
        <Points ref={ref} positions={particles.positions} colors={particles.colors}>
            <PointMaterial
                transparent
                vertexColors
                size={0.015}
                sizeAttenuation={true}
                depthWrite={false}
                blending={THREE.AdditiveBlending}
                opacity={0.6}
            />
        </Points>
    );
};
