import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AsteroidBeltProps {
    count?: number;
}

export const AsteroidBelt = ({ count = 500 }: AsteroidBeltProps) => {
    const meshRef = useRef<THREE.InstancedMesh>(null);

    // Create random positions and rotations for asteroids
    const dummy = useMemo(() => new THREE.Object3D(), []);
    const asteroids = useMemo(() => {
        const temp = [];
        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const distance = 2 + Math.random() * 2;
            const x = Math.cos(angle) * distance;
            const y = (Math.random() - 0.5) * 0.5;
            const z = Math.sin(angle) * distance;

            temp.push({
                position: [x, y, z],
                rotation: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI],
                scale: 0.01 + Math.random() * 0.05
            });
        }
        return temp;
    }, [count]);

    useFrame((state) => {
        if (!meshRef.current) return;

        asteroids.forEach((ast, i) => {
            dummy.position.set(ast.position[0], ast.position[1], ast.position[2]);
            dummy.rotation.set(
                ast.rotation[0] + state.clock.elapsedTime * 0.1,
                ast.rotation[1] + state.clock.elapsedTime * 0.1,
                ast.rotation[2]
            );
            dummy.scale.set(ast.scale, ast.scale, ast.scale);
            dummy.updateMatrix();
            meshRef.current?.setMatrixAt(i, dummy.matrix);
        });
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
            <dodecahedronGeometry args={[1, 0]} />
            <meshStandardMaterial color="#444444" roughness={0.8} metalness={0.2} />
        </instancedMesh>
    );
};
