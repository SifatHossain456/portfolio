"use client";

import { useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import * as THREE from "three";
import { useGame } from "@/game/store";
import { projectLocations, coinPositions } from "@/game/world-data";

export function Player() {
  const body = useRef<RapierRigidBody>(null);
  const mesh = useRef<THREE.Group>(null);
  const [, get] = useKeyboardControls();
  const { camera } = useThree();
  const start = useGame((s) => s.start);
  const visitProject = useGame((s) => s.visitProject);
  const collectCoin = useGame((s) => s.collectCoin);
  const unlockAchievement = useGame((s) => s.unlockAchievement);
  const reducedMotion = useGame((s) => s.reducedMotion);

  const cameraTarget = useRef(new THREE.Vector3());
  const lastProjectCheck = useRef(0);
  const maxSpeedReached = useRef(0);

  useEffect(() => {
    start();
    unlockAchievement("first-steps");
  }, [start, unlockAchievement]);

  useFrame((state, delta) => {
    if (!body.current) return;
    const dt = Math.min(delta, 0.05);

    const { forward, backward, left, right, jump } = get();

    const linVel = body.current.linvel();
    const currentSpeed = Math.sqrt(linVel.x ** 2 + linVel.z ** 2);
    if (currentSpeed > maxSpeedReached.current) {
      maxSpeedReached.current = currentSpeed;
      if (currentSpeed > 25) unlockAchievement("speed-demon");
    }

    const force = 8;
    const impulse = new THREE.Vector3();

    if (forward) impulse.z -= force;
    if (backward) impulse.z += force;
    if (left) impulse.x -= force;
    if (right) impulse.x += force;

    if (impulse.lengthSq() > 0) {
      impulse.normalize().multiplyScalar(force * 0.5);
      body.current.applyImpulse({ x: impulse.x, y: 0, z: impulse.z }, true);
    }

    body.current.setLinvel(
      { x: linVel.x * 0.95, y: linVel.y, z: linVel.z * 0.95 },
      true
    );

    if (jump) {
      const pos = body.current.translation();
      if (pos.y < 1.5) {
        body.current.applyImpulse({ x: 0, y: 6, z: 0 }, true);
      }
    }

    const moveDir = new THREE.Vector3(linVel.x, 0, linVel.z);
    if (moveDir.lengthSq() > 0.5 && mesh.current) {
      const angle = Math.atan2(moveDir.x, moveDir.z);
      mesh.current.rotation.y = THREE.MathUtils.lerp(mesh.current.rotation.y, angle, 0.1);
    }

    const pos = body.current.translation();
    const camOffset = reducedMotion
      ? new THREE.Vector3(0, 8, 12)
      : new THREE.Vector3(0, 5, 9);
    cameraTarget.current.set(
      pos.x + camOffset.x,
      pos.y + camOffset.y,
      pos.z + camOffset.z
    );
    camera.position.lerp(cameraTarget.current, reducedMotion ? 0.2 : 0.08);
    camera.lookAt(pos.x, pos.y, pos.z);

    const now = state.clock.elapsedTime;
    if (now - lastProjectCheck.current > 0.3) {
      lastProjectCheck.current = now;
      let nearest: string | null = null;
      let nearestDist = 5;
      for (const loc of projectLocations) {
        const dx = pos.x - loc.position[0];
        const dz = pos.z - loc.position[2];
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearest = loc.slug;
        }
      }
      if (nearest) {
        visitProject(nearest);
      }
    }

    for (const coinPos of coinPositions) {
      const dx = pos.x - coinPos[0];
      const dz = pos.z - coinPos[2];
      const dy = pos.y - coinPos[1];
      const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
      if (dist < 1.5) {
        collectCoin();
      }
    }
  });

  return (
    <RigidBody
      ref={body}
      colliders="ball"
      position={[0, 2, 0]}
      mass={1}
      friction={0.5}
      restitution={0.3}
      linearDamping={0.5}
      angularDamping={0.5}
      enabledRotations={[true, true, true]}
    >
      <group ref={mesh}>
        <mesh castShadow>
          <icosahedronGeometry args={[0.6, 1]} />
          <meshStandardMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={0.5}
            metalness={0.8}
            roughness={0.2}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1, 0.08, 8, 32]} />
          <meshStandardMaterial
            color="#a78bfa"
            emissive="#7c3aed"
            emissiveIntensity={0.8}
            metalness={0.9}
            roughness={0.1}
          />
        </mesh>
        <pointLight color="#818cf8" intensity={2} distance={8} />
      </group>
    </RigidBody>
  );
}