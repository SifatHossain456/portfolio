"use client";

import { EffectComposer, Bloom, Vignette, SMAA } from "@react-three/postprocessing";
import { useGame } from "@/game/store";

// Cast to any to resolve React 18/19 type conflicts in postprocessing
const Composer = EffectComposer as unknown as React.FC<{
  multisampling?: number;
  children?: React.ReactNode;
}>;
const BloomEffect = Bloom as unknown as React.FC<Record<string, unknown>>;
const VignetteEffect = Vignette as unknown as React.FC<Record<string, unknown>>;
const SMAAEffect = SMAA as unknown as React.FC<Record<string, unknown>>;

export function Effects() {
  const reducedMotion = useGame((s) => s.reducedMotion);

  if (reducedMotion) {
    return (
      <Composer multisampling={0}>
        <SMAAEffect />
      </Composer>
    );
  }

  return (
    <Composer multisampling={4}>
      <BloomEffect
        intensity={0.8}
        luminanceThreshold={0.2}
        luminanceSmoothing={0.9}
        mipmapBlur
        radius={0.7}
      />
      <VignetteEffect eskil={false} offset={0.3} darkness={0.6} />
      <SMAAEffect />
    </Composer>
  );
}