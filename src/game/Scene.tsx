"use client";

import { Canvas } from "@react-three/fiber";
import { Physics } from "@react-three/rapier";
import { KeyboardControls, Stars, Sparkles, Environment } from "@react-three/drei";
import { Suspense } from "react";
import * as THREE from "three";
import { Player } from "./Player";
import { World } from "./World";
import { Effects } from "./Effects";
import { useGame } from "./store";

const keyboardMap = [
  { name: "forward", keys: ["ArrowUp", "KeyW"] },
  { name: "backward", keys: ["ArrowDown", "KeyS"] },
  { name: "left", keys: ["ArrowLeft", "KeyA"] },
  { name: "right", keys: ["ArrowRight", "KeyD"] },
  { name: "jump", keys: ["Space"] },
];

function SceneContents() {
  const theme = useGame((s) => s.theme);
  const reducedMotion = useGame((s) => s.reducedMotion);

  return (
    <>
      <color attach="background" args={[theme === "dark" ? "#0a0a1a" : "#1a1a3a"]} />
      <fog attach="fog" args={[theme === "dark" ? "#0a0a1a" : "#1a1a3a", 30, 90]} />

      <ambientLight intensity={0.3} />
      <directionalLight
        position={[20, 30, 10]}
        intensity={0.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-50}
        shadow-camera-right={50}
        shadow-camera-top={50}
        shadow-camera-bottom={-50}
      />
      <hemisphereLight args={["#6366f1", "#1e1b4b", 0.4]} />

      <Suspense fallback={null}>
        <Physics gravity={[0, -9.81, 0]}>
          <World />
          <Player />
        </Physics>

        <Stars radius={120} depth={50} count={reducedMotion ? 1000 : 3000} factor={4} saturation={0} fade speed={reducedMotion ? 0 : 1} />
        <Sparkles count={reducedMotion ? 30 : 80} scale={80} size={3} speed={0.4} color="#a78bfa" />
        <Environment preset="night" />
      </Suspense>

      <Effects />
    </>
  );
}

export function Scene() {
  return (
    <KeyboardControls map={keyboardMap}>
      <Canvas
        shadows
        dpr={[1, 1.5]}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        camera={{ position: [0, 8, 12], fov: 55, near: 0.1, far: 200 }}
      >
        <SceneContents />
      </Canvas>
    </KeyboardControls>
  );
}