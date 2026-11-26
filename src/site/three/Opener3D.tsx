"use client";

import { useEffect, useRef } from "react";

/**
 * The first screen: the 888 mark as three real objects (November 2026).
 *
 * The eights are the mark's own geometry (src/brand/mark.tsx: a 36-unit loop
 * on a 42-unit loop, 112 apart, stroke 15) swept into tubes: two in chrome,
 * the third in red lacquer. Scrolling assembles them out of the dark, turns
 * them, then flies the camera through the red eight's top loop into the site.
 *
 * three.js loads after the page; the headline and the button are HTML, so
 * they are there at once. No WebGL, or reduced motion: the flat mark.
 */

const SCROLL_VH = 340;

export default function Opener3D() {
  const root = useRef<HTMLElement>(null);
  const canvasBox = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sec = root.current, box = canvasBox.current, st = stage.current;
    if (!sec || !box || !st) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let disposed = false;
    let cleanup = () => {};

    // Scroll progress drives both the 3D scene and the HTML type (via --p).
    let target = 0, current = 0;
    const read = () => {
      const r = sec.getBoundingClientRect();
      target = Math.min(1, Math.max(0, -r.top / (r.height - innerHeight)));
    };
    read();

    (async () => {
      const THREE = await import("three");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      if (disposed) return;

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
      } catch {
        st.dataset.nogl = "1";
        return;
      }
      renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 768 ? 1.5 : 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      box.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

      const camera = new THREE.PerspectiveCamera(32, 1, 0.01, 100);

      // One eight, as the mark draws it: top loop r36 at y+42, bottom loop r42 at y-36, meeting at y+6.
      class Eight extends THREE.Curve<import("three").Vector3> {
        constructor() { super(); }
        getPoint(t: number, out = new THREE.Vector3()) {
          const s = 0.01;
          if (t < 0.5) {
            const a = -Math.PI / 2 - t * 4 * Math.PI; // clockwise round the top loop, from its bottom
            return out.set(Math.cos(a) * 36 * s, (42 + Math.sin(a) * 36) * s, Math.sin(t * Math.PI * 2) * 0.05);
          }
          const u = (t - 0.5) * 2;
          const a = Math.PI / 2 + u * Math.PI * 2; // counter-clockwise round the bottom loop, from its top
          return out.set(Math.cos(a) * 42 * s, (-36 + Math.sin(a) * 42) * s, -Math.sin(u * Math.PI) * 0.05);
        }
      }
      const geo = new THREE.TubeGeometry(new Eight(), 420, 0.075, 40, true);
      const chrome = new THREE.MeshPhysicalMaterial({ color: 0xf2f2f2, metalness: 1, roughness: 0.14 });
      const lacquer = new THREE.MeshPhysicalMaterial({ color: 0xd40a10, metalness: 0.15, roughness: 0.22, clearcoat: 1, clearcoatRoughness: 0.08 });

      const group = new THREE.Group();
      scene.add(group);
      const GAP = 1.12;
      const eights = [0, 1, 2].map((i) => {
        const m = new THREE.Mesh(geo, i === 2 ? lacquer : chrome);
        group.add(m);
        return m;
      });
      // Where each eight starts (scattered in the dark) and ends (in the row).
      const start = [
        { p: new THREE.Vector3(-3.2, 1.6, -3), r: new THREE.Euler(1.2, -0.8, 0.6) },
        { p: new THREE.Vector3(0.4, -2.4, -5), r: new THREE.Euler(-0.9, 1.4, -0.3) },
        { p: new THREE.Vector3(3.4, 1.2, -2), r: new THREE.Euler(0.4, 2.2, 1.1) },
      ];
      const end = [-GAP, 0, GAP];

      const key = new THREE.DirectionalLight(0xffffff, 1.4);
      key.position.set(3, 4, 5);
      scene.add(key, new THREE.AmbientLight(0xffffff, 0.15));

      const clamp = (v: number) => Math.min(1, Math.max(0, v));
      const ease = (v: number) => 1 - Math.pow(1 - v, 3);
      const easeIO = (v: number) => (v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2);
      const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

      let w = 0, h = 0, fitZ = 6;
      const resize = () => {
        w = box.clientWidth; h = box.clientHeight;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        // Distance that fits the row (about 3.3 wide, 1.75 tall) with room around it.
        const vf = (camera.fov * Math.PI) / 180;
        const hf = 2 * Math.atan(Math.tan(vf / 2) * camera.aspect);
        fitZ = Math.max(1.0 / Math.tan(vf / 2), 2.3 / Math.tan(hf / 2)) * (w < 768 ? 1.05 : 1.35);
      };
      resize();

      const red = new THREE.Vector3();
      const draw = (p: number, time: number) => {
        // Assemble by itself on arrival (after the page loader), so the first frame is the mark.
        const a = reduced ? 1 : ease(clamp((time - 0.5) / 2.2));
        const turn = easeIO(clamp((p - 0.04) / 0.56)); // the row turns as you scroll
        const dive = easeIO(clamp((p - 0.6) / 0.38)); // into the red eight
        eights.forEach((m, i) => {
          const s = start[i];
          m.position.set(lerp(s.p.x, end[i], a), lerp(s.p.y, 0, a), lerp(s.p.z, 0, a));
          m.rotation.set(lerp(s.r.x, 0, a), lerp(s.r.y, 0, a) + (1 - a) * time * 0.3, lerp(s.r.z, 0, a));
        });
        group.rotation.y = lerp(-0.5, 0.35, turn) + Math.sin(time * 0.4) * 0.03 * (1 - dive);
        group.rotation.x = lerp(0.18, -0.05, turn);
        group.position.y = (w >= 768 ? 0.28 : 0.12) * (1 - dive);
        // Camera: back, then toward the red eight's top loop, then through it.
        eights[2].getWorldPosition(red);
        red.y += 0.42; // the top loop's centre
        const z0 = fitZ, z1 = 1.25;
        const cx = lerp(0, red.x, dive), cy = lerp(0.05, red.y, dive);
        const cz = dive < 0.75 ? lerp(z0, red.z + z1, dive / 0.75) : lerp(red.z + z1, red.z - 0.6, (dive - 0.75) / 0.25);
        camera.position.set(cx, cy, cz);
        camera.lookAt(lerp(0, red.x, dive), lerp(0, red.y, dive), red.z - 2 * dive);
        camera.fov = lerp(32, 48, clamp((dive - 0.6) / 0.4));
        camera.updateProjectionMatrix();
        renderer.render(scene, camera);
      };

      let raf = 0, visible = true;
      const t0 = performance.now();
      const loop = () => {
        current += (target - current) * (reduced ? 1 : 0.09);
        st.style.setProperty("--p", current.toFixed(4));
        draw(reduced ? Math.max(0.3, current) : current, (performance.now() - t0) / 1000);
        raf = visible ? requestAnimationFrame(loop) : 0;
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible && !raf) raf = requestAnimationFrame(loop);
      });
      io.observe(sec);
      const onScroll = () => read();
      addEventListener("scroll", onScroll, { passive: true });
      addEventListener("resize", resize);
      st.dataset.ready = "1";
      raf = requestAnimationFrame(loop);

      cleanup = () => {
        cancelAnimationFrame(raf);
        io.disconnect();
        removeEventListener("scroll", onScroll);
        removeEventListener("resize", resize);
        geo.dispose(); chrome.dispose(); lacquer.dispose(); pmrem.dispose(); renderer.dispose();
        renderer.domElement.remove();
      };
    })();

    return () => { disposed = true; cleanup(); };
  }, []);

  return (
    <section ref={root} id="top" data-dark aria-label="888 Marketing" className="relative bg-[#0b0b0c] text-white" style={{ height: `${SCROLL_VH}svh` }}>
      <div ref={stage} className="o3-stage sticky top-0 h-svh overflow-hidden" style={{ ["--p" as string]: 0 }}>
        <div className="o3-glow pointer-events-none absolute inset-0" />
        <div ref={canvasBox} className="o3-canvas absolute inset-0 [&>canvas]:h-full [&>canvas]:w-full" />

        {/* Beat 1: the line */}
        <div className="o3-beat1 pointer-events-none absolute inset-x-0 bottom-[12svh] px-5 md:bottom-[10svh] md:px-8">
          <div className="mx-auto max-w-[1320px]">
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-white/60">888 Marketing · Design studio · Bay Area</p>
            <h1 className="mt-4 text-[clamp(3.2rem,11vw,11rem)] font-extrabold leading-[0.86] tracking-[-0.065em]">
              <span className="o3-slam block" style={{ ["--k" as string]: 0 }}>Make your</span>
              <span className="o3-slam block" style={{ ["--k" as string]: 1 }}>phone ring<span className="text-red">.</span></span>
            </h1>
          </div>
        </div>

        {/* Beat 2: what we make, one word at a time */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-[12svh] px-5 md:bottom-[10svh] md:px-8">
          <div className="relative mx-auto h-[clamp(3.5rem,12vw,12rem)] max-w-[1320px]">
            {["Websites.", "Brand.", "Film.", "Google.", "Social."].map((wd, i) => (
              <span key={wd} className="o3-word absolute left-0 top-0 text-[clamp(3.2rem,12vw,12rem)] font-extrabold leading-none tracking-[-0.065em]" style={{ ["--i" as string]: i }}>{wd}</span>
            ))}
          </div>
        </div>

        <a href="#proposal" className="o3-cta absolute bottom-6 left-1/2 inline-flex min-h-12 -translate-x-1/2 items-center rounded-full bg-red px-6 text-[15px] font-bold text-white md:bottom-8">
          Get a free proposal
        </a>
        <p aria-hidden className="o3-hint pointer-events-none absolute right-5 top-[5.5rem] font-mono text-[11px] uppercase tracking-[0.24em] text-white/50 md:right-8">Scroll</p>

        {/* The dark house the camera flies out into */}
        <div aria-hidden className="o3-white pointer-events-none absolute inset-0 bg-[#0b0b0c]" />

        {/* No WebGL / reduced motion fallback: the flat mark */}
        <svg aria-hidden viewBox="0 12 324 172" className="o3-flat absolute left-1/2 top-[38%] w-[min(70vw,560px)] -translate-x-1/2 -translate-y-1/2" fill="none" strokeWidth="15" strokeLinecap="round">
          {[0, 112, 224].map((x, i) => (
            <path key={x} d="M50 92A36 36 0 0 1 50 20A36 36 0 0 1 50 92A42 42 0 0 0 50 176A42 42 0 0 0 50 92" transform={`translate(${x})`} stroke={i === 2 ? "#d40a10" : "#e9e9e9"} />
          ))}
        </svg>
      </div>
    </section>
  );
}
