"use client";

import { useMemo } from "react";
import { useThree } from "@react-three/fiber";
import { BackSide, Color, Fog, MathUtils, ShaderMaterial } from "three";


const deckFrag = /* glsl */ `
varying vec3 vW;
uniform float uOffset;
uniform float uLayer;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); f = f*f*(3.0-2.0*f); return mix(mix(h(i), h(i+vec2(1,0)), f.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), f.x), f.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for (int i = 0; i < 6; i++){ v += a * n(p); p = p * 2.03 + 17.0; a *= 0.5; } return v; }
void main(){
  vec2 p = vW.xz * 0.035 + vec2(uOffset, uLayer * 7.0);
  float d = fbm(p);
  float puff = smoothstep(0.32, 0.78, d);
  float shade = fbm(p * 1.9 + 3.0);
  vec3 shadow = vec3(0.62, 0.68, 0.79), lit = vec3(1.0, 0.985, 0.97), warm = vec3(1.0, 0.86, 0.72);
  vec3 c = mix(shadow, lit, smoothstep(0.25, 0.85, puff * 0.7 + shade * 0.5));
  float toSun = smoothstep(60.0, -260.0, vW.z);
  c = mix(c, warm, toSun * 0.35 * (1.0 - puff * 0.4));
  float dist = length(vW.xz - cameraPosition.xz);
  c = mix(c, vec3(0.97, 0.9, 0.84), smoothstep(120.0, 420.0, dist));
  float a = uLayer > 0.5 ? smoothstep(0.42, 0.7, d) : 1.0;
  gl_FragColor = vec4(c, a);
}`;

function Deck({ y, layer }: { y: number; layer: number }) {
  const material = useMemo(
    () =>
      new ShaderMaterial({
        transparent: layer > 0,
        depthWrite: layer === 0,
        uniforms: { uOffset: { value: 0 }, uLayer: { value: layer } },
        vertexShader: "varying vec3 vW; void main(){ vec4 w = modelMatrix * vec4(position, 1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }",
        fragmentShader: deckFrag,
      }),
    [layer],
  );
  return (
    <mesh material={material} rotation={[-Math.PI / 2, 0, 0]} position={[0, y, -200]}>
      <planeGeometry args={[1600, 1200]} />
    </mesh>
  );
}

/**
 * Deterministic frame for export: dawn sky above a sea of clouds; `t` 0→1 sinks the camera through the
 * layer until everything is fog-white, ready to cross-fade into the Golden Gate fog photograph.
 */
export default function CloudDescent({ t }: { t: number }) {
  const { camera, scene } = useThree();
  const sky = useMemo(
    () =>
      new ShaderMaterial({
        side: BackSide,
        depthWrite: false,
        fog: false,
        vertexShader: "varying vec3 vP; void main(){ vP = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }",
        fragmentShader: `varying vec3 vP;
          void main(){
            float h = vP.y;
            vec3 top = vec3(0.16, 0.32, 0.62), mid = vec3(0.62, 0.74, 0.9), hor = vec3(1.0, 0.82, 0.66);
            vec3 c = mix(hor, mid, smoothstep(-0.02, 0.18, h));
            c = mix(c, top, smoothstep(0.18, 0.7, h));
            float sun = pow(max(dot(vP, normalize(vec3(0.0, 0.08, -1.0))), 0.0), 220.0) * 1.6 + pow(max(dot(vP, normalize(vec3(0.0, 0.08, -1.0))), 0.0), 8.0) * 0.35;
            gl_FragColor = vec4(c + vec3(1.0, 0.85, 0.65) * sun, 1.0);
          }`,
      }),
    [],
  );

  // Camera path: high above the deck → down into it → fully inside (white).
  // Exported range stops just above the deck; the white-out into fog happens when frames are composed.
  const e = MathUtils.smoothstep(t * 0.74, 0, 1);
  camera.position.set(0, MathUtils.lerp(22, -1.2, e), MathUtils.lerp(60, 0, e));
  camera.lookAt(0, MathUtils.lerp(10, -4, e), MathUtils.lerp(-120, -60, e));
  const inside = MathUtils.smoothstep(t, 0.62, 0.98);
  scene.fog = new Fog(new Color("#eef1f4"), MathUtils.lerp(80, 0.5, inside), MathUtils.lerp(260, 9, inside));

  return (
    <>
      <mesh material={sky} scale={400}>
        <sphereGeometry args={[1, 48, 24]} />
      </mesh>
      <ambientLight intensity={1.6} color="#e8eef7" />
      <hemisphereLight args={["#fff4e6", "#9fb3cc", 1.2]} />
      <directionalLight position={[0, 6, -30]} intensity={2.2} color="#ffd9b0" />
      <Deck y={-2} layer={0} />
      <Deck y={1.2} layer={1} />
    </>
  );
}
