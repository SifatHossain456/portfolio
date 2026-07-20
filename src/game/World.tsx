"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RigidBody, CuboidCollider } from "@react-three/rapier";
import { Text, Billboard, Float } from "@react-three/drei";
import * as THREE from "three";
import { projectLocations, coinPositions } from "@/game/world-data";
import { useGame } from "@/game/store";

function ProjectIsland({
  position,
  color,
  name,
  slug,
  featured,
}: {
  position: [number, number, number];
  color: string;
  name: string;
  slug: string;
  featured: boolean;
}) {
  const ringRef = useRef<THREE.Mesh>(null);
  const visited = useGame((s) => s.visitedProjects.includes(slug));

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.5;
    }
  });

  const height = featured ? 2 : 1.2;
  const radius = featured ? 3 : 2;

  return (
    <group position={position}>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[radius, height / 2, radius]} position={[0, height / 2, 0]} />
        <mesh position={[0, height / 2, 0]} castShadow receiveShadow>
          <cylinderGeometry args={[radius, radius * 1.1, height, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={visited ? 0.4 : 0.15}
            metalness={0.6}
            roughness={0.3}
            transparent
            opacity={0.9}
          />
        </mesh>
        <mesh position={[0, height + 0.05, 0]} receiveShadow>
          <cylinderGeometry args={[radius * 0.95, radius, 0.1, 6]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.6}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh ref={ringRef} position={[0, height + 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radius * 0.7, 0.05, 8, 32]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5} position={[0, height + 1.5, 0]}>
          <mesh castShadow>
            <octahedronGeometry args={[featured ? 0.6 : 0.4, 0]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={1}
              metalness={0.9}
              roughness={0.1}
            />
          </mesh>
        </Float>
        <Billboard position={[0, height + 2.5, 0]}>
          <Text
            fontSize={featured ? 0.5 : 0.35}
            color={color}
            anchorX="center"
            anchorY="middle"
            outlineWidth={0.02}
            outlineColor="#000000"
          >
            {name}
          </Text>
          {featured && (
            <Text
              position={[0, -0.5, 0]}
              fontSize={0.2}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
            >
              ★ FEATURED
            </Text>
          )}
          {visited && (
            <Text
              position={[0, -0.8, 0]}
              fontSize={0.18}
              color="#22c55e"
              anchorX="center"
              anchorY="middle"
            >
              ✓ VISITED
            </Text>
          )}
        </Billboard>
        <pointLight position={[0, height + 1, 0]} color={color} intensity={featured ? 3 : 1.5} distance={featured ? 12 : 8} />
      </RigidBody>
    </group>
  );
}

function Coin({ position }: { position: [number, number, number] }) {
  const ref = useRef<THREE.Group>(null);
  const collected = useRef(false);

  useFrame((state) => {
    if (ref.current && !collected.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 2;
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.2;
    }
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <cylinderGeometry args={[0.3, 0.3, 0.08, 16]} />
        <meshStandardMaterial
          color="#fbbf24"
          emissive="#f59e0b"
          emissiveIntensity={1}
          metalness={1}
          roughness={0.1}
        />
      </mesh>
      <pointLight color="#fbbf24" intensity={0.5} distance={3} />
    </group>
  );
}

export function World() {
  return (
    <group>
      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[8, 0.5, 8]} position={[0, 0, 0]} />
        <mesh position={[0, 0, 0]} receiveShadow>
          <cylinderGeometry args={[8, 8.5, 1, 32]} />
          <meshStandardMaterial
            color="#1e1b4b"
            emissive="#312e81"
            emissiveIntensity={0.3}
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>
        <mesh position={[0, 0.55, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[7.5, 0.1, 8, 64]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#818cf8"
            emissiveIntensity={2}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
      </RigidBody>

      <RigidBody type="fixed" colliders={false}>
        <CuboidCollider args={[100, 0.5, 100]} position={[0, -2, 0]} />
      </RigidBody>

      {projectLocations.map((loc) => (
        <ProjectIsland key={loc.slug} {...loc} />
      ))}

      {coinPositions.map((pos, i) => (
        <Coin key={i} position={pos} />
      ))}
    </group>
  );
}